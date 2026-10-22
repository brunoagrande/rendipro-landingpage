/**
 * Fonte única de verdade para as perguntas e respostas do FAQ.
 * Usada tanto pelo componente visual FAQ.jsx quanto pelo SchemaMarkup.jsx
 * para gerar o JSON-LD FAQPage.
 *
 * Ordem otimizada para conversão: de objeção mais branda (escopo)
 * a mais cínica (auto-eficácia "já tentei e desisti"). 7 perguntas
 * (reduzido de 13 em 2026-05-24 para encurtar fadiga de leitura).
 */

import { CAMPANHA_ANUAL_ATIVA, CAMPANHA_ANUAL } from './campanha-anual'
import { CORTESIA_CADASTRO_ATIVA, CORTESIA_CADASTRO } from './cortesia-cadastro'

// Cortesia de 7 dias no cadastro (16/10/2026). Primeira pergunta da lista porque
// é a primeira dúvida de quem chega pelo anúncio. ⛔ Sem a frase "acabaram os 7
// dias e não quis assinar? não paga nada": o fundador vetou em 16/10/2026.
const faqCortesia = {
    question: 'Preciso de cartão para começar?',
    answer:
        `Não. Ao criar a conta você ganha ${CORTESIA_CADASTRO.dias} dias grátis do plano Starter, sem cartão e sem cobrança: monte seu plano, estude pelo cronograma e veja se funciona para você. Se quiser continuar, você escolhe o plano dentro do app, inclusive o Pro.` +
        (CAMPANHA_ANUAL_ATIVA ? ' E quem assina o plano anual enquanto a campanha estiver no ar ainda ganha o 1º mês grátis.' : ''),
}

const faqCampanha = {
    question: 'Como funciona o "1 mês grátis no plano anual"?',
    answer:
        'É para quem nunca assinou o RendiPro, enquanto a campanha estiver no ar. O plano anual dura 12 meses. No cartão, você não paga nada hoje: a primeira mensalidade vem daqui a 30 dias, e são 11 até fechar o ano. No Pix, você paga o ano de uma vez, já com um mês a menos (Starter Anual: R$ 108,90 em vez de R$ 118,80). Atenção ao prazo: os 7 dias para desistir sem custo contam a partir de hoje, não dos 30. Depois do 7º dia, cancelar só desliga a renovação, e as mensalidades seguem até completar os 12 meses. As regras completas estão nos termos da campanha.',
    link: { href: CAMPANHA_ANUAL.termosUrl, label: 'Ler os termos da campanha' },
}

// 22/10/2026 (diagnóstico da MD): a landing não dizia em lugar nenhum que o
// RendiPro não é cursinho, e o 1º pagante que cancelou (09/10) esperava
// "algum tipo de material de estudo". Sem prometer questão gerada aqui: essa
// promessa está em revisão (banca de 22/10, decisão pendente do fundador).
const faqSemAula = {
    question: 'O RendiPro tem aulas ou apostilas?',
    answer:
        'Não. O RendiPro não é cursinho: não tem aula nem apostila. Ele organiza o seu estudo: monta o plano pelo edital da sua prova, diz o que estudar em cada dia e avisa a hora de revisar. Você estuda com o material que já usa, seja do cursinho, de videoaula, de livro ou de PDF.',
}

export const faqItems = [
    ...(CORTESIA_CADASTRO_ATIVA ? [faqCortesia] : []),
    faqSemAula,
    {
        question: 'Já tentei me organizar com planilha e desisti em duas semanas.',
        answer:
            'A planilha falha porque depende de você atualizá-la todo dia. O RendiPro faz essa parte: quando você perde um dia, um clique redistribui o que ficou para trás. Quando você termina um tópico, o cronograma avança sozinho. Quando chega a hora de revisar, o RendiPro te avisa. Você não precisa manter nada, só seguir.',
    },
    {
        question: 'Para qual prova o RendiPro funciona?',
        answer:
            'Concursos públicos, OAB, ENEM, vestibulares (FUVEST, UNICAMP, UFRGS e outros), Residência Médica e provas escolares. O cronograma nasce do edital da sua prova: 214 já estão prontos e novos entram toda semana. Se o seu não estiver na lista, mande o PDF do edital e confira o que o RendiPro leu antes de começar. Também dá para trazer um cronograma que você já segue, em CSV ou PDF.',
    },
    {
        question: 'Como funcionam os flashcards? Posso usar os meus?',
        answer:
            'Você tem mais de 8.000 flashcards prontos cobrindo as principais matérias e já pode começar a estudar na hora. Quer usar os seus? Crie flashcards em segundos, tire foto do caderno, gere a partir de qualquer conteúdo ou importe os baralhos que você já tem no Anki. A revisão de todos eles é organizada pela repetição espaçada, que calcula o dia certo de rever cada cartão para ele não sumir da memória.',
    },
    {
        question: 'A correção de redação é confiável? Quantas posso enviar?',
        answer:
            'Você escreve na plataforma e recebe a correção: nota de 0 a 1000, nota por competência e comentário do que travou cada critério. A régua é calibrada para ser mais dura que a banca de propósito, porque corretor bonzinho não prepara ninguém. São 2 correções por mês no Starter e 8 por mês no Pro. No plano anual entram 4 a mais por mês, um bônus de lançamento. Sem pagar por correção avulsa e sem agendar corretor.',
    },
    {
        question: 'Como monto meu cronograma? Dá para importar o que já tenho?',
        answer:
            'Você monta em minutos de três formas: automático, pelas horas que tem por dia; pelo edital do seu concurso; ou importando um plano que já segue em CSV ou PDF. Dá para manter até 3 cronogramas em paralelo (por exemplo, dois concursos ao mesmo tempo) sem misturar as matérias, alternando em 1 clique.',
    },
    {
        question: 'Posso usar para concurso e para ENEM ao mesmo tempo?',
        answer:
            'Sim. Você cria até 3 cronogramas ao mesmo tempo, cada um com seu próprio edital ou plano, suas matérias e sua rotina. Métricas, flashcards e revisões ficam separados entre os planos, sem misturar. Você alterna em 1 clique.',
    },
    {
        question:
            'Como o RendiPro se compara com Anki + planilha + apps soltos?',
        answer:
            'Se hoje você usa o Anki para flashcards, uma planilha para o cronograma e lembretes soltos para revisar, está gastando tempo trocando de ferramenta e ainda decidindo na mão o que revisar. O RendiPro organiza tudo isso em um lugar só: o cronograma nasce do edital, a revisão chega no dia certo, seus baralhos do Anki entram do jeito que estão, e o seu material vira questão e flashcard. A partir de R$ 9,90/mês.',
    },
    {
        question:
            'Já tentei outras plataformas e desisti em 2 semanas. Como sei que com o RendiPro vai ser diferente?',
        answer:
            'Sincero: o que faz aluno desistir é setup complicado no começo e falta de método para continuar quando o ânimo passa. O RendiPro resolve os dois: entrar na plataforma leva 5 minutos (escolha o seu edital ou mande o PDF, pronto), e tem sequência diária, proteção pros dias de folga e missões curtas para te manter no trilho nos dias ruins. ' +
            // Com a cortesia ligada, "garantia de 7 dias" ao lado de "7 dias grátis" confunde (MD, 22/10/2026).
            (CORTESIA_CADASTRO_ATIVA
                ? `E você usa ${CORTESIA_CADASTRO.dias} dias grátis, sem cartão, antes de decidir.`
                : 'E tem garantia de 7 dias. Se não funcionar para você, devolve 100% com 1 clique, sem precisar explicar nada.'),
    },
    {
        question: 'Posso cancelar a qualquer momento?',
        answer:
            'No mensal, sim: você cancela pelo painel quando quiser, sem ligação e sem precisar explicar nada. O anual sai 41% mais barato porque é um plano de 12 meses. Nos primeiros 7 dias, cancelar não custa nada: se você já pagou, devolvemos tudo. Depois disso, cancelar só desliga a renovação, e as mensalidades do cartão seguem até completar os 12 meses (no Pix, o ano já está pago e o acesso vai até o fim).',
    },
    {
        question: 'Como funciona o pagamento? Aceita Pix?',
        answer:
            'Pix ou cartão de crédito. No plano mensal a cobrança é todo mês, nos dois meios. No plano anual, o cartão é cobrado uma vez por mês, durante 12 meses. Para quem assina pela primeira vez, o 1º mês é grátis e a primeira cobrança vem 30 dias depois. O Pix é pago de uma vez: nesse caso a assinatura não renova sozinha, você renova quando quiser continuar, direto pelo painel, a partir de 30 dias antes do fim.',
    },
    ...(CAMPANHA_ANUAL_ATIVA ? [faqCampanha] : []),
]
