import { ApiProperty } from '@nestjs/swagger';
import { Movimento } from '../entities/estoque.entity';
import { IsEnum } from 'class-validator';

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
}
