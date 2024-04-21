import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoCategoria } from './entities/produto-categoria.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, ProdutoCategoria, Categoria])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
