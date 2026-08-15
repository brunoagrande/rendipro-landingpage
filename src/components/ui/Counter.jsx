import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

/**
 * Anima um número de 0 até `value` quando entra no viewport.
 * Convertido para CSS + RAF em 2026-05-24 (era framer-motion).
 *
 * - Dispara uma vez (IntersectionObserver com unobserve no primeiro hit)
 * - Easing manual cubic-bezier(0.16, 1, 0.3, 1)
 * - Formato pt-BR com separador de milhar
 * - Respeita prefers-reduced-motion (entrega o valor direto, sem animar)
 */

// Approx. cubic-bezier(0.16, 1, 0.3, 1) — easing "out-expo-like"
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function Counter({
    value,
    duration = 1.2,
    prefix = '+',
    suffix = '',
    className,
}) {
    const ref = useRef(null)
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Respeita reduced-motion: entrega o valor direto.
        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReduced) {
            setDisplay(value)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (!entry.isIntersecting) return
                observer.unobserve(el)

                const start = performance.now()
                const durationMs = duration * 1000
                let raf

                const tick = (now) => {
                    const t = Math.min(1, (now - start) / durationMs)
                    const eased = easeOutExpo(t)
                    setDisplay(Math.round(eased * value))
                    if (t < 1) raf = requestAnimationFrame(tick)
                }
                raf = requestAnimationFrame(tick)

                return () => raf && cancelAnimationFrame(raf)
            },
            { rootMargin: '-50px', threshold: 0 }
        )
        observer.observe(el)

        return () => observer.disconnect()
    }, [value, duration])

    return (
        <span
            ref={ref}
            className={cn('inline-flex items-baseline tabular-nums', className)}
        >
            {/* whitespace-pre: o container e inline-flex, que colapsa espaco
                de no de texto ("0 a " virava "0 a1.000") */}
            <span className="whitespace-pre">{prefix}</span>
            <span>{display.toLocaleString('pt-BR')}</span>
            <span className="whitespace-pre">{suffix}</span>
        </span>
    )
}
