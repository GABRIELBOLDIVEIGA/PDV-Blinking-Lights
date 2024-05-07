import { Exclude, Expose, Type } from 'class-transformer';
import { MesaComandaResponseDto } from './mesa-comanda-response.dto';

export class MesaResponseDto {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  disponivel: boolean;

  @Type(() => MesaComandaResponseDto)
  comanda: MesaComandaResponseDto;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
