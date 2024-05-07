import { Categoria } from 'src/database/categorias/entities/categoria.entity';
import { SubCategoria } from 'src/database/sub-categorias/entities/sub-categoria.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria_subcategoria' })
export class CategoriaSubCategoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ManyToOne(() => SubCategoria, (subCategoria) => subCategoria, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subCategoria: SubCategoria;
}
