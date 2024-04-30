import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { Comanda } from './entities/comanda.entity';
import { StatusComanda } from './enums/StatusComanda';

@Injectable({ scope: Scope.REQUEST })
export class ComandaRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
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
