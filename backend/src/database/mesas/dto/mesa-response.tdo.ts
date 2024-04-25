import { Exclude, Expose, Type } from 'class-transformer';
import { ProdutoResponseDto } from 'src/database/produtos/dto/produto-response.dto';

class ProdutoDto extends ProdutoResponseDto {
  @Exclude()
  codigo: string;

  @Expose()
  nome: string;

  @Expose()
  descricao: string;

  @Expose()
  preco_venda: number;

  @Exclude()
  preco_compra: number;
}

export class MesaProdutoResponseDto {
  @Exclude()
  id: string;

  @Expose()
  quantidade: number;

  @Type(() => ProdutoDto)
  produto: ProdutoDto;
}

export class MesaResponseDto {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  aberta: boolean;

  @Type(() => MesaProdutoResponseDto)
  produtos: MesaProdutoResponseDto[];

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string;
}
