import { Produto } from 'src/database/produtos/entities/produto.entity';
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

  @Column({
    type: 'enum',
    enum: Movimento,
    nullable: false,
  })
  movimento: string;

  @Column({ type: 'smallint', nullable: false })
  quantidade: number;

  @Column({ type: 'double' })
  custo_unitario: number;

  @Column({ type: 'double' })
  custo_total: number;

  @ManyToOne(() => Produto, (produto) => produto)
  produto: Produto;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
