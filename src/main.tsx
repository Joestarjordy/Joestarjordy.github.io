import { StrictMode, useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Intro from './components/Intro'
import './index.css'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

function Root() {
  const [introDone, setIntroDone] = useState(false)
  const done = useCallback(() => setIntroDone(true), [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <App />
      {!introDone && <Intro onDone={done} />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
