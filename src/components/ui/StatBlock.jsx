import { cn } from '../../lib/utils'
import { Counter } from './Counter'

/**
 * Bloco de estatística (número grande + label) — usado na TrustBar e em
 * pontos onde queremos destacar uma métrica numérica do produto.
 *
 * Exemplo:
 *   <StatBlock value={6000} label="questões comentadas" />
 *   <StatBlock value={8000} label="flashcards prontos" sublabel="69 baralhos" />
 */
export function StatBlock({
    value,
    label,
    sublabel,
    prefix = '+',
    suffix = '',
    className,
}) {
    return (
        <div className={cn('text-center', className)}>
            <div className="text-display-md font-extrabold text-white">
                <Counter value={value} prefix={prefix} suffix={suffix} />
            </div>
            <div className="mt-1 text-caption font-semibold uppercase tracking-wider text-white/60">
                {label}
            </div>
            {sublabel && (
                <div className="mt-0.5 text-caption text-white/40">{sublabel}</div>
            )}
        </div>
    )
}
