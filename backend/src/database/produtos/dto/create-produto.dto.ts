import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do Produto.' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Descrição do Produto.' })
  @IsString()
  descricao: string;

  @ApiProperty({ description: 'Preço de venda do Produto.', example: 10.35 })
  @IsNumber()
  @Min(0)
  preco_venda: number;

  @ApiProperty({
    description: 'Categorias do Produto.',
    example: [1, 2, 3, 4, 5],
  })
  @IsArray()
  categorias: number[];
}
