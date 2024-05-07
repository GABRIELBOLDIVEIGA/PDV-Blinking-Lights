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
import { EstoqueHistoricoService } from '../estoque-historico.service';

@EventSubscriber()
export class VendaProdutoSubscriber
  implements EntitySubscriberInterface<VendaProduto>
{
  constructor(dataSource: DataSource) {
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
    console.log('[Event] => ');
  }
}
