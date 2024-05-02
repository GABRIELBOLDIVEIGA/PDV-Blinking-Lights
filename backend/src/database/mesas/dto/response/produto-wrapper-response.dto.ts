import { Exclude, Expose, Type } from 'class-transformer';
import { ProdutoResponseDto } from './produto-respose.dto';

export class ProdutoWrapperResponseDto {
  @Expose()
  id: number;

  @Expose()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Expose()
  deleted_at: string | null;

  @Expose()
  @Type(() => ProdutoResponseDto)
  produto: ProdutoResponseDto;
}
