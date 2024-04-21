import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'enderecos' })
export class Endereco {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  cep: string;

  @Column()
  logradouro: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  localidade: string;

  @Column()
  uf: string;
}
