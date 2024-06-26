import { Module } from '@nestjs/common';
import { ComandasService } from './comandas.service';
import { ComandasController } from './comandas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';
import { ComandaRepository } from './comanda.repository';
import { Mesa } from '../mesas/entities/mesa.entity';
import { MesaGateway } from '../mesas/mesas.gateway';
import { ComandaProduto } from './entities/comanda_produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comanda, Mesa, ComandaProduto])],
  controllers: [ComandasController],
  providers: [ComandasService, ComandaRepository, MesaGateway],
})
export class ComandasModule {}
