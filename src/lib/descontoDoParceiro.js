/**
 * Desconto do link de parceiro na landing (Black Friday, 21/11/2026).
 *
 * ⚠ Por quê: `rendipro.com.br/<nome>` chega aqui como `?utm_source=parceiro&utm_campaign=<nome>` (vercel.json).
 *   O app aplica o desconto da ficha no checkout, mas a landing só conhecia o `?ref=` antigo e mostrava o preço
 *   cheio (R$ 9,90) para quem clicou num anúncio de 40%. Agora a landing lê a MESMA ficha pública
 *   (`v_cupons_publico`, a visão que o contador de cliques já usa) e mostra o preço com desconto.
 *
 * ⚠ Quem cobra é o servidor (`_shared/resumoCobranca.ts` no app). A conta da landing (`obterOfertaLanding`) dá os
 *   mesmos números: 12 x round(mensalidade x (100 - %) / 100) no cartão e round((ano - 1 mensalidade) x (100 - %) / 100)
 *   no Pix. Se divergirem, o servidor manda.
 *
 * ⚠ Nunca derruba a página: qualquer falha = preço cheio, sem aviso de erro (o desconto continua valendo no app).
 * ⚠ Só mostra desconto da ficha que vale no ANUAL (`planos_elegiveis`): o mensal nunca leva o desconto do link.
 */

const URL_API = import.meta.env.VITE_SUPABASE_URL
const CHAVE_PUBLICA = import.meta.env.VITE_SUPABASE_ANON_KEY

/** Nome do parceiro na URL (só com utm_source=parceiro), ou null. */
export function slugDoParceiroNaUrl(search) {
    try {
        const p = new URLSearchParams(search)
        if (p.get('utm_source') !== 'parceiro') return null
        const nome = (p.get('utm_campaign') || '').trim()
        return /^[a-zA-Z0-9-]{1,60}$/.test(nome) ? nome : null
    } catch {
        return null
    }
}

/** A ficha só vira desconto na landing se está ativa, no prazo, com % e valendo no anual. */
export function fichaValeNaLanding(ficha, agora = new Date()) {
    if (!ficha || ficha.ativo !== true) return false
    if (ficha.tipo !== 'influencer') return false
    const pct = Number(ficha.desconto_porcentagem)
    if (!Number.isInteger(pct) || pct < 1 || pct > 99) return false
    if (!ficha.data_expiracao || !(new Date(ficha.data_expiracao) > agora)) return false
    const planos = String(ficha.planos_elegiveis ?? '').toLowerCase()
    if (planos && !planos.split(/[,\s]+/).includes('anual')) return false
    return true
}

/** Último dia em que o desconto vale, no horário de Brasília ("30/11"). */
export function ultimoDiaDoDesconto(dataExpiracao) {
    try {
        // 1 s antes do fim: uma ficha que acaba às 00:00 vale até o dia anterior.
        const fim = new Date(new Date(dataExpiracao).getTime() - 1000)
        return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
        }).format(fim)
    } catch {
        return null
    }
}

export async function buscarDescontoDoParceiro(slug) {
    if (!slug || !URL_API || !CHAVE_PUBLICA) return null
    try {
        const campos = 'slug,nome_influencer,desconto_porcentagem,data_expiracao,planos_elegiveis,ativo,tipo'
        const url = `${URL_API}/rest/v1/v_cupons_publico?select=${campos}&tipo=eq.influencer&slug=eq.${encodeURIComponent(slug)}&limit=1`
        const resp = await fetch(url, {
            headers: { apikey: CHAVE_PUBLICA, Authorization: `Bearer ${CHAVE_PUBLICA}` },
        })
        if (!resp.ok) return null
        const linhas = await resp.json()
        const ficha = linhas?.[0]
        if (!fichaValeNaLanding(ficha)) return null
        return {
            slug: ficha.slug,
            nome_influencer: ficha.nome_influencer,
            desconto_porcentagem: Number(ficha.desconto_porcentagem),
            desconto_valor_fixo: null,
            data_expiracao: ficha.data_expiracao,
            ultimoDia: ultimoDiaDoDesconto(ficha.data_expiracao),
            // O app acha o link pelos utm (getLinksParceiro). NUNCA mandar `influencerSlug` (é o cupom antigo).
            origem: 'parceiro',
        }
    } catch {
        return null
    }
}
