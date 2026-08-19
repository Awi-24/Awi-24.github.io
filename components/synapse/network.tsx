"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NODES, PANELS, type Node } from "@/lib/synapse-data";

// Curva orgânica entre dois nós — não linha reta: dendritos não são retos, e a leve
// assimetria (offset perpendicular ao ponto médio, variando com o id) evita que a rede
// pareça uma roda de bicicleta perfeita.
function edgePath(a: Node, b: Node, seed: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bend = (seed % 5) - 2; // -2..2, determinístico por índice
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function SynapseNetwork() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const byId = useMemo(() => new Map(NODES.map((n) => [n.id, n])), []);
  const active = activeId ? byId.get(activeId) : null;
  const panel = activeId ? PANELS[activeId] : null;

  const edges = useMemo(
    () =>
      NODES.filter((n) => n.parent).map((n, i) => ({
        id: `${n.parent}-${n.id}`,
        from: byId.get(n.parent!)!,
        to: n,
        d: edgePath(byId.get(n.parent!)!, n, i),
        // uma aresta "pertence" ao nó filho e ao seu pai — acende se qualquer um dos dois
        // (ou o outro satélite do mesmo pai, no caso de projetos) estiver ativo
        touches: (id: string) => id === n.id || id === n.parent,
      })),
    [byId]
  );

  function handleClick(id: string) {
    setActiveId((cur) => (cur === id ? null : id));
  }

  const projetosOpen = activeId === "projetos" || byId.get(activeId ?? "")?.parent === "projetos";

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        role="img"
        aria-label="Mapa de seções do portfólio, em forma de rede neural"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5f4f0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f5f4f0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dendritos */}
        {edges.map((e) => {
          const on = e.touches(activeId ?? "");
          const dim = e.to.kind === "project" && !projetosOpen;
          return (
            <path
              key={e.id}
              d={e.d}
              fill="none"
              stroke={on ? "#f5f4f0" : "#3a3a38"}
              strokeWidth={on ? 0.35 : 0.22}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="transition-all duration-500"
              style={{ opacity: dim ? 0 : on ? 1 : 0.6 }}
            />
          );
        })}

        {/* núcleo */}
        {NODES.map((n) => {
          const isActive = activeId === n.id;
          const isHub = n.kind === "hub";
          const hidden = n.kind === "project" && !projetosOpen;
          return (
            <g
              key={n.id}
              onClick={() => !isHub && handleClick(n.id)}
              className={isHub ? "" : "cursor-pointer"}
              style={{
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
                transition: "opacity 400ms ease",
              }}
            >
              {/* alvo de toque invisível, maior que o círculo visível — mira em telas
                  pequenas sem inflar o desenho */}
              {!isHub && <circle cx={n.x} cy={n.y} r={n.r + 3} fill="transparent" />}

              {(isActive || isHub) && (
                <circle cx={n.x} cy={n.y} r={n.r * 2.6} fill="url(#nodeGlow)" />
              )}

              <circle
                cx={n.x}
                cy={n.y}
                r={isActive ? n.r * 1.35 : n.r}
                fill={isHub ? "#f5f4f0" : isActive ? "#f5f4f0" : "#141412"}
                stroke="#f5f4f0"
                strokeWidth={isHub ? 0 : 0.3}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-500 ease-out"
              />

              <text
                x={n.x}
                y={n.kind === "project" ? n.y + n.r + 3.2 : n.y + n.r + (isHub ? 0 : 3.6)}
                textAnchor="middle"
                className="select-none uppercase"
                style={{
                  fill: isActive ? "#f5f4f0" : "#8a8a85",
                  fontSize: isHub ? 0 : n.kind === "project" ? 2.1 : 2.4,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.06em",
                  transition: "fill 400ms ease",
                }}
              >
                {isHub ? "" : n.label}
              </text>

              {isHub && (
                <text
                  x={n.x}
                  y={n.y + 1.1}
                  textAnchor="middle"
                  style={{
                    fill: "#0a0a0a",
                    fontSize: 3.4,
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                  }}
                >
                  AW
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {panel && (
          <motion.aside
            key={activeId}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[#2a2a28] bg-[#0a0a0a] p-8 shadow-[-40px_0_60px_-20px_rgba(0,0,0,0.6)] sm:p-10"
          >
            <button
              onClick={() => setActiveId(null)}
              className="mb-8 font-mono text-xs uppercase tracking-widest text-[#8a8a85] transition-colors hover:text-[#f5f4f0]"
              aria-label="Fechar"
            >
              ← fechar
            </button>

            <p className="font-mono text-xs uppercase tracking-widest text-[#8a8a85]">{panel.eyebrow}</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#f5f4f0]">
              {panel.title}
            </h2>

            {panel.body && (
              <p className="mt-5 text-[15px] leading-relaxed text-[#c8c7c2]">{panel.body}</p>
            )}

            {panel.bullets && (
              <ul className="mt-6 space-y-3 border-t border-[#2a2a28] pt-6">
                {panel.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#c8c7c2]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#8a8a85]" />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {panel.links && (
              <div className="mt-6 flex flex-col gap-3 border-t border-[#2a2a28] pt-6">
                {panel.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-mono text-sm text-[#f5f4f0] underline decoration-[#3a3a38] underline-offset-4 transition-colors hover:decoration-[#f5f4f0]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
