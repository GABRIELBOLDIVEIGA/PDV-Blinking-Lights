import { Exclude, Expose } from 'class-transformer';

export class ProdutoResponseDto {
  @Expose()
  id: number;

  @Expose()
  codigo: string;

  @Expose()
  nome: string;

  @Expose()
  descricao: string;

  @Expose()
  preco_venda: number;

  @Exclude()
  preco_compra: number;

  @Exclude()
  created_at: string;

  @Exclude()
  updated_at: string;

  @Exclude()
  deleted_at: string | null;
}
