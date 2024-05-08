import { Menu } from "@/components/menu/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "@tanstack/react-router";
import { Login } from "./public/login";
import { useAuthStore } from "@/stores/auth.store";
import { Header } from "@/components/header/header";

export function Layout() {
  const autentidado = useAuthStore((state) => state.user);

  return (
    <section className="min-h-screen h-screen">
      {autentidado ? (
        <main className="flex h-full max-h-screen">
          <Menu />

          <div className="w-full h-full">
            <Header />
            <ScrollArea className="h-[89%]">
              <div className="p-4">
                <Outlet />
              </div>
            </ScrollArea>
          </div>
        </main>
      ) : (
        <Login />
      )}
    </section>
  );
}
