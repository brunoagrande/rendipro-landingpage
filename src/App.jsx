import { lazy, Suspense, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { InfluencerProvider } from './contexts/InfluencerContext'
import { TopBanner } from './components/TopBanner'
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
const PlanoShowcase = lazy(() => import('./components/PlanoShowcase').then(m => ({ default: m.PlanoShowcase })))
const AiSuite       = lazy(() => import('./components/AiSuite').then(m => ({ default: m.AiSuite })))
const RedacaoShowcase = lazy(() => import('./components/RedacaoShowcase').then(m => ({ default: m.RedacaoShowcase })))
const Features      = lazy(() => import('./components/Features').then(m => ({ default: m.Features })))
const VejaPorDentro = lazy(() => import('./components/VejaPorDentro').then(m => ({ default: m.VejaPorDentro })))
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
        title="Estude com IA: cronograma, questões, flashcards e redação"
        description="Seu material vira questões e flashcards, o cronograma nasce do seu edital e a redação volta corrigida por competência. Tudo num plano só, 12x de R$ 9,90."
        ogImage="/og-oficial.jpg"
        canonical="https://rendipro.com.br/"
        noindex={false}
      />
      <SchemaMarkup />
      <div className="min-h-screen bg-surface-950 text-white selection:bg-primary-500/30">
        <div className="sticky top-0 z-50">
          <TopBanner />
          <Navbar />
        </div>
        <InvalidInfluencerModal />
        <main className="pb-24 lg:pb-0">
          <Hero />
          <TrustStrip />
          <Suspense fallback={<div className="h-12 bg-surface-950" />}>
            <ForWhom />
            <PlanoShowcase />
            <Features />
            <AiSuite />
            <RedacaoShowcase />
            <VejaPorDentro />
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

