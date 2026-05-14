import { Lock } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Container "frame de browser" customizado para envolver screenshots do produto.
 * Replica o approach do Vercel/Linear: traffic lights Mac + barra de URL + sombra.
 *
 * Props:
 * - children: o screenshot ou JSX a ser exibido
 * - url: domínio mostrado na barra (default: app.rendipro.com.br)
 * - tilt: se true, aplica rotate sutil (-2deg) que volta a 0 no hover
 * - glow: se true, adiciona glow primary ao redor
 */
export function ProductWindow({
    children,
    url = 'app.rendipro.com.br',
    tilt = false,
    glow = false,
    className,
}) {
    return (
        <div
            className={cn(
                'group/window rounded-2xl overflow-hidden',
                'border border-white/10 bg-surface-900',
                'shadow-elevation-5',
                tilt &&
                'rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-[var(--ease-spring)]',
                glow && 'shadow-glow-primary',
                className
            )}
        >
            {/* Browser chrome — traffic lights + URL bar */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-surface-950/90 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-surface-800/60 px-3 py-1 text-caption text-white/40 font-mono">
                    <Lock size={11} className="text-success-400" />
                    {url}
                </div>
            </div>

            {/* Content area — onde vai o screenshot */}
            <div className="relative bg-surface-950">{children}</div>
        </div>
    )
}
