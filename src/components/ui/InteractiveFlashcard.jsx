import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Kbd } from './KbdKeys'

/**
 * Mini-flashcard interativo usado no Hero — "Interactive Proof".
 *
 * Antes mesmo de ler a copy completa, o visitante pode:
 *  1. Ver a pergunta
 *  2. Clicar pra revelar a resposta (flip 3D)
 *  3. Avaliar com 4 botões SM-2 (Não lembrei / Difícil / Bom / Fácil)
 *
 * Demonstra o produto E reduz fricção pré-lead.
 * Padrão Brilliant.org.
 *
 * Performance: rotateY com transformStyle preserve-3d, GPU-acelerado.
 * Mobile: tamanho reduzido via prop, hidden em < md no Hero.
 */

const SM2_BUTTONS = [
    { label: 'Não', sub: '1 min', color: 'danger', key: '1' },
    { label: 'Difícil', sub: '1 min', color: 'warning', key: '2' },
    { label: 'Bom', sub: '1 dia', color: 'info', key: '3' },
    { label: 'Fácil', sub: '3 dias', color: 'success', key: '4' },
]

const COLOR_CLASSES = {
    danger:
        'border-danger-500/30 bg-danger-500/10 text-danger-400 hover:bg-danger-500/20',
    warning:
        'border-warning-500/30 bg-warning-500/10 text-warning-400 hover:bg-warning-500/20',
    info:
        'border-info-500/30 bg-info-500/10 text-info-400 hover:bg-info-500/20',
    success:
        'border-success-500/30 bg-success-500/10 text-success-400 hover:bg-success-500/20',
}

export function InteractiveFlashcard({ className }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const [rated, setRated] = useState(null)

    const handleRate = (rating) => {
        setRated(rating)
        // Volta pra pergunta depois de 1.4s pra deixar o usuário rebrincar
        setTimeout(() => {
            setRated(null)
            setIsFlipped(false)
        }, 1400)
    }

    return (
        <div
            className={cn(
                'relative w-[260px] sm:w-[300px]',
                className
            )}
            style={{ perspective: '1200px' }}
        >
            {/* Glow underneath (premium feel) */}
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-primary-500/20 blur-3xl" />

            <div
                className="relative h-[280px] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* FRONT — Pergunta */}
                <div
                    className="absolute inset-0 rounded-2xl border border-white/10 bg-surface-900/95 p-5 shadow-elevation-4 backdrop-blur-md flex flex-col"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    <div className="inline-flex w-fit items-center rounded-md border border-primary-500/20 bg-primary-500/10 px-2 py-0.5 text-micro font-bold text-primary-300 uppercase tracking-wider">
                        Física · Relatividade
                    </div>
                    <div className="mt-3 text-micro font-semibold uppercase tracking-widest text-white/40">
                        Pergunta
                    </div>
                    <p className="mt-3 text-body-lg font-semibold leading-tight text-white">
                        Qual é a equação que relaciona massa e energia?
                    </p>

                    <div className="mt-auto pt-4">
                        <button
                            onClick={() => setIsFlipped(true)}
                            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-body-sm font-bold text-surface-950 shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-400 active:scale-95"
                        >
                            Revelar resposta
                            <RotateCcw
                                size={14}
                                className="transition-transform group-hover/btn:rotate-180"
                            />
                        </button>
                        <div className="mt-2 text-center text-micro text-white/40">
                            ou tecle <Kbd className="text-[10px] h-4 min-w-4">Espaço</Kbd>
                        </div>
                    </div>
                </div>

                {/* BACK — Resposta */}
                <div
                    className="absolute inset-0 rounded-2xl border border-white/10 bg-surface-900/95 p-5 shadow-elevation-4 backdrop-blur-md flex flex-col"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="text-micro font-semibold uppercase tracking-widest text-white/40">
                        Resposta
                    </div>
                    <div className="mt-3 text-display-md font-extrabold font-mono text-gradient-primary">
                        E=mc²
                    </div>

                    <div className="mt-auto pt-4">
                        <div className="mb-2 text-center text-micro text-white/50">
                            Como foi lembrar?
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                            {SM2_BUTTONS.map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => handleRate(btn.label)}
                                    className={cn(
                                        'group/sm2 flex flex-col items-center justify-center rounded-lg border px-1 py-2',
                                        'text-micro font-bold transition-all active:scale-95',
                                        COLOR_CLASSES[btn.color],
                                        rated === btn.label &&
                                        'scale-110 ring-2 ring-primary-400 ring-offset-2 ring-offset-surface-900'
                                    )}
                                >
                                    {btn.label}
                                    <span className="mt-0.5 text-[9px] opacity-60">
                                        {btn.sub}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
