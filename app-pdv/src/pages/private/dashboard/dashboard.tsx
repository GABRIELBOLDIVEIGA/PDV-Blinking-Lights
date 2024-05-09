import { CardTotalVendas } from "./card-total-vendas";
import { CardLucroBruto } from "./card-lucro-bruto";
import { CardEstoqueTotal } from "./card-estoque-total";
import { CardVendasPeriodo } from "./card-vendas-periodo";
import { CardTiposPagamentos } from "./card-tipos-pagamentos";
import { CardMaioresCliente } from "./card-maiores-clientes";
import { CardProdutosMaisVendidos } from "./card-produtos-mais-vendidos";
import { CardVendasPorVendedos } from "./card-vendas-por-vendedos";
import { CardCategoriasMaisVendidas } from "./card-categorias-mais-vendidas";

export const Dashboard = () => {
  return (
    <section className="grid grid-cols-3 grid-rows-7 gap-6">
      <CardTotalVendas className="row-span-2" />

      <CardLucroBruto className="row-span-2" />

      <CardEstoqueTotal className="row-span-2" />

      <CardVendasPeriodo className="row-span-3 col-span-2" />

      <CardTiposPagamentos className="row-span-3" />

      <CardMaioresCliente className="col-span-2" />

      <CardProdutosMaisVendidos />

      <CardVendasPorVendedos className="col-span-2" />

      <CardCategoriasMaisVendidas />
    </section>
  );
};
