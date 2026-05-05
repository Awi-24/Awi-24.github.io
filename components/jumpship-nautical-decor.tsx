"use client"

import { useRef, useEffect } from "react"
import { useReducedMotion } from "framer-motion"

type Props = {
  className?: string
}

const GOLD = {
  fillLo: "rgba(245,166,35,0.02)",
} as const

/**
 * Altura da superfície y(x, t) por superposição de sinusoides (dispersão linear).
 * u = coordenada espacial normalizada ao longo da largura; cada camada mistura harmónicos.
 */
function surfaceY(
  xPx: number,
  width: number,
  height: number,
  tSec: number,
  layer: 0 | 1 | 2,
): number {
  const u = (xPx / width) * Math.PI * 2
  const L = layer

  const baseFromTop = height * (0.34 + L * 0.055)

  const k0 = 1.1 + L * 0.15
  const k1 = 2.05 - L * 0.08
  const k2 = 3.4 + L * 0.25
  const k3 = 5.2 + L * 0.1

  const ω0 = 0.55 + L * 0.12
  const ω1 = 0.82 + L * 0.08
  const ω2 = 1.05 + L * 0.06
  const ω3 = 0.38 + L * 0.04

  const a0 = height * (0.038 - L * 0.006)
  const a1 = height * (0.026 - L * 0.004)
  const a2 = height * (0.016 - L * 0.002)
  const a3 = height * 0.01

  const drift = tSec * (0.25 + L * 0.05)

  return (
    baseFromTop +
    a0 * Math.sin(k0 * u + ω0 * tSec + drift + L * 0.4) +
    a1 * Math.sin(k1 * u - ω1 * tSec * 1.05 + 1.1 + L * 0.2) +
    a2 * Math.sin(k2 * u + ω2 * tSec * 0.85 + 0.7 * L) +
    a3 * Math.sin(k3 * u - ω3 * tSec + 2.2)
  )
}

type LayerSpec = {
  layer: 0 | 1 | 2
  fillAlpha0: number
  strokeAlpha: number
}

const LAYERS: LayerSpec[] = [
  { layer: 0, fillAlpha0: 0.08, strokeAlpha: 0.22 },
  { layer: 1, fillAlpha0: 0.1, strokeAlpha: 0.32 },
  { layer: 2, fillAlpha0: 0.12, strokeAlpha: 0.42 },
]

/** Simulação de ondas por superposição harmónica, renderizada em canvas (sem costuras horizontais). */
export function JumpShipNauticalWaves({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()
  const timeOriginRef = useRef<number | null>(null)
  const frozenTRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let cssW = 300
    let cssH = 112

    const syncSize = () => {
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2)
      cssW = container.clientWidth
      cssH = container.clientHeight
      if (cssW < 1 || cssH < 1) return
      canvas.width = Math.max(1, Math.round(cssW * dpr))
      canvas.height = Math.max(1, Math.round(cssH * dpr))
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(() => syncSize())
    ro.observe(container)
    syncSize()

    const step = 2

    const frame = (now: number) => {
      if (timeOriginRef.current === null) timeOriginRef.current = now
      let tSec = (now - timeOriginRef.current) / 1000
      if (reduceMotion) {
        tSec = frozenTRef.current
      } else {
        frozenTRef.current = tSec
      }

      const w = cssW
      const h = cssH
      if (w < 2 || h < 2) {
        if (!reduceMotion) raf = requestAnimationFrame(frame)
        return
      }

      ctx.clearRect(0, 0, w, h)

      for (const spec of LAYERS) {
        const L = spec.layer

        ctx.beginPath()
        ctx.moveTo(0, h)
        for (let x = 0; x <= w; x += step) {
          const y = surfaceY(x, w, h, tSec, L)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h)
        ctx.closePath()

        const yMid = surfaceY(w * 0.5, w, h, tSec, L)
        const grad = ctx.createLinearGradient(0, yMid - h * 0.08, 0, h)
        grad.addColorStop(0, `rgba(245,166,35,${spec.fillAlpha0 + 0.06})`)
        grad.addColorStop(0.55, `rgba(245,166,35,${spec.fillAlpha0 * 0.5})`)
        grad.addColorStop(1, GOLD.fillLo)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        let first = true
        for (let x = 0; x <= w; x += step) {
          const y = surfaceY(x, w, h, tSec, L)
          if (first) {
            ctx.moveTo(x, y)
            first = false
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.strokeStyle = `rgba(245,166,35,${spec.strokeAlpha})`
        ctx.lineWidth = L === 2 ? 1.25 : 1
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.stroke()
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      syncSize()
      frame(performance.now())
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      timeOriginRef.current = null
    }
  }, [reduceMotion])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 overflow-hidden md:h-32 ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute bottom-0 left-0 block h-full w-full" />
    </div>
  )
}
