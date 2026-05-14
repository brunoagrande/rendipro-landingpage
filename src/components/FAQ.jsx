import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqItems } from '../data/faq-data'
import { Eyebrow } from './ui/Eyebrow'
import { Button } from './ui/Button'
import { useInfluencer } from '../contexts/InfluencerContext'
import { cn } from '../lib/utils'

/**
 * FAQ v3 — polido com novo design system.
 *
 * Mudanças vs v1:
 *  - Header com Eyebrow + H2 com gradient
 *  - 13 perguntas (era 8), ordem otimizada de objeção branda → cínica
 *  - Tipografia usando os novos tokens (text-body-lg, text-body etc)
 *  - Hover state com background sutil
 *  - Indicador de aberto melhor (rotate + cor primary quando ativo)
 *  - CTA inline depois das perguntas críticas (pergunta 12 — "já tentei e desisti")
 *  - Microcopy final apontando pra Pricing
 */

const easeSpring = [0.16, 1, 0.3, 1]

const trackInitiateCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout')
    }
}

// Índices (1-based) das perguntas críticas que recebem mini-CTA inline.
// Pergunta 12 é a "já tentei e desisti" — momento ideal pra capturar quem
// hesitou até aqui mas se identificou com a objeção.
const CTA_AFTER_QUESTIONS = new Set([12])

function FAQItem({ question, answer, isOpen, onToggle, showCTA, getCheckoutUrl }) {
    return (
        <div
            className={cn(
                'group border-b border-white/5 transition-colors',
                isOpen && 'bg-surface-900/30'
            )}
        >
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-start justify-between gap-4 py-6 text-left transition-colors"
                aria-expanded={isOpen}
            >
                <span
                    className={cn(
                        'text-body-lg font-semibold transition-colors',
                        isOpen ? 'text-white' : 'text-white/85 group-hover:text-white'
                    )}
                >
                    {question}
                </span>
                <ChevronDown
                    size={20}
                    className={cn(
                        'mt-1 shrink-0 transition-all duration-300',
                        isOpen
                            ? 'rotate-180 text-primary-400'
                            : 'text-white/40 group-hover:text-white/70'
                    )}
                />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeSpring }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 pr-8 text-body text-white/65 leading-relaxed">
                            {answer}
                        </p>

                        {showCTA && (
                            <div className="mb-6 mr-8 inline-flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-4 py-3">
                                <p className="text-body-sm text-white/85">
                                    Teste 7 dias.{' '}
                                    <strong className="text-white">Não funcionou pra você?</strong>{' '}
                                    1 clique e devolvemos.
                                </p>
                                <Button
                                    as="a"
                                    href={getCheckoutUrl(
                                        'https://app.rendipro.com.br/register'
                                    )}
                                    onClick={trackInitiateCheckout}
                                    variant="primary"
                                    size="sm"
                                >
                                    Quero testar
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)
    const { getCheckoutUrl } = useInfluencer()

    return (
        <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
            {/* Subtle background */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/[0.04] blur-[120px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-16 text-center"
                >
                    <Eyebrow variant="ghost" className="mb-4">
                        <HelpCircle size={14} />
                        Perguntas frequentes
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Suas <span className="text-gradient-primary">dúvidas</span>, sem rodeio.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Se você ainda tem dúvidas, provavelmente é uma dessas:
                    </p>
                </motion.div>

                {/* FAQ list */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: easeSpring }}
                    className="mx-auto max-w-3xl"
                >
                    {faqItems.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                            showCTA={CTA_AFTER_QUESTIONS.has(index + 1)}
                            getCheckoutUrl={getCheckoutUrl}
                        />
                    ))}
                </motion.div>

                {/* Closing CTA hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mx-auto mt-12 max-w-2xl text-center text-body-sm text-white/55"
                >
                    Não encontrou sua dúvida?{' '}
                    <a
                        href="mailto:contato@rendipro.com.br"
                        className="font-semibold text-primary-400 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
                    >
                        contato@rendipro.com.br
                    </a>{' '}
                    — respondemos em até 24h.
                </motion.p>
            </div>
        </section>
    )
}
