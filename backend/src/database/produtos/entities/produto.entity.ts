import { ProdutoCategoria } from 'src/database/produtos/entities/produto_categoria.entity';
import { ProdutoFornecedor } from 'src/database/produtos/entities/produto_fornecedor.entity';
import { Estoque } from 'src/database/estoque/entities/estoque.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoSubCategoria } from './produto_subcategoria.entity';

@Entity({ name: 'produtos' })
export class Produto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  codigo: string;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false })
  descricao: string;

  @Column({ type: 'double', nullable: false })
  preco_venda: number;

  @OneToMany(
    () => ProdutoCategoria,
    (produto_categoria) => produto_categoria.produto,
  )
  categorias: ProdutoCategoria[];

  @OneToMany(
    () => ProdutoSubCategoria,
    (produto_subcategoria) => produto_subcategoria.produto,
  )
  subCategorias: ProdutoSubCategoria[];

  @OneToMany(
    () => ProdutoFornecedor,
    (produto_fornecedor) => produto_fornecedor.produto,
  )
  fornecedores: ProdutoFornecedor[];

  @OneToMany(() => Estoque, (estoque) => estoque, {
    onDelete: 'SET NULL',
  })
  estoque: Estoque;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
