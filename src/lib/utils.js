import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina nomes de classe com merge do Tailwind.
 * Resolve conflitos entre utilitários Tailwind (ex: bg-blue-500 vs bg-red-500
 * passados em momentos diferentes do mesmo render), mantendo a última.
 *
 * Use em todos os componentes UI que aceitam prop `className`.
 *
 * Exemplo:
 *   cn('px-4 py-2', isActive && 'bg-primary-500', className)
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
