import { ClienteEndereco } from 'src/database/common/entities/cliente_endereco.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @OneToMany(
    () => ClienteEndereco,
    (cliente_endereco) => cliente_endereco.cliente,
  )
  enderecos: ClienteEndereco[];
}
