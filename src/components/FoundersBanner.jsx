import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

    return (
        <AnimatePresence>
            {timeLeft && (
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-[60] w-full bg-gradient-to-r from-amber-600 via-amber-500 to-primary-500 px-4 py-2.5"
                >
                    <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                        <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                            <Medal size={14} className="shrink-0" />
                            Oferta Fundadores · 20% OFF · Preço travado para sempre
                        </span>
                        <span className="font-mono text-sm font-bold text-white/90">
                            {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
                        </span>
                        <a
                            href="#founders"
                            className="hidden rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white transition-colors hover:bg-white/30 sm:inline-block"
                        >
                            Ver oferta →
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
