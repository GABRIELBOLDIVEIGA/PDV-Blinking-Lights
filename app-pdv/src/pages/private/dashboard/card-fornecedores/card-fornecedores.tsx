import { Loader } from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFornecedores } from "@/hooks/queries/fornecedores/useFornecedores.query";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenuFornecedor } from "./dropdown-menu-fornecedor";

interface IProps {
  className?: string;
}

export const CardFornecedores = ({ className }: IProps) => {
  const { data, isPending } = useFornecedores();

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">FORNECEDORES</CardTitle>
      </CardHeader>
      <CardContent className="pr-1">
        <Loader isPending={isPending} className="grid place-content-center" />

        <div className="pr-3 pb-1">
          <div className="flex justify-between gap-2">
            <p className="capitalize w-full">Nome</p>
            <p className="w-2/3">Documento</p>
          </div>
        </div>

        <ScrollArea className="h-[210px]">
          <div className="space-y-3">
            {data?.map((fornecedor) => (
              <div key={fornecedor.id} className="pr-3">
                <div className="flex justify-between items-center pb-1 gap-2">
                  <p className="capitalize w-full truncate">
                    {fornecedor.nome}
                  </p>
                  <p className="w-1/2 truncate">{fornecedor.documento}</p>
                  <DropdownMenuFornecedor>
                    <Button variant="outline" size="icon">
                      <DotsVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuFornecedor>
                </div>

                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
