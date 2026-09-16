import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Naiah — Política de Privacidade",
  description:
    "O Naiah é um app de rastreio de ciclo menstrual local-first: não tem conta, não tem servidor e nenhum dado sai do seu aparelho. Política de privacidade completa.",
}

export default function NaiahPrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen antialiased">{children}</div>
}
