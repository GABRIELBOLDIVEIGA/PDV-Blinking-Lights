// import { ProdutoCategoria } from 'src/database/produtos/entities/produto-categoria.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false, default: ' ' })
  descricao: string;

  // @ManyToMany(
  //   () => ProdutoCategoria,
  //   (produto_categoria) => produto_categoria.categoria,
  // )
  // categorias: ProdutoCategoria[];
}
