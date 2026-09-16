/**
 * Campanha "1 mês de desconto no anual" (app: Admin › Campanha anual).
 *
 * A landing é estática (sem Supabase na página de vendas), então a campanha
 * é ligada AQUI, à mão, no mesmo dia em que o fundador liga no admin do app,
 * e desligada junto. Mesmo padrão do `BONUS_LANCAMENTO_REDACOES_ANUAL`.
 *
 * O que a campanha faz no app (asaas-subscribe, 14/09/2026):
 *  - Cartão: 12 meses, a 1ª cobrança só daqui a 30 dias, 11 cobranças no
 *    total (o 1º mês é o desconto).
 *  - Pix: paga de uma vez o ano menos um mês (Starter: R$ 108,90 em vez de
 *    R$ 118,80).
 *  - Só para quem nunca assinou. Sem boleto no anual.
 *
 * Um nome só, em toda parte: "1 mês de desconto no anual".
 */

export const CAMPANHA_ANUAL_ATIVA = true

export const CAMPANHA_ANUAL = {
    nome: '1 mês de desconto no anual',
    mesesDeDesconto: 1,
    /** Termos específicos da campanha, no app (cláusulas 5-A e 5-C). */
    termosUrl: 'https://app.rendipro.com.br/termos/anual',
}

/**
 * As contas da campanha para um plano anual, iguais às do app
 * (`_shared/resumoCobranca.ts`): mensalidade = preço / 12, arredondada.
 *
 * @param {{ preco_centavos: number }} plan
 * @returns {{ mensalCentavos: number, cobrancasCartao: number, pixCentavos: number, descontoCentavos: number }}
 */
export function resumoCampanhaAnual(plan) {
    const mensalCentavos = Math.round(plan.preco_centavos / 12)
    const descontoCentavos = mensalCentavos * CAMPANHA_ANUAL.mesesDeDesconto
    return {
        mensalCentavos,
        cobrancasCartao: 12 - CAMPANHA_ANUAL.mesesDeDesconto,
        pixCentavos: plan.preco_centavos - descontoCentavos,
        descontoCentavos,
    }
}
