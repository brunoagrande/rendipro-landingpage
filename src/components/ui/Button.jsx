import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Canonical button component.
 *
 * Variantes:
 *  - primary   → CTA principal (bg cyan-teal, dark text para AA contrast)
 *  - secondary → CTA secundário (glass com border)
 *  - ghost     → CTA terciário (apenas texto + hover)
 *  - link      → texto inline com sublinhado animado
 *
 * Tamanhos: sm (h-9) / md (h-11) / lg (h-14)
 *
 * Renderiza como <button> por padrão, mas aceita `as` para virar <a>, <Link>, etc.
 */

const variantClasses = {
    primary:
        'bg-primary-500 text-surface-950 hover:bg-primary-400 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 font-bold',
    secondary:
        'border border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm font-semibold',
    ghost:
        'text-white/70 hover:text-white hover:bg-white/5 font-semibold',
    link:
        'text-primary-400 hover:text-primary-300 underline-offset-4 hover:underline font-semibold p-0 h-auto rounded-none',
}

const sizeClasses = {
    sm: 'h-9 px-4 text-body-sm',
    md: 'h-11 px-6 text-body',
    lg: 'h-14 px-10 text-body-lg',
}

export const Button = forwardRef(function Button(
    { className, variant = 'primary', size = 'md', as: Comp = 'button', children, ...props },
    ref
) {
    return (
        <Comp
            ref={ref}
            className={cn(
                // base
                'group inline-flex items-center justify-center gap-2 rounded-full',
                'transition-all duration-200 ease-[var(--ease-spring)]',
                'active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950',
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    )
})
