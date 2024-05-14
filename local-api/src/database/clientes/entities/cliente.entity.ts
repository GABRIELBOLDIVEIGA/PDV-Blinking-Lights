import { ClienteEndereco } from 'src/database/enderecos/entities/cliente_endereco.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  documento: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  email: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  tel1: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  tel2: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  tel3: string;

  @OneToMany(
    () => ClienteEndereco,
    (cliente_endereco) => cliente_endereco.cliente,
  )
  enderecos: ClienteEndereco[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  nameToUpperCase() {
    this.nome = this.nome.toLowerCase();
    this.email = this.email.toLowerCase();
  }
}
