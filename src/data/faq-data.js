/**
 * Fonte única de verdade para as perguntas e respostas do FAQ.
 * Usada tanto pelo componente visual FAQ.jsx quanto pelo SchemaMarkup.jsx
 * para gerar o JSON-LD FAQPage — garantindo que o schema nunca fique
 * desatualizado em relação ao conteúdo exibido na página.
 *
 * Ordem otimizada para conversão (Agente 1 v2): de objeção mais branda
 * (escopo) a mais cínica (auto-eficácia "já tentei e desisti"). 13 perguntas.
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
            'Professor humano, sempre. Você fotografa sua redação manuscrita pelo celular. Um professor com formação em Letras e experiência em correção do ENEM lê seu texto, faz marcações em laranja direto na foto (circulando trechos com problema) e devolve em até 72h com nota nas 5 competências do ENEM (C1 a C5), pontos fortes, onde melhorar e um radar de evolução. Nada de IA fingindo ser professor. Nada de bot.',
    },
    {
        question: 'Em quanto tempo recebo minha redação corrigida?',
        answer:
            'Em até 72h depois de você enviar a foto. Esse é o SLA garantido. Na prática, a maioria sai em 24–48h. Se passar de 72h, a redação volta a contar como disponível no seu mês.',
    },
    {
        question: 'Quantas redações posso enviar por mês?',
        answer:
            'Depende do plano: 0 no Starter, 2 no Plus, 4 no Pro (mais escolhido), 8 no Ultra. Redação é músculo — treinamento regular bate rajada de última hora. Por isso, o saldo reinicia toda virada de mês para manter sua consistência: você escreve 2, 4 ou 8 redações todo mês, com ritmo, em vez de acumular e enviar tudo de uma vez. Se usar menos do que o plano permite num mês, o saldo reinicia na virada — não acumula.',
    },
    {
        question: 'Posso usar pra ENEM e pra concurso ao mesmo tempo?',
        answer:
            'Sim — e essa é uma das funcionalidades exclusivas do RendiPro. Você cria até 3 cronogramas simultâneos, cada um com seu próprio edital ou plano, suas matérias e sua rotina. Nenhuma outra plataforma faz isso. Suas métricas, redações e flashcards ficam separados entre os planos — não misturam. Alternância 1-clique no dashboard.',
    },
    {
        question:
            'Como funciona a sincronização do PDF da prova com o cartão de respostas?',
        answer:
            'Você abre uma prova oficial (ex: ENEM 2024). O PDF da prova aparece de um lado da tela, o cartão de respostas do outro. Quando você marca A/B/C/D/E na questão 11 no cartão, o PDF rola automaticamente pra página 8 (onde está a questão 11). Cronômetro com o tempo oficial do exame (5h30 no ENEM) rodando o tempo todo. É o mais próximo possível do dia da prova sem você sair de casa.',
    },
    {
        question:
            'Como o RendiPro se compara com plataformas só de redação ou só de questões?',
        answer:
            'Se você usa hoje uma plataforma de redação + uma de questões + Anki pra flashcards + planilha pra cronograma, está pagando 3-4 mensalidades separadas e gastando tempo trocando de aba. O RendiPro reúne tudo num plano só: redação corrigida por professor humano, +6.000 questões comentadas por alternativa, +8.000 flashcards SM-2 prontos, cronograma adaptado ao edital e provas oficiais. Geralmente sai por menos de 1/3 do total que você paga somando os outros apps.',
    },
    {
        question: 'Como funciona o algoritmo SM-2 dos flashcards?',
        answer:
            'SM-2 é o algoritmo de repetição espaçada criado pelo dr. Piotr Wozniak nos anos 90 — o mesmo que o Anki usa, cientificamente validado. Funciona assim: depois de ver um flashcard, você marca "Não lembrei", "Difícil", "Bom" ou "Fácil". O algoritmo calcula quando você deve revisar de novo (1 minuto, 1 dia, 3 dias, 1 semana, etc.) pra fixar o conteúdo na memória de longo prazo com o mínimo de tempo. Atalhos de teclado (1/2/3/4) pra quem é rápido.',
    },
    {
        question: 'Os flashcards já estão prontos ou eu tenho que montar?',
        answer:
            'Já estão prontos. +8.000 flashcards em 69 baralhos cobrindo as principais matérias do ENEM e ensino médio brasileiro. Você abre o app e estuda. Se quiser, pode criar seus próprios baralhos e cards também — mas não precisa. No Anki você gasta 40h só montando deck antes do primeiro estudo.',
    },
    {
        question: 'Preciso ser organizado pra usar o RendiPro?',
        answer:
            'Não. O RendiPro foi feito justamente pra quem tem dificuldade de se organizar. Você tem 3 caminhos: deixar a plataforma gerar o cronograma automaticamente baseado nas suas horas disponíveis por dia, importar um plano que você já tem (PDF ou CSV), ou cadastrar manualmente. Em qualquer caminho, escolhe entre formato fixo (matérias por dia), ciclo (rotação livre) ou híbrido. Em 5 minutos tem cronograma rodando.',
    },
    {
        question: 'O RendiPro funciona no celular?',
        answer:
            'Sim — funciona agora mesmo no seu celular, sem precisar instalar nada. Abra pelo navegador (Android ou iPhone) e você tem acesso completo: revise flashcards no ônibus, fotografe sua redação pra envio, acompanhe seu cronograma. É um web app — sem ocupar espaço no celular, sem atualização manual, sem fila de aprovação em loja.',
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
            'Sim, sem burocracia. No plano mensal você cancela quando quiser pelo painel — sem ligação, sem e-mail, sem perguntas. No plano anual você garante o desconto de 33% e mantém o acesso até o fim do período contratado. Em qualquer caso, dentro dos primeiros 7 dias você tem direito a reembolso integral com 1 clique.',
    },
]
