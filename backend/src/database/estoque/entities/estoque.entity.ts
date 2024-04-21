import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
