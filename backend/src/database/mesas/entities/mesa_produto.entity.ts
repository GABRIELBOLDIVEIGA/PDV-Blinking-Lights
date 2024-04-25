import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Mesa } from './mesa.entity';

@Entity({ name: 'mesa_produto' })
@Unique('produto_mesa', ['produto', 'mesa'])
export class MesaProduto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Mesa, (mesa) => mesa, { nullable: false })
  mesa: Mesa;

  @ManyToOne(() => Produto, (produto) => produto, { nullable: false })
  produto: Produto;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  quantidade: number;
}
