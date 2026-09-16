import { PartyPopper, Sparkles } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { CAMPANHA_ANUAL_ATIVA, CAMPANHA_ANUAL } from '../data/campanha-anual'

export function TopBanner() {
    const { influencerData, isLoadingInfluencer } = useInfluencer()

    if (isLoadingInfluencer) return null

    if (influencerData) {
        return (
            <div className="relative z-[60] w-full bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-3 shadow-lg animate-slide-in-down">
                <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                    <PartyPopper className="h-5 w-5 text-yellow-300 animate-bounce flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white">
                        Desconto de <strong className="font-bold">{influencerData.nome_influencer}</strong> ativado. O preço já aparece com desconto nos planos.
                    </p>
                </div>
            </div>
        )
    }

    // Campanha do anual: ligada em `src/data/campanha-anual.js`, junto com o
    // admin do app. Sem influencer (o app não soma cupom com campanha).
    if (CAMPANHA_ANUAL_ATIVA) {
        return (
            <div className="relative z-[60] w-full bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-2.5 shadow-lg" data-testid="banner-campanha">
                <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                    <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white">
                        <a href="#pricing" className="hover:text-yellow-200">
                            1 mês <strong className="font-bold">grátis</strong> no <strong className="font-bold">plano</strong> anual
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    return null
}
