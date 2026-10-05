---
name: creative-frontend-3d-portfolio
description: Create distinctive, production-grade frontend interfaces with high design quality, 3D WebGL experiences (Three.js / React Three Fiber), and fluid animations (Framer Motion). Use this skill when the user asks to build web applications, interactive portfolios, landing pages, dashboards, 3D scenes, or custom React UI components. Generates creative, polished code that completely avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides the creation of distinctive, production-grade frontend interfaces and 3D WebGL experiences that avoid generic "AI slop" aesthetics. Implement real, fully working code with exceptional attention to aesthetic details, performance, and creative choices.

The user provides frontend requirements: a component, interactive 3D scene, page, application, or interface to build. They may include context about the purpose, audience, or technical stack constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD, highly tailored aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme aesthetic direction: brutalist/raw, cybernetic/retro-futuristic, editorial/magazine, ultra-luxury, organic/natural, maximalist 3D grid, playful/toy-like, neo-brutalist, dark glassmorphic, or industrial/utilitarian.
- **3D & Depth Dimension**: Decide how Three.js / WebGL elements elevate the experience—whether as an interactive hero scene, floating 3D mesh assets, ambient particle fields, dynamic lighting, or scroll-reactive 3D cameras.
- **Constraints**: Technical requirements (React, Next.js, WebGL performance, mobile responsiveness, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What is the single high-impact moment or 3D interaction users will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work—the key is intentionality, not intensity.

## Tech Stack & Architecture

- **Core Frameworks**: React (React 18/19), Next.js (App Router), Vite.
- **Styling**: Tailwind CSS, CSS Glassmorphism, Custom Keyframe Animations, Utility Classes (`clsx`, `tailwind-merge`).
- **3D & WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei` for shaders, particle systems, interactive canvases, lighting, and camera animations.
- **Animations & Micro-interactions**: Framer Motion for layout morphing, staggered page reveals, gesture controls, and smooth UI transitions.
- **Icons & Visuals**: Lucide Icons (`lucide-react`) and custom SVG graphics.

## Frontend & 3D Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and characterful. Avoid generic font stacks like Arial, Inter, or default system fonts. Pair distinctive display/serif/mono fonts with crisp, highly legible body typography.
- **Color & Theme**: Commit to a cohesive palette. Use custom Tailwind color tokens or CSS variables. High-contrast dominant colors with sharp accents always outperform timid, evenly-distributed palettes.
- **3D & WebGL Canvas (Three.js / R3F)**:
  - Integrate Three.js seamlessly with UI overlays using transparent canvases or depth layers.
  - Optimize geometry polycounts, utilize `InstancedMesh` for repetitive objects, and cap device pixel ratios (`Math.min(window.devicePixelRatio, 2)`).
  - Strictly handle memory disposal (`dispose()`) on unmount for geometries, materials, textures, and WebGL renderers to prevent context loss.
- **Motion & Interactions**: Combine Framer Motion spring physics with hover/tilt states and 3D camera movement. Prioritize staggered reveals (`staggerChildren`) and scroll-linked animations over scattered micro-interactions.
- **Spatial Composition**: Unexpected layouts, grid-breaking floating viewports, diagonal flows, brutalist cards, glassmorphic overlays, asymmetrical spacing, and generous negative space or controlled density.
- **Backgrounds & Atmospheric Details**: Create visual depth using gradient meshes, WebGL shader background passes, noise overlays, dynamic lighting, glowing borders, and custom interactive cursors.

NEVER use generic AI-generated aesthetics like overused system fonts, cookie-cutter purple-on-white gradients, static cards without hover feedback, or flat layouts lacking depth.

## API & Debugging Guardrails

When connecting external data or simulating API calls:
- Always log structured API activity to the console using tagged prefixes:
  - `[API REQ]` Method, Endpoint URL, Request Body/Params.
  - `[API RES]` Endpoint URL, Status Code, Response Data.
  - `[API ERR]` Endpoint URL, Error Message, Stack Trace.
- Never expose sensitive tokens or private credentials in logs.
- Wrap all async operations in robust `try...catch` blocks with intuitive error UI fallback states.

## Agentic Quality Assurance & Iterative Refinement Loop

Once you begin generating the frontend components and WebGL scenes, activate the agentic refinement loop:
1. **Visual & Aesthetic Audit**: Review spatial balance and visual impact. Does it look like generic AI code? If so, break the layout immediately with 3D canvas overlays, unexpected grid offsets, or bold typography.
2. **WebGL Performance & Memory Check**: Ensure Three.js canvas resizes cleanly with viewport changes, frame rates remain smooth (60fps target), and WebGL instances clean up properly.
3. **Responsive Stress-Test**: Verify fluid adaptation across mobile, tablet, and desktop viewports. Ensure 3D scenes don't block mobile touch interactions or overflow containers awkwardly.
4. **Interaction Quality Check**: Verify that Framer Motion spring transitions, hover states, lighting reactions, and scroll animations operate smoothly without stuttering.
5. **Iterative Code Polish**: Refine line-by-line, streamline Tailwind classes, verify React hook dependencies (`useEffect`, `useMemo`), and ensure clean code architecture.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Show what can truly be created when thinking outside the box, combining Three.js 3D depth with modern React frontend architecture.