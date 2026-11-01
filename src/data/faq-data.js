import { CAMPANHA_ANUAL_ATIVA } from './campanha-anual'
import { SUPORTE_NO_APP_ATIVO } from './oferta-landing'

const primeiroMesGratis = {
    question: 'Como funciona o 1º mês grátis?',
    answer: 'Vale para quem nunca assinou o RendiPro. O plano anual dura 12 meses. No cartão, você não paga nada hoje: a primeira mensalidade, de R$ 9,90, vem daqui a 30 dias, e são 11 até fechar o ano. A gente avisa antes da primeira cobrança. No Pix, você paga o ano de uma vez, já com um mês a menos: R$ 108,90. Os 7 dias da garantia contam a partir de hoje, não dos 30.',
}

export const faqItems = [
    { question: 'O RendiPro tem aulas ou apostilas?', answer: 'Não. O RendiPro não é cursinho. Você estuda com o material que já tem: curso, apostila, PDF ou videoaula. O RendiPro organiza o resto: o que estudar hoje, por quanto tempo e quando revisar. Se você ainda não escolheu o seu material, escolha primeiro e volte depois.' },
    ...(CAMPANHA_ANUAL_ATIVA ? [primeiroMesGratis] : []),
    { question: 'Posso cancelar?', answer: 'Nos primeiros 7 dias, sim, sem custo: no cartão nada é cobrado nesse prazo e no Pix devolvemos tudo. Depois do 7º dia, cancelar desliga a renovação, e as mensalidades seguem até completar os 12 meses. No plano mensal, você cancela quando quiser pelo próprio app.' },
    { question: 'Meu concurso não está na lista. E agora?', answer: 'Mande o PDF do edital. O RendiPro lê o conteúdo programático e você confere matéria por matéria antes de começar. Edital escaneado, só imagem, não dá para ler: nesse caso, cole o texto do conteúdo programático. Novos editais entram no catálogo toda semana.' },
    { question: 'Quanto tempo leva para montar o plano?', answer: 'Uns 5 minutos: escolher o edital, dizer suas horas por dia e a data da prova, e conferir.' },
    ...(SUPORTE_NO_APP_ATIVO ? [{ question: 'E se eu travar para montar?', answer: 'Fale com a equipe pelo WhatsApp, de dentro do app. A gente ajuda a deixar o plano do jeito da sua prova.' }] : []),
    { question: 'Perdi dias de estudo. Tenho que refazer tudo?', answer: 'Não. Um clique redistribui o que ficou para trás pelos próximos dias, até a prova.' },
    { question: 'Estudo para mais de um concurso.', answer: 'Você pode ter até 3 planos ao mesmo tempo e trocar entre eles em um clique.' },
    { question: 'Como o RendiPro sabe o que eu estudei?', answer: 'Você registra. Pode usar o cronômetro do app enquanto estuda ou tocar em "Já estudei hoje, registrar" depois. É o registro que faz a revisão ser marcada no dia certo.' },
    { question: 'Já uso Anki e tenho meus resumos.', answer: 'Seus baralhos do Anki entram do jeito que estão. A foto do caderno vira flashcard, e o PDF da sua apostila vira questão. Tudo entra na mesma revisão.' },
    { question: 'Funciona no celular?', answer: 'Sim, com acesso completo no celular e no computador.' },
    { question: 'Como pago? É seguro?', answer: 'O pagamento é feito pelo Asaas, no Pix ou no cartão.' },
]
