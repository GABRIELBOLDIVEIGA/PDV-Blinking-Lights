import { Produto } from 'src/database/produtos/entities/produto.entity';
import { Venda } from 'src/database/vendas/entities/venda.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'venda_produto' })
export class VendaProduto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Venda, (venda) => venda, { nullable: false })
  venda: Venda;

  @ManyToOne(() => Produto, (produto) => produto, { nullable: false })
  produto: Produto;

  @Column({ type: 'varchar', nullable: false, default: '' })
  produto_nome: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  produto_descricao: string;

  @Column({ type: 'double', nullable: false, default: 0 })
  produto_preco: number;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  quantidade: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
