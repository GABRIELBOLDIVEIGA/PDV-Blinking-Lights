import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FormaDePagamento } from '../forma-de-pagamento/entities/forma-de-pagamento.entity';
import { Mesa } from '../mesas/entities/mesa.entity';
import { VendaProduto } from './entities/venda_produto.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { SubCategoria } from '../sub-categorias/entities/sub-categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venda,
      Cliente,
      Mesa,
      Usuario,
      FormaDePagamento,
      VendaProduto,
      Produto,
    ]),
  ],
  controllers: [VendasController],
  providers: [VendasService],
  exports: [VendasService],
})
export class VendasModule {}
