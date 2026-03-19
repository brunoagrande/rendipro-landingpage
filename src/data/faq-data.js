/**
 * Fonte única de verdade para as perguntas e respostas do FAQ.
 * Usada tanto pelo componente visual FAQ.jsx quanto pelo SchemaMarkup.jsx
 * para gerar o JSON-LD FAQPage — garantindo que o schema nunca fique
 * desatualizado em relação ao conteúdo exibido na página.
 */
export const faqItems = [
  {
    question: 'O RendiPro funciona para qualquer tipo de prova?',
    answer: 'Sim! Nossa plataforma permite que você organize seus estudos de forma personalizada para o ENEM, vestibulares, concursos públicos, OAB, Residência Médica ou provas escolares.',
  },
  {
    question: 'Como funciona o sistema de flashcards?',
    answer: 'Utilizamos o algoritmo SM-2, o mesmo do Anki, para calcular o momento exato em que você deve revisar cada conteúdo, garantindo a memorização de longo prazo.',
  },
  {
    question: 'Como o RendiPro é diferente de usar planilhas ou o Notion?',
    answer: 'O RendiPro é inteligente e automatizado. Enquanto no Notion e planilhas você perde horas montando, ajustando e arrastando cards, o RendiPro faz todo o planejamento, cálculo de repetições e distribuição de tempo automaticamente. Você entra e só estuda.',
  },
  {
    question: 'É difícil de usar? Preciso ser uma pessoa organizada?',
    answer: 'Pelo contrário! O RendiPro foi feito exatamente para quem tem dificuldade de se organizar. A interface é super intuitiva: basta dizer suas matérias e o tempo que tem disponível, e nossa IA monta o cronograma perfeito para você.',
  },
  {
    question: 'O RendiPro funciona no celular?',
    answer: 'Sim, a plataforma é 100% responsiva (funciona perfeitamente pelo navegador do seu celular) e você pode revisar seus flashcards, acompanhar o progresso ou ler suas redações corrigidas de qualquer lugar.',
  },
  {
    question: 'Já uso outro cursinho preparatório. O RendiPro serve para mim?',
    answer: 'Com certeza! O RendiPro não substitui as aulas do seu cursinho, ele substitui a bagunça do seu planejamento. Você usa seu material base (PDFs, vídeo-aulas) e usa o RendiPro para organizar quando estudar, quando revisar e como memorizar o que o professor ensinou.',
  },
  {
    question: 'O sistema de redações está incluído em todos os planos?',
    answer: 'O sistema de agendamento automático de estudos e flashcards está em todos os planos. As correções detalhadas de redação estão disponíveis nos planos Plus, Pro e Ultra (de 2 a 8 redações inclusas por mês).',
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer: 'Sim, sem burocracia. No plano mensal você cancela quando quiser. No plano anual, você garante um baita desconto e tem acesso assegurado por todo o período.',
  },
]
