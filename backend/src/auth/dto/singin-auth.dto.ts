import { IsEmail, IsString } from 'class-validator';

export class SinginAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  senha: string;
}
