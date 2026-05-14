import { motion } from 'framer-motion'
import { ArrowRight, Check, Lock, Shield } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'

/**
 * FinalCTA — última oportunidade de conversão.
 *
 * Padrão Halbert "closing argument with touch of fear or aspiration":
 *  - Headline com contraposição emocional ("começa com plano OU de novo no susto")
 *  - Recap das 4 promessas numéricas principais
 *  - CTA forte (mesmo do Hero pra consistência)
 *  - Microcopy de garantia visível (Shield + "1 clique e devolvemos")
 *
 * Posição final na pipeline. Vem após FAQ-as-engine, onde o leitor já matou
 * suas objeções residuais. Aqui é decisão.
 */

const easeSpring = [0.16, 1, 0.3, 1]

const trackInitiateCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout')
    }
}

const RECAP_ITEMS = [
    '+6.000 questões comentadas por alternativa',
    '+8.000 flashcards SM-2 prontos',
    'Redação manuscrita corrigida por professor humano',
    'Cronograma adaptado em 5 minutos',
]

export function FinalCTA() {
    const { getCheckoutUrl } = useInfluencer()

    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            {/* Background layers */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-600)_0%,_transparent_60%)] opacity-[0.12]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: easeSpring }}
                    className="mx-auto max-w-4xl rounded-3xl border border-primary-500/30 bg-gradient-to-br from-surface-900 via-primary-500/[0.06] to-surface-900 p-8 text-center shadow-glow-primary sm:p-14"
                >
                    <Eyebrow variant="primary" className="mb-6">
                        <Shield size={14} />
                        Garantia de 7 dias incondicional
                    </Eyebrow>

                    <h2 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight text-white">
                        A próxima semana começa{' '}
                        <span className="text-gradient-primary">com plano</span>.
                        <br />
                        <span className="text-white/55">
                            Ou de novo no susto.
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/65">
                        Os mesmos 7 dias que custam nada pra testar custam meses se você adiar. Configura em 5 minutos hoje, tem cronograma rodando antes do café da manhã de amanhã.
                    </p>

                    {/* Recap bullets */}
                    <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
                        {RECAP_ITEMS.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-2 text-body-sm text-white/80"
                            >
                                <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-12 flex flex-col items-center gap-5">
                        <Button
                            as="a"
                            href={getCheckoutUrl(
                                'https://app.rendipro.com.br/register'
                            )}
                            onClick={trackInitiateCheckout}
                            variant="primary"
                            size="lg"
                            className="sm:px-12"
                        >
                            Quero testar 7 dias
                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Button>

                        <p className="flex items-center gap-2 text-body-sm font-medium text-white/70">
                            <Shield size={16} className="text-primary-400" />
                            Teste 7 dias. Não gostou? 1 clique e devolvemos 100%.
                        </p>
                        <p className="flex items-center gap-2 text-caption text-white/50">
                            <Lock size={14} className="text-white/40" />
                            Pagamento seguro · Acesso imediato após confirmação
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
