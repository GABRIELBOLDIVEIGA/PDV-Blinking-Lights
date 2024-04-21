import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'enderecos' })
export class Endereco {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false, default: '' })
  cep: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  logradouro: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  complemento: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  bairro: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  localidade: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  uf: string;
}
