import { Cliente } from 'src/database/clientes/entities/cliente.entity';
import { VendaProduto } from 'src/database/vendas/entities/venda_produto.entity';
import { FormaDePagamento } from 'src/database/forma-de-pagamento/entities/forma-de-pagamento.entity';
import { Mesa } from 'src/database/mesas/entities/mesa.entity';
import { Usuario } from 'src/database/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';
import { StatusDaVenda } from '../enums/StatusDaVenda';

@Entity({ name: 'vendas' })
export class Venda {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  parcelas: number;

  @Column({ type: 'varchar', nullable: false, default: '' })
  observacoes: string;

  @Column({ type: 'double', nullable: false, default: 0 })
  valor_total: number;

  @Column({ type: 'double', nullable: false, default: 0 })
  desconto: number;

  @Column({ type: 'double', nullable: false, default: 0 })
  valor_pago: number;

  @ManyToOne(() => Usuario, (usuario) => usuario, { nullable: false })
  usuario: Usuario;

  @ManyToOne(() => Cliente, (cliente) => cliente)
  cliente: Cliente;

  @ManyToOne(() => Mesa, (mesa) => mesa)
  mesa: Mesa;

  @Column({
    type: 'enum',
    enum: StatusDaVenda,
    default: StatusDaVenda.ABERTO,
  })
  status: string;

  @ManyToOne(() => FormaDePagamento, (formaDePagamento) => formaDePagamento)
  formaDePagamento: FormaDePagamento;

  @OneToMany(() => VendaProduto, (produto_venda) => produto_venda.venda)
  produtos: VendaProduto[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
