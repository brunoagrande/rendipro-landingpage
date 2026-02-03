import { motion } from 'framer-motion'
import { BookOpen, Brain, ClipboardCheck, Clock, LineChart, Target } from 'lucide-react'

const features = [
    {
        title: 'Ciclo de Estudos Inteligente',
        description: 'Organização automática baseada no seu tempo disponível e peso das matérias.',
        icon: Clock,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
    },
    {
        title: 'Flashcards Inteligentes',
        description: 'Algoritmo de repetição espaçada (SM-2) para garantir que você nunca esqueça o que aprendeu.',
        icon: Brain,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
    },
    {
        title: 'Gestão de Editais',
        description: 'Visualize seu progresso em cada tópico do edital e saiba exatamente o que falta estudar.',
        icon: BookOpen,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
    },
    {
        title: 'Simulados e Questões',
        description: 'Banco de questões integrado com histórico de desempenho detalhado por matéria.',
        icon: ClipboardCheck,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
    },
    {
        title: 'Análise de Desempenho',
        description: 'Gráficos e estatísticas poderosas para identificar seus pontos fortes e fracos.',
        icon: LineChart,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
    },
    {
        title: 'Foco no Objetivo',
        description: 'Ferramentas de produtividade para manter você concentrado no que realmente importa.',
        icon: Target,
        color: 'text-rose-400',
        bg: 'bg-rose-500/10',
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-surface-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Tudo o que você precisa para a <span className="text-primary-500">aprovação</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
                        Ferramentas profissionais desenhadas por quem entende de concursos públicos.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative rounded-3xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-primary-500/5"
                        >
                            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg}`}>
                                <feature.icon className={`h-6 w-6 ${feature.color}`} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-primary-400">{feature.title}</h3>
                            <p className="text-white/50 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
