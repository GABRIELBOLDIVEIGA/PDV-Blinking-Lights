import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstoqueHistoricoService } from './estoque-historico.service';
import { CreateEstoqueHistoricoDto } from './dto/create-estoque-historico.dto';
import { UpdateEstoqueHistoricoDto } from './dto/update-estoque-historico.dto';
import { EstoqueHistorico } from './entities/estoque-historico.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estoque Historico')
@Controller('estoque-historico')
export class EstoqueHistoricoController {
  constructor(
    private readonly estoqueHistoricoService: EstoqueHistoricoService,
  ) {}

  @Post()
  create(@Body() createEstoqueHistoricoDto: CreateEstoqueHistoricoDto) {
    return this.estoqueHistoricoService.create(createEstoqueHistoricoDto);
  }

  @Get()
  findAll(): Promise<EstoqueHistorico[]> {
    return this.estoqueHistoricoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estoqueHistoricoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstoqueHistoricoDto: UpdateEstoqueHistoricoDto,
  ) {
    return this.estoqueHistoricoService.update(+id, updateEstoqueHistoricoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estoqueHistoricoService.remove(+id);
  }
}
