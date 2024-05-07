import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Mesa } from './mesa.entity';
import { Comanda } from 'src/database/comandas/entities/comanda.entity';

@Entity({ name: 'mesa_comanda' })
@Unique('mesa_comanda', ['mesa', 'comanda'])
export class MesaComanda {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Comanda, (comanda) => comanda.id, { nullable: false })
  comanda: Comanda;

  @ManyToOne(() => Mesa, (mesa) => mesa.id, { nullable: false })
  mesa: Mesa;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
