import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from './entities/estoque.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { ProdutoSubscriber } from './subscribers/produto.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque, Produto])],
  controllers: [EstoqueController],
  providers: [EstoqueService, ProdutoSubscriber],
})
export class EstoqueModule {}
