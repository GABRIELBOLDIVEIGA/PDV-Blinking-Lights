// import { VendaProduto } from 'src/database/vendas/entities/venda-produto.entity';
import { ProdutoCategoria } from 'src/database/common/entities/produto_categoria.entity';
import { ProdutoFornecedor } from 'src/database/common/entities/produto_fornecedor.entity';
import { Estoque } from 'src/database/estoque/entities/estoque.entity';
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

  @OneToMany(
    () => ProdutoFornecedor,
    (produto_fornecedor) => produto_fornecedor.produto,
  )
  fornecedores: ProdutoFornecedor[];

  @OneToMany(() => Estoque, (estoque) => estoque, {
    // nullable: false,
    onDelete: 'SET NULL',
  })
  estoque: Estoque;

  // @OneToMany(() => VendaProduto, (venda_produto) => venda_produto.produto)
  // venda: VendaProduto[];
}
