import { motion } from 'framer-motion'
import { StatBlock } from './ui/StatBlock'

/**
 * TrustBar v2 — prova social NUMÉRICA (substitui a lista textual de exames).
 *
 * Os 4 números são fonte de verdade do produto:
 *  - 6.000 questões comentadas
 *  - 8.000 flashcards em 69 baralhos
 *  - 100 temas de redação
 *  - 10 provas oficiais
 *
 * Counter anima de 0 ao valor quando entra no viewport (efeito impactante).
 * Padrão: Brilliant.org ("60+ courses, 1000+ lessons, millions learners") +
 * Stripe ("100M+ accounts created").
 *
 * Posição na pipeline: imediatamente após Hero, antes do LogoMarquee.
 */

const easeSpring = [0.16, 1, 0.3, 1]

export function TrustBar() {
    return (
        <section
            aria-label="Catálogo de conteúdo do RendiPro"
            className="border-y border-white/5 bg-surface-950/50 py-12 backdrop-blur-sm sm:py-16"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
                >
                    <StatBlock value={6000} label="questões comentadas" />
                    <StatBlock
                        value={8000}
                        label="flashcards prontos"
                        sublabel="em 69 baralhos"
                    />
                    <StatBlock value={100} label="temas de redação" />
                    <StatBlock
                        value={10}
                        label="provas oficiais"
                        sublabel="com gabarito comentado"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 text-center text-body-sm font-semibold text-primary-400"
                >
                    Catálogo cresce toda semana
                </motion.p>
            </div>
        </section>
    )
}
