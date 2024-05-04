import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthPixDTO {
  @IsNotEmpty()
  @IsString()
  readonly access_token: string;

  @IsNotEmpty()
  @IsString()
  readonly token_type: string;

  @IsNumber()
  readonly expires_in: number;

  @IsNotEmpty()
  @IsString()
  readonly scope: string;
}
