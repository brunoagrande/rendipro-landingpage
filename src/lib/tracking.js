/**
 * Helpers de tracking para CTAs que levam ao registro.
 *
 * Dispara dois eventos em paralelo:
 *  - Meta Pixel: InitiateCheckout (já era o padrão)
 *  - GA4: cta_click com button_text + location, para responder
 *    "qual seção da landing converte mais?" no GA4.
 */

export function trackRegisterCta({ buttonText, location }) {
    if (typeof window === 'undefined') return

    if (window.fbq) {
        window.fbq('track', 'InitiateCheckout')
    }
    if (window.gtag) {
        window.gtag('event', 'cta_click', {
            button_text: buttonText,
            location,
        })
    }
}
