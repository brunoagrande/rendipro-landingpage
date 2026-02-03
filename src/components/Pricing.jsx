import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function Pricing() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

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

    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[600px] translate-x-1/2 rounded-full bg-primary-600/5 blur-[120px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        O plano ideal para sua <span className="text-primary-500">conquista</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
                        Escolha a opção que melhor se adapta ao seu ritmo de estudos. Sem taxas escondidas.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
                        {plans.map((plan, index) => {
                            const isPopular = plan.slug === 'essencial-anual';

                            return (
                                <motion.div
                                    key={plan.id_plano}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex flex-col rounded-3xl border ${isPopular
                                        ? 'border-primary-500/50 bg-primary-500/5 shadow-2xl shadow-primary-500/10 lg:scale-105 z-10'
                                        : 'border-white/5 bg-white/5'
                                        } p-8`}
                                >
                                    {isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                                            Mais Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-white">{plan.nome}</h3>
                                        <p className="mt-2 text-sm text-white/50">{plan.descricao}</p>
                                        <div className="mt-6 flex items-baseline gap-1">
                                            <span className="text-4xl font-extrabold text-white">
                                                {formatPrice(plan.preco_centavos)}
                                            </span>
                                            <span className="text-white/50">/{plan.tipo === 'anual' ? 'ano' : 'mês'}</span>
                                        </div>
                                    </div>

                                    <ul className="mb-10 flex-1 space-y-4">
                                        {plan.features?.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <div className="mt-1 rounded-full bg-primary-500/20 p-0.5">
                                                    <Check className="h-4 w-4 text-primary-400" />
                                                </div>
                                                <span className="text-sm text-white/70">{feature}</span>
                                            </li>
                                        ))}
                                        {plan.redacoes_por_mes > 0 && (
                                            <li className="flex items-start gap-3">
                                                <div className="mt-1 rounded-full bg-primary-500/20 p-0.5">
                                                    <Check className="h-4 w-4 text-primary-400" />
                                                </div>
                                                <span className="text-sm text-white/70 font-medium">
                                                    {plan.redacoes_por_mes} Redações inclusas/mês
                                                </span>
                                            </li>
                                        )}
                                    </ul>

                                    <a
                                        href={`https://app.rendipro.com.br/signup?plan=${plan.slug}`}
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
                    </div>
                )}
            </div>
        </section>
    )
}
