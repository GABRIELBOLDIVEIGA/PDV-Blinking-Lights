import { IsString } from 'class-validator';

export class CreateStatusDaVendaDto {
  @IsString()
  nome: string;
}
