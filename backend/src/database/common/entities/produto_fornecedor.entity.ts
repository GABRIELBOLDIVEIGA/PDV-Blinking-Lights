import { Fornecedor } from 'src/database/fornecedor/entities/fornecedor.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'produto_fornecedor' })
export class ProdutoFornecedor {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Produto, (produto) => produto, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  produto: Produto;

  @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  fornecedor: Fornecedor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
