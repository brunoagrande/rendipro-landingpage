/**
 * Fonte única de verdade para as perguntas e respostas do FAQ.
 * Usada tanto pelo componente visual FAQ.jsx quanto pelo SchemaMarkup.jsx
 * para gerar o JSON-LD FAQPage.
 *
 * Ordem otimizada para conversão: de objeção mais branda (escopo)
 * a mais cínica (auto-eficácia "já tentei e desisti"). 7 perguntas
 * (reduzido de 13 em 2026-05-24 para encurtar fadiga de leitura).
 */

export const faqItems = [
    {
        question: 'Já tentei me organizar com planilha e desisti em duas semanas.',
        answer:
            'A planilha falha porque depende de você atualizá-la todo dia. O RendiPro automatiza isso: quando você perde um dia, o plano redistribui sozinho. Quando você termina um tópico, o cronograma avança automaticamente. Quando chega a hora de revisar, o RendiPro te avisa. Você não precisa manter nada, só seguir.',
    },
    {
        question: 'Para qual prova o RendiPro funciona?',
        answer:
            'Concursos públicos, OAB, ENEM, vestibulares (FUVEST, UNICAMP, UFRGS, etc.), Residência Médica e provas escolares. O cronograma se adapta automaticamente ao edital, ao formato e à banca da sua prova específica.',
    },
    {
        question: 'Como funcionam os flashcards? Posso usar os meus?',
        answer:
            'Você tem mais de 8.000 flashcards prontos cobrindo as principais matérias e já pode começar a estudar na hora. Quer usar os seus? Crie flashcards em segundos, tire foto do caderno, gere por IA a partir de qualquer conteúdo ou importe os decks que você já tem no Anki. A revisão de todos eles é organizada pela repetição espaçada, que calcula o dia certo de rever cada card pra ele não sumir da memória.',
    },
    {
        question: 'A correção de redação é confiável? Quantas posso enviar?',
        answer:
            'Você escreve na plataforma e recebe a correção em minutos: nota de 0 a 1000, nota por competência e comentário do que travou cada critério. A régua é calibrada pra ser mais dura que a banca de propósito, porque corretor bonzinho não prepara ninguém. São 2 correções por mês no Starter e 8 por mês no Pro, sem pagar por correção avulsa e sem agendar corretor.',
    },
    {
        question: 'Como monto meu cronograma? Dá pra importar o que já tenho?',
        answer:
            'Você monta em minutos de três formas: automático, pelas horas que tem por dia; pelo edital do seu concurso; ou importando um plano que já segue em CSV ou PDF. Dá pra manter até 3 cronogramas em paralelo (por exemplo, dois concursos ao mesmo tempo) sem misturar as matérias, alternando em 1 clique.',
    },
    {
        question: 'Posso usar para concurso e para ENEM ao mesmo tempo?',
        answer:
            'Sim. Essa é uma das funcionalidades exclusivas do RendiPro. Você cria até 3 cronogramas simultâneos, cada um com seu próprio edital ou plano, suas matérias e sua rotina. Suas métricas, flashcards e revisões ficam separados entre os planos, não se misturam. Alternância em 1 clique no dashboard.',
    },
    {
        question:
            'Como o RendiPro se compara com Anki + planilha + apps soltos?',
        answer:
            'Se hoje você usa o Anki para flashcards, uma planilha para o cronograma e lembretes soltos para revisar, está gastando tempo trocando de ferramenta e ainda decidindo na mão o que revisar. O RendiPro reúne tudo num plano só: cronograma adaptado ao edital, flashcards com repetição espaçada (importados do Anki ou gerados por IA), a IA que transforma o seu material em questões e flashcards, e o reforço automático dos tópicos que você mais esquece. Menos setup, menos abas, por R$ 9,90/mês.',
    },
    {
        question:
            'Já tentei outras plataformas e desisti em 2 semanas. Como sei que com o RendiPro vai ser diferente?',
        answer:
            'Sincero: o que faz aluno desistir é setup complicado no começo e falta de método pra continuar quando o ânimo passa. O RendiPro resolve os dois: entrar na plataforma leva 5 minutos (cola edital, escolhe formato, pronto), e tem sequência diária, proteção pros dias de folga e missões curtas pra te manter no trilho nos dias ruins. E tem garantia de 7 dias. Se não funcionar pra você, devolve 100% com 1 clique, sem precisar explicar nada.',
    },
    {
        question: 'Posso cancelar a qualquer momento?',
        answer:
            'Sim, sem burocracia. No plano mensal você cancela quando quiser pelo painel: sem ligação, sem e-mail, sem perguntas. No plano anual você garante o desconto de 41% e mantém o acesso até o fim do período contratado. Em qualquer caso, dentro dos primeiros 7 dias você tem direito a reembolso integral com 1 clique.',
    },
]
