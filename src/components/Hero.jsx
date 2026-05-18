import { motion } from 'framer-motion'
import { ArrowRight, Lock, Rocket, Shield, Sparkles } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { InteractiveFlashcard } from './ui/InteractiveFlashcard'

/**
 * Hero — asymetric split-screen (55/45)
 *
 * Padrão: Linear (asymetric layout) + Brilliant (interactive proof) + Vercel (ProductWindow)
 *
 * Coluna esquerda:
 *  - Eyebrow (autoridade transferida via Jessica MP-RS)
 *  - H1 em 2 linhas com gradient na frase "professor humano"
 *  - Sub denso (5 provas numéricas)
 *  - 2 CTAs (primário Quero meu cronograma + secundário Ver por dentro)
 *  - Microcopy garantia com Shield
 *
 * Coluna direita (asset stack):
 *  - Peek `redacao-manuscrita.png` no fundo, rotated -8deg, opacity 0.25
 *  - Main: `cronograma-semana.png` em ProductWindow com glow primary
 *  - InteractiveFlashcard flutuando bottom-right, rotated +4deg
 *
 * Mobile: tudo empilha vertical, peek e flashcard escondem em < md.
 */

const trackInitiateCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout')
    }
}

const easeSpring = [0.16, 1, 0.3, 1]

export function Hero() {
    const { getCheckoutUrl } = useInfluencer()

    return (
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32">
            {/* ─── Background layers ───────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-600)_0%,_transparent_55%)] opacity-10" />
            <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-[140px]" />
            <div className="pointer-events-none absolute top-[20%] right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent-500/15 blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* ─── LEFT · Copy ──────────────────────────────── */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: easeSpring }}
                            className="inline-flex"
                        >
                            <Eyebrow variant="primary">
                                <Sparkles size={14} />
                                Criado por Bruno Grande, a partir da jornada de aprovação de Jessica Marques · Promotora MP-RS, 2023
                            </Eyebrow>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0, ease: easeSpring }}
                            className="mt-6 text-display-md sm:text-display-lg lg:text-display-xl text-white"
                        >
                            <span className="text-gradient-primary">Professor humano</span>{' '}
                            corrigindo sua redação —{' '}
                            <span className="text-white/75">
                                mais cronograma, flashcards, questões e provas. Tudo num plano só.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: easeSpring }}
                            className="mt-6 max-w-2xl mx-auto lg:mx-0 text-body-lg text-white/70"
                        >
                            Cronograma, +8.000 flashcards SM-2, +6.000 questões comentadas por alternativa, provas oficiais com cronômetro e correção de redação por professor humano — em até 72h. A partir de R$ 14,99/mês.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: easeSpring }}
                            className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
                        >
                            <Button
                                as="a"
                                href={getCheckoutUrl('https://app.rendipro.com.br/register')}
                                onClick={trackInitiateCheckout}
                                variant="primary"
                                size="lg"
                            >
                                Quero testar 7 dias
                                <Rocket
                                    size={20}
                                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                />
                            </Button>
                            <Button as="a" href="#features" variant="secondary" size="lg">
                                Ver por dentro
                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-white/70"
                        >
                            <Shield size={16} className="text-primary-400" />
                            Teste 7 dias. Não gostou? 1 clique e devolvemos 100%.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="mt-2 inline-flex items-center gap-2 text-caption text-white/50"
                        >
                            <Lock size={14} className="text-white/40" />
                            Pagamento seguro · Acesso imediato após confirmação
                        </motion.p>
                    </div>

                    {/* ─── RIGHT · Asset stack ──────────────────────── */}
                    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
                        {/* Peek: redação manuscrita atrás, rotated, semi-transparent */}
                        <motion.div
                            initial={{ opacity: 0, x: -12, rotate: -8 }}
                            animate={{ opacity: 0.35, x: 0, rotate: -8 }}
                            transition={{ duration: 0.9, delay: 0.65, ease: easeSpring }}
                            className="pointer-events-none absolute -left-10 top-6 -z-10 hidden lg:block"
                            aria-hidden="true"
                        >
                            <img
                                src="/screenshots/redacao-manuscrita.webp"
                                alt=""
                                className="h-[260px] w-auto rounded-xl shadow-elevation-3"
                            />
                        </motion.div>

                        {/* Main: Cronograma in ProductWindow with primary glow */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 28 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: easeSpring }}
                        >
                            <ProductWindow
                                url="app.rendipro.com.br/cronograma"
                                glow
                                className="relative z-10"
                            >
                                <img
                                    src="/screenshots/cronograma-semana.webp"
                                    alt="Cronograma semanal personalizado de estudos no RendiPro — visão semanal com matérias coloridas"
                                    className="block h-auto w-full"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                            </ProductWindow>
                        </motion.div>

                        {/* Interactive flashcard floating bottom-right */}
                        <motion.div
                            initial={{ opacity: 0, y: 24, rotate: 4 }}
                            animate={{ opacity: 1, y: 0, rotate: 4 }}
                            transition={{ duration: 0.7, delay: 0.85, ease: easeSpring }}
                            className="absolute -bottom-6 -right-4 z-20 hidden md:block"
                            style={{ transformOrigin: 'center' }}
                        >
                            <InteractiveFlashcard />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
