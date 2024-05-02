import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { Comanda } from './entities/comanda.entity';
import { StatusComanda } from './enums/StatusComanda';
import { AdicionaProdutoDto } from './dto/adiciona-produto.dto';
import { Produto } from '../produtos/entities/produto.entity';
import { ComandaProduto } from './entities/comanda_produto.entity';

@Injectable({ scope: Scope.REQUEST })
export class ComandaRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async adicionarProdutos(
    adicionaProdutoDto: AdicionaProdutoDto,
  ): Promise<string> {
    const comanda = await this.getRepository(Comanda).findOneBy({
      id: adicionaProdutoDto.comanda_id,
    });
    if (!comanda) throw new NotFoundException('Comanda não encontrada.');

    await Promise.all(
      adicionaProdutoDto.prods.map(async (item) => {
        const produto = await this.getRepository(Produto).findOneBy({
          id: item.produto_id,
        });

        if (!produto) return;

        await Promise.all(
          Array.from({ length: item.quantidade }).map(async () => {
            const p = await this.getRepository(ComandaProduto).save(
              this.getRepository(ComandaProduto).create({ comanda, produto }),
            );
            Promise.resolve(p);
          }),
        );

        Promise.resolve();
      }),
    );

    return 'Pedido realizado com sucesso.';
  }

  async getAllComandas() {
    return await this.getRepository(Comanda).find({
      relations: ['produtos.produto', 'mesa'],
    });
  }

  async fecharComanda(id: number) {
    const comanda = await this.findOne(id);

    const total = comanda.produtos.reduce(
      (accumulator, item) => accumulator + item.produto.preco_venda,
      0,
    );

    await this.getRepository(Comanda).update(
      { id: comanda.id },
      { status: StatusComanda.AGUARDANDO_PAGAMENTO, total: total },
    );

    return await this.findOne(id);
  }

  async findOne(id: number) {
    return await this.getRepository(Comanda).findOne({
      where: { id },
      relations: ['produtos.produto'],
    });
  }
}
