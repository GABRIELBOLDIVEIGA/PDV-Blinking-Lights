import { IsEnum } from 'class-validator';
import { StatusComanda } from '../enums/StatusComanda';
import { FormaPagamento } from '../enums/FormaPagamento';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateComandaDto {
  @ApiProperty({ type: 'enum', example: StatusComanda })
  @IsEnum(StatusComanda)
  status: StatusComanda;

  @ApiProperty({ type: 'enum', example: FormaPagamento })
  @IsEnum(FormaPagamento)
  forma_pagamento: FormaPagamento;
}
