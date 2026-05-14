import { cn } from '../../lib/utils'

/**
 * Tecla de atalho estilizada — usado em Flashcards (atalhos 1/2/3/4 SM-2)
 * e onde precise de "tecla física" visualmente.
 *
 * Exemplo:
 *   <Kbd>1</Kbd> Não lembrei
 *   <Kbd>Espaço</Kbd> revelar
 */
export function Kbd({ children, className }) {
    return (
        <kbd
            className={cn(
                'inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5',
                'border border-white/10 bg-white/[0.04]',
                'text-caption font-mono font-semibold text-white/70',
                'shadow-elevation-1',
                className
            )}
        >
            {children}
        </kbd>
    )
}
