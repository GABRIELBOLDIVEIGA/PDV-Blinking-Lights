import { Endereco } from 'src/enderecos/entities/endereco.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Permissao {
  DEV = 'DEV',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'enum',
    enum: Permissao,
    default: Permissao.USER,
  })
  permissao: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @OneToOne(() => Endereco, (endereco) => endereco, { onDelete: 'SET NULL' })
  @JoinColumn()
  endereco: Endereco;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
