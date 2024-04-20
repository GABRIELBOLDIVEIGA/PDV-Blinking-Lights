import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Cep.',
  })
  @IsString()
  nome: string;
}
