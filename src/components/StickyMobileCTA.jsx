import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { cn } from '../lib/utils'
import { trackRegisterCta } from '../lib/tracking'

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
 *  - safe-area-inset-bottom respeitado pra iPhone com notch
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
                const total = document.documentElement.scrollHeight - window.innerHeight
                const percent = total > 0 ? scrolled / total : 0

                const footer = document.querySelector('footer')
                const footerInView = footer
                    ? footer.getBoundingClientRect().top < window.innerHeight - 80
                    : false

                setIsVisible(percent > 0.3 && !footerInView)
                raf = null
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // initial check

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        'fixed inset-x-0 bottom-0 z-40 border-t border-white/10',
                        'bg-surface-950/95 px-4 py-3 backdrop-blur-md',
                        'lg:hidden'
                    )}
                    style={{
                        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
                    }}
                    role="complementary"
                    aria-label="Atalho de assinatura"
                >
                    <div className="container mx-auto flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-body-sm font-bold text-white">
                                Pro Anual · R$ 59,90/mês
                            </p>
                            <p className="flex items-center gap-1 text-[10px] text-white/55">
                                <Shield size={10} className="text-primary-400" />
                                Sem instalação · Garantia 7 dias
                            </p>
                        </div>
                        <a
                            href={getCheckoutUrl(
                                'https://app.rendipro.com.br/register'
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
                </motion.div>
            )}
        </AnimatePresence>
    )
}
