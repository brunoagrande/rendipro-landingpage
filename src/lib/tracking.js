/**
 * Tracking helpers — GA4 + Meta Pixel.
 *
 * Eventos disparados:
 *  - cta_click (GA4): button_text + location + utm_*
 *  - section_view (GA4): section_name quando 50% da seção entra no viewport
 *  - scroll_milestone (GA4): percent (25 | 50 | 75 | 100)
 *  - faq_open (GA4): question_index + question (primeiros 80 chars)
 *  - pricing_toggle (GA4): period (mensal | anual)
 *  - InitiateCheckout (Meta Pixel): value + currency + content_ids + content_name +
 *    content_type + num_items, com eventID UUID v4 pra deduplicação futura com CAPI.
 *
 * UTMs (utm_source/medium/campaign/content/term) são capturados na primeira
 * navegação e persistidos em sessionStorage para enriquecer todos os eventos
 * subsequentes da mesma sessão.
 *
 * O event_id do último InitiateCheckout fica em sessionStorage. Quando o app
 * (app.rendipro.com.br) for ter Purchase no CAPI sincronizado com este Pixel,
 * vamos passar esse event_id via query param no redirect (?fb_event_id=...).
 * Por ora só persistimos pra ter o hook pronto.
 */

const UTM_KEY = 'rp_utm_v1'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const CHECKOUT_EVENT_ID_KEY = 'rp_checkout_event_id_v1'

function generateEventId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
    }
    // Fallback pra browsers muito antigos (sem crypto.randomUUID)
    return 'rp-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
}

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
 * Dispara o Meta Pixel InitiateCheckout com parâmetros enriquecidos
 * (value, content_ids, etc) e eventID UUID pra deduplicação futura com CAPI.
 *
 * Use isso em qualquer botão que leve o usuário pra um fluxo de checkout/registro.
 * Quando o usuário já escolheu um plano específico (ex: clicou "Garantir Pro"
 * no Pricing), passe `plan` pra enriquecer o evento com value/content_ids.
 * Quando ainda não escolheu (ex: CTA do Hero), passe sem plan que mandamos
 * só currency + num_items (sem value falso).
 *
 * Retorna o eventId gerado — quem chama pode passar via query param pro
 * checkout (ex: ?fb_event_id=<uuid>) pra correlação com CAPI server-side.
 */
export function fireInitiateCheckout({ plan } = {}) {
    if (typeof window === 'undefined' || !window.fbq) return null

    const eventId = generateEventId()

    try {
        sessionStorage.setItem(CHECKOUT_EVENT_ID_KEY, eventId)
    } catch {
        // private mode / storage bloqueado — segue sem persistir
    }

    const params = {
        currency: 'BRL',
        num_items: 1,
    }

    if (plan) {
        params.value = plan.preco_centavos / 100
        params.content_ids = [plan.slug]
        params.content_name = plan.nome
        params.content_type = 'subscription'
        params.content_category = plan.tipo || 'subscription'
    }
    // Sem plan: NÃO enviamos value (não inflar com 0 ou valor falso —
    // Meta interpreta value=0 como conversão sem valor, polui aprendizado).

    window.fbq('track', 'InitiateCheckout', params, { eventID: eventId })

    return eventId
}

/**
 * Retorna o eventId do último InitiateCheckout disparado nesta sessão.
 * Usado pra passar via query param pro checkout, correlacionando com CAPI.
 */
export function getLastCheckoutEventId() {
    if (typeof window === 'undefined') return null
    try {
        return sessionStorage.getItem(CHECKOUT_EVENT_ID_KEY) || null
    } catch {
        return null
    }
}

/**
 * CTA de registro — dispara Meta Pixel InitiateCheckout (via fireInitiateCheckout)
 * + GA4 cta_click. Enriquece com UTMs da sessão.
 *
 * Quando o CTA tem um plano específico associado (Pricing cards), passe `plan`
 * pra Meta receber value/content_ids. Sem plan, só dispara o evento básico.
 */
export function trackRegisterCta({ buttonText, location, plan }) {
    if (typeof window === 'undefined') return null

    const eventId = fireInitiateCheckout({ plan })

    if (window.gtag) {
        window.gtag('event', 'cta_click', {
            button_text: buttonText,
            location,
            ...(plan && {
                plan_slug: plan.slug,
                plan_value: plan.preco_centavos / 100,
            }),
            ...getUtms(),
        })
    }

    return eventId
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
