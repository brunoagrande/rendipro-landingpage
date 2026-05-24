import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { cn } from '../lib/utils'

export function InvalidInfluencerModal() {
    const { isInvalidOrExpired, dismissInvalidModal } = useInfluencer()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (isInvalidOrExpired) {
            setMounted(true)
        } else if (mounted) {
            // Desmonta após a animação de saída
            const t = setTimeout(() => setMounted(false), 350)
            return () => clearTimeout(t)
        }
    }, [isInvalidOrExpired, mounted])

    if (!mounted) return null

    return (
        <div
            className={cn(
                'fixed inset-0 z-[100] flex items-center justify-center bg-surface-950/80 p-4 backdrop-blur-md',
                'transition-opacity duration-300',
                isInvalidOrExpired ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            aria-hidden={!isInvalidOrExpired}
        >
            <div
                className={cn(
                    'relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-surface-900 shadow-2xl',
                    'transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isInvalidOrExpired
                        ? 'translate-y-0 scale-100 opacity-100'
                        : 'translate-y-5 scale-95 opacity-0'
                )}
                role="dialog"
                aria-modal="true"
                aria-labelledby="invalid-influencer-title"
            >
                {/* Glowing Background Effect */}
                <div className="absolute -top-24 -left-24 -z-10 h-48 w-48 rounded-full bg-red-500/20 blur-[60px]" />

                <div className="p-8 md:p-10 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>

                    <h3 id="invalid-influencer-title" className="mb-4 text-2xl font-bold tracking-tight text-white">
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
            </div>
        </div>
    )
}
