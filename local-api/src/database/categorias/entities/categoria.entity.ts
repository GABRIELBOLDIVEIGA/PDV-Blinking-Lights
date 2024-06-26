import { CategoriaSubCategoria } from 'src/database/categorias/entities/categoria_subcategoria.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false, default: ' ' })
  descricao: string;

  @OneToMany(
    () => CategoriaSubCategoria,
    (sub_categoria) => sub_categoria.categoria,
  )
  subCategorias: CategoriaSubCategoria[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  nameToUpperCase() {
    this.nome = this.nome.toLowerCase();
    this.descricao = this.descricao.toLowerCase();
  }
}
