import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "hivemind-cli",
  description: "Hivemind CLI v0.2.1 — agentic TUI for OpenAI-compat LLMs. Install via npm.",
}

export default function HivemindCliLayout({ children }: { children: React.ReactNode }) {
  return children
}
