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

const faqCampanha = {
    question: 'Como funciona o "1 mês grátis no plano anual"?',
    answer:
        'Vale para quem assina o plano anual pela primeira vez, enquanto a campanha estiver no ar. No cartão, a primeira cobrança só acontece daqui a 30 dias e o ano fecha em 11 cobranças em vez de 12. No Pix, você paga de uma vez o ano menos um mês (Starter Anual: R$ 108,90 em vez de R$ 118,80). Os 7 dias de garantia continuam valendo, e as regras completas estão nos termos da campanha.',
    link: { href: CAMPANHA_ANUAL.termosUrl, label: 'Ler os termos da campanha' },
}

export const faqItems = [
    {
        question: 'Já tentei me organizar com planilha e desisti em duas semanas.',
        answer:
            'A planilha falha porque depende de você atualizá-la todo dia. O RendiPro faz essa parte: quando você perde um dia, um clique redistribui o que ficou pra trás. Quando você termina um tópico, o cronograma avança sozinho. Quando chega a hora de revisar, o RendiPro te avisa. Você não precisa manter nada, só seguir.',
    },
    {
        question: 'Para qual prova o RendiPro funciona?',
        answer:
            'Concursos públicos, OAB, ENEM, vestibulares (FUVEST, UNICAMP, UFRGS e outros), Residência Médica e provas escolares. O cronograma nasce do edital da sua prova (76 já estão prontos) ou das horas que você tem por dia, e você também pode importar um plano pronto em CSV ou PDF.',
    },
    {
        question: 'Como funcionam os flashcards? Posso usar os meus?',
        answer:
            'Você tem mais de 8.000 flashcards prontos cobrindo as principais matérias e já pode começar a estudar na hora. Quer usar os seus? Crie flashcards em segundos, tire foto do caderno, gere a partir de qualquer conteúdo ou importe os baralhos que você já tem no Anki. A revisão de todos eles é organizada pela repetição espaçada, que calcula o dia certo de rever cada cartão pra ele não sumir da memória.',
    },
    {
        question: 'A correção de redação é confiável? Quantas posso enviar?',
        answer:
            'Você escreve na plataforma e recebe a correção em minutos: nota de 0 a 1000, nota por competência e comentário do que travou cada critério. A régua é calibrada pra ser mais dura que a banca de propósito, porque corretor bonzinho não prepara ninguém. São 2 correções por mês no Starter e 8 por mês no Pro. No plano anual entram 4 a mais por mês, um bônus de lançamento. Sem pagar por correção avulsa e sem agendar corretor.',
    },
    {
        question: 'Como monto meu cronograma? Dá pra importar o que já tenho?',
        answer:
            'Você monta em minutos de três formas: automático, pelas horas que tem por dia; pelo edital do seu concurso; ou importando um plano que já segue em CSV ou PDF. Dá pra manter até 3 cronogramas em paralelo (por exemplo, dois concursos ao mesmo tempo) sem misturar as matérias, alternando em 1 clique.',
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
            'Se hoje você usa o Anki para flashcards, uma planilha para o cronograma e lembretes soltos para revisar, está gastando tempo trocando de ferramenta e ainda decidindo na mão o que revisar. O RendiPro organiza tudo isso num lugar só: o cronograma nasce do edital, a revisão chega no dia certo, seus baralhos do Anki entram do jeito que estão, e o seu material vira questão e flashcard. A partir de R$ 9,90/mês.',
    },
    {
        question:
            'Já tentei outras plataformas e desisti em 2 semanas. Como sei que com o RendiPro vai ser diferente?',
        answer:
            'Sincero: o que faz aluno desistir é setup complicado no começo e falta de método pra continuar quando o ânimo passa. O RendiPro resolve os dois: entrar na plataforma leva 5 minutos (cole o edital, escolha o formato, pronto), e tem sequência diária, proteção pros dias de folga e missões curtas pra te manter no trilho nos dias ruins. E tem garantia de 7 dias. Se não funcionar pra você, devolve 100% com 1 clique, sem precisar explicar nada.',
    },
    {
        question: 'Posso cancelar a qualquer momento?',
        answer:
            'Sim, sem burocracia. No plano mensal você cancela quando quiser pelo painel: sem ligação, sem e-mail, sem perguntas. No plano anual você garante o desconto de 41% e mantém o acesso até o fim do período contratado. Em qualquer caso, dentro dos primeiros 7 dias você tem direito a reembolso integral com 1 clique.',
    },
    {
        question: 'Como funciona o pagamento? Aceita Pix?',
        answer:
            'Pix ou cartão de crédito. No plano mensal a cobrança é todo mês, nos dois meios. No plano anual, o cartão é cobrado em 12 vezes ao longo do ano, e o Pix é pago de uma vez: nesse caso a assinatura não renova sozinha, você renova quando quiser continuar, direto pelo painel, a partir de 30 dias antes do fim.',
    },
    ...(CAMPANHA_ANUAL_ATIVA ? [faqCampanha] : []),
]
