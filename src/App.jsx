import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { Features } from './components/Features'
import { Testimonials } from './components/Testimonials'
import { Pricing } from './components/Pricing'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { InfluencerProvider } from './contexts/InfluencerContext'
import { TopBanner } from './components/TopBanner'
import { InvalidInfluencerModal } from './components/InvalidInfluencerModal'
import { BetaLanding } from './components/BetaLanding'
import { SEOHead } from './components/SEOHead'
import { SchemaMarkup } from './components/SchemaMarkup'

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
        title="rendiPRO — Questões, Flashcards e Cronograma com IA para Vestibular e Concursos"
        description="Pare de perder tempo com planilhas. O rendiPRO organiza automaticamente seus ciclos de estudo e revisões com IA. Flashcards, questões comentadas e cronograma personalizado. Comece grátis por 30 dias."
        ogImage="/og-oficial.png"
        canonical="https://rendipro.com.br/"
        noindex={false}
      />
      <SchemaMarkup />
      <div className="min-h-screen bg-surface-950 text-white selection:bg-primary-500/30">
        <TopBanner />
        <InvalidInfluencerModal />
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Features />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </InfluencerProvider>
  )
}

export default App

