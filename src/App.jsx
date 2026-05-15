import { lazy, Suspense } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { LogoMarquee } from './components/LogoMarquee'
import { StickyMobileCTA } from './components/StickyMobileCTA'
import { InfluencerProvider } from './contexts/InfluencerContext'
import { TopBanner } from './components/TopBanner'
import { FoundersBanner } from './components/FoundersBanner'
import { InvalidInfluencerModal } from './components/InvalidInfluencerModal'
import { BetaLanding } from './components/BetaLanding'
import { SEOHead } from './components/SEOHead'
import { SchemaMarkup } from './components/SchemaMarkup'
import { CookieBanner } from './components/CookieBanner'

const MoneyShot     = lazy(() => import('./components/MoneyShot').then(m => ({ default: m.MoneyShot })))
const Features      = lazy(() => import('./components/Features').then(m => ({ default: m.Features })))
const Comparison    = lazy(() => import('./components/Comparison').then(m => ({ default: m.Comparison })))
const Gamification  = lazy(() => import('./components/Gamification').then(m => ({ default: m.Gamification })))
const FounderStory  = lazy(() => import('./components/FounderStory').then(m => ({ default: m.FounderStory })))
const FoundersOffer = lazy(() => import('./components/FoundersOffer').then(m => ({ default: m.FoundersOffer })))
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
  if (BETA_MODE) {
    return <BetaLanding />
  }

  return (
    <InfluencerProvider>
      <SEOHead
        title="Passe no ENEM com redação corrigida por professor humano | RendiPro"
        description="Correção de redação manuscrita por professor humano em até 72h + cronograma adaptado para o ENEM e vestibulares. +6.000 questões comentadas, +8.000 flashcards. Garantia 7 dias."
        ogImage="/og-oficial.png"
        canonical="https://rendipro.com.br/"
        noindex={false}
      />
      <SchemaMarkup />
      <div className="min-h-screen bg-surface-950 text-white selection:bg-primary-500/30">
        <FoundersBanner />
        <TopBanner />
        <InvalidInfluencerModal />
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <LogoMarquee />
          <Suspense fallback={<div className="h-96 bg-surface-950" />}>
            <MoneyShot />
            <Features />
            <FounderStory />
            <Comparison />
            <Gamification />
            <FoundersOffer />
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

