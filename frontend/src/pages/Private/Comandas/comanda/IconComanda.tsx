import { cn } from "@/lib/utils";
import { StatusComanda } from "@/utils/validators/Comanda/StatusComanda.enum";
import { Ban, Check, ReceiptText, Utensils } from "lucide-react";

interface IIconComanda {
  status: StatusComanda;
  className?: string;
}

export const IconComanda = ({ status, className = "" }: IIconComanda) => {
  return (
    <div className={cn("", `${className}`)}>
      {status === StatusComanda.ABERTO && (
        <Utensils size={16} className="text-orange-400" />
      )}
      {status === StatusComanda.AGUARDANDO_PAGAMENTO && (
        <ReceiptText size={16} className="text-yellow-500" />
      )}
      {status === StatusComanda.CANCELADO && (
        <Ban size={16} className="text-red-500" />
      )}
      {status === StatusComanda.FECHADO && (
        <Check size={16} className="text-green-600" />
      )}
    </div>
  );
};
