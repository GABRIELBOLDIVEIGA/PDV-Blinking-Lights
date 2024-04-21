import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty({
    description: 'Cep.',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'Logradouro.',
  })
  @IsString()
  logradouro: string;

  @ApiProperty({
    description: 'Complemento.',
  })
  @IsString()
  complemento: string;

  @ApiProperty({
    description: 'Bairro.',
  })
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Localidade.',
  })
  @IsString()
  localidade: string;

  @ApiProperty({
    description: 'UF.',
  })
  @IsString()
  uf: string;
}
