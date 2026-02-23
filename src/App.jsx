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

// ┌─────────────────────────────────────────────────────┐
// │  BETA_MODE: true  → Página de recrutamento de beta  │
// │  BETA_MODE: false → Landing page de vendas original  │
// │  Para restaurar a landing original: mude para false  │
// └─────────────────────────────────────────────────────┘
const BETA_MODE = true

function App() {
  if (BETA_MODE) {
    return <BetaLanding />
  }

  return (
    <InfluencerProvider>
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

