"use client"

import Image from "next/image"
import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion"

type JumpShipLogoHeroProps = {
  className?: string
}

/** Hero exclusiva: só a logo, com tilt 3D sutil ao mover o ponteiro. */
export function JumpShipLogoHero({ className = "" }: JumpShipLogoHeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 120, damping: 24 }
  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], reduceMotion ? [0, 0] : [10, -10]),
    spring,
  )
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], reduceMotion ? [0, 0] : [-12, 12]),
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

  return (
    <section
      className={`relative flex min-h-[38vh] items-center justify-center px-4 py-10 md:min-h-[44vh] md:py-14 ${className}`}
    >
      <div
        ref={wrapRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative w-full max-w-2xl [perspective:1000px]"
      >
        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
        >
          <Image
            src="/jumpship-logo.png"
            alt="JumpShip"
            width={640}
            height={192}
            className="h-auto w-full max-w-xl mx-auto object-contain opacity-[0.97] drop-shadow-[0_20px_60px_rgba(245,166,35,0.22)] md:max-w-2xl"
            unoptimized
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
