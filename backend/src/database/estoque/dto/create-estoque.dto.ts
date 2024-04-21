import { ApiProperty } from '@nestjs/swagger';
import { Movimento } from '../entities/estoque.entity';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateEstoqueDto {
  @ApiProperty({
    enum: Movimento,
    isArray: true,
    example: [
      Movimento.ENTRADA,
      Movimento.SAIDA,
      Movimento.DEFEITO,
      Movimento.VENCIDO,
    ],
    description: 'Movimento do estoque.',
  })
  @IsEnum(Movimento)
  movimento: string;

  @ApiProperty({ type: 'number', description: 'Quantidade de itens.' })
  @IsNumber()
  quantidade: number;

  @ApiProperty({ type: 'number', description: 'Custo unitario.' })
  @IsNumber()
  custo_unitario: number;

  @ApiProperty({ type: 'number', description: 'Custo total.' })
  @IsNumber()
  custo_total: number;

  @ApiProperty({ type: 'number', description: 'ID do produto.' })
  @IsNumber()
  produto_id: number;
}
