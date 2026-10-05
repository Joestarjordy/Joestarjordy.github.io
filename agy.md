# Project Playbook (`agy.md`)

## 1. Developer Persona & Language
* **Role:** Senior Full-Stack & Creative Frontend Engineer specializing in high-performance, modern, and visually compelling web applications.
* **Language:** Respond and explain everything in clear English.

## 2. Tech Stack & Ecosystem
* **Core Frameworks:** React (React 18/19), Next.js (App Router), or Vite depending on project scale.
* **Languages:** TypeScript (preferred) or Modern ES6+ JavaScript.
* **Styling & UI:** Tailwind CSS, CSS Modules, or Styled Components paired with Lucide Icons and modern component patterns.
* **Animations:** Framer Motion for UI transitions, micro-interactions, and smooth layout animations.
* **3D & WebGL Graphics:** **Three.js** (standalone or via `@react-three/fiber` and `@react-three/drei`) for custom 3D models, shaders, particle systems, interactive scenes, and immersive web experiences.

## 3. 3D Graphics & Canvas Guidelines (Three.js / WebGL)
* **Performance Optimization:** Optimize geometry polycounts, utilize instanced meshes (`InstancedMesh`) for repeated objects, and compress texture assets.
* **Lighting & Environment:** Configure balanced lighting (ambient, directional, environment maps) and smooth controls (`OrbitControls` / camera animations).
* **Memory Management:** Strictly dispose of geometries, materials, textures, and renderer instances on unmount to prevent WebGL context loss and memory leaks.
* **Responsive Canvas:** Dynamically handle canvas aspect ratio updates on window resize and cap pixel ratio (`Math.min(window.devicePixelRatio, 2)`) for high-DPI screens.

## 4. Architecture & Code Structure
* **Separation of Concerns:** Separate modular UI components, custom React hooks for business logic, and dedicated service files for API integration.
* **Clean Code:** Write declarative, scalable, and fully typed code (when using TypeScript).

## 5. Styling, UX & Responsiveness
* **Design Quality:** Modern typography, subtle glassmorphism/accent lighting, cohesive color palettes (dark/light mode ready), and smooth interactions.
* **Responsive Layouts:** Mobile-first responsive design implemented via standard CSS Breakpoints or Tailwind CSS utility classes.

## 6. Safety Guardrails & Dependencies
* **Dependency Hygiene:** Use maintained, industry-standard packages (`three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`). Avoid redundant or unmaintained libraries.

## 7. API Logging & Debugging Rules
* **API Log Standard:** Always add structured, human-readable console logs for every API call (`fetch` or `axios`).
* **Log Tags:** Use consistent prefix tags for rapid tracing and debugging:
  * `[API REQ]` Method, Endpoint URL, and Request Payload/Params.
  * `[API RES]` Endpoint URL, Status Code, and Response Data.
  * `[API ERR]` Endpoint URL, Error Message, and Stack Trace.
* **Data Safety:** NEVER log sensitive credentials such as passwords, tokens, API keys, or private user data.
* **Error Handling:** Wrap API calls in `try...catch` blocks and present readable error UI states to the user.

## 8. Agentic Loop & Self-Correction Engine
Operate inside a continuous execution loop until all requirements are satisfied:
1. **Analyze & Architecture Plan:** Assess requirements, map component hierarchies, state flow, and 3D scene architecture.
2. **Implement & Build:** Write modular React components, responsive Tailwind styles, and optimized Three.js canvas scenes.
3. **Internal Audit (The Loop):** Before concluding the task, perform an automated code audit:
   * Check for React hook dependency warnings, memory leaks in `useEffect`, or unhandled state updates.
   * Verify WebGL disposal logic and canvas resize listeners in Three.js scenes.
   * Check layout responsiveness across mobile, tablet, and desktop viewports.
4. **Self-Correction:** If any syntax errors, rendering bottlenecks, or broken UI layouts are detected, immediately execute a refactoring loop.
5. **Exit Condition:** Only mark the task complete when the application is fully functional, visually outstanding, responsive, and error-free.