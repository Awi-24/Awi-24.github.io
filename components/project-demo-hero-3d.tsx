"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"

export type ProjectDemoHeroShape = "cube" | "layers" | "prism"

export type ProjectDemoHero3DProps = {
  accent?: string
  secondary?: string
  shape?: ProjectDemoHeroShape
  className?: string
}

export function ProjectDemoHero3D({
  accent = "#00ffff",
  secondary = "rgba(0, 255, 159, 0.35)",
  shape = "cube",
  className = "",
}: ProjectDemoHero3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 140, damping: 22, mass: 0.6 }
  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], reduceMotion ? [0, 0] : [14, -14]),
    spring,
  )
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-18, 18]),
    spring,
  )

  function onPointerMove(e: React.PointerEvent) {
    const el = wrapRef.current
    if (!el || reduceMotion) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onPointerLeave() {
    mx.set(0)
    my.set(0)
  }

  const dim = `${accent}33`

  const core = (() => {
    if (shape === "layers") {
      return (
        <>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 backdrop-blur-[1px]"
              style={{
                width: `${72 - i * 10}px`,
                height: `${48 - i * 6}px`,
                borderColor: i === 0 ? accent : dim,
                background: `linear-gradient(135deg, ${accent}28, transparent)`,
                transform: `translate(-50%, -50%) translateZ(${12 - i * 24}px) rotateX(${i * 4}deg)`,
                opacity: 0.75 - i * 0.12,
              }}
            />
          ))}
        </>
      )
    }
    if (shape === "prism") {
      return (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-16 w-10 -translate-x-1/2 -translate-y-1/2 border-2"
            style={{
              borderColor: accent,
              transform: "translate(-50%, -50%) translateZ(28px) rotateY(32deg)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              opacity: 0.85,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2"
            style={{
              borderColor: secondary,
              transform: "translate(-50%, -50%) translateZ(-18px) rotateX(54deg) rotateZ(12deg)",
              opacity: 0.55,
            }}
          />
        </>
      )
    }
    /* cube */
    return (
      <>
        <div
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 border-2"
          style={{
            borderColor: accent,
            transform: "translate(-50%, -50%) translateZ(22px) rotateX(-18deg) rotateY(28deg)",
            boxShadow: `0 0 24px ${dim}`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 border-2"
          style={{
            borderColor: secondary,
            transform: "translate(-50%, -50%) translateZ(-16px) rotateX(22deg) rotateY(-20deg)",
            opacity: 0.65,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-6 w-20 -translate-x-1/2 -translate-y-1/2 border"
          style={{
            borderColor: dim,
            transform: "translate(-50%, -50%) translateZ(4px) rotateX(90deg)",
            opacity: 0.5,
          }}
        />
      </>
    )
  })()

  return (
    <div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative mb-5 h-28 w-full overflow-hidden rounded-xl border md:h-36 ${className}`}
      style={{
        borderColor: dim,
        background:
          "radial-gradient(ellipse 80% 120% at 50% 120%, rgba(0,0,0,0.45), rgba(10,12,20,0.92))",
        perspective: "760px",
      }}
      role="presentation"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(90deg, ${accent} 1px, transparent 1px), linear-gradient(${accent} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          reduceMotion
            ? undefined
            : { rotateZ: [0, 2, -1, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
      >
        <div
          className="relative h-[100px] w-[160px] [transform-style:preserve-3d] md:h-[120px] md:w-[200px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {core}
        </div>
      </motion.div>
    </div>
  )
}
