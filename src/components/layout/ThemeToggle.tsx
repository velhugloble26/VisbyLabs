"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { currentTheme, saveTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Switches between the dark and light theme. Follows the system until the visitor picks one. */
export function ThemeToggle({ className }: { className?: string }) {
  // Unknown until mounted, so server and client render the same markup.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(currentTheme());
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => {
        saveTheme(next);
        setTheme(next);
      }}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      title={theme ? `Switch to ${next} theme` : "Switch theme"}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-ink",
        className,
      )}
    >
      {theme === "light" && <Moon className="h-5 w-5" aria-hidden />}
      {theme === "dark" && <Sun className="h-5 w-5" aria-hidden />}
    </button>
  );
}
