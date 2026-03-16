import React from "react";

export function Taskbar({
  onToggleStart,
  showStart,
  onOpenGuide,
  onLogout,
}: {
  onToggleStart: () => void;
  showStart: boolean;
  onOpenGuide: () => void;
  onLogout: () => void;
}) {
  const [time, setTime] = React.useState(() => new Date());

  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 dd-window flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <button className="dd-btn text-sm" onClick={onToggleStart}>
          Menu Iniciar
        </button>
        {showStart ? (
          <div className="dd-window absolute bottom-12 left-2 w-56 p-2 text-sm">
            <div className="mb-2 font-bold">Data Detective OS</div>
            <div className="flex flex-col gap-1">
              <button className="dd-btn text-left" onClick={onOpenGuide}>
                Chat do Guia
              </button>
              <button className="dd-btn text-left" onClick={onLogout}>
                Sair (deslogar)
              </button>
              <div className="text-xs opacity-70">
                Dica: dê duplo clique nos ícones do desktop.
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <button className="dd-btn text-sm" onClick={onOpenGuide}>
          Chat do Guia
        </button>
        <div className="dd-inset px-2 py-1 text-sm">
          {time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}

