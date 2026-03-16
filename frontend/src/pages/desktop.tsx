import React from "react";
import { useRouter } from "next/router";
import { DesktopIcon } from "@/components/DesktopIcon";
import { Taskbar } from "@/components/Taskbar";
import { VegaNivelWindow } from "@/components/VegaNivelWindow";
import { GuideChatbotWindow } from "@/components/GuideChatbotWindow";
import { CasesWindow } from "@/components/CasesWindow";
import { CaseWindow } from "@/components/CaseWindow";
import { TutorialWindow } from "@/components/TutorialWindow";
import { SimpleInfoWindow } from "@/components/SimpleInfoWindow";
import { ProfileWindow } from "@/components/ProfileWindow";
import { saveThemeForUser, loadThemeForUser, themes, type ThemeId } from "@/lib/theme";

type WinKey =
  | "casos"
  | "tutorial"
  | "perfil"
  | "conquistas"
  | "estatisticas"
  | "config"
  | "vegaNivel"
  | "guiaChat"
  | `caso-${number}`;

export default function DesktopPage() {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<string | null>(null);

  const [showStart, setShowStart] = React.useState(false);
  const [open, setOpen] = React.useState<Record<WinKey, boolean>>({
    casos: false,
    tutorial: false,
    perfil: false,
    conquistas: false,
    estatisticas: false,
    config: false,
    vegaNivel: false,
    guiaChat: false,
  } as any);

  const [z, setZ] = React.useState<Record<string, number>>({
    casos: 20,
    tutorial: 21,
    perfil: 22,
    conquistas: 22,
    estatisticas: 23,
    config: 24,
    vegaNivel: 30,
    guiaChat: 31,
  });

  function focus(k: WinKey) {
    setZ((prev) => {
      const top = Math.max(...Object.values(prev));
      return { ...prev, [k]: top + 1 };
    });
  }

  function setOpenKey(k: WinKey, v: boolean) {
    setOpen((prev) => ({ ...prev, [k]: v }));
    if (v) focus(k);
  }

  React.useEffect(() => {
    const t = window.localStorage.getItem("dd_token");
    const u = window.localStorage.getItem("dd_user");
    if (!t) router.replace("/login");
    setToken(t);
    setUser(u);
  }, [router]);

  const [nivel, setNivel] = React.useState<string | null>(null);
  const [themeId, setThemeId] = React.useState<ThemeId>("teal");

  React.useEffect(() => {
    const n = window.localStorage.getItem("dd_sql_nivel");
    if (n) setNivel(n);
    // se ainda não definiu, abre a janela de nível
    if (!n) setOpenKey("vegaNivel", true);

    // aplica tema preferido deste usuário (se existir)
    try {
      const currentUser = window.localStorage.getItem("dd_user");
      const loaded = loadThemeForUser(currentUser);
      if (loaded.id) setThemeId(loaded.id);
    } catch {
      // ignore
    }
  }, []);

  const [openCaseId, setOpenCaseId] = React.useState<number | null>(null);

  if (!token) return null;

  return (
    <div className="min-h-screen dd-wallpaper">
      {/* Área do desktop (importante para bounds="parent" das janelas) */}
      <div className="relative h-[calc(100vh-40px)] overflow-hidden">
        <div className="p-4">
          <div className="mb-4 text-white text-xs opacity-90">
            Logado como: <span className="font-bold">{user || "Agente"}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 w-[360px]">
            <DesktopIcon emoji="📁" label="Casos" onOpen={() => setOpenKey("casos", true)} />
            <DesktopIcon emoji="👤" label="Perfil" onOpen={() => setOpenKey("perfil", true)} />
            <DesktopIcon
              emoji="📘"
              label="Tutorial SQL"
              onOpen={() => setOpenKey("tutorial", true)}
            />
            <DesktopIcon
              emoji="💬"
              label="Chat do Guia"
              onOpen={() => setOpenKey("guiaChat", true)}
            />
            <DesktopIcon
              emoji="🏅"
              label="Conquistas"
              onOpen={() => setOpenKey("conquistas", true)}
            />
            <DesktopIcon
              emoji="📊"
              label="Estatísticas"
              onOpen={() => setOpenKey("estatisticas", true)}
            />
            <DesktopIcon
              emoji="⚙"
              label="Configurações"
              onOpen={() => setOpenKey("config", true)}
            />
          </div>
        </div>

        {/* Janelas */}
        <VegaNivelWindow
          open={open.vegaNivel}
          onClose={() => setOpenKey("vegaNivel", false)}
          zIndex={z.vegaNivel}
          onFocus={() => focus("vegaNivel")}
          onPickNivel={(n) => {
            window.localStorage.setItem("dd_sql_nivel", n);
            setNivel(n);
            setOpenKey("vegaNivel", false);
            if (n === "iniciante") setOpenKey("tutorial", true);
            if (n === "avancado") setOpenKey("casos", true);
            if (n === "intermediario") setOpenKey("tutorial", true);
          }}
        />

        <GuideChatbotWindow
          open={open.guiaChat}
          onClose={() => setOpenKey("guiaChat", false)}
          zIndex={z.guiaChat}
          onFocus={() => focus("guiaChat")}
        />

        <CasesWindow
          open={open.casos}
          onClose={() => setOpenKey("casos", false)}
          token={token}
          zIndex={z.casos}
          onFocus={() => focus("casos")}
          onOpenCase={(id) => {
            setOpenCaseId(id);
            setOpenKey(`caso-${id}` as WinKey, true);
          }}
        />

        {openCaseId !== null ? (
          <CaseWindow
            open={open[`caso-${openCaseId}` as WinKey] || false}
            onClose={() => setOpenKey(`caso-${openCaseId}` as WinKey, false)}
            token={token}
            caseId={openCaseId}
            zIndex={z[`caso-${openCaseId}`] || 40}
            onFocus={() => focus(`caso-${openCaseId}` as WinKey)}
          />
        ) : null}

        <TutorialWindow
          open={open.tutorial}
          onClose={() => setOpenKey("tutorial", false)}
          token={token}
          zIndex={z.tutorial}
          onFocus={() => focus("tutorial")}
        />

        <ProfileWindow
          open={open.perfil}
          onClose={() => setOpenKey("perfil", false)}
          token={token}
          username={user || "Agente"}
          zIndex={z.perfil}
          onFocus={() => focus("perfil")}
        />

        <SimpleInfoWindow
          open={open.conquistas}
          onClose={() => setOpenKey("conquistas", false)}
          title="🏅 Conquistas"
          defaultPos={{ x: 220, y: 130 }}
          zIndex={z.conquistas}
          onFocus={() => focus("conquistas")}
        >
          <div className="font-bold mb-2">Em construção</div>
          <ul className="list-disc ml-5 text-sm">
            <li>
              <span className="font-bold">⚡ Solver Rápido</span>: resolver um caso em menos de 5 minutos
            </li>
            <li>
              <span className="font-bold">🧠 Mestre das Queries</span>: resolver com menos de 5 queries
            </li>
            <li>
              <span className="font-bold">🔎 Detetive Persistente</span>: resolver 3 casos seguidos
            </li>
          </ul>
        </SimpleInfoWindow>

        <SimpleInfoWindow
          open={open.estatisticas}
          onClose={() => setOpenKey("estatisticas", false)}
          title="📊 Estatísticas"
          defaultPos={{ x: 260, y: 170 }}
          zIndex={z.estatisticas}
          onFocus={() => focus("estatisticas")}
        >
          <div className="font-bold mb-2">Em construção</div>
          <div className="text-sm">
            Aqui vamos mostrar: tempo para resolver, quantidade de queries e dicas usadas.
          </div>
        </SimpleInfoWindow>

        <SimpleInfoWindow
          open={open.config}
          onClose={() => setOpenKey("config", false)}
          title="⚙ Configurações"
          defaultPos={{ x: 300, y: 210 }}
          zIndex={z.config}
          onFocus={() => focus("config")}
        >
          <div className="font-bold mb-2">Configurações simples</div>
          <div className="text-sm">
            <div className="mb-3">
              <div className="font-bold">Tema</div>
              <div className="text-xs opacity-70">Escolha a cor de fundo do desktop.</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    className={`dd-btn text-xs ${themeId === t.id ? "font-bold" : ""}`}
                    onClick={() => {
                      setThemeId(t.id);
                      const currentUser = window.localStorage.getItem("dd_user");
                      saveThemeForUser(t.id, currentUser);
                    }}
                    title={t.name}
                  >
                    <span
                      className="inline-block h-3 w-3 align-middle mr-2"
                      style={{ background: t.bg, border: "1px solid rgba(0,0,0,0.35)" }}
                    />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-2">
              Nível atual de SQL:{" "}
              <span className="font-bold">
                {nivel === "iniciante"
                  ? "Iniciante"
                  : nivel === "intermediario"
                    ? "Intermediário"
                    : nivel === "avancado"
                      ? "Avançado"
                      : "Não definido"}
              </span>
            </div>
            <button
              className="dd-btn"
              onClick={() => {
                window.localStorage.removeItem("dd_sql_nivel");
                setNivel(null);
                setOpenKey("vegaNivel", true);
              }}
            >
              Reconfigurar nível com o Operador Vega
            </button>
            <div className="mt-3">
              <button
                className="dd-btn"
                onClick={() => {
                  window.localStorage.removeItem("dd_token");
                  window.localStorage.removeItem("dd_user");
                  router.push("/login");
                }}
              >
                Sair
              </button>
            </div>
          </div>
        </SimpleInfoWindow>
      </div>

      <Taskbar
        showStart={showStart}
        onToggleStart={() => setShowStart((s) => !s)}
        onOpenGuide={() => setOpenKey("guiaChat", true)}
        onLogout={() => {
          window.localStorage.removeItem("dd_token");
          window.localStorage.removeItem("dd_user");
          router.push("/login");
        }}
      />
    </div>
  );
}

