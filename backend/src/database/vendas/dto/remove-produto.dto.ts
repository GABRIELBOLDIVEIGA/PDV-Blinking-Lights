import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveProdutoDto {
  @ApiProperty({
    description: 'ID da Venda.',
    example: 1,
  })
  @IsNumber()
  venda_id: number;

  @ApiProperty({
    description: 'ID do Produto.',
    example: 1,
  })
  @IsNumber()
  produto_id: number;
}
