import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { ProdutoCategoria } from '../common/entities/produto_categoria.entity';
import { Estoque } from '../estoque/entities/estoque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, ProdutoCategoria, Categoria])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}
