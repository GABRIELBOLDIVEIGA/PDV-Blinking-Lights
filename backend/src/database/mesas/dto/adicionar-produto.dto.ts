import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AdicionarProdutoDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  produto_id: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  mesa_id: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  quantidade: number;
}
