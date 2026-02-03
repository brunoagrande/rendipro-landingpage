import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function Pricing() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [billingPeriod, setBillingPeriod] = useState('anual')

    useEffect(() => {
        async function fetchPlans() {
            try {
                const { data, error } = await supabase
                    .from('tbplanos')
                    .select('*')
                    .eq('ativo', true)
                    .order('ordem', { ascending: true })

                if (error) throw error
                setPlans(data || [])
            } catch (err) {
                console.error('Erro ao buscar planos:', err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPlans()
    }, [])

    const formatPrice = (cents) => {
        return (cents / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    const filteredPlans = plans.filter(plan => plan.tipo === billingPeriod)

    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-surface-950">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/5 blur-[120px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Escolha seu plano
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
                        O investimento ideal para sua aprovação. Comece com 7 dias grátis.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-10 flex justify-center">
                        <div className="relative flex rounded-full bg-white/5 p-1 backdrop-blur-sm border border-white/5">
                            <button
                                onClick={() => setBillingPeriod('mensal')}
                                className={`relative z-10 px-6 py-2 text-sm font-semibold transition-colors ${billingPeriod === 'mensal' ? 'text-surface-950' : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                Mensal
                                {billingPeriod === 'mensal' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 -z-10 rounded-full bg-white"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setBillingPeriod('anual')}
                                className={`relative z-10 px-6 py-2 text-sm font-semibold transition-colors ${billingPeriod === 'anual' ? 'text-surface-950' : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                Anual
                                <span className="absolute -top-1 -right-2 rounded-full bg-primary-600 px-1.5 py-0.5 text-[10px] text-white">
                                    -20%
                                </span>
                                {billingPeriod === 'anual' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 -z-10 rounded-full bg-white"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                    </div>
                ) : (
                    <div className="relative">
                        {/* Horizontal Scroll Container for Mobile / Grid for Desktop */}
                        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 scrollbar-hide">
                            <AnimatePresence mode="wait">
                                {filteredPlans.map((plan, index) => {
                                    const isPopular = plan.slug.includes('anual') && plan.slug.includes('essencial') || plan.slug === 'essencial-anual';

                                    return (
                                        <motion.div
                                            key={plan.id_plano}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className={`relative min-w-[300px] flex-shrink-0 snap-center flex flex-col rounded-3xl border transition-all duration-300 ${isPopular
                                                    ? 'border-primary-500/50 bg-primary-500/5 shadow-2xl shadow-primary-500/10 lg:scale-105 z-10'
                                                    : 'border-white/5 bg-white/5'
                                                } p-8 lg:min-w-0`}
                                        >
                                            {isPopular && (
                                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                                                    Mais Popular
                                                </div>
                                            )}

                                            <div className="mb-8">
                                                <h3 className="text-xl font-bold text-white tracking-tight">{plan.nome}</h3>
                                                <p className="mt-2 text-sm text-white/50 min-h-[40px] leading-relaxed">
                                                    {plan.descricao}
                                                </p>
                                                <div className="mt-8">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-extrabold text-white">
                                                            {formatPrice(plan.preco_centavos)}
                                                        </span>
                                                        <span className="text-white/50 text-sm">/{plan.tipo === 'anual' ? 'ano' : 'mês'}</span>
                                                    </div>
                                                    {plan.tipo === 'anual' && plan.preco_centavos > 0 && (
                                                        <p className="mt-1 text-xs text-primary-400 font-medium">
                                                            Equivalente a {formatPrice(plan.preco_centavos / 12)}/mês
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <ul className="mb-10 flex-1 space-y-4">
                                                {plan.features?.map((feature, fIndex) => (
                                                    <li key={fIndex} className="flex items-start gap-3">
                                                        <div className="mt-1 rounded-full bg-primary-500/10 p-0.5">
                                                            <Check className="h-3.5 w-3.5 text-primary-400" />
                                                        </div>
                                                        <span className="text-sm text-white/70 leading-normal">{feature}</span>
                                                    </li>
                                                ))}
                                                {plan.redacoes_por_mes > 0 && (
                                                    <li className="flex items-start gap-3">
                                                        <div className="mt-1 rounded-full bg-primary-500/10 p-0.5">
                                                            <Check className="h-3.5 w-3.5 text-primary-400" />
                                                        </div>
                                                        <span className="text-sm text-white/70 font-medium">
                                                            {plan.redacoes_por_mes} Redações inclusas/mês
                                                        </span>
                                                    </li>
                                                )}
                                            </ul>

                                            <a
                                                href={`https://app.rendipro.com.br/register?plan=${plan.slug}`}
                                                className={`flex h-12 items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-95 ${isPopular
                                                        ? 'bg-primary-500 text-white hover:bg-primary-400 shadow-lg shadow-primary-500/30'
                                                        : 'bg-white/10 text-white hover:bg-white/20'
                                                    }`}
                                            >
                                                Escolher Plano
                                            </a>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Drag Indicator */}
                        <div className="mt-4 flex justify-center gap-2 lg:hidden">
                            {filteredPlans.map((_, i) => (
                                <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
