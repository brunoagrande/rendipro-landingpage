import { useState, useEffect } from 'react'
import { Medal } from 'lucide-react'
import { FOUNDERS_DEADLINE } from '../lib/founders'

function getTimeLeft() {
    const diff = FOUNDERS_DEADLINE - new Date()
    if (diff <= 0) return null
    return {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff % 864e5) / 36e5),
        minutes: Math.floor((diff % 36e5) / 6e4),
        seconds: Math.floor((diff % 6e4) / 1e3),
    }
}

function pad(n) {
    return String(n).padStart(2, '0')
}

export function FoundersBanner() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft)

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(id)
    }, [])

    if (!timeLeft) return null

    return (
        <div
            className="relative z-[60] w-full bg-gradient-to-r from-amber-600 via-amber-500 to-primary-500 px-4 py-1.5 sm:py-2.5 animate-slide-in-down"
        >
                    <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                        <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white">
                            <Medal size={14} className="shrink-0" />
                            <span className="sm:hidden">Fundador · 20% OFF travado</span>
                            <span className="hidden sm:inline">Oferta Fundadores · 20% OFF · Preço travado para sempre</span>
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white/90">
                            {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m
                            <span className="hidden sm:inline"> {pad(timeLeft.seconds)}s</span>
                        </span>
                        <a
                            href="#pricing"
                            className="hidden rounded-full bg-white px-3 py-1 text-xs font-bold text-surface-950 shadow-sm transition-transform hover:scale-[1.02] active:scale-95 sm:inline-block"
                        >
                            Garantir Fundador →
                        </a>
                    </div>
        </div>
    )
}
