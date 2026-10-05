import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowUpRight, BookOpen, Download, ExternalLink, Mail, MapPin, Code2, GraduationCap } from 'lucide-react'
import Scene from './components/Scene'
import { cn } from './lib/cn'
import {
  profile, skills, stats, projects, experience, education, thesis, categories, type Category,
} from './data/portfolio'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
}
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const Reveal = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
)

function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  useEffect(() => {
    let w = 0, c = 0, del = false
    let timer: number
    const tick = () => {
      const word = words[w]
      c += del ? -1 : 1
      setText(word.slice(0, c))
      let delay = del ? 40 : 90
      if (!del && c === word.length) { del = true; delay = 1400 }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; delay = 300 }
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 600)
    return () => window.clearTimeout(timer)
  }, [words])
  return text
}

type Project = (typeof projects)[number]

function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
    >
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect()
          setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 10 })
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform .15s ease-out' }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
      >
        <div
          className="absolute -top-16 -right-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-60"
          style={{ background: p.color }}
        />
        <div className="flex items-center justify-between font-mono text-xs text-bone/50">
          <span>/{p.id} · {p.cat}</span>
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: p.color }} />
        </div>
        <h3 className="font-display mt-10 text-2xl font-bold">{p.title}</h3>
        <p className="mt-3 flex-1 text-sm text-bone/70">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px]">{t}</span>
          ))}
        </div>
        <div className="mt-5 flex gap-4 border-t border-white/10 pt-4 font-mono text-xs">
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-acid">
            <Code2 size={14} /> GitHub
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-acid">
              <ExternalLink size={14} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const scroll = useRef(0)
  const role = useTypewriter(profile.typewriter)
  const [filter, setFilter] = useState<'all' | Category>('all')
  const shown = projects.filter((p) => filter === 'all' || p.category === filter)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scroll.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const [sent, setSent] = useState(false)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`
    const url = `https://mail.google.com/mail/?view=cm&to=${profile.email}&su=${encodeURIComponent(String(f.get('subject')))}&body=${encodeURIComponent(body)}`
    window.open(url, '_blank', 'noopener')
    setSent(true)
  }
  const input = 'w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-acid'

  return (
    <>
      <Scene scroll={scroll} />

      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between bg-gradient-to-b from-ink/90 to-transparent px-6 py-5 md:px-12">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          JCB<span className="text-acid">.</span>
        </a>
        <nav className="glass hidden gap-8 rounded-full px-6 py-2 font-mono text-xs md:flex">
          {['about', 'education', 'experience', 'skills', 'work', 'contact'].map((s) => (
            <a key={s} href={`#${s}`} className="uppercase tracking-widest transition-colors hover:text-acid">{s}</a>
          ))}
        </nav>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded-full bg-acid px-4 py-2 font-mono text-xs font-medium text-black transition-transform hover:scale-105">
          Resume
        </a>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section id="top" className="flex min-h-screen flex-col justify-center px-6 pt-28 pb-12 md:px-12">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.p variants={fadeUp} className="font-mono text-sm text-acid">
              &gt; STATUS: ONLINE — open for projects
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display mt-4 text-[clamp(2.75rem,min(10vw,15vh),8.5rem)] leading-[0.9] font-extrabold tracking-tighter uppercase">
              Jordy<br /><span className="outline-text">Cahya</span><br />Buana
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 h-8 font-mono text-xl text-ice">
              {role}<span className="animate-pulse">▍</span>
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 max-w-md text-lg text-bone/70">{profile.tagline}</motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a href="#work" className="rounded-full bg-bone px-6 py-3 font-mono text-sm text-black transition-colors hover:bg-acid">Explore Projects ↓</a>
              <a href="#contact" className="glass rounded-full px-6 py-3 font-mono text-sm transition-colors hover:border-acid">Let's Talk</a>
            </motion.div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-white/10 bg-ink/60 py-4 backdrop-blur">
          <div className="marquee flex w-max gap-10 font-display text-2xl font-bold whitespace-nowrap uppercase">
            {[...skills, ...skills, ...skills].map((s, i) => (
              <span key={i} className={i % 2 ? 'outline-text' : ''}>{s} <span className="text-acid">✦</span></span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="flex min-h-screen items-center px-6 py-24 md:px-12">
          <Reveal className="glass grid max-w-4xl gap-8 rounded-3xl p-8 md:ml-auto md:grid-cols-[200px_1fr] md:p-12">
            <motion.div variants={fadeUp} className="mx-auto w-44 md:w-full">
              <img src={profile.photo} alt={profile.name} loading="lazy" className="aspect-[3/4] w-full rounded-2xl border border-white/15 object-cover" />
              <p className="mt-3 flex items-center gap-1.5 font-mono text-xs text-bone/60"><MapPin size={13} /> {profile.location}</p>
            </motion.div>
            <div>
              <motion.p variants={fadeUp} className="font-mono text-sm text-acid">/ about — {profile.role}</motion.p>
              <motion.h2 variants={fadeUp} className="font-display mt-3 text-3xl font-bold md:text-4xl">{profile.aboutTitle}</motion.h2>
              {profile.about.map((t) => (
                <motion.p key={t} variants={fadeUp} className="mt-4 text-bone/75">{t}</motion.p>
              ))}
              <motion.div variants={fadeUp} className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-extrabold text-acid">{s.value}</div>
                    <div className="font-mono text-[11px] text-bone/60">{s.label}</div>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3 font-mono text-xs">
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-acid px-4 py-2 text-black"><Download size={14} /> My Resume</a>
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 hover:border-acid hover:text-acid">{s.label} ↗</a>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </section>

        {/* EDUCATION */}
        <section id="education" className="px-6 py-24 md:px-12">
          <Reveal>
            <motion.p variants={fadeUp} className="font-mono text-sm text-ice">/ education</motion.p>
            <motion.h2 variants={fadeUp} className="font-display mt-3 text-4xl font-bold md:text-5xl">Where it all started.</motion.h2>
            <motion.div variants={fadeUp} className="glass relative mt-8 max-w-4xl overflow-hidden rounded-3xl p-8 md:p-10">
              <GraduationCap aria-hidden size={160} className="pointer-events-none absolute -top-6 -right-6 text-acid/10" />
              <div className="font-mono text-xs text-acid">{education.date}</div>
              <h3 className="font-display mt-2 text-2xl font-bold md:text-3xl">{education.school}</h3>
              <div className="mt-1 font-mono text-sm text-ice">{education.faculty}</div>
              <div className="mt-1 text-bone/80">{education.degree}</div>
              <p className="mt-4 max-w-2xl text-sm text-bone/70">{education.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
                {education.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-white/20 px-4 py-2 hover:border-acid hover:text-acid">{h}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-1.5 font-mono text-xs text-bone/60"><MapPin size={13} /> {education.location}</div>
            </motion.div>
          </Reveal>
        </section>

        {/* EXPERIENCE + THESIS */}        <section id="experience" className="px-6 py-24 md:px-12">
          <Reveal className="grid gap-6 lg:grid-cols-2">
            <div>
              <motion.p variants={fadeUp} className="font-mono text-sm text-ice">/ experience</motion.p>
              <motion.h2 variants={fadeUp} className="font-display mt-3 text-4xl font-bold md:text-5xl">Where I've levelled up.</motion.h2>
              <div className="mt-8 space-y-5 border-l border-white/15 pl-6">
                {experience.map((e) => (
                  <motion.div key={e.role} variants={fadeUp} className="glass relative rounded-2xl p-6">
                    <span className="absolute top-8 -left-[31px] h-3 w-3 rounded-full bg-acid shadow-[0_0_14px_var(--color-acid)]" />
                    <div className="font-mono text-xs text-acid">{e.date}</div>
                    <h3 className="font-display mt-1 text-xl font-bold">{e.role}</h3>
                    <div className="text-sm text-ice">{e.org}</div>
                    <p className="mt-2 text-sm text-bone/70">{e.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.a
              variants={fadeUp}
              href={thesis.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-8"
              style={{ backgroundImage: `linear-gradient(to top, rgba(7,8,10,.97) 35%, rgba(7,8,10,.55)), url(${thesis.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <span className="mb-3 flex items-center gap-2 font-mono text-xs text-acid"><BookOpen size={14} /> Published Thesis</span>
              <h3 className="font-display text-xl leading-snug font-bold">“{thesis.title}”</h3>
              <p className="mt-3 font-mono text-xs text-ice">{thesis.journal}</p>
              <p className="mt-2 text-sm text-bone/70">{thesis.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm group-hover:text-acid">Read Published Paper <ArrowUpRight size={16} /></span>
            </motion.a>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section id="skills" className="flex min-h-[80vh] items-center px-6 py-24 md:px-12">
          <Reveal className="max-w-3xl">
            <motion.p variants={fadeUp} className="font-mono text-sm text-ice">/ tech stack</motion.p>
            <motion.h2 variants={fadeUp} className="font-display mt-3 text-4xl font-bold md:text-6xl">Stack I bend to my will.</motion.h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {skills.map((s) => (
                <motion.span
                  key={s}
                  variants={fadeUp}
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  className="glass cursor-default rounded-full px-5 py-3 font-mono text-sm hover:border-ice hover:text-ice"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* WORK */}
        <section id="work" className="px-6 py-24 md:px-12">
          <Reveal>
            <motion.p variants={fadeUp} className="font-mono text-sm text-[#ff6b9d]">/ engineered systems &amp; creative labs</motion.p>
            <motion.h2 variants={fadeUp} className="font-display mt-3 text-4xl font-bold md:text-6xl">Selected projects.</motion.h2>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    'rounded-full border px-4 py-2 transition-colors',
                    filter === c.id ? 'border-acid bg-acid text-black' : 'border-white/20 hover:border-acid hover:text-acid',
                  )}
                >
                  {c.label}
                </button>
              ))}
            </motion.div>
          </Reveal>
          <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => <ProjectCard key={p.id} p={p} />)}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-12">
          <Reveal className="grid items-center gap-12 lg:grid-cols-2">
            <div className="@container min-w-0">
              <motion.p variants={fadeUp} className="font-mono text-sm text-acid">/ contact</motion.p>
              <motion.h2 variants={fadeUp} className="font-display mt-3 text-[clamp(1.5rem,8.5cqw,4.5rem)] leading-[1.05] font-extrabold whitespace-nowrap uppercase">
                Let's create<br /><span className="outline-text">something</span><br />together.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-md text-bone/70">
                I'm always open to discussing new engineering projects, mobile systems, or collaboration ideas.
              </motion.p>
              <motion.a variants={fadeUp} href={`mailto:${profile.email}`} className="mt-6 inline-flex items-center gap-3 font-mono text-sm hover:text-acid">
                <Mail size={18} /> {profile.email}
              </motion.a>
              <motion.div variants={fadeUp} className="mt-3 flex items-center gap-3 font-mono text-sm text-bone/70">
                <MapPin size={18} /> {profile.location}
              </motion.div>
            </div>
            <motion.form variants={fadeUp} onSubmit={onSubmit} className="glass relative z-10 min-w-0 space-y-4 rounded-2xl p-6">
              <div className="flex items-center gap-2 pb-2 font-mono text-xs text-bone/50">
                <span className="h-3 w-3 rounded-full bg-red-500" /><span className="h-3 w-3 rounded-full bg-yellow-400" /><span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2">jordy@malang:~$ mailer.sh</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Your Name" aria-label="Name" className={input} />
                <input name="email" type="email" required placeholder="you@example.com" aria-label="Email" className={input} />
              </div>
              <input name="subject" required placeholder="Project Inquiry" aria-label="Subject" className={input} />
              <textarea name="message" required rows={5} placeholder="Write your message here..." aria-label="Message" className={input} />
              <button type="submit" className="rounded-full bg-acid px-6 py-3 font-mono text-sm font-medium text-black transition-transform hover:scale-105">
                Execute Transmission
              </button>
              {sent && <p className="font-mono text-xs text-ice">Opening Gmail in a new tab — hit send there to deliver your message.</p>}
            </motion.form>
          </Reveal>
          <footer className="mt-24 font-mono text-xs text-bone/40">© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</footer>
        </section>
      </main>
    </>
  )
}
