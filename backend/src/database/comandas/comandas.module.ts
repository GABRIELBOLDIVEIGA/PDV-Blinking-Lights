import { Module } from '@nestjs/common';
import { ComandasService } from './comandas.service';
import { ComandasController } from './comandas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comanda } from './entities/comanda.entity';
import { ComandaRepository } from './comanda.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comanda])],
  controllers: [ComandasController],
  providers: [ComandasService, ComandaRepository],
})
export class ComandasModule {}