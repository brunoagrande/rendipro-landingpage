import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONSENT_KEY = 'rendipro_cookie_consent_v1'

export function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        try {
            if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
        } catch {
            // localStorage bloqueado em alguns navegadores em modo privado
        }
    }, [])

    const accept = () => {
        try {
            localStorage.setItem(CONSENT_KEY, 'accepted')
        } catch {
            // silently fail
        }
        setVisible(false)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-surface-950/98 px-4 py-4 backdrop-blur-md"
                    style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
                    role="region"
                    aria-label="Aviso de cookies e privacidade"
                >
                    <div className="container mx-auto flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-2xl text-body-sm text-white/65">
                            Usamos cookies para melhorar sua experiência e medir o desempenho dos nossos
                            anúncios (Meta Ads).{' '}
                            Ao continuar navegando, você concorda com nossa{' '}
                            <a
                                href="https://app.rendipro.com.br/privacidade"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
                            >
                                Política de Privacidade
                            </a>
                            .
                        </p>
                        <button
                            type="button"
                            onClick={accept}
                            className="shrink-0 rounded-full bg-primary-500 px-6 py-2.5 text-body-sm font-bold text-surface-950 transition-all hover:bg-primary-400 active:scale-95"
                        >
                            Entendi e aceito
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
