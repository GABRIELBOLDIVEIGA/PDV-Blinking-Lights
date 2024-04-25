import { Estoque } from 'src/database/estoque/entities/estoque.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movimento } from '../enums/Movimento';

@Entity({ name: 'estoque_historico' })
export class EstoqueHistorico {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Estoque, (estoque) => estoque, {
    onDelete: 'CASCADE',
  })
  estoque: Estoque;

  @Column({
    type: 'enum',
    enum: Movimento,
  })
  movimento: string;

  @Column({ type: 'varchar', nullable: false })
  codigo: string;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false })
  descricao: string;

  @Column({ type: 'double', nullable: false })
  preco: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
