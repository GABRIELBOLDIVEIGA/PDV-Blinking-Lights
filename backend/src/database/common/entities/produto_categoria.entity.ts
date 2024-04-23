import { Categoria } from 'src/database/categorias/entities/categoria.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'produto_categoria' })
export class ProdutoCategoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Produto, (produto) => produto, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  produto: Produto;

  @ManyToOne(() => Categoria, (categoria) => categoria, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
