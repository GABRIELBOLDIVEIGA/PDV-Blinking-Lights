import { Endereco } from 'src/enderecos/entities/endereco.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity({ name: 'cliente_endereco' })
export class ClienteEndereco {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;

  @OneToOne(() => Endereco, (endereco) => endereco, { onDelete: 'CASCADE' })
  @JoinColumn()
  endereco: Endereco;
}
