import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { SubCategoria } from '../sub-categorias/entities/sub-categoria.entity';
import { CategoriaSubCategoria } from './entities/categoria_subcategoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, SubCategoria, CategoriaSubCategoria]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
