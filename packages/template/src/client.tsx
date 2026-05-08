import React from 'react'
import ReactDOM from 'react-dom/client'
import { TestData } from '@/test'
import './Pink/styles/style.css'
import App from './Pink/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App {...TestData} />
  </React.StrictMode>
)
