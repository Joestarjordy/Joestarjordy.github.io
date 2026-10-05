import { StrictMode, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Intro from './components/Intro'
import './index.css'

function Root() {
  const [entered, setEntered] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const enter = useCallback(() => setEntered(true), [])
  const done = useCallback(() => setIntroDone(true), [])
  return (
    <>
      {entered && <App />}
      {!introDone && <Intro onEnter={enter} onDone={done} />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
