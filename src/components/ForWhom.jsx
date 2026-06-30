import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Scale } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { useSectionView } from '../lib/useSectionView'

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const AVATARS = [
    {
        icon: Briefcase,
        label: 'Concurseiro',
        copy: 'Dois concursos abertos ao mesmo tempo, planilha que já ficou pra trás e a sensação de que está estudando bastante mas em círculos.',
        accent: 'primary',
    },
    {
        icon: GraduationCap,
        label: 'ENEM e Vestibulares',
        copy: 'A rotina muda toda semana e qualquer planilha rígida vai por água abaixo na primeira semana que desanda.',
        accent: 'primary',
    },
    {
        icon: Scale,
        label: 'OAB',
        copy: 'Volume absurdo de conteúdo e a sensação de que o que estudou no mês passado já sumiu da cabeça.',
        accent: 'primary',
    },
]

export function ForWhom() {
    const sectionRef = useSectionView('for_whom')
    return (
        <section ref={sectionRef} className="relative overflow-hidden py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: easeSpring }}
                    className="mb-10 text-center"
                >
                    <Eyebrow variant="ghost" className="mb-4">
                        Para quem é o RendiPro
                    </Eyebrow>
                    <h2 className="mx-auto max-w-2xl text-display-sm sm:text-display-md font-extrabold tracking-tight text-white">
                        Feito para quem leva{' '}
                        <span className="text-gradient-primary">aprovação</span> a sério.
                    </h2>
                </motion.div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                    {AVATARS.map(({ icon: Icon, label, copy }, i) => (
                        <motion.div
                            key={label}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: easeSpring }}
                            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface-900/50 p-6 backdrop-blur-sm"
                        >
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-500/30 bg-primary-500/10">
                                <Icon size={20} className="text-primary-400" />
                            </div>
                            <div>
                                <p className="text-h4 font-bold text-white">{label}</p>
                                <p className="mt-2 text-body-sm leading-relaxed text-white/60">{copy}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
