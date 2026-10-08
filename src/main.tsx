import { StrictMode, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Intro from './components/Intro'
import './index.css'

function Root() {
  const [introDone, setIntroDone] = useState(false)
  const done = useCallback(() => setIntroDone(true), [])
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
