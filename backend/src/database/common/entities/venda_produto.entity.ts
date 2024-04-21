import { Produto } from 'src/database/produtos/entities/produto.entity';
import { Venda } from 'src/database/vendas/entities/venda.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'venda_produto' })
export class VendaProduto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint', nullable: false })
  quantidade: number;

  @ManyToOne(() => Venda, (venda) => venda, { nullable: false })
  venda: Venda;

  @ManyToOne(() => Produto, (produto) => produto, { nullable: false })
  produto: Produto;
}
