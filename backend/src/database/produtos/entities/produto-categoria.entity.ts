import { Categoria } from 'src/database/categorias/entities/categoria.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto_categoria' })
export class ProdutoCategoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Produto, (produto) => produto, {
    onDelete: 'CASCADE',
  })
  produto: Produto;

  @ManyToOne(() => Categoria, (categoria) => categoria, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
