import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
    {
        question: 'O RendiPro funciona para qualquer concurso?',
        answer: 'Sim! Nossa plataforma permite que você importe editais ou crie o seu próprio personalizado para qualquer prova, seja municipal, estadual ou federal.',
    },
    {
        question: 'Como funciona o sistema de flashcards?',
        answer: 'Utilizamos o algoritmo SM-2, o mesmo do Anki, para calcular o momento exato em que você deve revisar cada conteúdo, garantindo a memorização de longo prazo.',
    },
    {
        question: 'Posso cancelar minha assinatura a qualquer momento?',
        answer: 'Sim, sem burocracia. No plano mensal você cancela quando quiser. No plano anual, você tem acesso garantido pelo período contratado.',
    },
    {
        question: 'O sistema de questões está incluído em todos os planos?',
        answer: 'Sim! Todos os nossos planos dão acesso total às funcionalidades da plataforma, variando apenas o período de acesso e a quantidade de redações inclusas.',
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
