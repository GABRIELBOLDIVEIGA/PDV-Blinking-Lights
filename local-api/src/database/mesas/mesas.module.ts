import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { MesaComanda } from './entities/mesa_comanda.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { VendasModule } from '../vendas/vendas.module';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { MesaGateway } from './mesas.gateway';
import { Comanda } from '../comandas/entities/comanda.entity';
import { ComandaRepository } from '../comandas/comanda.repository';
import { MesaRepository } from './mesa.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mesa, MesaComanda, Produto, Usuario, Comanda]),
    VendasModule,
  ],
  controllers: [MesasController],
  providers: [
    MesasService,
    JwtService,
    MesaGateway,
    ComandaRepository,
    MesaRepository,
  ],
  exports: [MesasService],
})
export class MesasModule {}
