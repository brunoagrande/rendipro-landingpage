import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Check,
    Crown,
    Lock,
    Medal,
    Shield,
    Sparkles,
    X as XIcon,
    Zap,
} from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { cn } from '../lib/utils'
import { FOUNDERS_DEADLINE } from '../lib/founders'
import { useSectionView } from '../lib/useSectionView'
import { trackRegisterCta } from '../lib/tracking'
import {
    getAllLandingPlans,
    getMonthlyEquivalent,
} from '../data/pricing-plans'

const FOUNDER_DISCOUNT = 0.20

function getTimeLeft() {
    const diff = FOUNDERS_DEADLINE - new Date()
    if (diff <= 0) return null
    return {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff % 864e5) / 36e5),
        minutes: Math.floor((diff % 36e5) / 6e4),
        seconds: Math.floor((diff % 6e4) / 1e3),
    }
}

/**
 * Pricing v3 — 100% reescrito.
 *
 * Mudanças críticas vs v1:
 *  - Fonte de dados: ESTÁTICA (`src/data/pricing-plans.js`). Sem Supabase.
 *    Elimina o 401, elimina o loader infinito, elimina o ponto único de falha.
 *  - Toggle anual mostra -33% (era -20%, errado).
 *  - 3 features de IA por plano agora visíveis (flashcards IA, cronograma IA,
 *    tira-dúvidas IA).
 *  - Cada CTA é "Quero o [Nome]" (Joel Jota / Bruno Perini pattern).
 *  - Garantia destacada abaixo dos cards em 3 selos.
 *  - InfluencerContext continua funcional pra cupons.
 *  - Pixel InitiateCheckout segue disparando em cada CTA.
 *
 * Decisão locked (Bruno):
 *  - Manter nomes Starter/Plus/Pro/Ultra (não renomear).
 *  - Garantia 7 dias incondicional CDC.
 *  - Desconto anual -33%.
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const COMMON_FEATURES = [
    '+8.000 flashcards SM-2 prontos em 69 baralhos',
    'Crie flashcards ou importe seus decks do Anki',
    'Revisão no momento certo com repetição espaçada',
    'Cronograma adaptado (auto, por edital ou import CSV/PDF)',
    'Até 3 cronogramas paralelos (exclusivo)',
    'Gamificação completa: streak, XP, ligas e missões',
    'IA pra gerar flashcards e tirar dúvidas nos estudos',
    'Acesso completo no celular (web responsivo)',
]

function formatPrice(cents) {
    return (cents / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const trackPricingCta = (plan) => {
    // Centralizado em trackRegisterCta: dispara Meta InitiateCheckout
    // (value + content_ids + content_name + content_type + num_items + currency + eventID UUID)
    // e GA4 cta_click (com plan_slug/plan_value + UTMs).
    trackRegisterCta({
        buttonText: `Assinar ${plan.nome}`,
        location: 'pricing',
        plan,
    })
}

export function Pricing() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()
    const sectionRef = useSectionView('pricing')

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(id)
    }, [])

    const foundersActive = !!timeLeft
    const isFounderPricing = foundersActive

    const plans = getAllLandingPlans()

    return (
        <section
            ref={sectionRef}
            id="pricing"
            className="relative overflow-hidden py-14 sm:py-24"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/[0.05] blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── Header ───────────────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-10 text-center"
                >
                    <Eyebrow variant={foundersActive ? 'warning' : 'primary'} className="mb-4">
                        {foundersActive ? <Medal size={14} /> : <Sparkles size={14} />}
                        {foundersActive ? 'Vagas de Fundador · Oferta por tempo limitado' : 'Planos'}
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        {foundersActive ? (
                            <>Trave o menor preço{' '}<span className="text-gradient-primary">para sempre.</span></>
                        ) : (
                            <>Quanto custa adiar a sua{' '}<span className="text-gradient-primary">aprovação</span>?</>
                        )}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        {foundersActive
                            ? 'Todos os planos anuais com 20% OFF. Quem entra agora paga o mesmo valor mesmo quando o preço subir lá na frente.'
                            : 'Menos que uma hora de cursinho presencial por mês. Com método de verdade.'}
                    </p>
                </motion.div>

                {/* ─── Countdown (founder urgency) ──────────────────────── */}
                {foundersActive && (
                    <div className="mb-8 flex justify-center gap-2 sm:gap-3">
                        {[
                            { value: timeLeft.days, label: 'dias' },
                            { value: timeLeft.hours, label: 'horas' },
                            { value: timeLeft.minutes, label: 'min' },
                            { value: timeLeft.seconds, label: 'seg' },
                        ].map(({ value, label }) => (
                            <div
                                key={label}
                                className="flex min-w-[58px] flex-col items-center rounded-xl border border-white/10 bg-surface-900 px-3 py-2.5 sm:min-w-[72px] sm:px-4 sm:py-3"
                            >
                                <span className="font-mono text-xl font-bold text-amber-400 sm:text-2xl">
                                    {String(value).padStart(2, '0')}
                                </span>
                                <span className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* ─── Callout "vs 4 apps" ─────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, ease: easeSpring }}
                    className="mx-auto mb-8 max-w-3xl rounded-2xl border border-white/10 bg-surface-900/60 px-5 py-4 text-center backdrop-blur-sm sm:text-left"
                >
                    <p className="text-body-sm leading-relaxed text-white/70">
                        <span className="text-white/45">Hoje você junta</span>{' '}
                        Anki, planilha e lembrete no celular — e ainda perde tempo decidindo o que revisar.{' '}
                        <span className="text-white/45">No RendiPro,</span>{' '}
                        <strong className="font-semibold text-white">a IA transforma seu material em questões e flashcards, monta o cronograma e revisa por você — num plano só, por R$ 9,90/mês.</strong>{' '}
                        <span className="text-white/45">Menos que uma hora de cursinho presencial.</span>
                    </p>
                </motion.div>

                {/* ─── Plano Starter (mensal + anual lado a lado) ───────── */}
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 md:grid-cols-2">
                    {plans.map((plan, i) => (
                        <PlanCard
                            key={plan.id_plano}
                            plan={plan}
                            index={i}
                            influencerData={influencerData}
                            applyDiscount={applyDiscount}
                            getCheckoutUrl={getCheckoutUrl}
                            isFounderPricing={isFounderPricing}
                        />
                    ))}
                </div>

                {/* ─── Founder benefits strip ───────────────────────────── */}
                {isFounderPricing && (
                    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {[
                            { Icon: Lock, text: 'Preço travado para sempre' },
                            { Icon: Medal, text: 'Selo Fundador no perfil' },
                            { Icon: Zap, text: 'Acesso antecipado a novas features' },
                            { Icon: Shield, text: 'Garantia de 7 dias' },
                        ].map(({ Icon, text }) => (
                            <span key={text} className="flex items-center gap-1.5 text-sm text-white/65">
                                <Icon size={13} className="text-amber-400 shrink-0" />
                                {text}
                            </span>
                        ))}
                    </div>
                )}

                {/* ─── Common features banner ───────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2, ease: easeSpring }}
                    className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/10 bg-surface-900/40 p-6 backdrop-blur-sm sm:p-8"
                >
                    <p className="text-center text-micro font-semibold uppercase tracking-widest text-primary-400">
                        Em todos os planos você tem acesso a
                    </p>
                    <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                        {COMMON_FEATURES.map((f) => (
                            <li
                                key={f}
                                className="flex items-start gap-2 text-body-sm text-white/70"
                            >
                                <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* ─── Guarantee row ────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-x-10 sm:gap-y-4 text-body-sm text-white/75"
                >
                    <span className="flex items-center gap-2">
                        <Shield size={18} className="text-primary-400" />
                        <span>
                            <strong className="font-semibold text-white">Garantia de 7 dias.</strong>{' '}
                            1 clique e devolvemos 100%.
                        </span>
                    </span>
                    <span className="flex items-center gap-2">
                        <Zap size={18} className="text-primary-400" />
                        <span>
                            <strong className="font-semibold text-white">Acesso imediato</strong>{' '}
                            após o pagamento.
                        </span>
                    </span>
                    <span className="flex items-center gap-2">
                        <XIcon size={18} className="text-primary-400" />
                        <span>
                            <strong className="font-semibold text-white">Cancela quando quiser</strong>,
                            sem ligação.
                        </span>
                    </span>
                </motion.div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════════════ */


function PlanCard({ plan, index, influencerData, applyDiscount, getCheckoutUrl, isFounderPricing }) {
    const isPopular = plan.popular === true
    const monthlyEq = plan.tipo === 'anual' ? getMonthlyEquivalent(plan) : null

    // Influencer applica primeiro; Fundador (-20%) só rola sobre Anual quando ativo
    const afterInfluencer = applyDiscount(plan.preco_centavos)
    const discountedPrice = isFounderPricing
        ? Math.round(afterInfluencer * (1 - FOUNDER_DISCOUNT))
        : afterInfluencer
    const hasInfluencerDiscount =
        influencerData && afterInfluencer < plan.preco_centavos
    const showFounderBadge = isFounderPricing && plan.tipo === 'anual'
    const founderSavingsAno = showFounderBadge
        ? Math.round(afterInfluencer * FOUNDER_DISCOUNT)
        : 0

    let savings = 0
    if (monthlyEq && plan.tipo === 'anual') {
        savings = monthlyEq.preco_centavos * 12 - plan.preco_centavos
    }

    return (
        <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: easeSpring,
            }}
            className={cn(
                'relative flex flex-col rounded-3xl p-6 sm:p-7',
                isPopular
                    ? 'z-10 border border-primary-500/40 bg-gradient-to-br from-surface-900 via-primary-500/[0.06] to-surface-900 shadow-glow-primary lg:scale-[1.03]'
                    : 'border border-white/10 bg-surface-900/60 backdrop-blur-sm'
            )}
        >
            {/* Popular badge — Starter como entry point recomendado */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary-500 px-3 py-1 text-micro font-bold uppercase tracking-wider text-surface-950 shadow-elevation-2">
                    <Crown size={11} />
                    Comece aqui
                </div>
            )}

            <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-h3 font-bold text-white">{plan.nome_curto}</h3>
                    <span className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                        {plan.tipo === 'anual' ? 'Anual' : 'Mensal'}
                    </span>
                </div>
                <p className="min-h-[3em] text-body-sm leading-snug text-white/55">
                    {plan.descricao}
                </p>
            </div>

            {/* Price */}
            <div className="mb-6">
                {(hasInfluencerDiscount || showFounderBadge) && (
                    <p className="mb-1 text-caption text-white/40">
                        De{' '}
                        <span className="line-through">
                            {formatPrice(showFounderBadge ? afterInfluencer : plan.preco_centavos)}
                        </span>
                    </p>
                )}
                {plan.tipo === 'anual' && plan.preco_centavos > 0 ? (
                    <>
                        <div className="flex items-baseline gap-1">
                            <span className="text-caption font-medium text-white/50">
                                12× de
                            </span>
                            <span
                                className={cn(
                                    'text-display-sm font-extrabold',
                                    showFounderBadge
                                        ? 'text-amber-400'
                                        : hasInfluencerDiscount
                                            ? 'text-success-400'
                                            : 'text-white'
                                )}
                            >
                                {formatPrice(discountedPrice / 12)}
                            </span>
                        </div>
                        <p className="mt-1.5 text-caption text-white/45">
                            ou {formatPrice(discountedPrice)} à vista/ano
                        </p>
                        {showFounderBadge && (
                            <p className="mt-2.5 inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-caption font-bold text-amber-400">
                                <Lock size={10} />
                                Travado p/ sempre · economiza {formatPrice(founderSavingsAno)}/ano
                            </p>
                        )}
                        {savings > 0 && !hasInfluencerDiscount && !showFounderBadge && (
                            <p className="mt-2.5 inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-caption font-bold text-emerald-400">
                                Economize {formatPrice(savings)}/ano
                            </p>
                        )}
                    </>
                ) : (
                    <div className="flex items-baseline gap-1">
                        <span
                            className={cn(
                                'text-display-sm font-extrabold',
                                hasInfluencerDiscount ? 'text-success-400' : 'text-white'
                            )}
                        >
                            {formatPrice(discountedPrice)}
                        </span>
                        <span className="text-caption text-white/50">/mês</span>
                    </div>
                )}
            </div>

            {/* Plan-specific features (4 bullets) */}
            <ul className="mb-7 flex-1 space-y-3">
                {/* Núcleo do produto */}
                <li className="flex items-start gap-2 text-body-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                    <span className="text-white/85">
                        <strong className="font-bold text-white">Tudo da plataforma:</strong>{' '}
                        cronograma, flashcards e revisão no momento certo
                    </span>
                </li>

                {/* IA features */}
                <li className="flex items-start gap-2 text-body-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                    <span className="text-white/80">
                        <strong className="font-bold text-white">
                            {plan.flashcards_ia_por_mes}
                        </strong>{' '}
                        flashcards gerados com IA/mês
                    </span>
                </li>
                <li className="flex items-start gap-2 text-body-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                    <span className="text-white/80">
                        <strong className="font-bold text-white">
                            {plan.cronograma_ia_por_mes}
                        </strong>{' '}
                        {plan.cronograma_ia_por_mes === 1
                            ? 'cronograma'
                            : 'cronogramas'}{' '}
                        adaptado com IA/mês
                    </span>
                </li>
            </ul>

            {/* CTA */}
            <Button
                as="a"
                href={getCheckoutUrl(
                    showFounderBadge
                        ? `https://app.rendipro.com.br/register?founder=true&plano=${plan.slug}&utm_content=fundador`
                        : `https://app.rendipro.com.br/register?plano=${plan.slug}`
                )}
                onClick={() => trackPricingCta(plan)}
                variant={isPopular ? 'primary' : 'secondary'}
                size="md"
            >
                {showFounderBadge ? `Ser Fundador ${plan.nome_curto}` : `Quero o ${plan.nome_curto}`}
                <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                />
            </Button>
        </motion.article>
    )
}
