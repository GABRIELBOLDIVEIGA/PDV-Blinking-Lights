import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateEstoqueDto {
  @ApiProperty({ type: 'number', description: 'Quantidade de itens.' })
  @IsNumber()
  quantidade: number;

  @ApiProperty({ type: 'number', description: 'ID do produto.' })
  @IsNumber()
  produto_id: number;

  @ApiProperty({ type: 'number', description: 'Custo do produto.' })
  @IsNumber()
  preco_compra: number;

  @ApiProperty({ type: 'number', description: 'Preço de produto.' })
  @IsNumber()
  preco_venda: number;

  @ApiProperty({ type: 'number', description: 'Quantidade minima.' })
  @IsNumber()
  quantidade_min: number;
}
