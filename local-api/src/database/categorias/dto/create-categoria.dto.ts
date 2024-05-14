import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nome da Categoria.',
    example: 'Alimentos',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descrição da Categoria.',
    example: 'Consumíveis alimentícios',
  })
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'subCategorias da Categoria.',
    example: [1, 2, 3, 4, 5],
  })
  @IsArray()
  subCategorias: number[];
}
