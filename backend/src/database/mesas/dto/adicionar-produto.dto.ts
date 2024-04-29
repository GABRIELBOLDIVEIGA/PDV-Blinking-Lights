import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

class ProdutoEQuantidadeDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  produto_id: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @Min(1)
  quantidade: number;
}

export class AdicionarProdutoDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  mesa_id: number;

  @ApiProperty({
    type: Array<ProdutoEQuantidadeDto>,
    example: [
      { produto_id: 1, quantidade: 1 },
      { produto_id: 2, quantidade: 2 },
      { produto_id: 3, quantidade: 3 },
      { produto_id: 4, quantidade: 4 },
      { produto_id: 5, quantidade: 5 },
      { produto_id: 6, quantidade: 6 },
      { produto_id: 7, quantidade: 7 },
      { produto_id: 8, quantidade: 8 },
      { produto_id: 9, quantidade: 9 },
      { produto_id: 10, quantidade: 10 },
    ],
  })
  @Type(() => ProdutoEQuantidadeDto)
  prods: ProdutoEQuantidadeDto[];

  // @ApiProperty({ type: 'number', example: 1 })
  // @IsNumber()
  // produto_id: number;

  // @ApiProperty({ type: 'number', example: 1 })
  // @IsNumber()
  // @Min(1)
  // quantidade: number;
}
