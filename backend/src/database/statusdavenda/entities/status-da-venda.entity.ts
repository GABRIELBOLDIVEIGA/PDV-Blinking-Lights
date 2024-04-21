import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'status_da_venda' })
export class StatusDaVenda {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;
}
