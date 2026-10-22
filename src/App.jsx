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
import { SecaoSegura } from './components/SecaoSegura'
import { captureUtms, initScrollMilestones } from './lib/tracking'
import { CAMPANHA_ANUAL_ATIVA } from './data/campanha-anual'
import { CORTESIA_CADASTRO_ATIVA } from './data/cortesia-cadastro'

// (removido em 15/09/2026: a página de beta e o VITE_BETA_MODE. A fase de
// fundadores fechou e a indicação está desligada.)

const ForWhom       = lazy(() => import('./components/ForWhom').then(m => ({ default: m.ForWhom })))
const PlanoShowcase = lazy(() => import('./components/PlanoShowcase').then(m => ({ default: m.PlanoShowcase })))
const TragaOEdital  = lazy(() => import('./components/TragaOEdital').then(m => ({ default: m.TragaOEdital })))
const AiSuite       = lazy(() => import('./components/AiSuite').then(m => ({ default: m.AiSuite })))
const RedacaoShowcase = lazy(() => import('./components/RedacaoShowcase').then(m => ({ default: m.RedacaoShowcase })))
const Features      = lazy(() => import('./components/Features').then(m => ({ default: m.Features })))
const VejaPorDentro = lazy(() => import('./components/VejaPorDentro').then(m => ({ default: m.VejaPorDentro })))
const FounderStory  = lazy(() => import('./components/FounderStory').then(m => ({ default: m.FounderStory })))
const Pricing       = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })))
const FAQ           = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })))
const FinalCTA      = lazy(() => import('./components/FinalCTA').then(m => ({ default: m.FinalCTA })))
const Footer        = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })))

function App() {
  // Captura UTMs no primeiro touch (persistem em sessionStorage) e
  // engata os scroll milestones (25/50/75/100%) uma vez por load.
  useEffect(() => {
    captureUtms()
    return initScrollMilestones()
  }, [])

  return (
    <InfluencerProvider>
      <SEOHead
        title="Cronograma de estudos pelo edital, automático | RendiPro"
        description={CORTESIA_CADASTRO_ATIVA
          ? 'Você estuda, o RendiPro organiza o resto: cronograma pelo seu edital, revisão no dia certo, sua apostila virando questão e redação corrigida por competência. Comece com 7 dias grátis, sem cartão. Depois, a partir de R$ 9,90 por mês.'
          : CAMPANHA_ANUAL_ATIVA
          ?'Você estuda, o RendiPro organiza o resto: cronograma pelo seu edital, revisão no dia certo, sua apostila virando questão e redação corrigida por competência. 1 mês grátis no plano anual, depois a partir de R$ 9,90 por mês.'
          : 'Você estuda, o RendiPro organiza o resto: cronograma pelo seu edital, revisão no dia certo, sua apostila virando questão e redação corrigida por competência. Tudo em um plano só, a partir de R$ 9,90 por mês.'}
        ogImage="/og-2026-10.jpg"
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
          {/* Cada seção lazy no seu SecaoSegura: arquivo que falha (publicação
              nova, rede ruim) derruba só a própria seção, nunca a página
              inteira (Clarity, 22/10/2026). */}
          <Suspense fallback={<div className="h-12 bg-surface-950" />}>
            <SecaoSegura nome="for_whom"><ForWhom /></SecaoSegura>
            <SecaoSegura nome="plano_showcase"><PlanoShowcase /></SecaoSegura>
            <SecaoSegura nome="traga_o_edital"><TragaOEdital /></SecaoSegura>
            <SecaoSegura nome="features"><Features /></SecaoSegura>
            <SecaoSegura nome="ai_suite"><AiSuite /></SecaoSegura>
            <SecaoSegura nome="redacao_showcase"><RedacaoShowcase /></SecaoSegura>
            <SecaoSegura nome="veja_por_dentro"><VejaPorDentro /></SecaoSegura>
            <SecaoSegura nome="founder_story"><FounderStory /></SecaoSegura>
            <SecaoSegura nome="pricing"><Pricing /></SecaoSegura>
            <SecaoSegura nome="faq"><FAQ /></SecaoSegura>
            <SecaoSegura nome="final_cta"><FinalCTA /></SecaoSegura>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <SecaoSegura nome="footer"><Footer /></SecaoSegura>
        </Suspense>
        <StickyMobileCTA />
        <CookieBanner />
      </div>
    </InfluencerProvider>
  )
}

export default App

