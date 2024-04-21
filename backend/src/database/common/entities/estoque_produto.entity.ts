import { Estoque } from 'src/database/estoque/entities/estoque.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estoque_produto' })
export class EstoqueProduto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint', nullable: false })
  quantidade: number;

  @Column({ type: 'double', nullable: false })
  custo_unitario: number;

  @Column({ type: 'double', nullable: false })
  custo_total: number;

  @ManyToOne(() => Estoque, (estoque) => estoque, { nullable: false })
  estoque: Estoque;

  @ManyToOne(() => Produto, (produto) => produto, { nullable: false })
  produto: Produto;
}
