import { Module } from '@nestjs/common';
import { EstoqueHistoricoService } from './estoque-historico.service';
import { EstoqueHistoricoController } from './estoque-historico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueHistorico } from './entities/estoque-historico.entity';
import { VendaProdutoSubscriber } from './subscribers/venda-produto.subscriber';
import { Estoque } from '../estoque/entities/estoque.entity';
import { VendaProduto } from '../vendas/entities/venda_produto.entity';
import { Produto } from '../produtos/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstoqueHistorico,
      Estoque,
      VendaProduto,
      Produto,
    ]),
  ],
  controllers: [EstoqueHistoricoController],
  providers: [EstoqueHistoricoService, VendaProdutoSubscriber],
})
export class EstoqueHistoricoModule {}
