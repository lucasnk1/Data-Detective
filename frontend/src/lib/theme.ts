export type ThemeId = "teal" | "navy" | "purple" | "graphite";

export const themes: Array<{ id: ThemeId; name: string; bg: string }> = [
  { id: "teal", name: "Verde Retrô", bg: "#0b6b6b" },
  { id: "navy", name: "Azul Noite", bg: "#0b2a6b" },
  { id: "purple", name: "Roxo Neon", bg: "#4b1b6b" },
  { id: "graphite", name: "Grafite", bg: "#2b2f3a" },
];

const KEY = "dd_theme_bg";
const KEY_ID = "dd_theme_id";

export function applyThemeBg(bg: string) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--dd-bg", bg);
}

export function saveTheme(themeId: ThemeId) {
  const theme = themes.find((t) => t.id === themeId) || themes[0];
  window.localStorage.setItem(KEY, theme.bg);
  window.localStorage.setItem(KEY_ID, theme.id);
  applyThemeBg(theme.bg);
}

export function loadTheme() {
  const bg = window.localStorage.getItem(KEY);
  const id = window.localStorage.getItem(KEY_ID) as ThemeId | null;
  if (bg) applyThemeBg(bg);
  return { bg, id };
}

// Versão por usuário (tema por login)
export function saveThemeForUser(themeId: ThemeId, username: string | null) {
  const keyPrefix = username ? `dd_theme_${username}` : "dd_theme_default";
  const theme = themes.find((t) => t.id === themeId) || themes[0];
  window.localStorage.setItem(`${keyPrefix}_bg`, theme.bg);
  window.localStorage.setItem(`${keyPrefix}_id`, theme.id);
  applyThemeBg(theme.bg);
}

export function loadThemeForUser(username: string | null) {
  const keyPrefix = username ? `dd_theme_${username}` : "dd_theme_default";
  const bg = window.localStorage.getItem(`${keyPrefix}_bg`);
  const id = window.localStorage.getItem(`${keyPrefix}_id`) as ThemeId | null;
  if (bg) applyThemeBg(bg);
  return { bg, id };
}

