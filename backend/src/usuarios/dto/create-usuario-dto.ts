import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Permissao } from 'src/typeorm/entities/Usuario';

export class CreateUsuarioDto {
  @IsEnum(Permissao)
  permissao: string;

  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;
}
