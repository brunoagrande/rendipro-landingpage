/**
 * Tracking helpers — GA4 + Meta Pixel.
 *
 * Eventos disparados:
 *  - cta_click (já existia): button_text + location + utm_*
 *  - section_view (novo): section_name quando 50% da seção entra no viewport
 *  - scroll_milestone (novo): percent (25 | 50 | 75 | 100)
 *  - faq_open (novo): question_index + question (primeiros 80 chars)
 *  - pricing_toggle (novo): period (mensal | anual)
 *
 * Meta Pixel continua disparando InitiateCheckout nos CTAs de checkout.
 *
 * UTMs (utm_source/medium/campaign/content/term) são capturados na primeira
 * navegação e persistidos em sessionStorage para enriquecer todos os eventos
 * subsequentes da mesma sessão.
 */

const UTM_KEY = 'rp_utm_v1'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

/**
 * Lê UTMs da URL e persiste em sessionStorage (uma vez por sessão).
 * Idempotente: se já existe, não sobrescreve (preserva o primeiro touch).
 */
export function captureUtms() {
    if (typeof window === 'undefined') return {}
    try {
        const existing = sessionStorage.getItem(UTM_KEY)
        if (existing) return JSON.parse(existing)

        const params = new URLSearchParams(window.location.search)
        const utms = {}
        UTM_PARAMS.forEach((k) => {
            const v = params.get(k)
            if (v) utms[k] = v.slice(0, 100)
        })
        if (Object.keys(utms).length > 0) {
            sessionStorage.setItem(UTM_KEY, JSON.stringify(utms))
        }
        return utms
    } catch {
        return {}
    }
}

function getUtms() {
    if (typeof window === 'undefined') return {}
    try {
        const raw = sessionStorage.getItem(UTM_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

/**
 * CTA de registro — dispara Meta Pixel InitiateCheckout + GA4 cta_click.
 * Enriquece com UTMs da sessão.
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
            ...getUtms(),
        })
    }
}

/**
 * Vista de seção — dispara quando uma seção entra no viewport (>=50%).
 * Idempotente por sessionId+section (não dispara 2× a mesma seção na mesma sessão).
 */
const seenSections = new Set()
export function trackSectionView(sectionName) {
    if (typeof window === 'undefined' || !sectionName) return
    if (seenSections.has(sectionName)) return
    seenSections.add(sectionName)

    if (window.gtag) {
        window.gtag('event', 'section_view', {
            section_name: sectionName,
            ...getUtms(),
        })
    }
}

/**
 * Marcos de scroll (25/50/75/100%). Cada um dispara 1× por sessão.
 */
const firedMilestones = new Set()
export function trackScrollMilestone(percent) {
    if (typeof window === 'undefined') return
    if (firedMilestones.has(percent)) return
    firedMilestones.add(percent)

    if (window.gtag) {
        window.gtag('event', 'scroll_milestone', {
            percent,
            ...getUtms(),
        })
    }
}

/**
 * FAQ — usuário abriu uma pergunta. Não dedup (faz sentido medir reaberturas).
 */
export function trackFaqOpen(questionIndex, question) {
    if (typeof window === 'undefined') return
    if (window.gtag) {
        window.gtag('event', 'faq_open', {
            question_index: questionIndex,
            question: (question || '').slice(0, 80),
            ...getUtms(),
        })
    }
}

/**
 * Toggle Mensal/Anual no Pricing.
 */
export function trackPricingToggle(period) {
    if (typeof window === 'undefined') return
    if (window.gtag) {
        window.gtag('event', 'pricing_toggle', {
            period,
            ...getUtms(),
        })
    }
}

/**
 * Inicializa o scroll milestone listener uma vez (chamar no App).
 */
export function initScrollMilestones() {
    if (typeof window === 'undefined') return

    let raf = null
    const onScroll = () => {
        if (raf) return
        raf = requestAnimationFrame(() => {
            const doc = document.documentElement
            const totalScrollable = doc.scrollHeight - window.innerHeight
            if (totalScrollable <= 0) {
                raf = null
                return
            }
            const percent = (window.scrollY / totalScrollable) * 100
            if (percent >= 100) trackScrollMilestone(100)
            else if (percent >= 75) trackScrollMilestone(75)
            else if (percent >= 50) trackScrollMilestone(50)
            else if (percent >= 25) trackScrollMilestone(25)
            raf = null
        })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
}
