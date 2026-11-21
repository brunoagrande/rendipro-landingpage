import { Gift, PartyPopper, Sparkles } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { CAMPANHA_ANUAL_ATIVA, CAMPANHA_ANUAL } from '../data/campanha-anual'
import { CORTESIA_CADASTRO_ATIVA, CORTESIA_CADASTRO } from '../data/cortesia-cadastro'
import { blackFridayNoAr, BLACK_FRIDAY_LINK } from '../data/black-friday'
import { slugDoParceiroNaUrl } from '../lib/descontoDoParceiro'

export function TopBanner() {
    const { influencerData, isLoadingInfluencer } = useInfluencer()

    if (isLoadingInfluencer) return null

    // Link de parceiro com desconto (Black Friday, 21/11/2026): diz o quê, onde vale e até quando.
    if (influencerData?.origem === 'parceiro') {
        return (
            <div className="relative z-[60] w-full bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-2.5 shadow-lg" data-testid="banner-parceiro">
                <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                    <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white">
                        <a href="#pricing" className="hover:text-yellow-200">
                            <strong className="font-bold">{influencerData.nome_influencer}</strong>:{' '}
                            {influencerData.desconto_porcentagem}% de desconto no plano anual
                            {influencerData.ultimoDia ? `, até ${influencerData.ultimoDia}` : ''}.
                        </a>
                    </p>
                </div>
            </div>
        )
    }

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

    // Black Friday na landing NORMAL (21/11/2026, hormozi): quem viu o anúncio e voltou direto via R$ 9,90 sem
    // nenhuma menção à BF. A faixa só leva ao link `/blackfriday` (que aplica o desconto). Não aparece para quem
    // chegou por outro link de parceiro, e some sozinha no fim da BF (`BLACK_FRIDAY_FIM`).
    if (blackFridayNoAr() && !slugDoParceiroNaUrl(window.location.search)) {
        return (
            <div className="relative z-[60] w-full bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-2.5 shadow-lg" data-testid="banner-black-friday">
                <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                    <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white">
                        <strong className="font-bold">Black Friday</strong> até 30/11: 40% no 1º ano do plano anual.{' '}
                        <a href={BLACK_FRIDAY_LINK} className="font-bold underline underline-offset-4 hover:text-yellow-200">
                            Ver a oferta
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    // Cortesia de 7 dias no cadastro (16/10/2026): quando ligada, o banner é ela,
    // porque é a primeira coisa que a pessoa faz (criar a conta e usar). O "1 mês
    // grátis no anual" desce para a seção de preços, onde a pessoa decide assinar.
    if (CORTESIA_CADASTRO_ATIVA) {
        return (
            <div className="relative z-[60] w-full bg-gradient-to-r from-primary-600 to-indigo-600 px-4 py-2.5 shadow-lg" data-testid="banner-cortesia">
                <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                    <Gift className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                    <p className="text-sm md:text-base font-medium text-white">
                        <a href="#pricing" className="hover:text-yellow-200">
                            <strong className="font-bold">{CORTESIA_CADASTRO.dias} dias grátis</strong>, sem cartão
                        </a>
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
                            1º mês <strong className="font-bold">grátis</strong> no <strong className="font-bold">plano</strong> anual
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    return null
}
