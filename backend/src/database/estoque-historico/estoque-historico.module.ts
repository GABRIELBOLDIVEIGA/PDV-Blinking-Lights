import { Module } from '@nestjs/common';
import { EstoqueHistoricoService } from './estoque-historico.service';
import { EstoqueHistoricoController } from './estoque-historico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueHistorico } from './entities/estoque-historico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueHistorico])],
  controllers: [EstoqueHistoricoController],
  providers: [EstoqueHistoricoService],
})
export class EstoqueHistoricoModule {}
