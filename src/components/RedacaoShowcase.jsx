import { motion } from 'framer-motion'
import { Check, PenLine, Clock, Target } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { useSectionView } from '../lib/useSectionView'

/**
 * RedacaoShowcase — seção nova (2026-08-15). A redação corrigida é o
 * diferencial pago do catálogo v2 (2/mês no Starter, 8/mês no Pro) e não
 * existia NA LANDING até aqui. O print é a correção REAL da conta demo:
 * nota, radar de competências, percentil e comentário por competência.
 * Copy humanizada: sem travessão, sem cara de IA, sem prometer nota.
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

export function RedacaoShowcase() {
    const sectionRef = useSectionView('redacao')

    return (
        <section ref={sectionRef} id="redacao" className="relative overflow-hidden py-14 sm:py-24">
            <div className="pointer-events-none absolute top-1/4 right-0 -z-10 h-[500px] w-[700px] rounded-full bg-primary-500/[0.06] blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                    {/* Copy */}
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                    >
                        <Eyebrow variant="primary" className="mb-4">
                            <PenLine size={14} />
                            Redação corrigida
                        </Eyebrow>
                        <h2 className="text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                            Escreveu, enviou,{' '}
                            <span className="text-gradient-primary">corrigiu</span>.
                            <br />Nota por competência, na hora.
                        </h2>
                        <p className="mt-5 text-body text-white/70">
                            Redação é onde mais se ganha nota e o treino que mais se adia,
                            porque correção de verdade sempre foi cara e demorada. Aqui você
                            escreve na plataforma e recebe a correção em minutos: nota de 0 a
                            1000, o que pesou em cada competência e por onde melhorar na
                            próxima.
                        </p>
                        <ul className="mt-6 space-y-2.5 text-body-sm text-white/70">
                            <Bullet>
                                <strong className="font-semibold text-white">Nota por competência, como na banca.</strong>{' '}
                                Você vê onde perdeu ponto, não só o número final.
                            </Bullet>
                            <Bullet>
                                <strong className="font-semibold text-white">Comentário do que travou sua nota</strong>{' '}
                                em cada critério, com o próximo foco de treino.
                            </Bullet>
                            <Bullet>
                                <strong className="font-semibold text-white">Sua evolução fica registrada.</strong>{' '}
                                Cada redação nova mostra se você subiu e em quê.
                            </Bullet>
                            <Bullet>
                                Toda semana, sem agendar corretor e sem pagar por correção
                                avulsa. Já está no plano.
                            </Bullet>
                        </ul>

                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-caption text-white/50">
                            <span className="inline-flex items-center gap-1.5">
                                <Clock size={14} className="text-primary-400" />
                                Correção em minutos
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Target size={14} className="text-primary-400" />
                                Rigor calibrado: aqui a régua é dura de propósito
                            </span>
                        </div>
                    </motion.div>

                    {/* Print real */}
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: easeSpring, delay: 0.1 }}
                    >
                        <ProductWindow url="app.rendipro.com.br/redacoes" glow>
                            <img
                                src="/screenshots/redacao-correcao.webp"
                                alt="Correção de redação no RendiPro: nota 760 de 1000, radar das cinco competências, comparação com outras redações do mesmo tema e comentário detalhado da competência 1"
                                className="block h-auto w-full"
                                loading="lazy"
                            />
                        </ProductWindow>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
