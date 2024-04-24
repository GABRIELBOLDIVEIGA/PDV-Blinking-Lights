import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SubCategoriasService } from './sub-categorias.service';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';
import { SubCategoria } from './entities/sub-categoria.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sub-Categorias')
@Controller('sub-categoria')
export class SubCategoriasController {
  constructor(private readonly subCategoriasService: SubCategoriasService) {}

  @Post()
  async create(
    @Body() createSubCategoriaDto: CreateSubCategoriaDto,
  ): Promise<SubCategoria> {
    return this.subCategoriasService.create(createSubCategoriaDto);
  }

  @Get()
  async findAll(): Promise<SubCategoria[]> {
    return this.subCategoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SubCategoria> {
    return this.subCategoriasService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubCategoriaDto: UpdateSubCategoriaDto,
  ) {
    return this.subCategoriasService.update(id, updateSubCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoriasService.remove(id);
  }
}
