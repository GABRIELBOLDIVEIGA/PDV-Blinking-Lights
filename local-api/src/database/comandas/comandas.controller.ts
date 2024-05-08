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
import { ComandasService } from './comandas.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ComandaResponseDto } from './dto/response/comanda-response.dto';
import { AdicionaProdutoDto } from './dto/adiciona-produto.dto';
import { MesaGateway } from '../mesas/mesas.gateway';

@ApiTags('Comandas')
@Controller('comandas')
export class ComandasController {
  constructor(
    private readonly comandasService: ComandasService,
    private readonly mesaGateway: MesaGateway,
  ) {}

  @Post('adicionar-produtos')
  async adicionarProduto(
    @Body() adicionaProdutoDto: AdicionaProdutoDto,
  ): Promise<string> {
    const response =
      await this.comandasService.adicionarProduto(adicionaProdutoDto);
    if (response) {
      this.mesaGateway.atualizaProdutosMesa();
    }
    return response;
  }

  @Patch('remover-produto/:id')
  async removerProduto(@Param('id', ParseIntPipe) id: number) {
    const response = await this.comandasService.removerProduto(id);
    if (response) this.mesaGateway.atualizaProdutosMesa();
    return response;
  }

  @Patch('restaurar-produto/:id')
  async restaurarProduto(@Param('id', ParseIntPipe) id: number) {
    const response = await this.comandasService.restaurarProduto(id);
    if (response) this.mesaGateway.atualizaProdutosMesa();
    return response;
  }

  @Get()
  findAll() {
    return this.comandasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const comanda = this.comandasService.findOne(+id);
    return plainToInstance(ComandaResponseDto, comanda);
  }
  @Get('by-code/:codigo')
  findOneByCode(@Param('codigo') codigo: string) {
    return this.comandasService.findOneByCode(codigo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComandaDto: UpdateComandaDto) {
    return this.comandasService.update(+id, updateComandaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comandasService.remove(+id);
  }
}
