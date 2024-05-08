export class CobrancasResponseDTO {
  parametros: {
    inicio: Date;
    fim: Date;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  cobs: [
    {
      calendario: {
        criacao: Date;
        expiracao: number;
      };
      txid: string;
      revisao: number;
      status: string;
      valor: {
        original: string;
      };
      chave: string;
      loc: {
        id: number;
        location: string;
        tipoCob: string;
        criacao: Date;
      };
      location: string;
      pixCopiaECola: string;
      pix: [
        {
          endToEndId: string;
          txid: string;
          valor: string;
          chave: string;
          horario: Date;
          infoPagador: string;
        },
      ];
    },
  ];
}
