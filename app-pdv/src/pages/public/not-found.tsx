import Lottie from "lottie-react";
import animation_404 from "@/assets/404.json";

export function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center bg-muted">
      <h1 className="text-6xl">Pagina não encontrada</h1>
      <Lottie animationData={animation_404} className="w-1/3" />
    </section>
  );
}
