import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqItems } from '../data/faq-data'
import { Eyebrow } from './ui/Eyebrow'
import { cn } from '../lib/utils'
import { trackFaqOpen } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'

/**
 * FAQ v4 — 7 perguntas (reduzido de 13 em 2026-05-24).
 * CTA grande no fim da seção (substitui mini-CTA inline na pergunta 12).
 */

const easeSpring = [0.16, 1, 0.3, 1]

function FAQItem({ question, answer, link, isOpen, onToggle }) {
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
                            {link && (
                                <>
                                    {' '}
                                    <a href={link.href} target="_blank" rel="noopener" className="text-primary-300 underline underline-offset-2 hover:text-primary-200">
                                        {link.label}
                                    </a>
                                </>
                            )}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(0)
    const sectionRef = useSectionView('faq')

    const toggleQuestion = (index, question) => {
        const willOpen = openIndex !== index
        setOpenIndex(willOpen ? index : null)
        if (willOpen) trackFaqOpen(index + 1, question)
    }

    return (
        <section ref={sectionRef} id="faq" className="relative overflow-hidden py-14 sm:py-24">
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
                        Dúvidas
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Dúvidas, sem rodeio
                    </h2>
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
                            link={faq.link}
                            isOpen={openIndex === index}
                            onToggle={() => toggleQuestion(index, faq.question)}
                        />
                    ))}
                </motion.div>

                {/* 01/11/2026 (landing v2, hormozi): saiu o CTA "Começar agora" do fim do FAQ.
                    O pedido fica no Fechamento logo abaixo; "em qualquer plano" morreu com o Pro
                    fora da página. */}
                {/* Contato */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mx-auto mt-8 max-w-2xl text-center text-body-sm text-white/55"
                >
                    Ainda ficou alguma dúvida?{' '}
                    <a
                        href="mailto:contato@rendipro.com.br"
                        className="font-semibold text-primary-400 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
                    >
                        contato@rendipro.com.br
                    </a>
                    .
                </motion.p>
            </div>
        </section>
    )
}
