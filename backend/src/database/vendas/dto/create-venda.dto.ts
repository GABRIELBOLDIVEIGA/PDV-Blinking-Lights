import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusDaVenda } from '../enums/StatusDaVenda';

export class CreateVendaDto {
  @ApiProperty({
    description: 'ID do Cliente.',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  cliente_id: number | null;

  @ApiProperty({
    enum: StatusDaVenda,
    isArray: true,
    example: `"${StatusDaVenda.ABERTO} | ${StatusDaVenda.FIADO} | ${StatusDaVenda.CANCELADA} | ${StatusDaVenda.FINALIZADA}"`,
    description: 'Status Da Venda',
    default: StatusDaVenda.ABERTO,
  })
  @IsEnum(StatusDaVenda)
  status: string;

  @ApiProperty({
    description: 'ID do Mesa.',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  mesa_id: number | null;

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
