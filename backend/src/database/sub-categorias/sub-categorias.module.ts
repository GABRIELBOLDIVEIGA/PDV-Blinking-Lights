import { Module } from '@nestjs/common';
import { SubCategoriasService } from './sub-categorias.service';
import { SubCategoriasController } from './sub-categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoria])],
  controllers: [SubCategoriasController],
  providers: [SubCategoriasService],
})
export class SubCategoriasModule {}
