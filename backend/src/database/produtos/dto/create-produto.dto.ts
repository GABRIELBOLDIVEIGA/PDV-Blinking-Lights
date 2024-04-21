import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

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
}
