import { Comanda } from 'src/database/comandas/entities/comanda.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'comanda_produtos' })
export class ComandaProduto {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Comanda, (comanda) => comanda.id, { nullable: false })
  comanda: Comanda;

  @ManyToOne(() => Produto, (produto) => produto.id, { nullable: false })
  produto: Produto;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
