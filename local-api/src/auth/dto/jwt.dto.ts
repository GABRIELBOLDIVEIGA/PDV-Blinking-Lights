import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Permissao } from 'src/database/usuarios/enums/Permissao';

export class JwtDTO {
  @IsNumber()
  readonly sub: number;

  @IsNotEmpty()
  @IsString()
  readonly nome: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsEnum(Permissao)
  readonly permissao: Permissao;

  @IsNumber()
  readonly iat: number;
}
