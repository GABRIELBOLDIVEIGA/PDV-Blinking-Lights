import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Código do Produto.', example: 'A' })
  @IsString()
  codigo: string;

  @ApiProperty({ description: 'Nome do Produto.', example: 'Produto A' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Descrição do Produto.', example: 'Prod. A' })
  @IsString()
  descricao: string;

  @ApiProperty({ description: 'Preço de venda do Produto.', example: 10.35 })
  @IsNumber()
  @Min(0)
  preco_venda: number;

  @ApiProperty({ description: 'Custo de compra do Produto.', example: 8.95 })
  @IsNumber()
  @Min(0)
  preco_compra: number;

  @ApiProperty({
    description: 'Categorias do Produto.',
    example: [1, 2, 3],
    default: [],
  })
  @IsArray()
  categorias: number[];

  @ApiProperty({
    description: 'Sub-Categorias do Produto.',
    example: [1, 2],
    default: [],
  })
  @IsArray()
  subCategorias: number[];

  @ApiProperty({
    description: 'Fornecedores.',
    nullable: true,
    example: [1, 2],
    default: [],
  })
  @IsArray()
  fornecedores: number[];
}
