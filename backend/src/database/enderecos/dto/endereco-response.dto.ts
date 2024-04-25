import { Exclude } from 'class-transformer';

export class EnderecoResponseDto {
  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
