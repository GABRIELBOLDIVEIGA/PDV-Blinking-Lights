import { ProdutoCategoria } from 'src/database/produtos/entities/produto-categoria.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'produtos' })
export class Produto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

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
}
