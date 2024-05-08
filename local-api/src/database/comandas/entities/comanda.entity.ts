import { ComandaProduto } from 'src/database/comandas/entities/comanda_produto.entity';
import { Mesa } from 'src/database/mesas/entities/mesa.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusComanda } from '../enums/StatusComanda';
import { FormaPagamento } from '../enums/FormaPagamento';

@Entity({ name: 'comanda' })
export class Comanda {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @Generated('uuid')
  codigo: string;

  @OneToMany(() => ComandaProduto, (comanda_produto) => comanda_produto.comanda)
  produtos: ComandaProduto[];

  @ManyToOne(() => Mesa, (mesa) => mesa, { nullable: true })
  mesa: Mesa;

  @Column({
    type: 'enum',
    enum: FormaPagamento,
    default: FormaPagamento.DINHEIRO,
  })
  forma_pagamento: string;

  @Column({
    type: 'enum',
    enum: StatusComanda,
    default: StatusComanda.ABERTO,
  })
  status: string;

  @Column({ type: 'double', default: 0 })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
