import { motion, AnimatePresence } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'

export function TopBanner() {
    const { influencerData, isLoadingInfluencer } = useInfluencer()

    if (isLoadingInfluencer || !influencerData) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-[60] w-full bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-3 shadow-lg"
            >
                <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                    <PartyPopper className="h-5 w-5 text-yellow-300 animate-bounce flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white">
                        Desconto especial ativado via <strong className="font-bold">{influencerData.nome_influencer}</strong>! Aproveite a oferta abaixo.
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
