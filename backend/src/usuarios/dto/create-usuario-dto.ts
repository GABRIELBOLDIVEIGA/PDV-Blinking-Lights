import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Permissao } from 'src/typeorm/entities/Usuario';

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
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário.',
  })
  @IsString()
  senha: string;
}
