import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const word = 'PORTFOLIO'
const EXIT_MS = 1500

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

const mobileLetters: Variants = {
  hidden: { opacity: 0, x: 40, rotateY: -80 },
  show: (i: number) => ({
    opacity: 1, x: 0, rotateY: 0, scale: 1,
    transition: { delay: 0.25 + i * 0.06, type: 'spring', stiffness: 90, damping: 14 },
  }),
  exit: (i: number) => ({
    opacity: 0, scale: 1.5, z: 250, x: i % 2 ? -35 : 35,
    transition: { duration: 0.55, delay: Math.abs(i - 4) * 0.03, ease: [0.5, 0, 0.75, 0] },
  }),
}

const ease = [0.76, 0, 0.24, 1] as const

export default function Intro({ onEnter, onDone }: { onEnter: () => void; onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const started = useRef(false)
  const timer = useRef<number>(0)

  const go = useCallback(() => {
    if (started.current) return
    started.current = true
    onEnter() // mount the page underneath while the intro still fully covers it
    setLeaving(true)
    timer.current = window.setTimeout(onDone, EXIT_MS)
  }, [onEnter, onDone])

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

  // Clear the pending exit timer only when the intro itself unmounts.
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Enter portfolio"
      onClick={go}
      className={`fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden text-white select-none ${leaving ? 'pointer-events-none' : ''}`}
    >
      {/* two curtains: vertical split (left/right) on mobile, horizontal split (top/bottom) on desktop */}
      <motion.div
        aria-hidden
        className={
          isMobile
            ? 'absolute inset-y-0 left-0 w-1/2 bg-[#07080a] will-change-transform'
            : 'absolute inset-x-0 top-0 h-1/2 bg-[#07080a] will-change-transform'
        }
        animate={isMobile ? { x: leaving ? '-100%' : '0%' } : { y: leaving ? '-100%' : '0%' }}
        transition={{ duration: 0.9, delay: leaving ? 0.5 : 0, ease }}
      >
        <div className={isMobile ? 'absolute inset-y-0 right-0 w-px bg-acid/60' : 'absolute inset-x-0 bottom-0 h-px bg-acid/60'} />
      </motion.div>
      <motion.div
        aria-hidden
        className={
          isMobile
            ? 'absolute inset-y-0 right-0 w-1/2 bg-[#07080a] will-change-transform'
            : 'absolute inset-x-0 bottom-0 h-1/2 bg-[#07080a] will-change-transform'
        }
        animate={isMobile ? { x: leaving ? '100%' : '0%' } : { y: leaving ? '100%' : '0%' }}
        transition={{ duration: 0.9, delay: leaving ? 0.5 : 0, ease }}
      >
        <div className={isMobile ? 'absolute inset-y-0 left-0 w-px bg-acid/60' : 'absolute inset-x-0 top-0 h-px bg-acid/60'} />
      </motion.div>

      {/* soft glow (radial gradient, no blur filter) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[40rem] w-[40rem] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(198,255,61,.16), transparent 65%)' }}
        animate={leaving ? { scale: 1.6, opacity: 0 } : { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={leaving ? { duration: 0.7 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative" style={{ perspective: 800 }}>
        <motion.h1
          key={isMobile ? 'm' : 'd'}
          className={
            isMobile
              ? 'font-display flex flex-col items-center text-[clamp(2rem,6.5vh,3.75rem)] leading-[0.95] font-extrabold tracking-tight'
              : 'font-display flex text-[clamp(2.5rem,12vw,10rem)] leading-none font-extrabold tracking-tight'
          }
          style={{ transformStyle: 'preserve-3d' }}
          initial="hidden"
          animate={leaving ? 'exit' : 'show'}
        >
          {word.split('').map((ch, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={isMobile ? mobileLetters : desktopLetters}
              className={`inline-block will-change-transform ${i % 2 ? 'text-acid' : ''}`}
            >
              {ch}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      <motion.p
        className="relative mt-6 font-mono text-xs text-white/60 md:mt-10 md:text-sm"
        initial={{ opacity: 0 }}
        animate={leaving ? { opacity: 0 } : { opacity: [0, 1, 0.3, 1] }}
        transition={leaving ? { duration: 0.2 } : { delay: 1.6, duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
      >
        {isMobile ? 'tap to enter' : 'click or press any key to enter'}
      </motion.p>
    </div>
  )
}
