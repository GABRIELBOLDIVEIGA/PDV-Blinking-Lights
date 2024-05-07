import { ApiProperty } from '@nestjs/swagger';
import { Movimento } from '../enums/Movimento';
import { IsEnum } from 'class-validator';

export class CreateEstoqueHistoricoDto {
  @ApiProperty({ type: 'number', example: 1 })
  estoque: number;

  @ApiProperty({
    enum: Movimento,
    isArray: true,
    example: `"${Movimento.ENTRADA} | ${Movimento.SAIDA}"`,
    default: Movimento.ENTRADA,
  })
  @IsEnum(Movimento)
  movimento: string;

  @ApiProperty({ type: 'number', example: 1 })
  quantidade: number;

  @ApiProperty({ type: 'string', example: 'ABC' })
  codigo: string;

  @ApiProperty({ type: 'string', example: 'ABC' })
  nome: string;

  @ApiProperty({ type: 'string', example: 'ABC' })
  descricao: string;

  @ApiProperty({ type: 'number', example: 1 })
  preco_compra: number;

  @ApiProperty({ type: 'number', example: 1 })
  preco_venda: number;
}
