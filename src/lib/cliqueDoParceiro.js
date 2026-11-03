/**
 * Clique no link de um parceiro (influencer), contado na landing.
 *
 * ⚠ 03/11/2026 (parceiros, fase 1; plano em `Rendipro/.agent/funil-cortesia-influencer/06-sistema-de-parceiros.md`).
 * O parceiro divulga `rendipro.com.br/<nome>`; o `vercel.json` manda para
 * `/?utm_source=parceiro&utm_medium=influencer&utm_campaign=<nome>`. A atribuição da CONTA acontece no app
 * (a utm segue nos botões e o banco grava o parceiro no cadastro). Aqui só se conta o clique, para o extrato
 * do parceiro ter "cliques".
 *
 * ⚠ Nunca atrapalha a página: só roda com `utm_source=parceiro`, carrega o Supabase sob demanda (as outras
 *   visitas não baixam nada), conta uma vez por sessão e por nome, e qualquer falha é silenciosa.
 * ⚠ Nome que não é de parceiro ativo não conta (a visão pública só tem cupom ativo).
 */
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

export async function contarCliqueDoParceiro() {
    if (typeof window === 'undefined') return
    const nome = nomeDoParceiroNaUrl(window.location.search)
    if (!nome) return
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
