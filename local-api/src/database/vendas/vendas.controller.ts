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
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdicionaProdutoDto } from './dto/adiciona-produto.dto';
import { RemoveProdutoDto } from './dto/remove-produto.dto';
import { CreateVendaParams } from './types/create-venda.params';
import { UpdateVendaParams } from './types/update-venda.params';

@ApiTags('Vendas')
@Controller('venda')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  async create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
  }

  @Post('adiciona-produto')
  async adiconarProduto(@Body() adicionaProdutoDto: AdicionaProdutoDto) {
    return this.vendasService.adiconarProduto(adicionaProdutoDto);
  }

  @Post('remove-produto')
  async removeProduto(@Body() removeProduto: RemoveProdutoDto) {
    return this.vendasService.removeProduto(
      removeProduto.venda_id,
      removeProduto.produto_id,
    );
  }

  @Get('total-de-itens-vendidos')
  async totalDeItensVendidos() {
    return this.vendasService.totalDeItensVendidos();
  }

  @Get()
  async findAll() {
    return this.vendasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vendasService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVendaDto: UpdateVendaDto,
  ) {
    const updateVendaParams: UpdateVendaParams = updateVendaDto;
    return this.vendasService.update(id, updateVendaParams);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.vendasService.remove(id);
  }
}
