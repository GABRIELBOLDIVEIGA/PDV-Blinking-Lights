import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MesaProduto } from './mesa_produto.entity';

@Entity({ name: 'mesas' })
export class Mesa {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'Sem Nome',
    unique: true,
  })
  nome: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  aberta: boolean;

  @OneToMany(() => MesaProduto, (mesa_produto) => mesa_produto.mesa)
  produtos: MesaProduto[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
