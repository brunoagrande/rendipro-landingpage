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
            'A planilha falha porque depende de você atualizá-la todo dia. O RendiPro automatiza isso: quando você perde um dia, o plano redistribui sozinho. Quando você termina um tópico, o cronograma avança automaticamente. Quando chega a hora de revisar, o RendiPro te avisa. Você não precisa manter nada — só seguir.',
    },
    {
        question: 'Para qual prova o RendiPro funciona?',
        answer:
            'Concursos públicos, OAB, ENEM, vestibulares (FUVEST, UNICAMP, UFRGS, etc.), Residência Médica e provas escolares. O cronograma se adapta automaticamente ao edital, ao formato e à banca da sua prova específica.',
    },
    {
        question: 'Como funcionam os flashcards? Posso usar os meus?',
        answer:
            'Você tem 8.000 flashcards prontos em 69 baralhos cobrindo todas as matérias e já pode começar a estudar na hora. Quer usar os seus? Crie flashcards em segundos, gere por IA a partir de qualquer conteúdo ou importe os decks que você já tem no Anki. A revisão de todos eles é organizada pela repetição espaçada (algoritmo SM-2), que decide a hora certa de cada card.',
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
            'Se hoje você usa o Anki para flashcards, uma planilha para o cronograma e lembretes soltos para revisar, está gastando tempo trocando de ferramenta e ainda decidindo na mão o que revisar. O RendiPro reúne tudo num plano só: cronograma adaptado ao edital, 8.000 flashcards SM-2 (mais os seus, importados do Anki ou gerados por IA) e a revisão no momento certo, organizada automaticamente pela repetição espaçada. Menos setup, menos abas, a partir de R$ 9,90/mês.',
    },
    {
        question:
            'Já tentei outras plataformas e desisti em 2 semanas. Como sei que com o RendiPro vai ser diferente?',
        answer:
            'Sincero: o que faz aluno desistir é setup complicado no começo e falta de método pra continuar quando o ânimo passa. O RendiPro resolve os dois: entrar na plataforma leva 5 minutos (cola edital, escolhe formato, pronto), e tem streak diário, freeze de folga e missões curtas pra te manter no trilho nos dias ruins. E tem garantia de 7 dias. Se não funcionar pra você, devolve 100% com 1 clique — sem precisar explicar nada.',
    },
    {
        question: 'Posso cancelar a qualquer momento?',
        answer:
            'Sim, sem burocracia. No plano mensal você cancela quando quiser pelo painel: sem ligação, sem e-mail, sem perguntas. No plano anual você garante o desconto de 33% e mantém o acesso até o fim do período contratado. Em qualquer caso, dentro dos primeiros 7 dias você tem direito a reembolso integral com 1 clique.',
    },
]
