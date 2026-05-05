import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

/* JumpShip app: frontend/src/styles.css — body uses DM Sans */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "JumpShip: busca de vagas com IA (local-first)",
  description:
    "Ferramenta open source: agregação de vagas, scoring com LLM, PDFs de currículo por vaga, Kanban e stack FastAPI + React. Seus dados sob seu controle.",
}

export default function JumpShipLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${dmSans.className} min-h-screen antialiased`}>{children}</div>
}
