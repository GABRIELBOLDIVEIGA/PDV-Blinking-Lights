import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { OriginalDTO } from './valor.dto';

class CalendarioDTO {
  @IsNumber()
  @Min(1800)
  expiracao: number;
}

class DevedorDTO {
  @IsString()
  cpf: string;

  @IsString()
  nome: string;
}

export class CreateCobrancaDTO {
  calendario: CalendarioDTO;

  @IsOptional()
  devedor?: DevedorDTO;

  valor: OriginalDTO;

  @IsUUID()
  chave: string;
}
