import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty({
    description: 'Cep.',
    example: '01001-000',
    default: '',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'Logradouro.',
    example: 'Praça da Sé',
    default: '',
  })
  @IsString()
  logradouro: string;

  @ApiProperty({
    description: 'Complemento.',
    example: 'lado ímpar',
    default: '',
  })
  @IsString()
  complemento: string;

  @ApiProperty({
    description: 'Bairro.',
    example: 'Sé',
    default: '',
  })
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Localidade.',
    example: 'São Paulo',
    default: '',
  })
  @IsString()
  localidade: string;

  @ApiProperty({
    description: 'UF.',
    example: 'SP',
    default: '',
  })
  @IsString()
  uf: string;
}
