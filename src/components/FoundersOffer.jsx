import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Lock, Medal, Shield, Users, Zap } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { cn } from '../lib/utils'

const DEADLINE = new Date('2026-06-14T23:59:59-03:00')

function getTimeLeft() {
    const diff = DEADLINE - new Date()
    if (diff <= 0) return null
    return {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff % 864e5) / 36e5),
        minutes: Math.floor((diff % 36e5) / 6e4),
        seconds: Math.floor((diff % 6e4) / 1e3),
    }
}

const BENEFITS = [
    { Icon: Lock,   text: 'Preço travado para sempre' },
    { Icon: Medal,  text: 'Selo Fundador no perfil' },
    { Icon: Users,  text: 'Canal direto com o fundador' },
    { Icon: Zap,    text: 'Acesso antecipado a novas features' },
    { Icon: Shield, text: 'Garantia de 7 dias' },
]

// 20% off sobre os preços anuais (preco_centavos / 12 meses)
const FOUNDER_PLANS = [
    {
        slug: 'starter-anual',
        nome: 'Starter',
        descricao: 'Cronograma, questões e flashcards completos',
        redacoes: 0,
        originalMes: 14.99,
        founderMes: 11.99,
        economiaAno: 36,
        popular: false,
    },
    {
        slug: 'plus-anual',
        nome: 'Plus',
        descricao: 'Estrutura completa com correção de redação',
        redacoes: 2,
        originalMes: 39.90,
        founderMes: 31.90,
        economiaAno: 96,
        popular: false,
    },
    {
        slug: 'pro-anual',
        nome: 'Pro',
        descricao: 'O mais escolhido para aprovação acelerada',
        redacoes: 4,
        originalMes: 59.90,
        founderMes: 47.90,
        economiaAno: 144,
        popular: true,
    },
    {
        slug: 'ultra-anual',
        nome: 'Ultra',
        descricao: 'Máxima intensidade, 8 correções por mês',
        redacoes: 8,
        originalMes: 109.90,
        founderMes: 87.90,
        economiaAno: 264,
        popular: false,
    },
]

const easeSpring = [0.16, 1, 0.3, 1]

export function FoundersOffer() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)
    const { getCheckoutUrl } = useInfluencer()

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(id)
    }, [])

    if (!timeLeft) return null

    const trackFounder = (planSlug, planNome) => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'InitiateCheckout', {
                content_name: `Fundador ${planSlug}`,
                currency: 'BRL',
            })
        }
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'cta_click', {
                button_text: `Ser Fundador ${planNome}`,
                location: 'founders_offer',
            })
        }
    }

    return (
        <section id="founders" className="relative overflow-hidden py-20 sm:py-28">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_theme(colors.amber.500)_0%,_transparent_65%)] opacity-[0.06]" />
            <div className="pointer-events-none absolute inset-0 -z-10 border-y border-amber-500/10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                >
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <Eyebrow variant="warning" className="mb-6">
                            <Medal size={14} />
                            Vagas de Fundador · Oferta por tempo limitado
                        </Eyebrow>
                        <h2 className="text-display-md font-extrabold tracking-tight text-white sm:text-display-lg">
                            Trave o menor preço{' '}
                            <span className="text-gradient-primary">para sempre.</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-lg text-body-lg text-white/55">
                            20% OFF em todos os planos anuais. O preço de Fundador é permanente. Não sobe quando o plano subir.
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="mb-10 flex justify-center gap-2 sm:gap-4">
                        {[
                            { value: timeLeft.days, label: 'dias' },
                            { value: timeLeft.hours, label: 'horas' },
                            { value: timeLeft.minutes, label: 'min' },
                            { value: timeLeft.seconds, label: 'seg' },
                        ].map(({ value, label }) => (
                            <div
                                key={label}
                                className="flex min-w-[60px] flex-col items-center rounded-xl border border-white/10 bg-surface-900 px-3 py-3 sm:min-w-[76px] sm:px-5 sm:py-4"
                            >
                                <span className="font-mono text-2xl font-bold text-amber-400 sm:text-3xl">
                                    {String(value).padStart(2, '0')}
                                </span>
                                <span className="mt-1 text-[10px] uppercase tracking-wider text-white/35">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Benefits strip */}
                    <div className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {BENEFITS.map(({ Icon, text }) => (
                            <span key={text} className="flex items-center gap-1.5 text-sm text-white/60">
                                <Icon size={13} className="text-amber-400 shrink-0" />
                                {text}
                            </span>
                        ))}
                    </div>

                    {/* Plan cards */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {FOUNDER_PLANS.map((plan) => {
                            const url = getCheckoutUrl(
                                `https://app.rendipro.com.br/register?founder=true&plano=${plan.slug}&utm_content=fundador`
                            )
                            return (
                                <div
                                    key={plan.slug}
                                    className={cn(
                                        'relative flex flex-col rounded-2xl border p-6 transition-all',
                                        plan.popular
                                            ? 'border-amber-500/50 bg-gradient-to-br from-surface-900 via-amber-500/[0.07] to-surface-900 shadow-[0_0_50px_-8px_theme(colors.amber.500/25)]'
                                            : 'border-white/8 bg-surface-900/50'
                                    )}
                                >
                                    {/* Popular badge */}
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-surface-950">
                                                Mais escolhido
                                            </span>
                                        </div>
                                    )}

                                    {/* Plan name */}
                                    <p className={cn(
                                        'text-xs font-bold uppercase tracking-widest',
                                        plan.popular ? 'text-amber-400' : 'text-white/50'
                                    )}>
                                        {plan.nome}
                                    </p>

                                    <p className="mt-1 text-xs text-white/45 leading-snug">
                                        {plan.descricao}
                                    </p>

                                    {/* Redações badge */}
                                    {plan.redacoes > 0 && (
                                        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-medium text-primary-400">
                                            <Check size={10} />
                                            {plan.redacoes} redações/mês
                                        </span>
                                    )}

                                    {/* Pricing */}
                                    <div className="mt-4 flex-1">
                                        <p className="text-xs text-white/30">
                                            <s>R${plan.originalMes.toFixed(2).replace('.', ',')}/mês</s>
                                        </p>
                                        <div className="flex items-end gap-1">
                                            <span className="text-3xl font-extrabold text-white">
                                                R${Math.floor(plan.founderMes)}
                                                <span className="text-lg">,{String(Math.round((plan.founderMes % 1) * 100)).padStart(2, '0')}</span>
                                            </span>
                                            <span className="mb-1 text-sm text-white/45">/mês</span>
                                        </div>
                                        <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-amber-400">
                                            <Lock size={9} />
                                            Travado para sempre · economiza R${plan.economiaAno}/ano
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={url}
                                        onClick={() => trackFounder(plan.slug, plan.nome)}
                                        className={cn(
                                            'mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition-all active:scale-95',
                                            plan.popular
                                                ? 'bg-amber-500 text-surface-950 hover:bg-amber-400 shadow-lg shadow-amber-500/25'
                                                : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                                        )}
                                    >
                                        Ser Fundador {plan.nome}
                                        <ArrowRight size={13} />
                                    </a>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer guarantee */}
                    <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/35">
                        <Shield size={13} />
                        Todos os planos com garantia incondicional de 7 dias. 1 clique e devolvemos 100%.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
