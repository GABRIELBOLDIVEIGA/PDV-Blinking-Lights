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
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiTags } from '@nestjs/swagger';
import { Produto } from './entities/produto.entity';
import { CreateProdutoParams } from './types/CreateProdutoParams';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto_params: CreateProdutoParams = { ...createProdutoDto };
    const categorias = createProdutoDto.categorias;

    return this.produtosService.create(produto_params, categorias);
  }

  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtosService.findOne(id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateProdutoDto: UpdateProdutoDto,
  // ): Promise<Produto> {
  //   return this.produtosService.update(id, updateProdutoDto);
  // }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.produtosService.remove(id);
  }
}
