import { Exclude, Type } from 'class-transformer';
import { EnderecoResponseDto } from 'src/database/enderecos/dto/endereco-response.dto';

export class UsuarioResponseDto {
  @Exclude()
  senha: string;

  @Type(() => EnderecoResponseDto)
  endereco: EnderecoResponseDto;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
