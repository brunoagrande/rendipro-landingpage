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
        question: 'Para qual prova o RendiPro funciona?',
        answer:
            'ENEM, vestibulares (FUVEST, UNICAMP, UFRGS, etc.), concursos públicos, OAB, Residência Médica e provas escolares. O cronograma se adapta automaticamente ao formato e à banca da sua prova específica.',
    },
    {
        question: 'A correção da redação é por professor humano mesmo, ou é IA?',
        answer:
            'Professor humano, sempre. Você fotografa sua redação manuscrita pelo celular. Um professor com formação em Letras e experiência em correção do ENEM lê seu texto, faz marcações em laranja direto na foto (circulando trechos com problema) e devolve em até 72h com nota nas 5 competências do ENEM (C1 a C5), pontos fortes, onde melhorar e um radar de evolução. Sem IA fingindo ser professor, sem bot.',
    },
    {
        question: 'Quantas redações posso enviar por mês?',
        answer:
            'Depende do plano: 0 no Starter, 2 no Plus, 4 no Pro (mais escolhido), 8 no Ultra. Redação é igual a treino: ritmo regular funciona melhor que rajada de última hora. Por isso o saldo reinicia toda virada de mês. Você escreve 2, 4 ou 8 redações por mês, com ritmo, em vez de acumular e enviar tudo de uma vez. Se usar menos do que o plano permite num mês, o saldo reinicia na virada e não acumula.',
    },
    {
        question: 'Posso usar pra ENEM e pra concurso ao mesmo tempo?',
        answer:
            'Sim. Essa é uma das funcionalidades exclusivas do RendiPro. Você cria até 3 cronogramas simultâneos, cada um com seu próprio edital ou plano, suas matérias e sua rotina. Nenhuma outra plataforma faz isso. Suas métricas, redações e flashcards ficam separados entre os planos. Não misturam. Alternância 1-clique no dashboard.',
    },
    {
        question:
            'Como o RendiPro se compara com plataformas só de redação ou só de questões?',
        answer:
            'Se você usa hoje uma plataforma de redação + uma de questões + Anki pra flashcards + planilha pra cronograma, está pagando 3-4 mensalidades separadas e gastando tempo trocando de aba. O RendiPro reúne tudo num plano só: redação corrigida por professor humano, +6.000 questões comentadas por alternativa, +8.000 flashcards SM-2 prontos, cronograma adaptado ao edital e provas oficiais. Geralmente sai por menos de 1/3 do total que você paga somando os outros apps.',
    },
    {
        question:
            'Já tentei outras plataformas e desisti em 2 semanas. Como sei que com o RendiPro vai ser diferente?',
        answer:
            'Honesto: o que faz aluno desistir é setup chato no começo + falta de método pra continuar quando o ânimo passa. O RendiPro ataca os dois: setup leva 5 minutos (cola edital, escolhe formato, pronto), e tem mecanismos de constância (streak diário, freeze quando você precisa de folga, missões leves) pra te manter no jogo nos dias ruins. Mais: garantia de 7 dias. Se em 7 dias você sentir que não funciona pra você, devolvemos 100% com 1 clique. Você não perde nada por testar.',
    },
    {
        question: 'Posso cancelar a qualquer momento?',
        answer:
            'Sim, sem burocracia. No plano mensal você cancela quando quiser pelo painel: sem ligação, sem e-mail, sem perguntas. No plano anual você garante o desconto de 33% e mantém o acesso até o fim do período contratado. Em qualquer caso, dentro dos primeiros 7 dias você tem direito a reembolso integral com 1 clique.',
    },
]
