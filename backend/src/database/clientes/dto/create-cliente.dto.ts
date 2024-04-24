import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome do Cliente',
    example: 'Cliente 1',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Documento do Cliente',
    example: '122.345.678-90',
  })
  @IsString()
  @IsOptional()
  documento: string;

  @ApiProperty({
    description: 'E-mail do Cliente',
    example: 'cliente@email.com',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Telene 1 do Cliente',
    example: '(00) 0 0000-0000',
  })
  @IsString()
  @IsOptional()
  tel1: string;

  @ApiProperty({
    description: 'Telene 2 do Cliente',
    example: '(00) 0 0000-0000',
  })
  @IsString()
  @IsOptional()
  tel2: string;

  @ApiProperty({
    description: 'Telene 3 do Cliente',
    example: '(00) 0 0000-0000',
  })
  @IsString()
  @IsOptional()
  tel3: string;
}
