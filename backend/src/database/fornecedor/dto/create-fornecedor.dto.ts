import { ApiProperty } from '@nestjs/swagger';

export class CreateFornecedorDto {
  @ApiProperty({
    type: 'string',
    example: 'Nome do fornecedor',
    description: 'Nome do Fornecedor.',
  })
  nome: string;

  @ApiProperty({
    type: 'string',
    example: 'Pedir desconto.',
    description: 'Observções sobre o Fornecedor.',
  })
  observacoes: string;
}
