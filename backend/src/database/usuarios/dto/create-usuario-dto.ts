import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Permissao } from '../enums/Permissao';

export class CreateUsuarioDto {
  @ApiProperty({
    enum: Permissao,
    isArray: true,
    example: [Permissao.USER, Permissao.ADMIN, Permissao.DEV],
    description: 'Permissão do usuário.',
  })
  @IsEnum(Permissao)
  permissao: string;

  @ApiProperty({
    description: 'Nome do usuário.',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'email@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário.',
  })
  @IsString()
  senha: string;

  @ApiProperty({
    description: 'ID do Endereço do usuário.',
  })
  @IsOptional()
  @IsNumber()
  endereco: number;
}
