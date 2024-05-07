import { Menu } from "@/components/menu/menu";

import { Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <section className="ring min-h-screen h-screen overflow-y-hidden">
      <main className="flex h-full ring-2 ring-purple-500">
        <Menu />

        <div className="ring-2 ring-green-600 w-full">
          <header className="ring">
            <p className="w-fit">header</p>
          </header>
          <Outlet />
        </div>
      </main>
    </section>
  );
}
