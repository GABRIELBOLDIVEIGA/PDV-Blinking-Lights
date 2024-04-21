import { PartialType } from '@nestjs/swagger';
import { CreateFormaDePagamentoDto } from './create-forma-de-pagamento.dto';

export class UpdateFormaDePagamentoDto extends PartialType(CreateFormaDePagamentoDto) {}
