import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'forma_de_pagamento' })
export class FormaDePagamento {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;
}
