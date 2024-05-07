import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { MesaComanda } from './mesa_comanda.entity';
import { Comanda } from 'src/database/comandas/entities/comanda.entity';

@Entity({ name: 'mesas' })
@Unique('comanda-id', ['comanda'])
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
  disponivel: boolean;

  @ManyToOne(() => Comanda, (comanda) => comanda, { nullable: true })
  comanda: Comanda;

  @OneToMany(() => MesaComanda, (mesa_produto) => mesa_produto.mesa)
  comandas: MesaComanda[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
