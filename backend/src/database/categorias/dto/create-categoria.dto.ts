import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nome da Categoria.',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descrição da Categoria.',
  })
  @IsString()
  descricao: string;
}
