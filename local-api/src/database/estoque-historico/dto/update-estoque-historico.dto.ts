import { PartialType } from '@nestjs/swagger';
import { CreateEstoqueHistoricoDto } from './create-estoque-historico.dto';

export class UpdateEstoqueHistoricoDto extends PartialType(CreateEstoqueHistoricoDto) {}
