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
import { useSectionView } from '../lib/useSectionView'
import { trackRegisterCta } from '../lib/tracking'
import {
    getPlansByTipo,
    getMonthlyEquivalent,
    getRedacoesPorMes,
    ANNUAL_DISCOUNT_LABEL,
} from '../data/pricing-plans'

/**
 * Pricing v3 — 100% reescrito.
 *
 * Mudanças críticas vs v1:
 *  - Fonte de dados: ESTÁTICA (`src/data/pricing-plans.js`). Sem Supabase.
 *    Elimina o 401, elimina o loader infinito, elimina o ponto único de falha.
 *  - Toggle anual mostra o desconto REAL vs mensal (grade v2: -41%).
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
 *  - Desconto anual = diferenca real anual vs mensal (label em pricing-plans).
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const COMMON_FEATURES = [
    // Regra: so entra aqui o que TODO plano entrega hoje. Conferido contra o
    // produto em 15/08/2026 (ligas/loja estao atras de gate: NAO listar).
    'Redação corrigida todo mês, com nota por competência',
    'Sua apostila vira questões de treino com gabarito',
    '+8.000 flashcards prontos, organizados por matéria',
    'Crie flashcards, tire foto do caderno ou importe do Anki',
    'Revisão no momento certo, sem planilha',
    'Cronograma pelo edital, automático ou importado (CSV/PDF)',
    'Até 3 cronogramas em paralelo',
    'Sequência de estudos, missões diárias e evolução por XP',
    'Acesso completo no celular',
    'Garantia de 7 dias em qualquer plano',
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
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()
    const sectionRef = useSectionView('pricing')

    // Anual-first: e o produto da campanha (caixa antecipado paga o CAC) e o
    // melhor preco pro aluno. Mensal fica a um clique, nao escondido.
    const [tipo, setTipo] = useState('anual')
    const plans = getPlansByTipo(tipo)

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
                    <Eyebrow variant="primary" className="mb-4">
                        <Sparkles size={14} />
                        Planos
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Quanto custa adiar a sua{' '}<span className="text-gradient-primary">aprovação</span>?
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Menos que uma hora de cursinho presencial por mês. Com método de verdade.
                    </p>
                </motion.div>

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
                        Anki, planilha, corretor avulso e lembrete no celular, e ainda perde tempo decidindo o que revisar.{' '}
                        <span className="text-white/45">No RendiPro,</span>{' '}
                        <strong className="font-semibold text-white">o cronograma nasce do seu edital, a revisão chega no dia certo, sua apostila vira questão e sua redação volta corrigida. Tudo num plano só, a partir de 12x de R$ 9,90.</strong>{' '}
                        <span className="text-white/45">Menos que uma hora de cursinho presencial.</span>
                    </p>
                </motion.div>

                {/* ─── Toggle Mensal | Anual (anual default) ────────────── */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-surface-900/70 p-1 backdrop-blur-sm">
                        <button
                            type="button"
                            onClick={() => setTipo('mensal')}
                            className={cn(
                                'rounded-full px-5 py-2 text-body-sm font-semibold transition-colors',
                                tipo === 'mensal' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
                            )}
                        >
                            Mensal
                        </button>
                        <button
                            type="button"
                            onClick={() => setTipo('anual')}
                            className={cn(
                                'flex items-center gap-2 rounded-full px-5 py-2 text-body-sm font-semibold transition-colors',
                                tipo === 'anual' ? 'bg-primary-500 text-surface-950' : 'text-white/50 hover:text-white/80'
                            )}
                        >
                            Anual
                            <span
                                className={cn(
                                    'rounded-full px-1.5 py-0.5 text-[11px] font-bold',
                                    tipo === 'anual' ? 'bg-surface-950/20 text-surface-950' : 'bg-emerald-500/15 text-emerald-400'
                                )}
                            >
                                {ANNUAL_DISCOUNT_LABEL}
                            </span>
                        </button>
                    </div>
                </div>

                {/* ─── Cards Starter + Pro do período escolhido ─────────── */}
                <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
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

                {/* Trava de preco: urgencia REAL no lugar do preco riscado que nunca
                    existiu. A meta que dispara a subida fica interna (D.1); o que a
                    pessoa precisa saber e que o preco sobe e que ela fica no de hoje.
                    O sistema sustenta a promessa: o Asaas cobra o valor guardado na
                    assinatura, e nada no nosso codigo mexe nele depois. */}
                <p className="mx-auto mt-6 max-w-3xl text-center text-caption text-white/55">
                    Estes são preços de lançamento. Quem assinar agora mantém esse valor enquanto for assinante, mesmo quando o preço subir.
                </p>

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

    // O anual leva redações extras (D.2). A vitrine mostra o TOTAL que a pessoa
    // recebe, não o número cru da tabela de planos: o Pro Anual entrega 12/mês,
    // e anunciar 8 seria vender menos do que a assinatura já dá.
    const redacoes = getRedacoesPorMes(plan)

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
                        {plan.preco_ancora_mes_centavos && !hasInfluencerDiscount && (
                            <p className="mb-1 text-caption text-white/45">
                                De <span className="line-through">{formatPrice(plan.preco_ancora_mes_centavos)}</span>/mês por
                            </p>
                        )}
                        <div className="flex items-baseline gap-1">
                            <span className="text-caption font-medium text-white/50">
                                12× de
                            </span>
                            <span
                                className={cn(
                                    'text-display-sm font-extrabold',
                                    hasInfluencerDiscount ? 'text-success-400' : 'text-white'
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
                    <>
                        {plan.preco_ancora_mes_centavos && !hasInfluencerDiscount && (
                            <p className="mb-1 text-caption text-white/45">
                                De <span className="line-through">{formatPrice(plan.preco_ancora_mes_centavos)}</span>/mês por
                            </p>
                        )}
                        {/* Promessa sobre o FUTURO no lugar de mentira sobre o passado.
                            Aqui havia "De R$ 24,90 por R$ 16,90", e R$ 24,90 nunca foi
                            cobrado. O valor futuro nao e publicado de proposito: a meta
                            que dispara a subida fica interna (decisao D.1). */}
                        {plan.preco_lancamento && !hasInfluencerDiscount && (
                            <p className="mb-1 text-caption font-semibold text-primary-400">
                                Preço de lançamento
                            </p>
                        )}
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
                    </>
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

                {/* IA features — redação e questões do PDF primeiro: são o que
                    diferencia os tiers na grade v2 (15/08/2026) */}
                {redacoes.total > 0 && (
                    <li className="flex items-start gap-2 text-body-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                        <span className="text-white/80">
                            <strong className="font-bold text-white">
                                {redacoes.total}
                            </strong>{' '}
                            {redacoes.total === 1 ? 'redação corrigida' : 'redações corrigidas'}/mês, nota por competência
                            {redacoes.bonus > 0 && (
                                <span className="block text-caption text-primary-400">
                                    inclui +{redacoes.bonus} de bônus do anual
                                </span>
                            )}
                        </span>
                    </li>
                )}
                {plan.questoes_pdf_por_mes > 0 && (
                    <li className="flex items-start gap-2 text-body-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                        <span className="text-white/80">
                            <strong className="font-bold text-white">
                                {plan.questoes_pdf_por_mes}
                            </strong>{' '}
                            apostilas viram questões/mês (até {plan.questoes_pdf_max_paginas} págs cada)
                        </span>
                    </li>
                )}
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
                            ? 'cronograma adaptado'
                            : 'cronogramas adaptados'}{' '}
com IA/mês
                    </span>
                </li>
            </ul>

            {/* CTA */}
            <Button
                as="a"
                href={getCheckoutUrl(
                    `https://app.rendipro.com.br/register?plano=${plan.slug}`
                )}
                onClick={() => trackPricingCta(plan)}
                variant={isPopular ? 'primary' : 'secondary'}
                size="md"
            >
                {`Quero o ${plan.nome_curto}`}
                <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                />
            </Button>
        </motion.article>
    )
}
