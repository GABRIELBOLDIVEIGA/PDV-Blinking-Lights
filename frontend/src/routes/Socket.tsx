import { io } from "socket.io-client";
import { useEffect } from "react";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { queryClient } from "@/lib/react-query/queryClient";
import { useMesasQuery } from "@/hooks/new/queries/mesas/useMesas.query";
import { Toaster, toast } from "sonner";

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

  const recebeMsg = (status_mesa: { id: number; aberta: boolean }) => {
    toast.success(`Mesa ${status_mesa.id}, ${status_mesa.aberta}`);

    const data_filtrada = data?.map((mesa) => {
      if (mesa.id != status_mesa.id) {
        return mesa;
      } else {
        const mesa_atualizada: MesaValidator = {
          ...mesa,
          aberta: status_mesa.aberta,
        };
        return mesa_atualizada;
      }
    });

    queryClient.setQueryData(["todas-mesas"], data_filtrada);
  };

  useEffect(() => {
    socket?.on("status-mesas", recebeMsg);

    return () => {
      socket?.off("status-mesas", recebeMsg);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recebeMsg]);

  return <Toaster />;
};
