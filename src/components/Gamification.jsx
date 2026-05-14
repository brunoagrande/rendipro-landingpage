import { motion } from 'framer-motion'
import { Flame, Snowflake, Target, Trophy, TrendingUp } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'

/**
 * Gamification — antecipa a maior objeção pós-compra: "vou largar em 2 semanas".
 *
 * Tom: Brilliant adulto, não Duolingo infantil. "Ritual diário" e "compromisso
 * com você mesmo", não "joguinho". Sem mascotes, sem emojis no copy, sem
 * exclamações.
 *
 * As 4 mecânicas mostradas existem de verdade no produto (vide screenshots):
 *  - Streak diário (com chama)
 *  - XP e nível (Mestre 21, 1.925/3.834 XP)
 *  - Liga semanal (Prata, posição, ranking)
 *  - Missões diárias + Freeze (proteção contra perda de streak)
 *
 * Posição na pipeline: entre Comparison e FounderStory (preparando o terreno
 * de confiança antes do Founder Story).
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const MECHANICS = [
    {
        icon: Flame,
        accent: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        title: 'Streak diário',
        description:
            'Cada dia conta. A sequência cria o hábito automático que substitui a força de vontade nos dias difíceis.',
    },
    {
        icon: TrendingUp,
        accent: 'text-primary-300',
        bg: 'bg-primary-500/10',
        border: 'border-primary-500/20',
        title: 'XP e nível',
        description:
            'Cada sessão te dá XP. Cada nível desbloqueado é prova visível de que você está construindo, mesmo nos dias em que parece lento.',
    },
    {
        icon: Trophy,
        accent: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        title: 'Liga semanal',
        description:
            'Você compete com outros estudantes na mesma fase que você. Top 3 sobem de liga. Pressão saudável de quem está no mesmo caminho.',
    },
    {
        icon: Snowflake,
        accent: 'text-info-400',
        bg: 'bg-info-500/10',
        border: 'border-info-500/20',
        title: 'Missões e Freeze',
        description:
            'Desafios diários sustentam o ritmo. Dia impossível? Usa o Freeze e mantém o streak intacto — sem zerar tudo por uma viagem ou virose.',
    },
]

export function Gamification() {
    return (
        <section
            id="gamification"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* Background — orange/yellow glow para combinar com streak */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#f59e0b_0%,_transparent_55%)] opacity-[0.06]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── Section header ──────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-14 text-center"
                >
                    <Eyebrow variant="warning" className="mb-4">
                        <Target size={14} />
                        Constância
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Constância vence <span className="text-gradient-primary">talento</span>.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Streak, XP, ligas e missões. As mesmas mecânicas que fazem o Duolingo funcionar — aplicadas a quem tem uma aprovação de verdade na mira.
                    </p>
                </motion.div>

                {/* ─── 4 mechanics grid ────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {MECHANICS.map((mech, i) => {
                        const Icon = mech.icon
                        return (
                            <motion.article
                                key={mech.title}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.08,
                                    ease: easeSpring,
                                }}
                                className="group flex flex-col rounded-2xl border border-white/10 bg-surface-900/60 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-surface-900/80 sm:p-7"
                            >
                                <div
                                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${mech.border} ${mech.bg}`}
                                >
                                    <Icon size={22} className={mech.accent} />
                                </div>
                                <h3 className="mt-5 text-h4 font-bold text-white">
                                    {mech.title}
                                </h3>
                                <p className="mt-2 text-body-sm leading-relaxed text-white/65">
                                    {mech.description}
                                </p>
                            </motion.article>
                        )
                    })}
                </div>

                {/* ─── Closing line ────────────────────────────────────── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mx-auto mt-12 max-w-2xl text-center text-body text-white/55"
                >
                    Você não precisa de mais força de vontade — você precisa de mecanismos que te mantenham no jogo quando ela some.
                </motion.p>
            </div>
        </section>
    )
}
