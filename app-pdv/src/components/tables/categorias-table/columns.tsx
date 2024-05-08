import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriaValidator } from "@/common/schemas/Categoria.schema";

export const columns: ColumnDef<CategoriaValidator>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-[150px] max-w-[150px] overflow-hidden pl-2 capitalize">
          <p className="text-wrap">{row.original.nome.toLowerCase()}</p>
        </div>
      );
    },
  },
];
