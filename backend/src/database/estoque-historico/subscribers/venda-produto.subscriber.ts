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

  beforeInsert(event: InsertEvent<VendaProduto>) {
    console.log(`BEFORE Produto INSERTED: `, event.entity);
  }

  afterRemove(event: RemoveEvent<VendaProduto>): void | Promise<any> {
    console.log(`AFTER Remove: `, event.entity);
  }

  afterSoftRemove(event: SoftRemoveEvent<VendaProduto>): void | Promise<any> {
    console.log(`AFTER Soft Remove: `, event.entity);
  }

  async afterInsert(event: InsertEvent<VendaProduto>): Promise<void> {
    console.log(
      '[Event afterInsert VendaProduto] => ',
      event.entity.quantidade,
    );

    const produto = await this.produtoRepository.findOneBy({
      id: event.entity.produto.id,
    });
    console.log('[Produto] => ', produto);

    const estoque = await this.estoqueRepository.findOne({
      where: { produto: { id: produto.id } },
    });
    console.log('[Estoque] => ', estoque);

    const result = await this.estoqueRepository.update(estoque.id, {
      quantidade: estoque.quantidade - event.entity.quantidade,
    });
    console.log('[Result] => ', result);

    const novoEstoqueHistorico = this.estoqueHistoricoRepository.create({
      movimento: Movimento.SAIDA,
      quantidade: event.entity.quantidade,
      codigo: produto.codigo,
      nome: produto.nome,
      descricao: produto.descricao,
      preco_venda: produto.preco_venda,
      preco_compra: 0,
      estoque,
    });

    await this.estoqueHistoricoRepository.save(novoEstoqueHistorico);

    const estoque_atualizado = await this.estoqueRepository.findOneBy({
      id: estoque.id,
    });
    console.log('[Estoque Atualizado] => ', estoque_atualizado);
  }
}
