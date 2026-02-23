import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
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

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left"
            >
                <span className="text-lg font-medium text-white">{question}</span>
                <ChevronDown
                    className={`h-5 w-5 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-white/50 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
    return (
        <section id="faq" className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Perguntas Frequentes</h2>
                    <p className="mt-4 text-white/50">Tire suas principais dúvidas sobre o RendiPro.</p>
                </div>
                <div className="mx-auto max-w-3xl">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    )
}
