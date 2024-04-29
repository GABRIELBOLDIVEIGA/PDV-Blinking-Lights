import { useMesasQuery } from "@/hooks/new/queries/mesas/useMesas.query";
import { Mesa } from "./mesa/Mesa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { MesaValidator } from "@/utils/validators/new/Mesa/Mesa";
import { queryClient } from "@/lib/react-query/queryClient";
import { Checkbox } from "@/components/ui/checkbox";

export const TodasMesas = () => {
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

  const [id, setId] = useState("");
  const [aberta, setAberta] = useState(false);

  const sendMessage = () => {
    socket.emit("message", { id: id, aberta: aberta });
  };

  const recebeMsg = (msg: { id: number; aberta: boolean }) => {
    console.log("[Msg recebida] => ", msg);

    const data_filtrada = data?.map((mesa) => {
      if (mesa.id != msg.id) {
        return mesa;
      } else {
        const mes: MesaValidator = { ...mesa, aberta: msg.aberta };
        return mes;
      }
    });

    queryClient.setQueryData(["todas-mesas"], data_filtrada);
  };

  useEffect(() => {
    socket?.on("message", recebeMsg);

    return () => {
      socket?.off("message", recebeMsg);
    };
  }, [recebeMsg]);

  return (
    <section className="py-6">
      <div className="flex flex-col space-y-4">
        <Input
          placeholder="message..."
          value={id}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setId(ev.target.value)
          }
        />
        <Checkbox checked={aberta} onClick={() => setAberta((prev) => !prev)} />
        <Button onClick={() => sendMessage()}>Send Message...</Button>
      </div>

      <div className="flex items-center justify-center px-3 pb-6">
        <div className="w-full rounded-lg border"></div>
        <p className="w-fit min-w-fit px-4 font-semibold tracking-wide ">
          Mesas Ocupadas
        </p>
        <div className="w-full border"></div>
      </div>

      <div className="grid cursor-pointer grid-cols-3 place-items-center gap-4 px-4">
        {data?.map((mesa) => mesa.aberta && <Mesa key={mesa.id} {...mesa} />)}
      </div>

      <div className="flex items-center justify-center py-6">
        <div className="w-full rounded-lg border"></div>
        <p className="w-fit min-w-fit px-4 font-semibold tracking-wide">
          Mesas Disponíveis
        </p>
        <div className="w-full rounded-lg border"></div>
      </div>

      <div className="grid cursor-pointer grid-cols-3 place-items-center gap-4 px-4">
        {data?.map((mesa) => !mesa.aberta && <Mesa key={mesa.id} {...mesa} />)}
      </div>
    </section>
  );
};
