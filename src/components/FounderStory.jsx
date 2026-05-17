import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'

/**
 * FounderStory — substitui o antigo Testimonials.
 *
 * Dois cards side-by-side: fundador (Bruno) + co-criadora/inspiração (Jessica).
 * Padrão: Joel Jota / Mairo Vergara — founder denso ANTES do Pricing constrói
 * o último gatilho de confiança (Cialdini autoridade + simpatia).
 *
 * Diferencial defensável: Jessica é Promotora de Justiça MP-RS (cargo público
 * verificável em Diário Oficial), o que dá ao produto uma autoridade transferida
 * que nenhum concorrente direto tem.
 *
 * Posicionamento da Jessica como "co-criadora · inspiração" (NÃO co-fundadora
 * legal), em respeito a possíveis restrições éticas/legais do cargo público.
 *
 * Pendências do Bruno:
 *   1. Foto do Bruno → substituir o placeholder "B" por <img src="/founder-bruno.jpg" />
 *   2. Foto da Jessica → substituir o placeholder "J" por <img src="/founder-jessica.jpg" />
 *   3. Link público Diário Oficial da nomeação da Jessica → adicionar como
 *      <a> abaixo do título, ver bloco comentado.
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

export function FounderStory() {
    return (
        <section
            id="founder-story"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* Background — glow subtle behind */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-700)_0%,_transparent_60%)] opacity-[0.07]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── Section header ──────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-16 text-center"
                >
                    <Eyebrow variant="ghost" className="mb-4">
                        A história por trás do RendiPro
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Feito por quem <span className="text-gradient-primary">viveu</span> o desafio.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Não é startup de gente que nunca estudou pra prova grande. É produto construído olhando alguém estudar pra valer — e construído por quem entende como software se faz.
                    </p>
                </motion.div>

                {/* ─── 2 founder cards ─────────────────────────────────── */}
                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* ── Card 1 · Bruno (fundador) ── */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="relative flex flex-col rounded-3xl border border-white/10 bg-surface-900/60 p-8 backdrop-blur-sm sm:p-10"
                    >
                        <Quote
                            size={40}
                            className="absolute top-8 right-8 text-primary-500/15"
                            aria-hidden="true"
                        />
                        <div className="text-micro font-semibold uppercase tracking-widest text-primary-400">
                            Fundador
                        </div>
                        <blockquote className="mt-4 text-body-lg italic leading-relaxed text-white/85">
                            "Acompanhei a Jessica estudando pra provas difíceis por anos. Vi as horas perdidas, as revisões esquecidas, o cronograma refeito do zero toda semana. Trabalho com software há 20 anos, sabia que dava pra resolver. Construí o RendiPro pra que ninguém precisasse perder dois, três anos de estudo por falta de método — e não por falta de inteligência."
                        </blockquote>

                        <div className="mt-8 flex items-center gap-4">
                            <img src="/founder-bruno.webp" alt="Bruno Grande, fundador do RendiPro"
                                 className="h-14 w-14 shrink-0 rounded-full object-cover" />
                            <div className="min-w-0">
                                <p className="font-bold text-white">Bruno Grande</p>
                                <p className="text-body-sm text-white/50">
                                    Fundador · Desenvolvedor de software · 20 anos construindo produtos digitais
                                </p>
                            </div>
                        </div>
                    </motion.article>

                    {/* ── Card 2 · Jessica (co-criadora / inspiração) ── */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: easeSpring }}
                        className="relative flex flex-col rounded-3xl border border-accent-500/30 bg-gradient-to-br from-surface-900 via-accent-500/[0.04] to-surface-900 p-8 backdrop-blur-sm sm:p-10"
                    >
                        <Quote
                            size={40}
                            className="absolute top-8 right-8 text-accent-500/20"
                            aria-hidden="true"
                        />
                        <div className="text-micro font-semibold uppercase tracking-widest text-accent-300">
                            Co-criadora · A inspiração
                        </div>
                        <blockquote className="mt-4 text-body-lg italic leading-relaxed text-white/85">
                            "Estudei por 4 anos sem método. Sabia o conteúdo, mas não sabia organizar o que estudar nem quando revisar. Quando o Bruno me mostrou o RendiPro, reconheci imediatamente: é exatamente o que eu precisei desde o início. O cronograma, os flashcards, a correção de redação — tudo que eu montava na mão de forma imperfeita, ali estava pronto."
                        </blockquote>

                        <div className="mt-8 flex items-center gap-4">
                            <img src="/founder-jessica.webp" alt="Jessica Marques, Promotora de Justiça MP-RS"
                                 className="h-14 w-14 shrink-0 rounded-full object-cover" />
                            <div className="min-w-0">
                                <p className="font-bold text-white">Jessica Marques</p>
                                <p className="text-body-sm text-white/50">
                                    Promotora de Justiça · aprovada após 4 anos de preparação
                                </p>
                                <a href="https://www.mprs.mp.br/media/areas/concursos/arquivos/xlix/ed_051_2023_resultado_definitivo_concurso.pdf" target="_blank" rel="noopener noreferrer"
                                   className="mt-1 inline-block text-caption text-accent-300 hover:underline">
                                    Verificar nomeação no MP-RS →
                                </a>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </div>
        </section>
    )
}
