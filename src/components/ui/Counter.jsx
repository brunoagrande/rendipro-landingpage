import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { cn } from '../../lib/utils'

/**
 * Anima um número de 0 até `value` quando entra no viewport.
 * Usado na TrustBar e em StatBlocks ao longo da landing.
 *
 * - Dispara uma vez (once: true)
 * - Easing spring (cubic-bezier 0.16, 1, 0.3, 1)
 * - Formato pt-BR com separador de milhar
 * - Respeita prefers-reduced-motion (animação some, número fica direto)
 */
export function Counter({
    value,
    duration = 1.2,
    prefix = '+',
    suffix = '',
    className,
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) =>
        Math.round(latest).toLocaleString('pt-BR')
    )

    useEffect(() => {
        if (!isInView) return
        const controls = animate(count, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
        })
        return () => controls.stop()
    }, [isInView, value, duration, count])

    return (
        <span
            ref={ref}
            className={cn('inline-flex items-baseline tabular-nums', className)}
        >
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    )
}
