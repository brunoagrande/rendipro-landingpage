import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

function sendToGA(metric) {
  if (typeof gtag !== 'function') return
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
    non_interaction: true,
  })
}

// web-vitals v5 substituiu onFID por onINP (Interaction to Next Paint),
// que virou a métrica oficial do Google para responsividade em 2024.
import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
  onCLS(sendToGA)
  onINP(sendToGA)
  onFCP(sendToGA)
  onLCP(sendToGA)
  onTTFB(sendToGA)
})
