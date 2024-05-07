import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class AdicionaProdutoDto {
  @ApiProperty({
    description: 'Quantidade de itens.',
    example: 1,
  })
  @IsNumber()
  @Min(0)
  quantidade: number;

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
