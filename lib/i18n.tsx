"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";
type Ctx = { lang: Lang; toggle: () => void };

const LangContext = createContext<Ctx>({ lang: "pt", toggle: () => {} });

const STORAGE_KEY = "agamoto-portfolio-lang";

// Provider único pra tudo do portfólio que precisa saber o idioma — home + páginas de
// projeto (menos /agamoto, que é outro site, fora desta árvore). Persistido em localStorage;
// sem isso o toggle voltaria pro padrão a cada navegação entre páginas.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "pt") setLang(saved);
  }, []);

  function toggle() {
    setLang((cur) => {
      const next = cur === "pt" ? "en" : "pt";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLanguage() {
  return useContext(LangContext);
}

// Pega o texto no idioma atual; se não tiver tradução (ex: painel do Agamoto, que fica só em
// PT de propósito), cai pro português.
export function pick<T>(lang: Lang, pair: { pt: T; en?: T }): T {
  return lang === "en" && pair.en !== undefined ? pair.en : pair.pt;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      className={`font-mono text-xs tracking-widest transition-opacity hover:opacity-70 ${className}`}
      aria-label="Switch language / Trocar idioma"
    >
      {lang === "pt" ? "EN" : "PT"}
    </button>
  );
}
