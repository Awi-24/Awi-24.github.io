import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SynapseNetwork } from "@/components/synapse/network";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });
const body = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500"] });

// Página raiz, independente da estética cyberpunk das outras rotas (/jumpship, /hivemind):
// o wrapper abaixo define bg/texto explícitos, então nada aqui herda as variáveis cyan/magenta
// de app/layout.tsx — essa troca fica só nesta árvore.
export default function Home() {
  return (
    <main
      className={`${display.variable} ${mono.variable} ${body.variable} relative h-dvh w-full overflow-hidden bg-[#0a0a0a] text-[#f5f4f0]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <header className="pointer-events-none absolute left-6 top-6 z-10 sm:left-10 sm:top-10">
        <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight sm:text-xl">
          Adrian Widmer
        </h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8a85] sm:text-xs">
          Software Engineer &amp; Researcher
        </p>
      </header>

      <div className="absolute inset-0">
        <SynapseNetwork />
      </div>

      <p className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5a5a56] sm:left-10">
        Toque num neurônio
      </p>
    </main>
  );
}
