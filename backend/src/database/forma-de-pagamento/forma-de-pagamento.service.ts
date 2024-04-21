import { Injectable } from '@nestjs/common';
import { CreateFormaDePagamentoDto } from './dto/create-forma-de-pagamento.dto';
import { UpdateFormaDePagamentoDto } from './dto/update-forma-de-pagamento.dto';

@Injectable()
export class FormaDePagamentoService {
  create(createFormaDePagamentoDto: CreateFormaDePagamentoDto) {
    return 'This action adds a new formaDePagamento';
  }

  findAll() {
    return `This action returns all formaDePagamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formaDePagamento`;
  }

  update(id: number, updateFormaDePagamentoDto: UpdateFormaDePagamentoDto) {
    return `This action updates a #${id} formaDePagamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} formaDePagamento`;
  }
}
