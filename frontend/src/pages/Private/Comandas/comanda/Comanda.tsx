import { Card, CardContent } from "@/components/ui/card";
import { currencyFormt } from "@/utils/helpers/formatadorMonetario";
import { ComandaValidator } from "@/utils/validators/Comanda/Comanda";
import { IconComanda } from "./IconComanda";

interface IComanda {
  comanda: ComandaValidator;
}

export const Comanda = ({ comanda }: IComanda) => {
  const formatDate = (date: string) => {
    let result = null;
    try {
      result = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo",
        hour12: true,
      }).format(new Date(date));
    } catch (error) {
      console.error(error);
    }

    return result ?? "--/--/----";
  };

  return (
    <Card className="relative">
      <IconComanda className="absolute right-2 top-2" status={comanda.status} />

      <CardContent className="flex items-end justify-between p-4">
        <div>
          <p className="font-bold">{comanda.mesa.nome}</p>

          <p className="text-sm text-muted-foreground">
            {formatDate(comanda.updated_at)}
          </p>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-semibold">Total:</span>{" "}
            {currencyFormt(comanda.total)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
