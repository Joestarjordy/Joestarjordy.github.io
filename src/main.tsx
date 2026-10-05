import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Intro from './components/Intro'
import './index.css'

function Root() {
  const [entered, setEntered] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  return (
    <>
      {entered && <App />}
      {!introDone && <Intro onEnter={() => setEntered(true)} onDone={() => setIntroDone(true)} />}
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
