import { Exclude, Expose, Type } from 'class-transformer';
import { ProdutoResponseDto } from './produto-respose.dto';

export class ProdutoWrapperResponseDto {
  @Exclude()
  id: number;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: null;

  @Expose()
  @Type(() => ProdutoResponseDto)
  produto: ProdutoResponseDto;
}
