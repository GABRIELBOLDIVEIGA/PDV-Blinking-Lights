import { Module } from '@nestjs/common';
import { StatusdavendaService } from './status-da-venda.service';
import { StatusdavendaController } from './status-da-venda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusDaVenda } from './entities/status-da-venda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusDaVenda])],
  controllers: [StatusdavendaController],
  providers: [StatusdavendaService],
})
export class StatusDavendaModule {}
