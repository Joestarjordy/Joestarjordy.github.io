# AGENTS.md - Project Rules

> Read this file first, before changing anything. It replaces `agy.md` and `SKILL.md`.
> Keep it short and keep it true: if the code and this file disagree, fix the file.

## 1. Project

3D portfolio for **Jordy Cahya Buana** - a single-page site with a Three.js hero scene,
an animated intro gate, and scroll-linked camera movement.

- **Live:** https://joestarjordy.github.io/ (GitHub Pages, repo `Joestarjordy/Joestarjordy.github.io`)
- **Language:** reply in clear English, keep answers concise.

## 2. Stack (already installed - do not swap)

| Area | Choice |
| --- | --- |
| Build | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`), `clsx` + `tailwind-merge` via `src/lib/cn.ts` |
| Motion | `framer-motion` |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` |
| Icons | `lucide-react` |

Add a dependency only if the existing ones can't do the job. Prefer maintained, mainstream packages.

## 3. Layout of the code

```
src/main.tsx            entry; shows <Intro/> over <App/>
src/App.tsx             header/nav, all page sections
src/components/Intro.tsx  "PORTFOLIO" intro gate
src/components/Scene.tsx  R3F canvas (hero, particles, satellites, camera rig)
src/data/portfolio.ts   ALL copy and content (profile, skills, education, experience, projects, thesis)
src/index.css           theme tokens, glass, scrollbar, grain
public/                 favicon, photo, CV, thesis cover
```

- **Content goes in `portfolio.ts`, not in JSX.** Add data there, render it in `App.tsx`.
- Split a component out of `App.tsx` once it grows past ~100 lines or is reused.
- Fully type everything; no `any`.

## 4. Design language

- **Theme:** dark, glassmorphic, high-contrast accents. Tokens: `ink` #07080a, `acid` #c6ff3d, `ice` #5ee7ff, `bone` #ecece4 (plus pink #ff6b9d as a rare accent).
- **Fonts:** Syne (display), Instrument Sans (body), JetBrains Mono (labels). Do not introduce Inter/Arial/system fonts.
- Section labels use the `/ label` mono style; headings are bold display type, often with `.outline-text`.
- Every interactive element needs a hover/focus state. No flat, static cards.
- Never use generic purple-on-white gradients or default-looking layouts.

## 5. Hard rules learned the hard way

- **Asset paths:** reference files in `public/` with `import.meta.env.BASE_URL + 'file.ext'`, never a bare `/file.ext`. `base` is `'/'` now, but this keeps the site portable.
- **Animation performance:** animate only `transform` and `opacity`. Do **not** animate `filter: blur()`, large blurred layers, or `box-shadow` on big areas - it caused visible stutter in the intro.
- **No transforms on `<App/>` or its wrappers.** A transform/filter/perspective on an ancestor breaks `position: fixed` children (the 3D canvas, header).
- **Heavy mounts:** mount expensive trees (the 3D scene) while something opaque covers them, not in the middle of an animation.
- **Respect `prefers-reduced-motion`** for any new looping animation.
- **Windows/PowerShell editing:** read and write source with explicit UTF-8 (no BOM). `Get-Content`/`Set-Content` without an encoding can corrupt characters like `-`, `·`, `↗`. After scripted edits, check `git diff --stat` for unexpectedly large changes before committing. Prefer targeted edits over whole-file regex replacement.

## 6. Three.js / R3F

- Use `InstancedMesh` for repeated objects; keep geometry detail modest.
- Cap pixel ratio: `dpr={[1, Math.min(window.devicePixelRatio, 2)]}` (already set).
- R3F handles resize and disposal for declarative scenes. If you create objects imperatively (`new THREE.*`, custom textures/materials), create them with `useMemo` and call `dispose()` in an effect cleanup.
- Don't create Three objects inside render or `useFrame` without caching them.
- Keep the canvas non-blocking on touch devices (content layer sits above it with `z-10`).

## 7. Code quality

- Hooks: complete dependency arrays; no `eslint-disable` to hide a dependency problem - fix it (`useCallback`, refs).
- Every `addEventListener` / `setTimeout` / `setInterval` needs a cleanup.
- Accessibility: semantic elements, `aria-label` on icon-only buttons, visible focus, sufficient contrast.
- Mobile-first: new UI must work at ~375px, ~768px and desktop. The top nav collapses into the hamburger menu below `md`; keep `navItems` as the single source for both.

## 8. API calls (only when you add any)

This site currently makes **no** API calls. If one is added:
- Log with tags: `[API REQ]` method + URL + params, `[API RES]` URL + status + data, `[API ERR]` URL + message + stack.
- Never log tokens, passwords, keys or private user data.
- Wrap in `try...catch` and show a readable error state in the UI.

## 9. Definition of done (run before saying "finished")

1. `npx tsc --noEmit` - zero errors.
2. `npm run build` - succeeds.
3. `git diff --stat` - only the files you meant to touch, no surprising line counts.
4. If UI changed: say honestly whether you viewed it in a browser at mobile and desktop widths. **Do not claim a visual result you did not see.**
5. Hook/listener/timer cleanup reviewed for anything you added.

## 10. Git & deploy

- `main` auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push.
- Commit small, with clear messages. Push only when asked.
- Don't commit secrets, `.env`, `node_modules` or `dist` (all git-ignored).
- The repo is **public**: anything in `public/` (CV, photos) is downloadable by anyone.
