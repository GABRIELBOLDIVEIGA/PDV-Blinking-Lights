import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Movimento {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
  DEFEITO = 'DEFEITO',
  VENCIDO = 'VENCIDO',
}

@Entity({ name: 'estoque' })
export class Estoque {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  quantidade: number;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  quantidade_min: number;

  @OneToOne(() => Produto, (produto) => produto, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  produto: Produto;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
