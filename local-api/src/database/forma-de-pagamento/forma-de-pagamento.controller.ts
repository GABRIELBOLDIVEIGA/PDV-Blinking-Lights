import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormaDePagamentoService } from './forma-de-pagamento.service';
import { CreateFormaDePagamentoDto } from './dto/create-forma-de-pagamento.dto';
import { UpdateFormaDePagamentoDto } from './dto/update-forma-de-pagamento.dto';
import { ApiTags } from '@nestjs/swagger';
import { FormaDePagamento } from './entities/forma-de-pagamento.entity';

@ApiTags('Formas de pagamentos')
@Controller('forma-de-pagamento')
export class FormaDePagamentoController {
  constructor(
    private readonly formaDePagamentoService: FormaDePagamentoService,
  ) {}

  @Post()
  async create(
    @Body() createFormaDePagamentoDto: CreateFormaDePagamentoDto,
  ): Promise<FormaDePagamento> {
    return this.formaDePagamentoService.create(createFormaDePagamentoDto);
  }

  @Get()
  async findAll(): Promise<FormaDePagamento[]> {
    return this.formaDePagamentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FormaDePagamento> {
    return this.formaDePagamentoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormaDePagamentoDto: UpdateFormaDePagamentoDto,
  ): Promise<FormaDePagamento> {
    return this.formaDePagamentoService.update(+id, updateFormaDePagamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.formaDePagamentoService.remove(+id);
  }
}
