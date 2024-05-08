import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  readonly iat: number;
}
