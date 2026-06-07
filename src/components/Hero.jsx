import { ArrowRight, Lock, Rocket, Shield, Sparkles } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { InteractiveFlashcard } from './ui/InteractiveFlashcard'

/**
 * Hero — animado via CSS (sem framer-motion no path crítico).
 * Convertido em 2026-05-24 para tirar 127KB do bundle inicial e
 * reduzir LCP mobile de 4.8s para <2.5s.
 */

const trackHeroCta = () => trackRegisterCta({ buttonText: 'Comece por R$ 14,99/mês', location: 'hero' })

export function Hero() {
    const { getCheckoutUrl } = useInfluencer()
    const sectionRef = useSectionView('hero')

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
            {/* ─── Background layers ───────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-600)_0%,_transparent_55%)] opacity-10" />
            <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-[140px]" />
            <div className="pointer-events-none absolute top-[20%] right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent-500/15 blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* ─── LEFT · Copy ──────────────────────────────── */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex animate-fade-in-up">
                            <Eyebrow variant="primary">
                                <Sparkles size={14} />
                                <span className="md:hidden">Nasceu de uma aprovação real</span>
                                <span className="hidden md:inline">Nasceu de uma aprovação real no MP-RS em 2023</span>
                            </Eyebrow>
                        </div>

                        {/* H1 SEM animação — é o LCP element em mobile, qualquer fade-in c/ opacity:0
                            inicial atrasa o LCP. Pintura instantânea pra Lighthouse marcar cedo. */}
                        <h1
                            className="mt-6 text-display-sm sm:text-display-lg lg:text-display-xl text-white"
                        >
                            Seu cronograma de estudos pronto em <span className="text-gradient-primary">5 minutos</span>.{' '}
                            <span className="text-white/85">
                                Tudo que você precisa para estudar com <span className="text-gradient-primary">método</span>.
                            </span>
                        </h1>

                        {/* Subtitle SEM animação — candidato a LCP em desktop (texto longo).
                            Pintura instantânea pra Lighthouse marcar cedo. */}
                        <p
                            className="mt-6 max-w-2xl mx-auto lg:mx-0 text-body-lg text-white/70"
                        >
                            <span className="md:hidden">
                                Plano adaptado em minutos, 8 mil flashcards, 6 mil questões e provas oficiais. Redação corrigida por humano disponível como upgrade. <strong className="font-semibold text-white">A partir de R$ 14,99/mês.</strong>
                            </span>
                            <span className="hidden md:inline">
                                Você gera o plano em poucos minutos ou importa um que já está fazendo. Pode manter <strong className="font-semibold text-white">até 3 cronogramas ao mesmo tempo</strong>. Tem 8 mil flashcards, 6 mil questões comentadas e as provas oficiais com cronômetro. Quer redação corrigida por humano? Disponível como upgrade. <strong className="font-semibold text-white">A partir de R$ 14,99/mês.</strong>
                            </span>
                        </p>

                        <div
                            className="mt-6 sm:mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start animate-fade-in-up"
                            style={{ animationDelay: '300ms' }}
                        >
                            <Button
                                as="a"
                                href={getCheckoutUrl('https://app.rendipro.com.br/register?plano=starter-anual&utm_content=hero')}
                                onClick={trackHeroCta}
                                variant="primary"
                                size="lg"
                            >
                                Comece por R$ 14,99/mês
                                <Rocket
                                    size={20}
                                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                />
                            </Button>
                            <Button as="a" href="#pricing" variant="secondary" size="lg">
                                Ver planos
                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Button>
                        </div>

                        <p
                            className="mt-6 inline-flex items-center gap-2 text-body-sm font-medium text-white/70 animate-fade-in"
                            style={{ animationDelay: '450ms' }}
                        >
                            <Shield size={16} className="text-primary-400" />
                            Teste 7 dias. Não gostou? 1 clique e devolvemos 100%.
                        </p>
                        <p
                            className="mt-2 inline-flex items-center gap-2 text-caption text-white/50 animate-fade-in"
                            style={{ animationDelay: '550ms' }}
                        >
                            <Lock size={14} className="text-white/40" />
                            Pagamento seguro · Acesso imediato após confirmação
                        </p>
                    </div>

                    {/* ─── RIGHT · Asset stack ──────────────────────── */}
                    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
                        {/* Peek: redação manuscrita atrás, rotated, semi-transparent */}
                        <div
                            className="pointer-events-none absolute -left-10 top-6 -z-10 hidden lg:block"
                            style={{ animation: 'fade-in-peek 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both' }}
                            aria-hidden="true"
                        >
                            <img
                                src="/screenshots/redacao-manuscrita.webp"
                                alt=""
                                className="h-[260px] w-auto rounded-xl shadow-elevation-3"
                            />
                        </div>

                        {/* Main: Cronograma in ProductWindow — sem animation pra não atrasar
                            LCP em desktop (em desktop esta imagem é o LCP element). */}
                        <div>
                            <ProductWindow
                                url="app.rendipro.com.br/cronograma"
                                glow
                                className="relative z-10"
                            >
                                <img
                                    src="/screenshots/cronograma-semana.webp"
                                    alt="Cronograma semanal personalizado de estudos no RendiPro, visão semanal com matérias coloridas"
                                    width="1200"
                                    height="900"
                                    className="block h-auto w-full"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                            </ProductWindow>
                        </div>

                        {/* Interactive flashcard floating bottom-right */}
                        <div
                            className="absolute -bottom-6 -right-4 z-20 hidden md:block"
                            style={{ animation: 'fade-in-rotated 0.7s cubic-bezier(0.16,1,0.3,1) 0.85s both', transformOrigin: 'center' }}
                        >
                            <InteractiveFlashcard />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
