import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => {
        setStep(3);
        setReady(true);
      }, 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    const handleKey = () => {
      const token = window.localStorage.getItem("dd_token");
      router.replace(token ? "/desktop" : "/login");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [ready, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black text-green-400 overflow-hidden">
      <img
        src="/logo.png"
        alt=""
        className="absolute inset-0 m-auto max-w-[60%] max-h-[60%] object-contain opacity-10 pointer-events-none select-none"
      />
      <div className="relative w-full max-w-2xl px-6 py-10 dd-mono text-sm">
        <div className="text-lg font-bold text-green-300">Data Detective OS</div>
        <div className="mt-6 space-y-2">
          <div>Iniciando Data Detective OS...</div>
          {step >= 1 ? <div>Carregando módulos de investigação...</div> : null}
          {step >= 2 ? <div>Verificando integridade do banco de pistas...</div> : null}
          {step >= 3 ? <div className="text-green-300">Sistema pronto.</div> : null}
        </div>
        {ready && (
          <div className="mt-8 text-xs text-green-300 animate-pulse">
            Pressione qualquer tecla para continuar...
          </div>
        )}
      </div>
    </div>
  );
}
