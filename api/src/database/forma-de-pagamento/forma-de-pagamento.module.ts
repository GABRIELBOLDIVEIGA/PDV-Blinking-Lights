import { Module } from '@nestjs/common';
import { FormaDePagamentoService } from './forma-de-pagamento.service';
import { FormaDePagamentoController } from './forma-de-pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaDePagamento } from './entities/forma-de-pagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormaDePagamento])],
  controllers: [FormaDePagamentoController],
  providers: [FormaDePagamentoService],
})
export class FormaDePagamentoModule {}
