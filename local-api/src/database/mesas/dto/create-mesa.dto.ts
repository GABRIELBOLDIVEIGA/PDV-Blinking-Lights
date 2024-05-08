import { ApiProperty } from '@nestjs/swagger';

export class CreateMesaDto {
  @ApiProperty({
    type: 'string',
    example: 'Mesa 1',
    description: 'Nome da mesa.',
  })
  nome: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  disponivel: boolean;
}
