import { PRICING_PLANS } from './pricing-plans'
import { CAMPANHA_ANUAL_ATIVA, resumoCampanhaAnual } from './campanha-anual'

export const SUPORTE_NO_APP_ATIVO = false

const anual = PRICING_PLANS.find((plano) => plano.slug === 'starter-anual')
const mensal = PRICING_PLANS.find((plano) => plano.slug === 'starter-mensal')

function formatarMoeda(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

// "menos de 30 centavos por dia" só aparece quando a conta fecha (o ano / 365).
// Se o preço mudar e a conta passar de 30 centavos, a frase some sozinha.
function porDia(centavosNoAno) {
    return centavosNoAno / 365 < 30 ? ': menos de 30 centavos por dia' : ''
}

export function obterOfertaLanding(influencerData, applyDiscount = (valor) => valor) {
    const comInfluencer = Boolean(influencerData)
    const campanhaAtiva = CAMPANHA_ANUAL_ATIVA && !comInfluencer
    const resumo = resumoCampanhaAnual(anual)
    const precoAnual = applyDiscount(anual.preco_centavos)
    const mensalidade = Math.round(precoAnual / 12)

    if (campanhaAtiva) {
        return {
            campanhaAtiva: true,
            comInfluencer: false,
            selo: '1º mês grátis',
            precoMensal: formatarMoeda(resumo.mensalCentavos),
            precoPix: formatarMoeda(resumo.pixCentavos),
            precoAnual: formatarMoeda(anual.preco_centavos),
        precoMensalSemDesconto: formatarMoeda(Math.round(anual.preco_centavos / 12)),
            precoMensalRegular: formatarMoeda(mensal.preco_centavos),
            textoHero: 'Você cria a conta, cadastra o cartão e monta o plano em uns 5 minutos.',
            textoHeroDestaque: 'R$ 0 hoje.',
            textoHeroRodape: '1º mês grátis · Garantia de 7 dias',
            textoCartao: `Plano de 12 meses. No cartão: R$ 0 hoje, e depois ${resumo.cobrancasCartao} mensalidades de ${formatarMoeda(resumo.mensalCentavos)}.`,
            textoPix: `Ou ${formatarMoeda(resumo.pixCentavos)} no Pix, o ano todo de uma vez.`,
            textoPilha: `No mensal, o mesmo app sai ${formatarMoeda(mensal.preco_centavos)} por mês, ${formatarMoeda(mensal.preco_centavos * 12)} no ano. No anual, com o 1º mês grátis, você paga ${formatarMoeda(resumo.pixCentavos)} pelos 12 meses${porDia(resumo.pixCentavos)}.`,
            textoSticky: `Depois ${formatarMoeda(resumo.mensalCentavos)}/mês · 12 meses`,
            textoFechamento: `1º mês grátis no plano anual de 12 meses · depois ${formatarMoeda(resumo.mensalCentavos)} por mês · Garantia de 7 dias`,
        }
    }

    return {
        campanhaAtiva: false,
        comInfluencer,
        selo: null,
        precoMensal: formatarMoeda(mensalidade),
        precoPix: formatarMoeda(precoAnual),
        precoAnual: formatarMoeda(anual.preco_centavos),
        precoMensalSemDesconto: formatarMoeda(Math.round(anual.preco_centavos / 12)),
        precoMensalRegular: formatarMoeda(mensal.preco_centavos),
        textoHero: 'Você cria a conta, cadastra o cartão e monta o plano em uns 5 minutos.',
        textoHeroDestaque: null,
        textoHeroRodape: 'Garantia de 7 dias',
        textoCartao: `Plano de 12 meses. No cartão: 12 mensalidades de ${formatarMoeda(mensalidade)}.`,
        textoPix: `Ou ${formatarMoeda(precoAnual)} no Pix, o ano todo de uma vez.`,
        textoPilha: `No mensal, o mesmo app sai ${formatarMoeda(mensal.preco_centavos)} por mês, ${formatarMoeda(mensal.preco_centavos * 12)} no ano. No anual, você paga ${formatarMoeda(precoAnual)} pelos 12 meses${porDia(precoAnual)}.`,
        textoSticky: `${formatarMoeda(mensalidade)}/mês · 12 meses`,
        textoFechamento: `Plano anual de 12 meses · ${formatarMoeda(mensalidade)} por mês · Garantia de 7 dias`,
    }
}
