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
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { ApiTags } from '@nestjs/swagger';
import { Estoque } from './entities/estoque.entity';

@ApiTags('Estoque')
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post()
  async create(@Body() createEstoqueDto: CreateEstoqueDto): Promise<Estoque> {
    return this.estoqueService.create(createEstoqueDto);
  }

  @Get()
  async findAll(): Promise<Estoque[]> {
    return this.estoqueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Estoque> {
    return this.estoqueService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstoqueDto: UpdateEstoqueDto,
  ) {
    return this.estoqueService.update(id, updateEstoqueDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.estoqueService.remove(id);
  }
}
