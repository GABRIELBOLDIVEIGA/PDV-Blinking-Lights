import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from './entities/estoque.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { ProdutoCategoria } from '../common/entities/produto_categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class EstoqueModule {}
