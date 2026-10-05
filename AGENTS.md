# AGENTS.md - Project Facts

> Global coding, performance, and workflow rules live in `~/.gemini/GEMINI.md`.
> This file holds only facts specific to this portfolio.

## 1. Project
3D portfolio for **Jordy Cahya Buana** — single-page React 19 + Three.js (`@react-three/fiber` / `@react-three/drei`) site with an animated intro gate and scroll-linked camera rig.
- **Live:** https://joestarjordy.github.io/ (repo `Joestarjordy/Joestarjordy.github.io`, auto-deploys from `main` via `.github/workflows/deploy.yml`).
- **Public repo:** everything in `public/` (CV PDF, photos) is publicly accessible.

## 2. File Layout
```
src/main.tsx              entry; renders <Intro/> gate over <App/>
src/App.tsx               header/nav (desktop + mobile dropdown) and all page sections
src/components/Intro.tsx  "PORTFOLIO" 3D curtain intro gate
src/components/Scene.tsx  R3F canvas (hero mesh, instanced particles, satellites, scroll camera rig)
src/data/portfolio.ts     single source of truth for all copy/data (profile, skills, education, experience, projects, thesis)
src/index.css             Tailwind v4 @theme tokens, glass utility, custom scrollbar, film grain
public/                   favicon.svg, jordy.jpg, CV_Jordy_Cahya_Buana.pdf, thesis_cover.jpg
```
- Put all new copy or data in `src/data/portfolio.ts`, never inline in JSX.
- Keep `navItems` in `src/App.tsx` as the single source for both the desktop pill nav and the mobile hamburger menu.

## 3. Design Tokens
- **Colors:** `ink` `#07080a`, `panel` `#0f1115`, `acid` `#c6ff3d`, `ice` `#5ee7ff`, `bone` `#ecece4` (plus `#ff6b9d` for rare accents).
- **Fonts:** `Syne` (display), `Instrument Sans` (body), `JetBrains Mono` (labels).
- **Patterns:** `/ label` mono section headers, bold display headings with `.outline-text`, `.glass` cards.
