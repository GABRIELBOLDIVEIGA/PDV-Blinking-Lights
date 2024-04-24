import { Cliente } from 'src/database/clientes/entities/cliente.entity';
import { Endereco } from 'src/database/enderecos/entities/endereco.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
