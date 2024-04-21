import { Venda } from 'src/database/vendas/entities/venda.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'status_da_venda' })
export class StatusDaVenda {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @OneToMany(() => Venda, (venda) => venda, {
    // nullable: false,
    onDelete: 'SET NULL',
  })
  venda: Venda;
}
