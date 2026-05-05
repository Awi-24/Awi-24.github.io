import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HiveMind Protocol (abandoned)",
  description:
    "Abandoned; use Hivemind CLI instead. Historic HiveMind Protocol page only.",
}

export default function HiveMindLayout({ children }: { children: React.ReactNode }) {
  return children
}
