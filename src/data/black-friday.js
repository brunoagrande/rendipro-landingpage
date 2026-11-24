import { slugDoParceiroNaUrl } from '../lib/descontoDoParceiro'

// Black Friday 2026 (fundador, 21/11/2026): até o fim da BF a landing INTEIRA abre com a oferta do link `blackfriday`
// (faixa, preço do anual com 40%, aviso de renovação), já no 1º desenho, sem clique e sem piscar R$ 9,90.
// Quem dá o desconto é a ficha `blackfriday` no app: os botões levam `rp_link=blackfriday` (o app guarda o link sem
// trocar as utm da visita). Fim = o mesmo da ficha (30/11 23h59 de Brasília). Depois disso tudo volta sozinho.
// ⚠ Se a ficha for desligada antes, a landing confere ao abrir e volta ao preço cheio (InfluencerContext).
export const BLACK_FRIDAY_FIM = '2026-12-01T03:00:00Z'
export const BLACK_FRIDAY_SLUG = 'blackfriday'

export const BLACK_FRIDAY_PADRAO = {
    slug: BLACK_FRIDAY_SLUG,
    nome_influencer: 'Black Friday',
    desconto_porcentagem: 40,
    desconto_valor_fixo: null,
    data_expiracao: BLACK_FRIDAY_FIM,
    ultimoDia: '30/11',
    origem: 'parceiro',
    padrao: true,
}

/** A oferta que está na tela é a da Black Friday? (no 1º desenho ou depois de conferir a ficha) */
export function ehBlackFriday(influencerData) {
    return (
        influencerData?.origem === 'parceiro' &&
        ((influencerData.slug || '').toLowerCase() === BLACK_FRIDAY_SLUG ||
            influencerData.nome_influencer === BLACK_FRIDAY_PADRAO.nome_influencer)
    )
}

export function blackFridayNoAr(agora = new Date()) {
    return agora < new Date(BLACK_FRIDAY_FIM)
}

/**
 * O que a visita mostra no 1º desenho (antes de conferir a ficha na rede):
 * - BF padrão (sem link): a oferta, com `padrao: true` (os botões levam `rp_link`);
 * - pelo próprio link da BF (anúncio): a oferta, sem `padrao` (o link já está nas utm);
 * - qualquer outro caso: nada (preço cheio até a ficha do parceiro chegar).
 */
export function blackFridayInicial(search, pathname, agora = new Date()) {
    if (blackFridayPadraoNestaVisita(search, pathname, agora)) return BLACK_FRIDAY_PADRAO
    if (blackFridayNoAr(agora) && (slugDoParceiroNaUrl(search) || '').toLowerCase() === BLACK_FRIDAY_SLUG) {
        return { ...BLACK_FRIDAY_PADRAO, padrao: false }
    }
    return null
}

/** A visita abre com a BF? Só se a BF está no ar e ela não veio por cupom (`?ref=`, `/i/`) nem por outro link de parceiro. */
export function blackFridayPadraoNestaVisita(search, pathname, agora = new Date()) {
    if (!blackFridayNoAr(agora)) return false
    try {
        if (new URLSearchParams(search).get('ref')) return false
    } catch {
        return false
    }
    if ((pathname || '').startsWith('/i/')) return false
    return !slugDoParceiroNaUrl(search)
}
