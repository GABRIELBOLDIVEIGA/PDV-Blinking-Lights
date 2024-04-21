import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fornecedor' })
export class Fornecedor {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar', default: '' })
  observacoes: string;
}
