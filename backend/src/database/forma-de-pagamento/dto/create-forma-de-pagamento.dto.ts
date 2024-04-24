import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFormaDePagamentoDto {
  @ApiProperty({
    description: 'Nome da Forma de pagamento.',
    example: 'A vista',
  })
  @IsString()
  nome: string;
}
