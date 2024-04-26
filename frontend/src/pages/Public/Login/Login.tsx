import { Card } from "@/components/ui/card";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/Auth/AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AlertDialogComponent } from "@/components/AlertDialogComponent/AlertDialogComponent";
import { CardLogin } from "./CardLogin/CardLogin";

export const Login = () => {
  const { user, statusResponse, resetError } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/pedido/meus-pedidos");
    }
  }, [navigate, user]);

  return (
    <section className="flex h-screen items-center justify-center">
      {!user && (
        <>
          <Card className="flex  overflow-hidden mobile:h-[60%] mobile:w-10/12">
            <div className="border-l-[1px] border-border" />
            {location.pathname === "/login/esqueci-minha-senha" ? (
              <Outlet />
            ) : (
              <CardLogin />
            )}
          </Card>
        </>
      )}
      {statusResponse && (
        <AlertDialogComponent
          isOpen={!statusResponse.isSuccess}
          title={statusResponse.title}
          description={statusResponse.description}
          confirmBtnText="Continuar"
          confirmFn={resetError}
        />
      )}
    </section>
  );
};
