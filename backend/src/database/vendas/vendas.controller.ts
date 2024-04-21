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

@ApiTags('Vendas')
@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  async create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.create(createVendaDto);
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
    return this.vendasService.update(id, updateVendaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.vendasService.remove(id);
  }
}
