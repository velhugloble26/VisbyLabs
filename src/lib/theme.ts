export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

/**
 * Runs before first paint so the saved theme is applied with no flash.
 * With no saved choice it does nothing and the CSS follows the system setting.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

/** The theme currently showing, whether chosen by the visitor or by their system. */
export function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function saveTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice still applies for this visit.
  }
}
