import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVendaDto {
  @ApiProperty({
    description: 'ID do Cliente.',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  cliente_id: number | null;

  @ApiProperty({
    description: 'ID do Usuario.',
    example: 1,
  })
  @IsNumber()
  usuario_id: number;

  @ApiProperty({
    description: 'ID da Forma de pagamento.',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  forma_de_pagamento_id: number;

  @ApiProperty({
    description: 'ID do Status da venda.',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  status_da_venda_id: number;

  @ApiProperty({
    description: 'Parcelas.',
    example: 3,
  })
  @IsNumber()
  parcelas: number;

  @ApiProperty({
    description: 'Observações.',
    example: 'Observações.',
  })
  @IsString()
  observacoes: string;

  @ApiProperty({
    description: 'Valor Total.',
    example: 56.2,
  })
  @IsNumber()
  valor_total: number;

  @ApiProperty({
    description: 'Desconto.',
    example: 6.32,
  })
  @IsNumber()
  desconto: number;

  @ApiProperty({
    description: 'Valor Pago.',
    example: 49.88,
  })
  @IsNumber()
  valor_pago: number;
}
