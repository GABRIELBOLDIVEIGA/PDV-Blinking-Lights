import { ApiProperty } from '@nestjs/swagger';

import { IsNumber } from 'class-validator';

export class CreateEstoqueDto {
  @ApiProperty({ type: 'number', description: 'Quantidade de itens.' })
  @IsNumber()
  quantidade: number;

  @ApiProperty({ type: 'number', description: 'ID do produto.' })
  @IsNumber()
  produto_id: number;
}
