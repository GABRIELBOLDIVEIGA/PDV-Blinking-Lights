import { io } from "socket.io-client";
import { useEffect } from "react";
import { queryClient } from "@/lib/react-query/queryClient";
import { Toaster, toast } from "sonner";
import {
  TODAS_MESAS_QUERY_KEY,
  useMesasQuery,
} from "@/hooks/queries/mesas/useMesas.query";
import { MesaValidator } from "@/utils/validators/Mesa/Mesa";

export const Socket = () => {
  const { data } = useMesasQuery();

  const URL = "http://localhost:8092";

  const socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: {
          authorization: localStorage.access_token,
        },
      },
    },
  };

  const socket = io(`${URL}`, socketOptions);

  const statusMesa = (status_mesa: {
    id: number;
    nome: string;
    disponivel: boolean;
  }) => {
    toast.success(
      `Mesa ${status_mesa.nome} ${status_mesa.disponivel ? "disponível" : "Ocupada"}`,
      { position: "top-center", dismissible: true },
    );

    const data_filtrada = data?.map((mesa) => {
      if (mesa.id != status_mesa.id) {
        return mesa;
      } else {
        const mesa_atualizada: MesaValidator = {
          id: mesa.id,
          nome: mesa.nome,
          disponivel: status_mesa.disponivel,
          comanda: null,
        };
        return mesa_atualizada;
      }
    });

    queryClient.setQueryData(["todas-mesas"], data_filtrada);
  };

  const atualizaProdutosMesa = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey[0] === TODAS_MESAS_QUERY_KEY,
      });
    }, 1000);
  };

  useEffect(() => {
    socket?.on("status-mesas", statusMesa);

    return () => {
      socket?.off("status-mesas", statusMesa);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusMesa, atualizaProdutosMesa]);

  useEffect(() => {
    socket?.on("atualiza-produtos-mesas", atualizaProdutosMesa);

    return () => {
      socket?.off("atualiza-produtos-mesas", atualizaProdutosMesa);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atualizaProdutosMesa]);

  return <Toaster />;
};
