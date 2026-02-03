import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: "Ana Silva",
        role: "Aprovada - Receita Federal",
        content: "O RendiPro mudou minha forma de estudar. A organização dos ciclos automáticos me economizou horas de planejamento semanal.",
        avatar: "AS"
    },
    {
        name: "Carlos Ferreira",
        role: "Aprovado - OAB",
        content: "O sistema de flashcards é o diferencial. Estudar por repetição espaçada sem ter que gerenciar o tempo manualmente foi o que me fez passar.",
        avatar: "CF"
    },
    {
        name: "Juliana Mendes",
        role: "Estudante de Concursos",
        content: "Finalmente uma plataforma que entende a dor do concurseiro. Tudo centralizado e muito intuitivo. Recomendo para todos!",
        avatar: "JM"
    }
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Quem usa, <span className="text-primary-500">aprova</span>
                    </h2>
                    <p className="mt-4 text-white/50">Junte-se a milhares de estudantes que aceleraram sua jornada.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-8 rounded-3xl border border-white/10 bg-white/5"
                        >
                            <Quote className="absolute top-6 right-8 text-primary-500/20" size={40} />
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={16} className="fill-primary-500 text-primary-500" />
                                ))}
                            </div>
                            <p className="text-white/80 italic mb-8 leading-relaxed">
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{t.name}</p>
                                    <p className="text-sm text-white/40">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
