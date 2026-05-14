import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Check,
    Crown,
    Shield,
    Sparkles,
    X as XIcon,
    Zap,
} from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { cn } from '../lib/utils'
import {
    ANNUAL_DISCOUNT_LABEL,
    getMonthlyEquivalent,
    getPlansByTipo,
} from '../data/pricing-plans'

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
    '+6.000 questões comentadas por alternativa',
    '+10 provas oficiais com PDF sincronizado',
    '+100 temas de redação atualizados',
    'Cronograma adaptado (auto, manual ou import PDF/CSV)',
    'Gamificação completa: streak, XP, ligas e missões',
    'Até 3 cronogramas paralelos (exclusivo)',
    'Acesso completo no celular (web responsivo)',
]

function formatPrice(cents) {
    return (cents / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const trackInitiateCheckout = (plan) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
            content_name: plan.nome,
            content_category: plan.tipo,
            value: plan.preco_centavos / 100,
            currency: 'BRL',
        })
    }
}

export function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState('anual')
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()

    const plans = getPlansByTipo(billingPeriod)

    return (
        <section
            id="pricing"
            className="relative overflow-hidden py-24 sm:py-32"
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
                    className="mb-12 text-center"
                >
                    <Eyebrow variant="primary" className="mb-4">
                        <Sparkles size={14} />
                        Planos
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Quanto custa adiar a sua{' '}
                        <span className="text-gradient-primary">aprovação</span>?
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Quatro planos. Mesma plataforma. A diferença está no quanto você usa o que importa mais: redação corrigida por professor humano.
                    </p>
                </motion.div>

                {/* ─── Billing toggle ───────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, ease: easeSpring }}
                    className="mb-12 flex justify-center"
                >
                    <BillingToggle
                        billingPeriod={billingPeriod}
                        setBillingPeriod={setBillingPeriod}
                    />
                </motion.div>

                {/* ─── 4 plan cards ─────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {plans.map((plan, i) => (
                        <PlanCard
                            key={plan.id_plano}
                            plan={plan}
                            index={i}
                            influencerData={influencerData}
                            applyDiscount={applyDiscount}
                            getCheckoutUrl={getCheckoutUrl}
                        />
                    ))}
                </div>

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

function BillingToggle({ billingPeriod, setBillingPeriod }) {
    return (
        <div className="inline-flex rounded-full border border-white/10 bg-surface-900/60 p-1 backdrop-blur-sm">
            <button
                type="button"
                onClick={() => setBillingPeriod('mensal')}
                className={cn(
                    'rounded-full px-5 sm:px-7 py-2 text-body-sm font-semibold transition-all',
                    billingPeriod === 'mensal'
                        ? 'bg-white text-surface-950 shadow-sm'
                        : 'text-white/60 hover:text-white'
                )}
            >
                Mensal
            </button>
            <button
                type="button"
                onClick={() => setBillingPeriod('anual')}
                className={cn(
                    'inline-flex items-center gap-2 rounded-full px-5 sm:px-7 py-2 text-body-sm font-semibold transition-all',
                    billingPeriod === 'anual'
                        ? 'bg-white text-surface-950 shadow-sm'
                        : 'text-white/60 hover:text-white'
                )}
            >
                Anual
                <span className="rounded-md bg-primary-500 px-1.5 py-0.5 text-[10px] font-bold text-surface-950">
                    {ANNUAL_DISCOUNT_LABEL}
                </span>
            </button>
        </div>
    )
}

function PlanCard({ plan, index, influencerData, applyDiscount, getCheckoutUrl }) {
    const isPopular = plan.popular === true
    const monthlyEq = plan.tipo === 'anual' ? getMonthlyEquivalent(plan) : null

    const discountedPrice = applyDiscount(plan.preco_centavos)
    const hasInfluencerDiscount =
        influencerData && discountedPrice < plan.preco_centavos

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
            {/* Popular badge */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary-500 px-3 py-1 text-micro font-bold uppercase tracking-wider text-surface-950 shadow-elevation-2">
                    <Crown size={11} />
                    Mais escolhido
                </div>
            )}

            <div className="mb-5">
                <h3 className="text-h3 font-bold text-white">{plan.nome_curto}</h3>
                <p className="mt-1.5 min-h-[3em] text-body-sm leading-snug text-white/55">
                    {plan.descricao}
                </p>
            </div>

            {/* Price */}
            <div className="mb-6">
                {hasInfluencerDiscount && (
                    <p className="mb-1 text-caption text-white/40">
                        De{' '}
                        <span className="line-through">
                            {formatPrice(plan.preco_centavos)}
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
                                    hasInfluencerDiscount
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
                        {savings > 0 && !hasInfluencerDiscount && (
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
                {/* Redação — destaque por ser o moat */}
                <li className="flex items-start gap-2 text-body-sm">
                    {plan.redacoes_por_mes > 0 ? (
                        <>
                            <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                            <span className="text-white/85">
                                <strong className="font-bold text-white">
                                    {plan.redacoes_por_mes}
                                </strong>{' '}
                                {plan.redacoes_por_mes === 1 ? 'redação' : 'redações'} por professor humano/mês
                            </span>
                        </>
                    ) : (
                        <>
                            <XIcon size={16} className="mt-0.5 shrink-0 text-white/30" />
                            <span className="text-white/40">
                                Sem redação por professor humano
                            </span>
                        </>
                    )}
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
                <li className="flex items-start gap-2 text-body-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                    <span className="text-white/80">
                        <strong className="font-bold text-white">
                            {plan.chat_ia_questao_por_mes}
                        </strong>{' '}
                        tira-dúvidas com IA em questões/mês
                    </span>
                </li>
            </ul>

            {/* CTA */}
            <Button
                as="a"
                href={getCheckoutUrl(
                    `https://app.rendipro.com.br/register?plan=${plan.slug}`
                )}
                onClick={() => trackInitiateCheckout(plan)}
                variant={isPopular ? 'primary' : 'secondary'}
                size="md"
            >
                Quero o {plan.nome_curto}
                <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                />
            </Button>
        </motion.article>
    )
}
