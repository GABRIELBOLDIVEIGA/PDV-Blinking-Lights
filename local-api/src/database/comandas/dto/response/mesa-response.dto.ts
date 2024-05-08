import { Exclude, Expose } from 'class-transformer';

export class MesaResponseDto {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  aberta: boolean;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string | null;
}
