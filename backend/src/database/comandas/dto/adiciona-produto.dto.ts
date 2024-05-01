import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';

class ProdutosDto {
  @IsInt()
  @Min(1)
  produto_id: number;

  @IsInt()
  @Min(1)
  quantidade: number;
}

export class AdicionaProdutoDto {
  @ApiProperty({ type: 'number', description: 'Mesa ID', example: 1 })
  @IsInt()
  @Min(1)
  mesa_id: number;

  @ApiProperty({ type: 'number', description: 'Mesa ID', example: 1 })
  @IsInt()
  @Min(1)
  comanda_id: number;

  @ApiProperty({
    type: 'array',
    description: 'Lista com ID e Quantidade de produto.',
    example: [
      { produto_id: 1, quantidade: 3 },
      { produto_id: 2, quantidade: 1 },
      { produto_id: 3, quantidade: 2 },
    ],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ProdutosDto)
  prods: ProdutosDto[];
}
