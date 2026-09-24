import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

const CONSENT_KEY = 'rendipro_cookie_consent_v1'

export function CookieBanner() {
    const [visible, setVisible] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Enquanto o aviso está na tela, a barra fixa de CTA do celular fica fora:
    // as duas são `fixed bottom-0` e empilhavam uma em cima da outra (o aviso é
    // z-50, a barra z-40), escondendo o preço e o botão "Começar".
    useEffect(() => {
        try {
            if (!localStorage.getItem(CONSENT_KEY)) {
                setVisible(true)
                setMounted(true)
                document.body.dataset.cookieAviso = 'aberto'
            }
        } catch {
            // localStorage bloqueado em alguns navegadores em modo privado
        }
        return () => { delete document.body.dataset.cookieAviso }
    }, [])

    const accept = () => {
        try {
            localStorage.setItem(CONSENT_KEY, 'accepted')
        } catch {
            // silently fail
        }
        setVisible(false)
        delete document.body.dataset.cookieAviso
        window.dispatchEvent(new Event('rendipro:cookie-aceito'))
        // Desmonta após a animação de saída (400ms)
        setTimeout(() => setMounted(false), 450)
    }

    if (!mounted) return null

    return (
        <div
            className={cn(
                'fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-surface-950/98 px-4 py-2.5 backdrop-blur-md sm:py-3',
                'transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0 pointer-events-none'
            )}
            style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
            role="region"
            aria-label="Aviso de cookies e privacidade"
            aria-hidden={!visible}
        >
            {/* Barra RASA de propósito. A versão anterior era um bloco de 177px em
                390x844 e cobria o CTA principal do hero (medido em 24/09/2026:
                banner 667→844, botão 645→701). Aviso de cookie não pode comer a
                dobra de uma landing paga. */}
            <div className="container mx-auto flex items-center gap-3">
                <p className="min-w-0 flex-1 text-caption leading-snug text-white/55 sm:text-body-sm">
                    Usamos cookies para medir nossos anúncios. Veja a{' '}
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
                    className="h-9 shrink-0 rounded-full bg-white/10 px-4 text-body-sm font-semibold text-white transition-all hover:bg-white/20 active:scale-95"
                >
                    Ok
                </button>
            </div>
        </div>
    )
}
