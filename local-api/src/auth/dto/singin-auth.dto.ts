import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SinginAuthDto {
  @ApiProperty({ type: 'string', example: 'email@email.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', example: '123456', required: true })
  @IsString()
  senha: string;
}
