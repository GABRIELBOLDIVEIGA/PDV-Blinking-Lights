import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'produtos' })
export class Produto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false })
  descricao: string;

  @Column({ type: 'double', nullable: false })
  preco_venda: number;
}
