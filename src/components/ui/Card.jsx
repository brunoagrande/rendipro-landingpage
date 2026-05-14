import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Container card com variantes premium dark.
 *
 * Variantes:
 *  - surface  → padrão, transparência leve sobre dark
 *  - raised   → mais opaco, sombra elevation-2
 *  - glow     → com glow primary suave (usado em featured cards)
 *  - gradient → border gradient teal→indigo (use sparingly)
 *  - flat     → sem border, apenas fundo neutro
 */

const variantClasses = {
    surface:
        'border border-white/5 bg-white/[0.02] backdrop-blur-sm',
    raised:
        'border border-white/10 bg-surface-900/80 backdrop-blur-md shadow-elevation-2',
    glow:
        'border border-primary-500/20 bg-primary-500/[0.03] backdrop-blur-sm shadow-glow-primary',
    gradient:
        'border-gradient-primary',
    flat:
        'border-none bg-surface-900/50',
}

export const Card = forwardRef(function Card(
    { className, variant = 'surface', children, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn(
                'rounded-2xl transition-all duration-300 ease-[var(--ease-spring)]',
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
