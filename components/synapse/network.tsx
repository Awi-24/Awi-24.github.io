"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NODES, PANELS, PANEL_LINKS, type Node } from "@/lib/synapse-data";
import { useLanguage, LangToggle } from "@/lib/i18n";

// Só esses dois rótulos de link se repetem entre painéis e precisam de tradução (o resto é
// URL/nome próprio, igual nos dois idiomas) — mapa pequeno em vez de reestruturar PANEL_LINKS.
const LINK_LABEL_EN: Record<string, string> = {
  "Ver a ficha do projeto →": "See project page →",
};

// Paleta preto e branco.
const WHITE = "#f5f4f0";
const DIM = "#8a8a85";
const FAINT = "#3a3a38";
const LINE = "#262624";
const MUTED = "#b5b5af";

const HUB = NODES.find((n) => n.kind === "hub")!;
const DRAGGABLE = NODES.filter((n) => n.kind !== "hub");

// Achatamento vertical — o mapa é "visto de um ângulo", não de cima reto (dá o ar 3D sem CSS
// transform, que quebraria a matemática de mouse/arraste). A física dos neurônios roda inteira
// em espaço verdadeiro; só a hora de desenhar (sq) é que aplica a perspectiva.
// 2D puro (pedido explícito: tirar a inclinação/perspectiva 3D). SQUASH_Y=1 faz sq()/unsq()
// virarem identidade — mantém o código pronto pra reativar perspectiva depois sem reescrever
// tudo de novo, sem custo nenhum agora (é só uma multiplicação por 1 em tempo real).
const SQUASH_Y = 1;
const sq = (y: number) => HUB.y + (y - HUB.y) * SQUASH_Y;
const unsq = (y: number) => HUB.y + (y - HUB.y) / SQUASH_Y;

// Curva orgânica entre dois nós — não linha reta: dendritos não são retos, e a leve
// assimetria (offset perpendicular ao ponto médio, variando com o índice) evita que a rede
// pareça uma roda de bicicleta perfeita.
function edgePath(ax: number, ay: number, bx: number, by: number, seed: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bend = (seed % 5) - 2; // -2..2, determinístico por índice
  const cx = mx + nx * bend;
  const cy = my + ny * bend;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
}

// Puxão gravitacional: um ponto se desloca em direção ao centro, mais forte quanto mais perto
// (1/distância, com amortecimento pra não furar o centro).
function pull(px: number, py: number, cx: number, cy: number, strength: number, reach: number) {
  const dx = cx - px;
  const dy = cy - py;
  const dist = Math.hypot(dx, dy);
  if (dist > reach || dist < 0.0001) return [0, 0];
  const falloff = 1 - dist / reach; // 1 no centro, 0 na borda do alcance
  const mag = Math.sign(strength) * Math.min(Math.abs(strength) * falloff * falloff, dist * 0.9);
  return [(dx / dist) * mag, (dy / dist) * mag];
}

// Campo de estrelas — posições e brilho pseudo-aleatórios, mas determinísticos (sem
// Math.random: SSR e primeira pintura no cliente têm que bater, senão o React reclama de
// hydration mismatch).
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: pseudoRandom(i * 3.1) * 120 - 10,
  y: pseudoRandom(i * 7.7 + 1) * 120 - 10,
  r: 0.12 + pseudoRandom(i * 5.3 + 2) * 0.28,
  o: 0.15 + pseudoRandom(i * 9.1 + 3) * 0.55,
  delay: pseudoRandom(i * 4.4 + 4) * 6,
}));

type Edge = { id: string; from: Node; to: Node; seed: number; primary: boolean; a: string; b: string };

// Tempo entre pulsos do hub e quanto tempo cada onda leva pra atravessar o raio de contenção.
const PULSE_INTERVAL = 5.5;
const PULSE_DURATION = 2.4;
const PULSE_MAX_R = 34;

// Um único loop de animação cuida de tudo que se move: cada neurônio vaga sozinho (partícula
// com posição e rumo próprios, em espaço verdadeiro), o hub emite um pulso periódico que
// empurra os vizinhos, o cursor empurra neurônios por perto e um nó pode ser arrastado — tudo
// em refs/DOM direto, sem passar pelo estado do React.
function useSpacetime(
  nodeRefs: React.RefObject<Map<string, SVGGElement>>,
  edgeRefs: React.RefObject<Map<string, SVGPathElement>>,
  pulseRef: React.RefObject<SVGEllipseElement | null>,
  svgRef: React.RefObject<SVGSVGElement | null>,
  dragIdRef: React.RefObject<string | null>,
  activeIdRef: React.RefObject<string | null>,
  edges: Edge[]
) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // mouse.y fica em espaço já achatado (onde o cursor realmente está na tela); pra física
    // dos neurônios precisamos da versão "verdadeira" (unsq).
    const mouse = { x: -999, y: -999, active: false };
    const svg = svgRef.current;
    function toSvgPoint(clientX: number, clientY: number) {
      if (!svg) return null;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const p = pt.matrixTransform(ctm.inverse());
      return [p.x, p.y] as const;
    }
    function onMove(ev: PointerEvent) {
      const p = toSvgPoint(ev.clientX, ev.clientY);
      if (!p) return;
      mouse.x = p[0];
      mouse.y = p[1];
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }
    svg?.addEventListener("pointermove", onMove);
    svg?.addEventListener("pointerleave", onLeave);

    const CONTAIN_RADIUS = 26;
    const state = new Map(
      DRAGGABLE.map((n, i) => [
        n.id,
        {
          x: n.x,
          y: n.y,
          vx: 0,
          vy: 0,
          angle: ((i * 137.5) % 360) * (Math.PI / 180), // ângulo áureo — direções iniciais bem espalhadas
          speed: 0.55 + (i % 3) * 0.15,
          wanderFreq: 0.05 + (i % 5) * 0.012,
          phase: i * 2.1,
          turnRate: 0.8 + (i % 3) * 0.2,
          lastPulseCycle: -1,
        },
      ])
    );

    let raf = 0;
    let lastT = 0;
    const offsets = new Map<string, { x: number; y: number }>();

    function tick(tMs: number) {
      const t = tMs / 1000; // requestAnimationFrame dá tempo em ms
      const dt = lastT ? Math.min(t - lastT, 0.05) : 0;
      lastT = t;
      const mouseTrueY = unsq(mouse.y);

      // pulso do hub: expande, empurra quem estiver no raio de passagem uma vez por ciclo
      const pulseCycle = Math.floor(t / PULSE_INTERVAL);
      const pulseT = t - pulseCycle * PULSE_INTERVAL;
      const pulsing = pulseT < PULSE_DURATION;
      const pulseR = pulsing ? (pulseT / PULSE_DURATION) * PULSE_MAX_R : 0;
      const ring = pulseRef.current;
      if (ring) {
        if (pulsing) {
          const fade = 1 - pulseT / PULSE_DURATION;
          ring.setAttribute("rx", pulseR.toFixed(2));
          ring.setAttribute("ry", (pulseR * SQUASH_Y).toFixed(2));
          ring.setAttribute("opacity", (fade * 0.5).toFixed(2));
        } else {
          ring.setAttribute("opacity", "0");
        }
      }

      // instantâneo das posições no início do quadro — a repulsão entre nós lê daqui, não do
      // valor já atualizado neste mesmo laço, senão a ordem de iteração vira viés
      const snapshot = DRAGGABLE.map((n) => {
        const s = state.get(n.id)!;
        return { id: n.id, x: s.x, y: s.y, r: n.r };
      });

      for (const n of DRAGGABLE) {
        const s = state.get(n.id)!;

        if (dragIdRef.current === n.id) {
          s.vx = (mouse.x - s.x) / (dt || 0.016);
          s.vy = (mouseTrueY - s.y) / (dt || 0.016);
          s.x = mouse.x;
          s.y = mouseTrueY;
        } else if (!prefersReduced && dt > 0) {
          s.angle += Math.sin(t * s.wanderFreq + s.phase) * s.turnRate * dt;
          let vx = Math.cos(s.angle) * s.speed + s.vx * 0.9;
          let vy = Math.sin(s.angle) * s.speed + s.vy * 0.9;
          s.vx *= 0.9; // arremesso do drag decai rápido
          s.vy *= 0.9;

          const dHub = Math.hypot(s.x - HUB.x, s.y - HUB.y);
          if (dHub > CONTAIN_RADIUS) {
            const over = dHub - CONTAIN_RADIUS;
            vx += ((HUB.x - s.x) / dHub) * over * 0.4;
            vy += ((HUB.y - s.y) / dHub) * over * 0.4;
          }
          const [hx, hy] = pull(s.x, s.y, HUB.x, HUB.y, -6, 9);
          vx += hx;
          vy += hy;

          if (mouse.active) {
            const [px, py] = pull(s.x, s.y, mouse.x, mouseTrueY, -6, 15);
            vx += px;
            vy += py;
          }

          // repulsão entre nós — cada um mantém distância dos outros, raio de alcance
          // proporcional ao tamanho dos dois (esfera maior "empurra" de mais longe). O nó
          // selecionado cresce visualmente (r*1.35) e empurra num raio bem maior, pra abrir
          // espaço de verdade antes de satélites menores aparecerem do lado dele.
          for (const other of snapshot) {
            if (other.id === n.id) continue;
            const otherIsActive = other.id === activeIdRef.current;
            const otherR = otherIsActive ? other.r * 1.35 : other.r;
            const reach = otherIsActive ? (n.r + otherR) * 4.5 : (n.r + otherR) * 2.6;
            const strength = otherIsActive ? -9 : -5;
            const [rx, ry] = pull(s.x, s.y, other.x, other.y, strength, reach);
            vx += rx;
            vy += ry;
          }

          if (pulsing && s.lastPulseCycle !== pulseCycle && Math.abs(dHub - pulseR) < 1.8) {
            s.lastPulseCycle = pulseCycle;
            vx += ((s.x - HUB.x) / (dHub || 1)) * 9;
            vy += ((s.y - HUB.y) / (dHub || 1)) * 9;
          }

          s.x += vx * dt;
          s.y += vy * dt;
        }
        offsets.set(n.id, { x: s.x - n.x, y: s.y - n.y });
        const g = nodeRefs.current?.get(n.id);
        // dx fica em espaço verdadeiro (x não é achatado); dy precisa multiplicar por
        // SQUASH_Y pra continuar batendo com a posição base já desenhada achatada (sq(n.y))
        if (g) g.setAttribute("transform", `translate(${(s.x - n.x).toFixed(2)},${((s.y - n.y) * SQUASH_Y).toFixed(2)})`);
      }
      for (const e of edges) {
        const path = edgeRefs.current?.get(e.id);
        if (!path) continue;
        const oa = offsets.get(e.from.id) ?? { x: 0, y: 0 };
        const ob = offsets.get(e.to.id) ?? { x: 0, y: 0 };
        path.setAttribute(
          "d",
          edgePath(e.from.x + oa.x, sq(e.from.y + oa.y), e.to.x + ob.x, sq(e.to.y + ob.y), e.seed)
        );
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      svg?.removeEventListener("pointermove", onMove);
      svg?.removeEventListener("pointerleave", onLeave);
    };
  }, [nodeRefs, edgeRefs, pulseRef, svgRef, dragIdRef, activeIdRef, edges]);
}

export function SynapseNetwork() {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const byId = useMemo(() => new Map(NODES.map((n) => [n.id, n])), []);
  const active = activeId ? byId.get(activeId) : null;
  // painel do Agamoto não tem `en` — cai pro pt de propósito, mesmo com o toggle em EN
  const panelPair = activeId ? PANELS[activeId] : null;
  const panel = panelPair ? (lang === "en" && panelPair.en ? panelPair.en : panelPair.pt) : null;
  const panelLinks = activeId ? PANEL_LINKS[activeId] : undefined;

  // Todo mundo conectado: dendrito principal (hub → cada seção, mais grosso) e uma malha
  // completa entre as seções primárias — qualquer nó alcança qualquer outro. Satélite de
  // projeto continua só ligado a "Projetos".
  const edges = useMemo<Edge[]>(() => {
    const list: Edge[] = [];
    const primaries = NODES.filter((n) => n.kind === "primary");

    NODES.filter((n) => n.parent).forEach((n, i) => {
      list.push({ id: `${n.parent}-${n.id}`, from: byId.get(n.parent!)!, to: n, seed: i, primary: true, a: n.parent!, b: n.id });
    });

    let seed = 100;
    for (let i = 0; i < primaries.length; i++) {
      for (let j = i + 1; j < primaries.length; j++) {
        const a = primaries[i];
        const b = primaries[j];
        list.push({ id: `${a.id}~${b.id}`, from: a, to: b, seed: seed++, primary: false, a: a.id, b: b.id });
      }
    }
    return list;
  }, [byId]);

  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Map<string, SVGGElement>>(new Map());
  const edgeRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const pulseRef = useRef<SVGEllipseElement>(null);
  const dragIdRef = useRef<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activeId;
  const [dragging, setDragging] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const wasDrag = useRef(false);
  useSpacetime(nodeRefs, edgeRefs, pulseRef, svgRef, dragIdRef, activeIdRef, edges);

  function handleClick(id: string) {
    // clique só abre a ficha se o gesto não foi um arraste — senão soltar o nó também
    // dispararia o painel, o que não é a intenção
    if (wasDrag.current) {
      wasDrag.current = false;
      return;
    }
    setActiveId((cur) => (cur === id ? null : id));
  }

  function startDrag(ev: React.PointerEvent<SVGGElement>, id: string) {
    (ev.target as Element).setPointerCapture?.(ev.pointerId);
    dragStart.current = { x: ev.clientX, y: ev.clientY };
    wasDrag.current = false;
    dragIdRef.current = id;
    setDragging(id);
  }
  function endDrag(ev: React.PointerEvent<SVGGElement>) {
    const moved = Math.hypot(ev.clientX - dragStart.current.x, ev.clientY - dragStart.current.y);
    wasDrag.current = moved > 4;
    dragIdRef.current = null;
    setDragging(null);
  }

  const projetosOpen = activeId === "projetos" || byId.get(activeId ?? "")?.parent === "projetos";
  const activeLinked = new Set<string>();
  if (activeId) {
    for (const e of edges) {
      if (e.a === activeId) activeLinked.add(e.b);
      if (e.b === activeId) activeLinked.add(e.a);
    }
  }

  return (
    <div className="relative h-full w-full">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="h-full w-full touch-none"
        role="img"
        aria-label="Mapa de seções do portfólio, em forma de rede neural"
      >
        {/* campo de estrelas — profundidade de fundo, atrás de tudo */}
        <g>
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={WHITE} opacity={s.o}>
              <animate attributeName="opacity" values={`${s.o};${s.o * 0.25};${s.o}`} dur={`${4 + (i % 5)}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* pulso do hub */}
        <ellipse
          ref={pulseRef}
          cx={HUB.x}
          cy={sq(HUB.y)}
          rx={0}
          ry={0}
          opacity={0}
          fill="none"
          stroke={WHITE}
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
        />

        {/* sinapses */}
        {edges.map((e) => {
          const on = e.a === activeId || e.b === activeId;
          const dim = e.to.kind === "project" && !projetosOpen;
          return (
            <path
              key={e.id}
              ref={(el) => {
                if (el) edgeRefs.current.set(e.id, el);
                else edgeRefs.current.delete(e.id);
              }}
              d={edgePath(e.from.x, sq(e.from.y), e.to.x, sq(e.to.y), e.seed)}
              fill="none"
              stroke={on ? WHITE : e.primary ? FAINT : LINE}
              strokeWidth={on ? 0.35 : e.primary ? 0.22 : 0.1}
              strokeDasharray={e.primary ? undefined : "0.4 1.1"}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke,stroke-width,opacity] duration-500"
              style={{ opacity: dim ? 0 : on ? 1 : e.primary ? 0.7 : 0.35 }}
            />
          );
        })}

        {/* núcleos — flat, sem sombreamento esférico */}
        {NODES.map((n) => {
          const isActive = activeId === n.id;
          const isLinked = activeLinked.has(n.id);
          const isHub = n.kind === "hub";
          const hidden = n.kind === "project" && !projetosOpen;
          const ny = sq(n.y);
          return (
            <g
              key={n.id}
              ref={(el) => {
                if (el) nodeRefs.current.set(n.id, el);
                else nodeRefs.current.delete(n.id);
              }}
              onClick={() => !isHub && handleClick(n.id)}
              onPointerDown={(ev) => !isHub && startDrag(ev, n.id)}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={isHub ? "" : dragging === n.id ? "cursor-grabbing" : "cursor-grab"}
              style={{
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
                transition: dragging === n.id ? "none" : "opacity 400ms ease",
              }}
            >
              {/* alvo de toque invisível, maior que o ícone visível — mira/arrasta em telas
                  pequenas sem inflar o desenho */}
              {!isHub && <circle cx={n.x} cy={ny} r={n.r + 3} fill="transparent" />}

              {isHub ? (
                <>
                  {/* nó de comando: núcleo sólido + anel de mira tracejado girando devagar */}
                  <ellipse
                    cx={n.x}
                    cy={ny}
                    rx={n.r * 1.9}
                    ry={n.r * 1.9 * SQUASH_Y}
                    fill="none"
                    stroke={FAINT}
                    strokeWidth="0.18"
                    strokeDasharray="1.4 1.6"
                    vectorEffect="non-scaling-stroke"
                  >
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${n.x} ${ny}`} to={`360 ${n.x} ${ny}`} dur="26s" repeatCount="indefinite" />
                  </ellipse>
                  <circle cx={n.x} cy={ny} r={n.r} fill={WHITE} />
                </>
              ) : (
                <>
                  <circle
                    cx={n.x}
                    cy={ny}
                    r={isActive ? n.r * 1.35 : n.r}
                    fill={isActive ? WHITE : "#141412"}
                    stroke={WHITE}
                    strokeWidth={isLinked ? 0.42 : 0.3}
                    strokeOpacity={isLinked && !isActive ? 0.9 : 1}
                    vectorEffect="non-scaling-stroke"
                    className="transition-[r,fill,stroke-width] duration-500 ease-out"
                  />
                  {/* retículo de mira nos cantos — só no nó selecionado, tipo alvo travado */}
                  {isActive &&
                    [
                      [-1, -1],
                      [1, -1],
                      [-1, 1],
                      [1, 1],
                    ].map(([sx, sy], i) => (
                      <path
                        key={i}
                        d={`M ${n.x + sx * n.r * 1.9} ${ny + sy * n.r * 2.6} L ${n.x + sx * n.r * 1.9} ${ny + sy * n.r * 1.9} L ${n.x + sx * n.r * 2.6} ${ny + sy * n.r * 1.9}`}
                        fill="none"
                        stroke={WHITE}
                        strokeWidth="0.22"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                </>
              )}

              {!isHub && (
                <text
                  x={n.x}
                  y={n.kind === "project" ? ny + n.r + 3.2 : ny + n.r + 3.6}
                  textAnchor="middle"
                  className="select-none uppercase"
                  style={{
                    fill: isActive ? WHITE : isLinked ? MUTED : DIM,
                    fontSize: n.kind === "project" ? 1.4 : 1.6,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.06em",
                    transition: "fill 400ms ease",
                  }}
                >
                  {lang === "en" && n.label.en ? n.label.en : n.label.pt}
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

            {panelLinks && (
              <div className="mt-6 flex flex-col gap-3 border-t border-[#2a2a28] pt-6">
                {panelLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-mono text-sm text-[#f5f4f0] underline decoration-[#3a3a38] underline-offset-4 transition-colors hover:decoration-[#f5f4f0]"
                  >
                    {lang === "en" && activeId !== "agamoto" ? (LINK_LABEL_EN[l.label] ?? l.label) : l.label}
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
