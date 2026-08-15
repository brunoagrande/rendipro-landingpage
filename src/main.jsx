import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
// Fontes self-hosted (saiu do Bunny CDN externo em 2026-05-24 pra reduzir RTT no LCP).
// O `unicode-range` no @font-face faz o browser baixar só os subsets que aparecem no texto (em PT-BR ~ latin + latin-ext).
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
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
