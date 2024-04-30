import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { MesaProduto } from './entities/mesa_produto.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { VendasModule } from '../vendas/vendas.module';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import { MesaGateway } from './mesas.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mesa, MesaProduto, Produto, Usuario]),
    VendasModule,
  ],
  controllers: [MesasController],
  providers: [MesasService, JwtService, MesaGateway],
  exports: [MesasService],
})
export class MesasModule {}
