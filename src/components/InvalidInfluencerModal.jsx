import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'

export function InvalidInfluencerModal() {
    const { isInvalidOrExpired, dismissInvalidModal } = useInfluencer()

    return (
        <AnimatePresence>
            {isInvalidOrExpired && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-950/80 p-4 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-surface-900 shadow-2xl"
                    >
                        {/* Glowing Background Effect */}
                        <div className="absolute -top-24 -left-24 -z-10 h-48 w-48 rounded-full bg-red-500/20 blur-[60px]" />

                        <div className="p-8 md:p-10 text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>

                            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">
                                Esta oferta especial não está mais disponível
                            </h3>

                            <p className="mb-8 text-white/60 leading-relaxed">
                                O link ou cupom promocional que você tentou acessar expirou ou é inválido. Mas não se preocupe, você ainda pode conferir nossos planos atuais para acelerar a sua aprovação.
                            </p>

                            <button
                                onClick={dismissInvalidModal}
                                className="w-full rounded-xl bg-primary-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-500 active:scale-95"
                            >
                                Ver planos disponíveis
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
