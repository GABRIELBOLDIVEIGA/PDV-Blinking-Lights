import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FormaDePagamento } from '../forma-de-pagamento/entities/forma-de-pagamento.entity';
import { StatusDaVenda } from '../status-da-venda/entities/status-da-venda.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venda,
      Cliente,
      Usuario,
      FormaDePagamento,
      StatusDaVenda,
    ]),
  ],
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}
