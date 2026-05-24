import { motion } from 'framer-motion'
import { ArrowRight, Lock, Shield } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'

const easeSpring = [0.16, 1, 0.3, 1]

const trackFinalCta = () => trackRegisterCta({ buttonText: 'Garantir preço Fundador', location: 'final_cta' })

export function FinalCTA() {
    const { getCheckoutUrl } = useInfluencer()
    const sectionRef = useSectionView('final_cta')

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28">
            {/* Background layers */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-600)_0%,_transparent_60%)] opacity-[0.12]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: easeSpring }}
                    className="mx-auto max-w-3xl rounded-3xl border border-primary-500/30 bg-gradient-to-br from-surface-900 via-primary-500/[0.06] to-surface-900 p-8 text-center shadow-glow-primary sm:p-12"
                >
                    <Eyebrow variant="primary" className="mb-5">
                        <Shield size={14} />
                        Garantia de 7 dias incondicional
                    </Eyebrow>

                    <h2 className="text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        A próxima semana começa{' '}
                        <span className="text-gradient-primary">com plano</span>.
                        <br />
                        <span className="text-white/55">
                            Ou na correria, como sempre.
                        </span>
                    </h2>

                    <div className="mt-9 flex flex-col items-center gap-4">
                        <Button
                            as="a"
                            href={getCheckoutUrl(
                                'https://app.rendipro.com.br/register?founder=true&utm_content=final_cta'
                            )}
                            onClick={trackFinalCta}
                            variant="primary"
                            size="lg"
                            className="sm:px-12"
                        >
                            Garantir preço Fundador
                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Button>

                        <p className="flex items-center gap-2 text-body-sm font-medium text-white/70">
                            <Shield size={16} className="text-primary-400" />
                            Teste 7 dias. Não gostou, devolvemos 100% com 1 clique.
                        </p>
                        <p className="flex items-center gap-2 text-caption text-white/50">
                            <Lock size={14} className="text-white/40" />
                            Pagamento seguro. Acesso imediato após confirmação.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
