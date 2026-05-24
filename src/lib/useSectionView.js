import { useEffect, useRef } from 'react'
import { trackSectionView } from './tracking'

/**
 * Hook que dispara trackSectionView quando >=50% da seção entra no viewport.
 *
 * Uso:
 *   const ref = useSectionView('hero')
 *   return <section ref={ref}>...
 *
 * Idempotente: trackSectionView só dispara 1× por sessão por nome de seção.
 */
export function useSectionView(sectionName) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el || !sectionName) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    trackSectionView(sectionName)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.5 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [sectionName])

    return ref
}
