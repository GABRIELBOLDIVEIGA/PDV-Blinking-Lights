export class CobrancaResponseDTO {
  calendario: {
    criacao: string;
    expiracao: number;
  };
  txid: string;
  revisao: number;
  status: string;
  valor: {
    original: string;
  };
  chave: string;
  devedor: {
    cpf: string;
    nome: string;
  };
  loc: {
    id: number;
    location: string;
    tipoCob: string;
    criacao: string;
  };
  location: string;
  pixCopiaECola: string;
}
