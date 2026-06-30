import { lazy, Suspense, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { InfluencerProvider } from './contexts/InfluencerContext'
import { TopBanner } from './components/TopBanner'
import { FoundersBanner } from './components/FoundersBanner'
import { InvalidInfluencerModal } from './components/InvalidInfluencerModal'
import { SEOHead } from './components/SEOHead'
import { SchemaMarkup } from './components/SchemaMarkup'
import { CookieBanner } from './components/CookieBanner'
import { captureUtms, initScrollMilestones } from './lib/tracking'

// BetaLanding é lazy: carrega Supabase (~170KB) e só é renderizado quando
// VITE_BETA_MODE=true. Mantê-lo como import estático custava 170KB no
// bundle principal mesmo na landing de vendas (modo produção atual).
const BetaLanding = lazy(() => import('./components/BetaLanding').then(m => ({ default: m.BetaLanding })))

const ForWhom       = lazy(() => import('./components/ForWhom').then(m => ({ default: m.ForWhom })))
const Features      = lazy(() => import('./components/Features').then(m => ({ default: m.Features })))
const FounderStory  = lazy(() => import('./components/FounderStory').then(m => ({ default: m.FounderStory })))
const Pricing       = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })))
const FAQ           = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })))
const FinalCTA      = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })))
const Footer        = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })))

// ┌────────────────────────────────────────────────────────────────────┐
// │  Controle de modo via variável de ambiente (Vercel + .env.local)  │
// │  VITE_BETA_MODE=true  → Página de recrutamento de beta (no ar)    │
// │  VITE_BETA_MODE=false → Landing page de vendas original            │
// │                                                                    │
// │  Para lançar: mude VITE_BETA_MODE para false no painel Vercel     │
// │  e faça um novo deploy — sem precisar alterar código.             │
// └────────────────────────────────────────────────────────────────────┘
const BETA_MODE = import.meta.env.VITE_BETA_MODE === 'true'

function App() {
  // Captura UTMs no primeiro touch (persistem em sessionStorage) e
  // engata os scroll milestones (25/50/75/100%) uma vez por load.
  useEffect(() => {
    captureUtms()
    return initScrollMilestones()
  }, [])

  if (BETA_MODE) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-surface-950" />}>
        <BetaLanding />
      </Suspense>
    )
  }

  return (
    <InfluencerProvider>
      <SEOHead
        title="RendiPro — Cronograma de Estudos, Flashcards e Revisão no Momento Certo"
        description="Monte seu cronograma em minutos, estude com flashcards e revise na hora certa com repetição espaçada. Tudo num plano só, a partir de R$ 14,99/mês."
        ogImage="/og-oficial.png"
        canonical="https://rendipro.com.br/"
        noindex={false}
      />
      <SchemaMarkup />
      <div className="min-h-screen bg-surface-950 text-white selection:bg-primary-500/30">
        <div className="sticky top-0 z-50">
          <FoundersBanner />
          <TopBanner />
          <Navbar />
        </div>
        <InvalidInfluencerModal />
        <main className="pb-24 lg:pb-0">
          <Hero />
          <TrustStrip />
          <Suspense fallback={<div className="h-12 bg-surface-950" />}>
            <ForWhom />
            <Features />
            <FounderStory />
            <Pricing />
            <FAQ />
            <FinalCTA />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <StickyMobileCTA />
        <CookieBanner />
      </div>
    </InfluencerProvider>
  )
}

export default App

