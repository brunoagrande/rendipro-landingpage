import { motion } from 'framer-motion'
import { CalendarDays, Check, Sparkles } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { useSectionView } from '../lib/useSectionView'

/**
 * PlanoShowcase — o CORAÇÃO do produto (o planner). Bloco grande e dedicado,
 * com peso visual igual ao da seção de IA, pra o cronograma não ficar tímido.
 * Vem antes do Features e do AiSuite: primeiro o plano, depois a IA em cima.
 * Copy humanizada (sem travessão / cara de IA) — ver memória do projeto.
 */

const easeSpring = [0.16, 1, 0.3, 1]
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

function Bullet({ children }) {
    return (
        <li className="flex items-start gap-2.5">
            <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
            <span>{children}</span>
        </li>
    )
}

export function PlanoShowcase() {
    const sectionRef = useSectionView('plano')

    return (
        <section ref={sectionRef} id="plano" className="relative overflow-hidden py-14 sm:py-24">
            <div className="pointer-events-none absolute top-1/4 right-1/4 -z-10 h-[520px] w-[900px] rounded-full bg-primary-500/[0.06] blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: easeSpring }}
                    className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
                >
                    {/* Copy */}
                    <div>
                        <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-400/40 bg-accent-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-300">
                            <Sparkles size={10} />
                            O coração do RendiPro
                        </div>
                        <Eyebrow variant="primary" className="mb-4">
                            <CalendarDays size={14} />
                            Seu cronograma
                        </Eyebrow>
                        <h2 className="text-display-sm sm:text-display-md font-extrabold leading-tight tracking-tight text-white">
                            Seu edital vira um plano{' '}
                            <span className="text-gradient-primary">feito pra você</span>.
                        </h2>
                        <p className="mt-4 text-body text-white/70">
                            Cola o edital, diz quantas horas você tem no dia e o RendiPro monta a semana inteira. Já tem um cronograma que você curte? Importa em PDF ou CSV e ele organiza tudo pra você. Chega de planilha e de decidir na mão o que estudar hoje.
                        </p>
                        <ul className="mt-5 space-y-2.5 text-body-sm text-white/70">
                            <Bullet><strong className="font-semibold text-white">Feito pra você</strong>, pelas suas horas e pelo seu edital. Ou importa o plano que você já tem.</Bullet>
                            <Bullet><strong className="font-semibold text-white">Perdeu um dia?</strong> O plano se reorganiza sozinho. Você não refaz nada do zero.</Bullet>
                            <Bullet><strong className="font-semibold text-white">Mais de um concurso na mira?</strong> Até 3 planos ao mesmo tempo, troca num clique.</Bullet>
                            <Bullet>Todo dia você abre e já sabe <strong className="font-semibold text-white">o que estudar</strong>. Sem pensar, sem organizar.</Bullet>
                        </ul>
                    </div>

                    {/* Screenshot */}
                    <ProductWindow url="app.rendipro.com.br/cronograma" glow>
                        <img
                            src="/screenshots/cronograma-semana.webp"
                            alt="Cronograma semanal de estudos montado pelo edital, com as matérias distribuídas pelos dias da semana"
                            className="block h-auto w-full"
                            loading="lazy"
                        />
                    </ProductWindow>
                </motion.div>
            </div>
        </section>
    )
}
