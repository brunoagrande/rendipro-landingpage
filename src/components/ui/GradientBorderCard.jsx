import { cn } from '../../lib/utils'

/**
 * Card com border gradient teal→indigo — uso premium em destaques.
 * Implementado via 1px de padding no wrapper externo, fundo dark no interno.
 *
 * Use com moderação — se aparecer em todos os cards perde o efeito.
 * Recomendado para: card "popular" no Pricing, ou cards moat na seção Features.
 */
export function GradientBorderCard({ children, className, innerClassName }) {
    return (
        <div
            className={cn(
                'relative rounded-2xl p-px',
                'bg-gradient-to-br from-primary-500 via-accent-500 to-primary-700',
                className
            )}
        >
            <div
                className={cn(
                    'rounded-[calc(theme(borderRadius.2xl)-1px)] bg-surface-900 h-full',
                    innerClassName
                )}
            >
                {children}
            </div>
        </div>
    )
}
