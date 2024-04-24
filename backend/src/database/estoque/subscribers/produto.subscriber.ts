import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Repository,
} from 'typeorm';
import { Estoque } from '../entities/estoque.entity';

@EventSubscriber()
export class ProdutoSubscriber implements EntitySubscriberInterface<Produto> {
  constructor(
    dataSource: DataSource,
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Produto;
  }

  beforeInsert(event: InsertEvent<Produto>) {
    console.log(`BEFORE Produto INSERTED: `, event.entity);
  }

  async afterInsert(event: InsertEvent<Produto>): Promise<any> {
    const novo = this.estoqueRepository.create({
      produto: event.entity,
      quantidade: 0,
    });

    this.estoqueRepository.save(novo);
  }
}
