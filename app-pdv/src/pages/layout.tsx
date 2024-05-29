import { Menu } from "@/components/menu/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "@tanstack/react-router";
import { Login } from "./public/login";
import { useAuthStore } from "@/stores/auth.store";
import { Header } from "@/components/header/header";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

export function Layout() {
  const autentidado = useAuthStore((state) => state.user);
  const [showBg, setShowBg] = useState(false);

  return (
    <section className="min-h-screen h-screen overflow-y-hidden">
      {autentidado ? (
        <main className="flex h-full relative max-h-screen">
          <Menu />
          {process.env.NODE_ENV === "development" && (
            <div className="absolute bottom-5 left-5 flex gap-2 sr-only">
              <Label htmlFor="bg-media-query">Show bg media query</Label>
              <Switch
                id="bg-media-query"
                onCheckedChange={() => setShowBg((prev) => !prev)}
              />
            </div>
          )}

          <div className="w-full h-full">
            <Header />

            <ScrollArea className="h-[93.5%]">
              <div
                className={cn("p-4 h-full", {
                  "bg-transparent desktop:bg-blue-600 laptop:bg-green-500 tablet:bg-yellow-600 mobile:bg-red-600":
                    process.env.NODE_ENV === "development" && showBg,
                })}
              >
                <Toaster />
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
