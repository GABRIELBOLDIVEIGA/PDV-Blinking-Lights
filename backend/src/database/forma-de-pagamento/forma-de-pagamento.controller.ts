import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormaDePagamentoService } from './forma-de-pagamento.service';
import { CreateFormaDePagamentoDto } from './dto/create-forma-de-pagamento.dto';
import { UpdateFormaDePagamentoDto } from './dto/update-forma-de-pagamento.dto';

@Controller('forma-de-pagamento')
export class FormaDePagamentoController {
  constructor(private readonly formaDePagamentoService: FormaDePagamentoService) {}

  @Post()
  create(@Body() createFormaDePagamentoDto: CreateFormaDePagamentoDto) {
    return this.formaDePagamentoService.create(createFormaDePagamentoDto);
  }

  @Get()
  findAll() {
    return this.formaDePagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formaDePagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormaDePagamentoDto: UpdateFormaDePagamentoDto) {
    return this.formaDePagamentoService.update(+id, updateFormaDePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formaDePagamentoService.remove(+id);
  }
}
