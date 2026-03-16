import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const token = window.localStorage.getItem("dd_token");
    const to = token ? "/desktop" : "/login";

    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2200),
      setTimeout(() => router.replace(to), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-green-400">
      <div className="w-full max-w-2xl px-6 py-10 dd-mono text-sm">
        <div className="text-lg font-bold text-green-300">Data Detective OS</div>
        <div className="mt-6 space-y-2">
          <div>Iniciando Data Detective OS...</div>
          {step >= 1 ? <div>Carregando módulos de investigação...</div> : null}
          {step >= 2 ? <div>Verificando integridade do banco de pistas...</div> : null}
          {step >= 3 ? <div className="text-green-300">Sistema pronto.</div> : null}
        </div>
        <div className="mt-8 text-xs opacity-80">Pressione nada. Isto é só um boot fake.</div>
      </div>
    </div>
  );
}
