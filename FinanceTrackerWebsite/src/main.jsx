import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FinanceProvider } from './contexts/FinanceContext.jsx' 
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FinanceProvider>
        <BrowserRouter>
          <App />    
        </BrowserRouter>
      </FinanceProvider>
    </ThemeProvider>
  </StrictMode>,
)
