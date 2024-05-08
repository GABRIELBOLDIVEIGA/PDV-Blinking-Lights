import { LoginForm } from "@/components/login-form/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import banner from "@/assets/banner-login.png";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

export const Login = () => {
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    if (user) navigate({ to: "/produtos" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section className="h-full flex">
      <div className="w-1/2 grid justify-center pt-32">
        <div>
          <img src={banner} />
          <p className="font-bold tracking-wider text-2xl text-end text-muted-foreground pt-6 h-fit">
            O seu negócio com você o tempo todo
          </p>
        </div>
      </div>

      <Separator orientation="vertical" />

      <div className="w-1/2 grid place-content-center">
        <Card>
          <CardHeader>
            <CardTitle>Bem vindo!</CardTitle>
            <CardDescription>
              Para manter-se conectado informe seus dados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>

          <CardFooter>
            <Link className="flex items-center gap-2 w-full">
              <div className="border-[1px] h-fit opacity-50 w-full" />
              <p className="w-full text-nowrap text-sm">Esqueci minha senha</p>
              <div className="border-[1px] h-fit opacity-50 w-full" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
