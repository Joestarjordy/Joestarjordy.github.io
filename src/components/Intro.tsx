import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const word = 'PORTFOLIO'
const EXIT_MS = 1400

// Only transform + opacity are animated (GPU-composited) - no filters, no blur layers.
const desktopLetters: Variants = {
  hidden: { opacity: 0, y: 70, rotateX: -80 },
  show: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { delay: 0.3 + i * 0.07, type: 'spring', stiffness: 90, damping: 14 },
  }),
  exit: (i: number) => ({
    opacity: 0, scale: 1.7, z: 300, y: i % 2 ? -30 : 30,
    transition: { duration: 0.55, delay: Math.abs(i - 4) * 0.03, ease: [0.5, 0, 0.75, 0] },
  }),
}

// Lighter 2D/GPU-friendly transforms for mobile (Android/iOS) to avoid preserve-3d layer stalls.
const mobileLetters: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.2 + i * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: (i: number) => ({
    opacity: 0, scale: 1.18, x: i % 2 ? -48 : 48,
    transition: { duration: 0.45, delay: Math.abs(i - 4) * 0.025, ease: [0.4, 0, 1, 1] },
  }),
}

const ease = [0.76, 0, 0.24, 1] as const

export default function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const started = useRef(false)
  const timer = useRef<number>(0)

  const go = useCallback(() => {
    if (started.current) return
    started.current = true
    setLeaving(true)
    timer.current = window.setTimeout(onDone, EXIT_MS)
  }, [onDone])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (!e.repeat) go() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  // Lock page scroll while the intro gate is active, restore on unmount.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
      onClick={go}
      className={`fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden text-white select-none [-webkit-tap-highlight-color:transparent] ${leaving ? 'pointer-events-none' : ''}`}
    >
      {/* two curtains: vertical split (left/right) on mobile, horizontal split (top/bottom) on desktop */}
      <motion.div
        aria-hidden
        style={{ backfaceVisibility: 'hidden' }}
        className={
          isMobile
            ? 'absolute inset-y-0 left-0 w-1/2 bg-[#07080a] will-change-transform'
            : 'absolute inset-x-0 top-0 h-1/2 bg-[#07080a] will-change-transform'
        }
        animate={isMobile ? { x: leaving ? '-102%' : '0%' } : { y: leaving ? '-102%' : '0%' }}
        transition={{ duration: isMobile ? 0.78 : 0.9, delay: leaving ? 0.38 : 0, ease }}
      >
        <div className={isMobile ? 'absolute inset-y-0 right-0 w-px bg-acid/60' : 'absolute inset-x-0 bottom-0 h-px bg-acid/60'} />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ backfaceVisibility: 'hidden' }}
        className={
          isMobile
            ? 'absolute inset-y-0 right-0 w-1/2 bg-[#07080a] will-change-transform'
            : 'absolute inset-x-0 bottom-0 h-1/2 bg-[#07080a] will-change-transform'
        }
        animate={isMobile ? { x: leaving ? '102%' : '0%' } : { y: leaving ? '102%' : '0%' }}
        transition={{ duration: isMobile ? 0.78 : 0.9, delay: leaving ? 0.38 : 0, ease }}
      >
        <div className={isMobile ? 'absolute inset-y-0 left-0 w-px bg-acid/60' : 'absolute inset-x-0 top-0 h-px bg-acid/60'} />
      </motion.div>

      {/* soft glow (sized to fit mobile viewport without huge offscreen overdraw) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-80 w-80 rounded-full will-change-transform md:h-[40rem] md:w-[40rem]"
        style={{ background: 'radial-gradient(circle, rgba(198,255,61,.16), transparent 65%)', backfaceVisibility: 'hidden' }}
        animate={leaving ? { scale: 1.4, opacity: 0 } : { scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={leaving ? { duration: 0.55 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative px-4" style={isMobile ? undefined : { perspective: 800 }}>
        <motion.h1
          key={isMobile ? 'm' : 'd'}
          className={
            isMobile
              ? 'font-display flex flex-col items-center text-[clamp(1.6rem,5.4dvh,3rem)] leading-[0.92] font-extrabold tracking-tight'
              : 'font-display flex text-[clamp(2rem,8.8vw,8.5rem)] leading-none font-extrabold tracking-tight'
          }
          style={isMobile ? undefined : { transformStyle: 'preserve-3d' }}
          initial="hidden"
          animate={leaving ? 'exit' : 'show'}
        >
          {word.split('').map((ch, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={isMobile ? mobileLetters : desktopLetters}
              style={{ backfaceVisibility: 'hidden' }}
              className={`inline-block will-change-transform ${i % 2 ? 'text-acid' : ''}`}
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      <motion.p
        className="relative mt-4 font-mono text-xs text-white/60 md:mt-10 md:text-sm"
        initial={{ opacity: 0 }}
        animate={leaving ? { opacity: 0 } : { opacity: [0, 1, 0.3, 1] }}
        transition={leaving ? { duration: 0.2 } : { delay: 1.4, duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      >
        {isMobile ? 'tap to enter' : 'click or press any key to enter'}
      </motion.p>
    </div>
  )
}
