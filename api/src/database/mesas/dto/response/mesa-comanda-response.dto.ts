import { Exclude, Expose, Type } from 'class-transformer';
import { ProdutoWrapperResponseDto } from './produto-wrapper-response.dto';

export class MesaComandaResponseDto {
  @Expose()
  id: number;

  @Expose()
  codigo: string;

  @Expose()
  status: string;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string | null;

  @Expose()
  @Type(() => ProdutoWrapperResponseDto)
  produtos: ProdutoWrapperResponseDto[];
}
