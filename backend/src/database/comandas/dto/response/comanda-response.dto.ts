import { Exclude, Expose, Type } from 'class-transformer';
import { MesaResponseDto } from './mesa-response.dto';
import { ProdutoWrapperResponseDto } from './produto-wrapper-response.dto';
import { FormaPagamento } from '../../enums/FormaPagamento';
import { StatusComanda } from '../../enums/StatusComanda';

export class ComandaResponseDto {
  @Expose()
  id: number;

  @Expose()
  codigo: string;

  @Expose()
  status: StatusComanda;

  @Expose()
  forma_pagamento: FormaPagamento;

  @Type(() => ProdutoWrapperResponseDto)
  produtos: ProdutoWrapperResponseDto[];

  @Expose()
  @Type(() => MesaResponseDto)
  mesa: MesaResponseDto;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
