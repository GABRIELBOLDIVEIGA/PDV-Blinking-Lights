import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'estoque' })
export class Estoque {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'double', nullable: false, default: 0 })
  preco_compra: number;

  @Column({ type: 'double', nullable: false, default: 0 })
  preco_venda: number;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  quantidade: number;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  quantidade_min: number;

  @OneToOne(() => Produto, (produto) => produto.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  produto: Produto;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
