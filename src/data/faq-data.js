import { CAMPANHA_ANUAL_ATIVA } from './campanha-anual'
import { SUPORTE_NO_APP_ATIVO } from './oferta-landing'

const primeiroMesGratis = {
    question: 'Como funciona o 1º mês grátis?',
    answer: 'Vale para quem nunca assinou o RendiPro. O plano anual dura 12 meses. No cartão, você não paga nada hoje: a primeira mensalidade, de R$ 9,90, vem daqui a 30 dias, e são 11 até fechar o ano. A gente avisa antes da primeira cobrança. No Pix, você paga o ano de uma vez, já com um mês a menos: R$ 108,90. Os 7 dias da garantia contam a partir de hoje, não dos 30.',
}

export const faqItems = [
    { question: 'Preciso ter material para usar?', answer: 'Sim. O RendiPro organiza o estudo com o que você já usa: cursinho, apostila, videoaula gratuita, site de questões ou PDF. Ele mostra o que estudar hoje, por quanto tempo e quando revisar. Ainda não tem material? Escolha um primeiro, até um gratuito serve, e monte o plano depois.' },
    // 21/11/2026 (hormozi, pedido do fundador): cards prontos ligados ao edital SÓ na FAQ, com escopo explícito
    // (só Direito Constitucional e Administrativo). Fora do Pricing e do Como Funciona: lá soaria como conteúdo, e o
    // único pagante de novembro pediu estorno porque esperava conteúdo. Sem contagem de assuntos (muda quase todo dia).
    { question: 'Vem algum conteúdo pronto?', answer: 'Não tem aula nem apostila: você estuda com o seu material. O que já vem pronto são flashcards de Direito Constitucional e Direito Administrativo, ligados aos assuntos do seu edital. Se o seu plano tem esses assuntos, eles aparecem em Flashcards, na aba "Do meu edital", e entram na sua revisão com um toque. As outras matérias ainda não têm cards prontos.' },
    ...(CAMPANHA_ANUAL_ATIVA ? [primeiroMesGratis] : []),
    // Oferta nova (09/11/2026): sem o mês grátis, o cartão cobra no dia da compra,
    // então "nada é cobrado nesse prazo" deixou de ser verdade.
    CAMPANHA_ANUAL_ATIVA
        ? { question: 'Posso cancelar?', answer: 'Nos primeiros 7 dias, sim, sem custo: no cartão nada é cobrado nesse prazo e no Pix devolvemos tudo. Depois do 7º dia, cancelar desliga a renovação, e as mensalidades seguem até completar os 12 meses. No plano mensal, você cancela quando quiser pelo próprio app.' }
        : { question: 'Posso cancelar?', answer: 'Use 7 dias. Não era o que você queria? Cancele no app e devolvemos tudo, no cartão ou no Pix. Depois do 7º dia, o plano anual segue pelos 12 meses: cancelar desliga a renovação, e as mensalidades vão até o fim. No plano mensal, você cancela quando quiser pelo próprio app.' },
    { question: 'Meu concurso não está na lista. E agora?', answer: 'Mande o PDF do edital. O RendiPro lê o conteúdo programático e você confere matéria por matéria antes de começar. Edital escaneado, só imagem, não dá para ler: nesse caso, cole o texto do conteúdo programático.' },
    { question: 'Quanto tempo leva para montar o plano?', answer: 'Uns 5 minutos: escolher o edital, dizer suas horas por dia e a data da prova, e conferir.' },
    ...(SUPORTE_NO_APP_ATIVO ? [{ question: 'E se eu travar para montar?', answer: 'Fale com a equipe pelo WhatsApp, de dentro do app. A gente ajuda a deixar o plano do jeito da sua prova.' }] : []),
    { question: 'Perdi dias de estudo. Tenho que refazer tudo?', answer: 'Não. O app mostra o que ficou para trás e reorganiza os próximos dias em poucos toques.' },
    { question: 'Estudo para mais de um concurso.', answer: 'Você pode ter até 3 planos ao mesmo tempo e trocar entre eles em um clique.' },
    { question: 'Como o RendiPro sabe o que eu estudei?', answer: 'Você registra. Pode usar o cronômetro do app enquanto estuda ou tocar em "Já estudei hoje, registrar" depois. É o registro que faz a revisão ser marcada no dia certo.' },
    { question: 'Já uso Anki e tenho meus resumos.', answer: 'Seus baralhos do Anki entram do jeito que estão. A foto do caderno vira flashcard, e o PDF da sua apostila vira questão. Tudo entra na mesma revisão.' },
    { question: 'Funciona no celular?', answer: 'Sim, com acesso completo no celular e no computador.' },
    { question: 'Como pago? É seguro?', answer: 'O pagamento é feito pelo Asaas, no Pix ou no cartão. No Asaas aparece Successus Tecnologia, a empresa do RendiPro.' },
]
