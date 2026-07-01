import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { useSectionView } from '../lib/useSectionView'

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
    const sectionRef = useSectionView('founder_story')
    return (
        <section
            ref={sectionRef}
            id="founder-story"
            className="relative overflow-hidden py-14 sm:py-24"
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
                        Bruno é desenvolvedor. Jessica é Promotora de Justiça. O RendiPro nasceu do meio dessa história.
                    </p>
                </motion.div>

                {/* ─── 2 founder cards ─────────────────────────────────── */}
                <div className="mx-auto max-w-2xl">
                    {/* ── Jessica (co-criadora / inspiração) — prova social principal ── */}
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
                            "Quatro anos de preparação. Provas diferentes, editais diferentes, cada uma com seu cronograma, suas matérias, suas prioridades. Além de estudar, eu passava tempo demais tentando controlar o andamento de cada plano, reorganizando o que tinha ficado para trás. Reclamava disso todo dia para o Bruno. Quando ele teve a ideia do RendiPro, foi inevitável pensar em quanto tempo eu teria economizado. Para quem busca aprovação em provas difíceis, organização não é um detalhe. É o que define o resultado."
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
