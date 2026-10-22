/**
 * Microsoft Clarity SÓ depois do aceite do aviso de cookies (fundador, 22/10/2026).
 *
 * Até aqui o `index.html` carregava o Clarity no `load`, sem consentimento
 * nenhum, e a política de privacidade nem citava o Clarity. Agora ele só baixa
 * depois do "Aceitar" (ou na abertura, se o aceite já estiver salvo).
 *
 * ⚠ Não basta avisar a API de consentimento: com consentimento negado o Clarity
 * continua gravando, só que sem cookie (Consent API v2 da Microsoft). Por isso
 * "sem aceite" = script nem baixado.
 * Mesmo projeto do cadastro do app (`app.rendipro.com.br/register`).
 */
export const CLARITY_PROJETO = 'wv890k0bjg'

let carregado = false

export function carregarClarity() {
    if (carregado || typeof window === 'undefined') return
    carregado = true
    ;(function (c, l, a, r, i) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
        const t = l.createElement(r)
        t.async = 1
        t.src = 'https://www.clarity.ms/tag/' + i
        const y = l.getElementsByTagName(r)[0]
        y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', CLARITY_PROJETO)
    window.clarity('consentv2', { ad_Storage: 'granted', analytics_Storage: 'granted' })
}
