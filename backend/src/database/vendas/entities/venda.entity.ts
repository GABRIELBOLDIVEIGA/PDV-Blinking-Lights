import { Cliente } from 'src/database/clientes/entities/cliente.entity';
import { VendaProduto } from 'src/database/common/entities/venda_produto.entity';
import { FormaDePagamento } from 'src/database/forma-de-pagamento/entities/forma-de-pagamento.entity';
import { StatusDaVenda } from 'src/database/status-da-venda/entities/status-da-venda.entity';
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
} from 'typeorm';

@Entity({ name: 'vendas' })
export class Venda {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint', nullable: false })
  parcelas: number;

  @Column({ type: 'varchar', nullable: false })
  observacoes: string;

  @Column({ type: 'double', nullable: false })
  valor_total: number;

  @Column({ type: 'double', nullable: false })
  desconto: number;

  @Column({ type: 'double', nullable: false })
  valor_pago: number;

  @ManyToOne(() => Usuario, (usuario) => usuario)
  usuario: Usuario;

  @ManyToOne(() => Cliente, (cliente) => cliente)
  cliente: Cliente;

  @ManyToOne(() => StatusDaVenda, (status) => status)
  status: StatusDaVenda;

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
