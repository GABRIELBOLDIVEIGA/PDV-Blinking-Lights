import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubCategoriaDto {
  @ApiProperty({
    type: 'string',
    example: 'Sub-Categoria A',
    description: 'Nome da Sub-categoria.',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    type: 'string',
    example: 'sub-cat A',
    description: 'Descrição da Sub-categoria.',
  })
  @IsString()
  descricao: string;
}
