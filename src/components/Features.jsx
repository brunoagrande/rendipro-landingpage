import { motion } from 'framer-motion'
import {
    Bot,
    Calendar,
    Check,
    FileText,
    PenTool,
    Sparkles,
    SquareStack,
} from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { useSectionView } from '../lib/useSectionView'

/**
 * Features v4 — grid 2x2 denso, 4 cards (reduzido de 6 em 2026-05-24).
 *
 * Consolidações:
 *  1. Redação (mantida, moat)
 *  2. Cronograma adaptado + até 3 paralelos (funde antigos 2 e 3)
 *  3. Provas oficiais + questões comentadas (funde antigos 4 e 6)
 *  4. Flashcards SM-2 (mantida)
 *
 * Layout: 2 colunas em lg+, 1 coluna em mobile/tablet.
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

export function Features() {
    const sectionRef = useSectionView('features')
    return (
        <section ref={sectionRef} id="features" className="relative overflow-hidden py-20 sm:py-28">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute top-[20%] left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary-500/[0.04] blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── Section header ──────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-12 text-center sm:mb-14"
                >
                    <Eyebrow variant="primary" className="mb-4">
                        <Sparkles size={14} />
                        O que tem dentro
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Tudo o que você precisa,{' '}
                        <span className="text-gradient-primary">num plano só</span>.
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-body text-white/60">
                        Sem app extra, sem planilha paralela, sem conta separada.
                    </p>
                </motion.div>

                {/* ─── Grid 2x2 ──────────────────────────────────────── */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                    {/* ── Card 1 · Redação humana (MOAT) ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-surface-900 via-primary-500/[0.05] to-surface-900 p-6 shadow-glow-primary sm:p-8"
                    >
                        <Eyebrow variant="primary" className="mb-4">
                            <PenTool size={14} />
                            Redação
                        </Eyebrow>
                        <h3 className="text-h3 sm:text-h2 font-bold leading-tight text-white">
                            Sua redação manuscrita corrigida por{' '}
                            <span className="text-gradient-primary">professor humano</span> em 72h.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            Você fotografa pelo celular. Em até 72h volta com nota nas 5 competências do ENEM, marcações direto no texto e radar de evolução.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>Professor com formação em Letras, sem IA fingindo ser humano</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>Marcações em laranja circulando trechos com problema</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>De 2 a 8 redações por mês, conforme o plano</span>
                            </li>
                        </ul>
                        <div className="relative mt-5">
                            <img
                                src="/screenshots/redacao-manuscrita.webp"
                                alt="Foto da redação manuscrita com marcações em laranja circulando trechos com problemas"
                                className="w-full rounded-xl border border-white/10 shadow-elevation-3"
                                loading="lazy"
                            />
                        </div>
                    </motion.article>

                    {/* ── Card 2 · Cronograma + 3 paralelos ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.08, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-accent-500/30 bg-gradient-to-br from-surface-900 via-accent-500/[0.05] to-surface-900 p-6 sm:p-8"
                    >
                        <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-400/40 bg-accent-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-300">
                            <Sparkles size={10} />
                            Exclusivo
                        </div>
                        <Eyebrow variant="accent" className="mb-4">
                            <Calendar size={14} />
                            Cronograma
                        </Eyebrow>
                        <h3 className="text-h3 sm:text-h2 font-bold leading-tight text-white">
                            Cronograma adaptado em 5 minutos. Até{' '}
                            <span className="text-gradient-primary">3 em paralelo</span>.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            Gera do zero pelas horas que você tem por dia, ou importa o plano que você já está seguindo (PDF ou planilha). Estuda pra ENEM e concurso ao mesmo tempo sem misturar matérias.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Geração automática</strong> pelas suas horas disponíveis por dia</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Importação</strong> do plano que você já tem em PDF ou planilha</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Até 3 cronogramas</strong> paralelos, com alternância em 1 clique</span>
                            </li>
                        </ul>
                        <div className="mt-5">
                            <ProductWindow url="app.rendipro.com.br/planos-estudo">
                                <img
                                    src="/screenshots/planos-estudo.webp"
                                    alt="Tela de Planos de Estudo mostrando 3 planos paralelos ativos"
                                    className="block h-auto w-full"
                                    loading="lazy"
                                />
                            </ProductWindow>
                        </div>
                    </motion.article>

                    {/* ── Card 3 · Provas + Questões ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-6 backdrop-blur-sm sm:p-8"
                    >
                        <Eyebrow variant="primary" className="mb-4">
                            <FileText size={14} />
                            Provas e questões
                        </Eyebrow>
                        <h3 className="text-h3 sm:text-h2 font-bold leading-tight text-white">
                            Provas oficiais cronometradas e{' '}
                            <span className="text-gradient-primary">6.000 questões</span> com comentário por alternativa.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            Abre a prova real (ENEM 2025, por exemplo), o cronômetro inicia em 5h30, e quando você marca a questão 11 no cartão, o PDF rola sozinho até a página dela. Treino igual ao dia D.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">10 provas oficiais</strong> com PDF sincronizado e cronômetro real</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">6.000 questões</strong> com explicação detalhada por alternativa, não só pela correta</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>Tira-dúvidas com IA em qualquer questão, sem sair do app</span>
                            </li>
                        </ul>
                        <div className="mt-5">
                            <ProductWindow url="app.rendipro.com.br/questoes">
                                <img
                                    src="/screenshots/questao-comentada.webp"
                                    alt="Questão de Português com comentário explicando por que B é correta e A, C, D, E estão erradas"
                                    className="block h-auto w-full"
                                    loading="lazy"
                                />
                            </ProductWindow>
                        </div>
                    </motion.article>

                    {/* ── Card 4 · Flashcards SM-2 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.08, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-6 backdrop-blur-sm sm:p-8"
                    >
                        <Eyebrow variant="primary" className="mb-4">
                            <SquareStack size={14} />
                            Flashcards
                        </Eyebrow>
                        <h3 className="text-h3 sm:text-h2 font-bold leading-tight text-white">
                            8.000 flashcards prontos com o{' '}
                            <span className="text-gradient-primary">algoritmo do Anki</span>.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            O algoritmo SM-2 decide quando você deve revisar cada card pra fixar na memória de longo prazo. 69 baralhos cobrindo todas as matérias do ENEM e ensino médio. Você abre o app e começa, sem montar deck antes.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>69 baralhos prontos, sem 40h de setup do Anki</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>SM-2 cientificamente validado, mesmo algoritmo do Anki</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>Atalhos 1/2/3/4 no teclado pra revisar rápido</span>
                            </li>
                        </ul>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <img
                                src="/screenshots/flashcard-pergunta.webp"
                                alt="Flashcard mostrando pergunta sobre Física com botão Revelar Resposta"
                                className="block h-auto w-full rounded-xl border border-white/10 shadow-elevation-3"
                                loading="lazy"
                            />
                            <img
                                src="/screenshots/flashcard-resposta.webp"
                                alt="Flashcard revelado com 4 botões SM-2: Não lembrei, Difícil, Bom, Fácil"
                                className="block h-auto w-full rounded-xl border border-white/10 shadow-elevation-3"
                                loading="lazy"
                            />
                        </div>
                    </motion.article>
                </div>

                {/* ─── IA integrada ────────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2, ease: easeSpring }}
                    className="mx-auto mt-8 max-w-6xl rounded-2xl border border-accent-500/20 bg-surface-900/40 p-6 backdrop-blur-sm sm:p-7"
                >
                    <p className="flex items-center justify-center gap-2 text-micro font-semibold uppercase tracking-widest text-accent-300">
                        <Bot size={14} />
                        Inteligência artificial integrada em todos os planos
                    </p>
                    <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                        {[
                            'Gere flashcards personalizados com IA em segundos',
                            'Cronograma reajustado conforme seu ritmo muda',
                            'Tira-dúvidas com IA em qualquer questão, sem sair do app',
                        ].map((f) => (
                            <li key={f} className="flex items-start gap-2 text-body-sm text-white/70">
                                <Check size={15} className="mt-0.5 shrink-0 text-accent-300" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-center text-caption text-white/40">
                        Quantidade de usos por mês varia conforme o plano. Confere tudo em Preços.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
