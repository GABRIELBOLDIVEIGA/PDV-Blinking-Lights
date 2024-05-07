import { Exclude, Expose, Type } from 'class-transformer';
import { MesaComandaResponseDto } from './mesa-comanda-response.dto';
import { ProdutoWrapperResponseDto } from './produto-wrapper-response.dto';

class ComandaMesaDto {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  disponivel: boolean;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string | null;
}

class ComandaResposeDto {
  @Expose()
  id: number;

  @Expose()
  codigo: string;

  @Expose()
  status: string;

  @Expose()
  total: number;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string | null;

  @Expose()
  @Type(() => ProdutoWrapperResponseDto)
  produtos: ProdutoWrapperResponseDto[];

  @Expose()
  @Type(() => ComandaMesaDto)
  mesa: ComandaMesaDto;
}

export class FecharMesaResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ComandaResposeDto)
  comanda: ComandaResposeDto;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
