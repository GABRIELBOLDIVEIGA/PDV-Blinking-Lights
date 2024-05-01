import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { useFecharMesa } from "@/hooks/new/mutations/mesas/useFecharMesa.mutation";
import { queryClient } from "@/lib/react-query/queryClient";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { toast } from "sonner";

interface IProps {
  mesa: MesaValidator;
  value: string;
}

export const TabsContentComanda = ({ mesa, value }: IProps) => {
  const { mutate } = useFecharMesa();

  const submit = () => {
    mutate(mesa.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === "todas-mesas",
        });
        toast.success("Comanda Fechada.", { duration: 1500 });
      },
      onError: (error) => {
        toast.error(`${error.message}`, { duration: 3500 });
      },
    });
  };

  return (
    <TabsContent value={value} className="h-[98%]">
      <Card className="relative h-full border-none pb-16 shadow-inner">
        <ScrollArea className="h-full">
          <CardContent className="space-y-2 pt-6">
            {mesa.comanda?.produtos.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between pr-3"
              >
                <div className="w-[80%] capitalize">
                  <p className="truncate font-bold tracking-wide">
                    {item.produto.nome.toLowerCase()}
                  </p>
                  <p className="truncate text-sm font-semibold tracking-wide opacity-70">
                    {item.produto.descricao.toLowerCase()}
                  </p>
                </div>
                <div>
                  <p>x 1</p>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
        <Button onClick={submit} className="absolute bottom-5 w-full">
          Fechar Comanda
        </Button>
      </Card>
    </TabsContent>
  );
};
