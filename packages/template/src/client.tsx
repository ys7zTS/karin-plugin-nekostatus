import { createRoot } from 'react-dom/client'
import type { StatusData } from './types'
import App from './App'
import { defaultData } from './test'
import './styles/style.css'

declare global {
  interface Window {
    __DATA__?: StatusData
  }
}

createRoot(document.getElementById('root')!).render(
  <App data={window.__DATA__ ?? defaultData} />
)
