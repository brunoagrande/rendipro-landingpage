import { useEffect, useState } from 'react'
import { ArrowRight, Shield } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { cn } from '../lib/utils'
import { trackRegisterCta } from '../lib/tracking'
import { CAMPANHA_ANUAL_ATIVA } from '../data/campanha-anual'

/**
 * Sticky CTA mobile — barra persistente embaixo da tela em mobile/tablet.
 *
 * Comportamento:
 *  - Invisível no início (acima de 30% scroll = ainda lendo Hero/TrustBar)
 *  - Aparece após 30% de scroll
 *  - Some quando o footer entra na viewport (não atrapalha o final da página)
 *  - Hidden em desktop (lg+), onde CTAs aparecem naturalmente pela rolagem
 *
 * Performance:
 *  - requestAnimationFrame throttle no scroll handler (evita layout thrash)
 *  - passive listener
 *  - safe-area-inset-bottom respeitado para iPhone com notch
 *
 * Padrão Brilliant.org / SaaS B2C mobile.
 * Lift esperado: +15% CR mobile.
 */

const trackStickyCta = () => trackRegisterCta({ buttonText: 'Começar', location: 'sticky_mobile' })

export function StickyMobileCTA() {
    const [isVisible, setIsVisible] = useState(false)
    const { getCheckoutUrl } = useInfluencer()

    useEffect(() => {
        let raf = null
        const handleScroll = () => {
            if (raf) return
            raf = requestAnimationFrame(() => {
                const scrolled = window.scrollY

                const footer = document.querySelector('footer')
                const footerInView = footer
                    ? footer.getBoundingClientRect().top < window.innerHeight - 80
                    : false

                // O aviso de cookie ocupa a MESMA faixa de baixo e tem z maior:
                // enquanto ele estiver aberto, esta barra ficaria escondida atrás
                // dele. Melhor não existir do que existir invisível.
                const avisoCookieAberto = document.body.dataset.cookieAviso === 'aberto'

                setIsVisible(scrolled > 100 && !footerInView && !avisoCookieAberto)
                raf = null
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('rendipro:cookie-aceito', handleScroll)
        handleScroll() // initial check

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('rendipro:cookie-aceito', handleScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <div
            className={cn(
                'fixed inset-x-0 bottom-0 z-40 border-t border-white/10',
                'bg-surface-950/95 px-4 py-3 backdrop-blur-md',
                'lg:hidden',
                'transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isVisible
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : 'translate-y-full opacity-0 pointer-events-none'
            )}
            style={{
                paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
            }}
            role="complementary"
            aria-label="Atalho de assinatura"
            aria-hidden={!isVisible}
        >
                    <div className="container mx-auto flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-1.5">
                                <span className="text-body-sm font-bold text-white">
                                    Starter Anual
                                </span>
                                <span className="text-body font-extrabold text-primary-300">
                                    {/* Saiu em 24/09/2026 o riscado "R$ 16,90". Ele é o preço
                                        do Starter MENSAL, e ao lado de "R$ 9,90/mês" fazia
                                        parecer desconto no mensal, quando os R$ 9,90 são o
                                        anual dividido por 12. Mesma razão que derrubou a
                                        âncora de R$ 24,90 em pricing-plans.js. */}
                                    R$ 9,90
                                    <span className="text-[11px] font-medium text-white/60">/mês</span>
                                </span>
                            </div>
                            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/55">
                                <Shield size={10} className="text-primary-400" />
                                {CAMPANHA_ANUAL_ATIVA ? '1º mês grátis · Garantia de 7 dias' : 'Cancele quando quiser · Garantia 7 dias'}
                            </p>
                        </div>
                        <a
                            href={getCheckoutUrl(
                                'https://app.rendipro.com.br/register?plano=starter-anual&utm_content=sticky'
                            )}
                            onClick={trackStickyCta}
                            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-500 px-5 py-2.5 text-body-sm font-bold text-surface-950 shadow-lg shadow-primary-500/30 transition-all active:scale-95 hover:bg-primary-400"
                        >
                            Começar
                            <ArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        </a>
                    </div>
        </div>
    )
}
