import { CAMPANHA_ANUAL_ATIVA } from './campanha-anual'

const primeiroMesGratis = {
    question: 'Como funciona o 1º mês grátis?',
    answer: 'Vale para quem nunca assinou o RendiPro. O plano anual dura 12 meses. No cartão, você não paga nada hoje: a primeira mensalidade, de R$ 9,90, vem daqui a 30 dias, e são 11 até fechar o ano. A gente avisa antes da primeira cobrança. No Pix, você paga o ano de uma vez, já com um mês a menos: R$ 108,90. Os 7 dias da garantia contam a partir de hoje, não dos 30.',
}

export const faqItems = [
    { question: 'Preciso ter material?', answer: 'Sim. Pode ser cursinho, apostila, videoaula gratuita, site de questões ou PDF.' },
    // 21/11/2026 (hormozi, pedido do fundador): cards prontos ligados ao edital SÓ na FAQ, com escopo explícito
    // (só Direito Constitucional e Administrativo). Fora do Pricing e do Como Funciona: lá soaria como conteúdo, e o
    // único pagante de novembro pediu estorno porque esperava conteúdo. Sem contagem de assuntos (muda quase todo dia).
    { question: 'Vem algum conteúdo pronto?', answer: 'Não tem aula nem apostila. Vêm prontos flashcards de Direito Constitucional e Direito Administrativo, ligados aos assuntos do seu edital. As outras matérias ainda não têm.' },
    ...(CAMPANHA_ANUAL_ATIVA ? [primeiroMesGratis] : []),
    // Oferta nova (09/11/2026): sem o mês grátis, o cartão cobra no dia da compra,
    // então "nada é cobrado nesse prazo" deixou de ser verdade.
    CAMPANHA_ANUAL_ATIVA
        ? { question: 'Posso cancelar?', answer: 'Nos primeiros 7 dias, sim, sem custo: no cartão nada é cobrado nesse prazo e no Pix devolvemos tudo. Depois do 7º dia, cancelar desliga a renovação, e as mensalidades seguem até completar os 12 meses. No plano mensal, você cancela quando quiser pelo próprio app.' }
        : { question: 'Posso cancelar?', answer: 'Nos primeiros 7 dias, cancele no app e devolvemos tudo. Depois, cancelar o anual só desliga a renovação: as 12 mensalidades vão até o fim. No mensal, você cancela quando quiser.' },
    { question: 'Meu concurso não está na lista. E agora?', answer: 'Mande o PDF do edital e confira matéria por matéria antes de começar. Se ele for escaneado, cole o texto.' },
    { question: 'Como pago? É seguro?', answer: 'O pagamento é feito pelo Asaas, no Pix ou no cartão. No Asaas aparece Successus Tecnologia, a empresa do RendiPro.' },
]
