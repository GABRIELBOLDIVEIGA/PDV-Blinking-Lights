import { Endereco } from 'src/database/enderecos/entities/endereco.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClienteEndereco } from '../../enderecos/entities/cliente_endereco.entity';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  nome: string;

  @OneToMany(
    () => ClienteEndereco,
    (cliente_endereco) => cliente_endereco.cliente,
  )
  enderecos: ClienteEndereco[];
}