import { PRICING_PLANS } from './pricing-plans'
import { CAMPANHA_ANUAL_ATIVA, resumoCampanhaAnual } from './campanha-anual'
import { ehBlackFriday } from './black-friday'

export const SUPORTE_NO_APP_ATIVO = true

const anual = PRICING_PLANS.find((plano) => plano.slug === 'starter-anual')
const mensal = PRICING_PLANS.find((plano) => plano.slug === 'starter-mensal')

function formatarMoeda(centavos) {
    return (centavos / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

// "menos de R$ 0,18 por dia": o valor sai da conta (o ano / 365, arredondado para cima).
// Teto de 30: se o preço mudar e a conta passar disso, a frase some sozinha.
function porDia(centavosNoAno) {
    const centavosPorDia = centavosNoAno / 365
    return centavosPorDia < 30 ? `menos de ${formatarMoeda(Math.floor(centavosPorDia) + 1)} por dia` : ''
}

const doisPontos = (frase) => (frase ? `: ${frase}` : '')

// Black Friday (25/11/2026, hormozi e fundador): pouco texto, número à vista. O valor por dia só aparece colado no
// Pix (no cartão o ano custa mais e a frase seria falsa). Some sozinho com a BF.
function textosBlackFriday({ pixAVista, mensalidade, anualCheio, mensalNoAno }) {
    const pix = formatarMoeda(pixAVista)
    const cartao = `12\u00a0x\u00a0${formatarMoeda(mensalidade)}`
    return {
        cartao,
        porDia: porDia(pixAVista),
        textoHero: 'Assine, monte o plano e use por 7 dias.',
        textoHeroDestaque: 'Se não for o que você queria, devolvemos tudo.',
        textoRenovacao: `Plano de 12 meses. Depois do 7º dia, as 12 mensalidades vão até o fim. No cartão, renova sozinho a ${formatarMoeda(Math.round(anualCheio / 12))} por mês. No Pix, não renova sozinho.`,
        textoFechamento: `${cartao} ou ${pix} no Pix`,
        comparacao: {
            mensal: formatarMoeda(mensalNoAno),
            pix,
            economia: formatarMoeda(mensalNoAno - pixAVista),
        },
        textoSticky: `${cartao} ou ${pix} no Pix`,
    }
}

export function obterOfertaLanding(influencerData, applyDiscount = (valor) => valor) {
    const comInfluencer = Boolean(influencerData)
    const campanhaAtiva = CAMPANHA_ANUAL_ATIVA && !comInfluencer
    const resumo = resumoCampanhaAnual(anual)
    const precoAnual = applyDiscount(anual.preco_centavos)
    const mensalidade = Math.round(precoAnual / 12)
    // Oferta nova (09/11/2026): o Pix à vista sai com 1 mensalidade a menos, a
    // mesma conta do app (`_shared/resumoCobranca.ts`, sem campanha). É o prêmio
    // de pagar o ano de uma vez, não campanha. Starter: R$ 108,90.
    const pixAVista = precoAnual - mensalidade

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
            textoPilha: `No mensal, o mesmo app sai ${formatarMoeda(mensal.preco_centavos)} por mês, ${formatarMoeda(mensal.preco_centavos * 12)} no ano. No anual, com o 1º mês grátis, você paga ${formatarMoeda(resumo.pixCentavos)} pelos 12 meses${doisPontos(porDia(resumo.pixCentavos))}.`,
            textoSticky: `Depois ${formatarMoeda(resumo.mensalCentavos)}/mês · 12 meses`,
            textoFechamento: `1º mês grátis no plano anual de 12 meses · depois ${formatarMoeda(resumo.mensalCentavos)} por mês · Garantia de 7 dias`,
        }
    }

    return {
        campanhaAtiva: false,
        comInfluencer,
        selo: null,
        precoMensal: formatarMoeda(mensalidade),
        precoPix: formatarMoeda(pixAVista),
        precoAnual: formatarMoeda(anual.preco_centavos),
        precoMensalSemDesconto: formatarMoeda(Math.round(anual.preco_centavos / 12)),
        precoMensalRegular: formatarMoeda(mensal.preco_centavos),
        // A ordem é a do app: conta, pagamento (checkout logo após o cadastro) e plano
        // (o app só abre pago). "Uns 5 minutos": mediana de 5,1 min da conta ao 1º
        // plano em 23 pagantes de out-nov/2026 (medido em 10/11/2026).
        // 14/11/2026 (hormozi, ok do fundador "resolver agora"): quem vem do anúncio fica ~11 s e
        // só lê o topo. Desde 10/11 a linha do botão anunciava a cobrança sem nada que tirasse o
        // medo, e o clique no topo caiu. A devolução sobe para cá (é a mesma promessa do FAQ e da
        // seção Garantia); o "como se paga" desce para o rodapé. Sem o verbo desistir (veto 30/10).
        textoHero: 'Você cria a conta, assina e monta o plano em uns 5 minutos.',
        textoHeroDestaque: 'Use 7 dias. Se não for o que você queria, devolvemos tudo.',
        textoHeroRodape: `12x no cartão ou ${formatarMoeda(pixAVista)} no Pix.`,
        textoCartao: `Plano de 12 meses. No cartão: 12 mensalidades de ${formatarMoeda(mensalidade)}, a 1ª no dia da compra.`,
        textoPix: `Ou ${formatarMoeda(pixAVista)} no Pix, o ano todo de uma vez.`,
        textoPilha: `No mensal, o mesmo app sai ${formatarMoeda(mensal.preco_centavos)} por mês, ${formatarMoeda(mensal.preco_centavos * 12)} no ano. No anual, você paga ${formatarMoeda(pixAVista)} pelos 12 meses no Pix${doisPontos(porDia(pixAVista))}.`,
        textoSticky: `${formatarMoeda(mensalidade)}/mês · 12 meses`,
        textoFechamento: `Plano anual de 12 meses · ${formatarMoeda(mensalidade)} por mês · Garantia de 7 dias`,
        ...(ehBlackFriday(influencerData)
            ? textosBlackFriday({
                  pixAVista,
                  mensalidade,
                  anualCheio: anual.preco_centavos,
                  mensalNoAno: mensal.preco_centavos * 12,
              })
            : {}),
    }
}
