import { InjectRepository } from '@nestjs/typeorm';
import { VendaProduto } from 'src/database/vendas/entities/venda_produto.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  Repository,
  SoftRemoveEvent,
} from 'typeorm';
import { EstoqueHistorico } from '../entities/estoque-historico.entity';
import { Estoque } from 'src/database/estoque/entities/estoque.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import { Movimento } from '../enums/Movimento';
import { InternalServerErrorException } from '@nestjs/common';

@EventSubscriber()
export class VendaProdutoSubscriber
  implements EntitySubscriberInterface<VendaProduto>
{
  constructor(
    dataSource: DataSource,
    @InjectRepository(EstoqueHistorico)
    private readonly estoqueHistoricoRepository: Repository<EstoqueHistorico>,
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return VendaProduto;
  }

  // beforeInsert(event: InsertEvent<VendaProduto>) {
  //   // console.log(`BEFORE Produto INSERTED: `, event.entity);
  // }

  afterRemove(event: RemoveEvent<VendaProduto>): void | Promise<any> {
    console.log(`AFTER Remove: `, event.entity);
  }

  afterSoftRemove(event: SoftRemoveEvent<VendaProduto>): void | Promise<any> {
    console.log(`AFTER Soft Remove: `, event.entity);
  }

  async afterInsert(event: InsertEvent<VendaProduto>): Promise<void> {
    try {
      console.log(event.entity);

      const produto = await this.produtoRepository.findOneBy({
        id: event.entity.produto.id,
      });
      console.log('[Produto] => ', produto);

      const estoque = await this.estoqueRepository.findOne({
        where: { produto: { id: produto.id } },
      });
      console.log('[Estoque] => ', estoque);

      if (estoque) {
        await this.estoqueRepository.update(
          { id: estoque.id },
          {
            quantidade: estoque.quantidade - event.entity.quantidade,
          },
        );

        const novoEstoqueHistorico = this.estoqueHistoricoRepository.create({
          estoque,
          movimento: 'SAIDA',
          quantidade: event.entity.quantidade,
          codigo: event.entity.produto.codigo,
          nome: event.entity.produto.nome,
          descricao: event.entity.produto.descricao,
          preco_compra: estoque.preco_compra,
          preco_venda: estoque.preco_venda,
        });

        await this.estoqueHistoricoRepository.save(novoEstoqueHistorico);

        const estoque_atualizado = await this.estoqueRepository.findOneBy({
          id: estoque.id,
        });
        console.log('[Estoque Atualizado] => ', estoque_atualizado);
      }
    } catch (error) {
      console.log('[Error] => ', error);
      throw new InternalServerErrorException(error);
    }
  }
}
