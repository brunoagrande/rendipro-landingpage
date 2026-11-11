/**
 * Clique no link de um parceiro (influencer), contado na landing.
 *
 * ⚠ 03/11/2026 (parceiros, fase 1; plano em `Rendipro/.agent/funil-cortesia-influencer/06-sistema-de-parceiros.md`).
 * O parceiro divulga `rendipro.com.br/<nome>`; o `vercel.json` manda para
 * `/?utm_source=parceiro&utm_medium=influencer&utm_campaign=<nome>`. A atribuição da CONTA acontece no app
 * (a utm segue nos botões e o banco grava o parceiro no cadastro). Aqui só se conta o clique, para o extrato
 * do parceiro ter "cliques".
 *
 * ⚠⚠ 11/11/2026 (fundador: "tem que mostrar somente cliques reais, em todo canto"). No 1º teste real, um dos 3
 *   cliques foi a verificação automática da Meta, que abre o link mandado por DM 30 s antes da pessoa (Android
 *   genérico vindo de m.facebook.com, sem tocar em nada). Agora o clique só é gravado:
 *     - se o navegador não é robô conhecido (`ehRoboConhecido`), e
 *     - depois de um SINAL DE PESSOA: o 1º toque, clique, rolagem ou tecla, ou a página ficar visível por
 *       `SEGUNDOS_VISIVEL` seguidos (quem lê sem tocar também conta).
 *   O banco filtra a mesma lista de robôs na contagem (`parceiro_clique_de_robo`), para cliques antigos.
 *
 * ⚠ Nunca atrapalha a página: só roda com `utm_source=parceiro`, carrega o Supabase sob demanda (as outras
 *   visitas não baixam nada), conta uma vez por sessão e por nome, e qualquer falha é silenciosa.
 * ⚠ Nome que não é de parceiro ativo não conta (a visão pública só tem cupom ativo).
 */
export const SEGUNDOS_VISIVEL = 4

// Robôs que abrem link para montar prévia ou checar segurança. Mesma lista do banco (`parceiro_clique_de_robo`).
const ROBOS = /(bot|crawl|spider|slurp|preview|facebookexternalhit|facebot|meta-externalagent|whatsapp|telegram|twitterbot|linkedinbot|slackbot|discordbot|pinterest|skypeuripreview|embedly|vkshare|headless|lighthouse|python-requests|curl\/|wget)/i

export function ehRoboConhecido(userAgent) {
    const ua = String(userAgent || '')
    return ua.trim() === '' || ROBOS.test(ua)
}

export function nomeDoParceiroNaUrl(search) {
    try {
        const p = new URLSearchParams(search)
        if (p.get('utm_source') !== 'parceiro') return null
        const nome = (p.get('utm_campaign') || '').trim().toLowerCase()
        return /^[a-z0-9-]{1,60}$/.test(nome) ? nome : null
    } catch {
        return null
    }
}

/**
 * Chama `aoSinal` UMA vez, no 1º sinal de pessoa: toque/clique/rolagem/tecla, ou a página visível por
 * `segundos` seguidos. Devolve a função que desliga os ouvintes.
 */
export function esperarSinalDePessoa(aoSinal, { segundos = SEGUNDOS_VISIVEL, doc = document, win = window } = {}) {
    let feito = false
    let timer = null
    const eventos = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel']
    const desligar = () => {
        eventos.forEach((e) => win.removeEventListener(e, disparar, { capture: true }))
        doc.removeEventListener('visibilitychange', aoMudarVisibilidade)
        if (timer) clearTimeout(timer)
        timer = null
    }
    function disparar() {
        if (feito) return
        feito = true
        desligar()
        aoSinal()
    }
    function armarTimer() {
        if (timer) clearTimeout(timer)
        timer = doc.visibilityState === 'visible' ? setTimeout(disparar, segundos * 1000) : null
    }
    function aoMudarVisibilidade() {
        armarTimer()
    }
    eventos.forEach((e) => win.addEventListener(e, disparar, { capture: true, passive: true }))
    doc.addEventListener('visibilitychange', aoMudarVisibilidade)
    armarTimer()
    return desligar
}

async function gravarClique(nome) {
    const chave = `rp_parceiro_clique_${nome}`
    try {
        if (sessionStorage.getItem(chave)) return
        sessionStorage.setItem(chave, '1')
    } catch {
        // Sem sessionStorage (modo privado antigo): conta mesmo assim.
    }
    try {
        const { supabase } = await import('./supabase')
        const { data, error } = await supabase
            .from('v_cupons_publico')
            .select('id_cupom')
            .eq('tipo', 'influencer')
            .eq('slug', nome)
            .maybeSingle()
        if (error || !data?.id_cupom) return
        await supabase.from('tbcupons_cliques').insert([{
            id_cupom: data.id_cupom,
            user_agent: navigator.userAgent,
            referencia: document.referrer || 'direct',
        }])
    } catch {
        // Contagem de clique nunca derruba a landing.
    }
}

export function contarCliqueDoParceiro() {
    if (typeof window === 'undefined') return
    const nome = nomeDoParceiroNaUrl(window.location.search)
    if (!nome) return
    if (ehRoboConhecido(navigator.userAgent)) return
    esperarSinalDePessoa(() => { gravarClique(nome) })
}
