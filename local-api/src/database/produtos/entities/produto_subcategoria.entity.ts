import { Produto } from 'src/database/produtos/entities/produto.entity';
import { SubCategoria } from 'src/database/sub-categorias/entities/sub-categoria.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produto_subcategoria' })
export class ProdutoSubCategoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Produto, (produto) => produto, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  produto: Produto;

  @ManyToOne(() => SubCategoria, (subCategoria) => subCategoria, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subCategoria: SubCategoria;
}
