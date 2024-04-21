import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatusDaVendaDto {
  @ApiProperty({
    description: 'Nome do Status da venda.',
  })
  @IsString()
  nome: string;
}
