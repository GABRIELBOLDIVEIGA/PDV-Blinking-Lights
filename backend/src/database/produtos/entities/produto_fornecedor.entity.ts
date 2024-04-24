import { Fornecedor } from 'src/database/fornecedor/entities/fornecedor.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
