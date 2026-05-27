import { useState, useEffect } from 'react'
import { ArrowRight, Lock, Medal } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { FOUNDERS_DEADLINE } from '../lib/founders'
import { getPlansByTipo } from '../data/pricing-plans'
import { useSectionView } from '../lib/useSectionView'
import { trackRegisterCta } from '../lib/tracking'
import { cn } from '../lib/utils'

const FOUNDER_DISCOUNT = 0.20

function getTimeLeft() {
    const diff = FOUNDERS_DEADLINE - new Date()
    if (diff <= 0) return null
    return {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff % 864e5) / 36e5),
        minutes: Math.floor((diff % 36e5) / 6e4),
    }
}

function pad(n) { return String(n).padStart(2, '0') }
function formatBRL(cents) {
    return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const trackMiniCta = (plan) => {
    // Centralizado em trackRegisterCta: dispara Meta InitiateCheckout
    // enriquecido (value + content_ids + content_name + content_type + num_items + eventID UUID)
    // e GA4 cta_click.
    trackRegisterCta({
        buttonText: `Garantir Fundador ${plan.nome_curto}`,
        location: 'mini_pricing',
        plan,
    })
}

export function MiniPricing() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)
    const { getCheckoutUrl } = useInfluencer()
    const sectionRef = useSectionView('mini_pricing')

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000 * 30)
        return () => clearInterval(id)
    }, [])

    if (!timeLeft) return null

    const anualPlans = getPlansByTipo('anual')

    return (
        <section
            ref={sectionRef}
            aria-label="Oferta Fundador, preview rápido dos planos"
            className="relative overflow-hidden border-y border-amber-500/15 bg-gradient-to-b from-surface-950 via-amber-500/[0.04] to-surface-950 py-10 sm:py-14"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header compacto com countdown inline */}
                <div className="mb-6 text-center animate-fade-in-up-sm">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
                        <Medal size={12} />
                        Vagas de Fundador
                        <span className="font-mono normal-case tracking-normal text-amber-300">
                            acaba em {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m
                        </span>
                    </div>
                    <h2 className="mt-3 text-h2 sm:text-display-sm font-extrabold tracking-tight text-white">
                        20% OFF travado{' '}
                        <span className="text-gradient-primary">pra sempre.</span>
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
                        Quem entra agora paga o mesmo valor pelo resto da assinatura. Quando o preço sobe, o seu fica onde está.
                    </p>
                </div>

                {/* Grid de 4 cards mini — scroll horizontal em mobile <sm */}
                <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:overflow-visible">
                    <div className="flex gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        {anualPlans.map((plan) => {
                            const founderPrice = Math.round(plan.preco_centavos * (1 - FOUNDER_DISCOUNT))
                            const founderMes = founderPrice / 12
                            const isPopular = plan.popular === true
                            const url = getCheckoutUrl(
                                `https://app.rendipro.com.br/register?founder=true&plano=${plan.slug}&utm_content=mini_pricing`
                            )
                            return (
                                <a
                                    key={plan.id_plano}
                                    href={url}
                                    onClick={() => trackMiniCta(plan)}
                                    className={cn(
                                        'group relative flex w-[200px] shrink-0 flex-col justify-between rounded-2xl border p-4 transition-all sm:w-auto',
                                        'active:scale-[0.98]',
                                        isPopular
                                            ? 'border-amber-500/50 bg-gradient-to-br from-surface-900 via-amber-500/[0.08] to-surface-900 shadow-[0_0_40px_-12px_theme(colors.amber.500/40)] hover:border-amber-500/70'
                                            : 'border-white/10 bg-surface-900/60 hover:border-white/20 hover:bg-surface-900/80'
                                    )}
                                >
                                    {isPopular && (
                                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-surface-950">
                                            Mais escolhido
                                        </span>
                                    )}

                                    <div>
                                        <p className={cn(
                                            'text-xs font-bold uppercase tracking-widest',
                                            isPopular ? 'text-amber-400' : 'text-white/50'
                                        )}>
                                            {plan.nome_curto}
                                        </p>
                                        <p className="mt-1 text-[11px] leading-snug text-white/45">
                                            {plan.redacoes_por_mes > 0
                                                ? `${plan.redacoes_por_mes} ${plan.redacoes_por_mes > 1 ? 'redações' : 'redação'} corrigidas por mês`
                                                : 'Sem correção de redação'}
                                        </p>

                                        <div className="mt-3">
                                            <p className="text-[10px] text-white/30 line-through">
                                                {formatBRL(plan.preco_centavos / 12)}/mês
                                            </p>
                                            <p className="flex items-baseline gap-1">
                                                <span className="text-2xl font-extrabold text-white">
                                                    {formatBRL(founderMes)}
                                                </span>
                                                <span className="text-xs text-white/45">/mês</span>
                                            </p>
                                            <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-amber-400">
                                                <Lock size={9} />
                                                Travado p/ sempre
                                            </p>
                                        </div>
                                    </div>

                                    <span className={cn(
                                        'mt-4 inline-flex items-center justify-center gap-1 rounded-full py-2 text-xs font-bold transition-colors',
                                        isPopular
                                            ? 'bg-amber-500 text-surface-950 group-hover:bg-amber-400'
                                            : 'border border-white/10 bg-white/5 text-white group-hover:bg-white/10'
                                    )}>
                                        Garantir
                                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </a>
                            )
                        })}
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-white/40">
                    <a href="#pricing" className="font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">
                        Comparar tudo que vem em cada plano →
                    </a>
                </p>
            </div>
        </section>
    )
}
