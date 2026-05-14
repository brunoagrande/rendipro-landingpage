import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Pill curta usada acima de headings/H1 — categoriza ou contextualiza.
 *
 * Variantes:
 *  - primary  → padrão (cyan-teal sobre tint)
 *  - accent   → indigo (variação)
 *  - warning  → amber (urgência ética, ex: "Vagas mensais limitadas")
 *  - ghost    → neutra (não compete com headline)
 *  - success  → green (badge tipo "Exclusivo RendiPro")
 *
 * Aceita ícone à esquerda via children (passe o <Sparkles size={14} /> como
 * primeiro filho).
 */

const variantClasses = {
    primary:
        'border-primary-500/20 bg-primary-500/10 text-primary-300',
    accent:
        'border-accent-500/20 bg-accent-500/10 text-accent-300',
    warning:
        'border-warning-500/30 bg-warning-500/10 text-warning-400',
    ghost:
        'border-white/10 bg-white/5 text-white/70',
    success:
        'border-success-500/30 bg-success-500/10 text-success-400',
}

export const Eyebrow = forwardRef(function Eyebrow(
    { className, variant = 'primary', children, ...props },
    ref
) {
    return (
        <span
            ref={ref}
            className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1',
                'text-caption font-semibold backdrop-blur-md',
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
})
