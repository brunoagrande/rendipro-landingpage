import { motion } from 'framer-motion'
import {
    Bot,
    Calendar,
    Check,
    Repeat,
    Sparkles,
    SquareStack,
} from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { useSectionView } from '../lib/useSectionView'

/**
 * Features v5 — 3 cards alinhados ao novo posicionamento (pivô 2026-06):
 *  1. Cronograma — montado em minutos (auto, por edital ou import CSV/PDF), até 3 paralelos
 *  2. Flashcards — base da plataforma (criar, importar do Anki ou gerar por IA)
 *  3. Revisão no momento certo — repetição espaçada SM-2 (o que revisar e quando)
 *
 * Removidos no pivô: card de Redação (correção por humano vira produto à parte)
 * e card de Provas/Questões (banco de questões saiu do produto).
 *
 * Layout: 3 colunas em lg+, 1 coluna em mobile/tablet.
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

export function Features() {
    const sectionRef = useSectionView('features')
    return (
        <section ref={sectionRef} id="features" className="relative overflow-hidden py-12 sm:py-20">
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
                        Como funciona
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Tudo o que você precisa,{' '}
                        <span className="text-gradient-primary">num plano só</span>.
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-body text-white/60">
                        Uma plataforma. Sem ficar trocando de aba.
                    </p>
                </motion.div>

                {/* ─── Grid 3 pilares ────────────────────────────────── */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
                    {/* ── Pilar 1 · Cronograma (protagonista) ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-surface-900 via-primary-500/[0.05] to-surface-900 p-6 shadow-glow-primary sm:p-8"
                    >
                        <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent-400/40 bg-accent-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-300">
                            <Sparkles size={10} />
                            Exclusivo
                        </div>
                        <Eyebrow variant="primary" className="mb-4">
                            <Calendar size={14} />
                            Cronograma
                        </Eyebrow>
                        <h3 className="text-h3 sm:text-h2 font-bold leading-tight text-white">
                            Seu edital virou um plano.{' '}
                            <span className="text-gradient-primary">Pronto em minutos</span>, ajustado automaticamente.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            Cola o edital, define quantas horas tem por dia e o RendiPro distribui tudo. Perdeu um dia? O plano se ajusta sozinho. Não precisa refazer do zero toda vez que a semana desanda.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Automático</strong> pelas suas horas disponíveis, ou montado pelo edital</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Importa</strong> o plano que você já tem em CSV ou PDF</span>
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

                    {/* ── Pilar 2 · Flashcards (base da plataforma) ─ */}
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
                            Nunca mais esqueça{' '}
                            <span className="text-gradient-primary">o que estudou</span>.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            8.000 flashcards prontos organizados por matéria — abra o RendiPro e já começa. Crie os seus, importe seus decks do Anki ou gere com IA. A repetição espaçada garante que você fixe de verdade, não só memorize para a prova de amanhã.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">8.000 prontos</strong> em 69 baralhos, sem 40h de setup do Anki</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Importe seus decks do Anki</strong> e continue de onde parou</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Gere por IA</strong> em segundos a partir de qualquer matéria</span>
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

                    {/* ── Pilar 3 · Revisão no momento certo ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.16, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-6 backdrop-blur-sm sm:p-8"
                    >
                        <Eyebrow variant="primary" className="mb-4">
                            <Repeat size={14} />
                            Revisão
                        </Eyebrow>
                        <h3 className="text-h3 sm:text-h2 font-bold leading-tight text-white">
                            O RendiPro te diz{' '}
                            <span className="text-gradient-primary">o que estudar hoje</span>. Sem decidir, sem improvisar.
                        </h3>
                        <p className="mt-3 text-body-sm text-white/70">
                            Abra o RendiPro e já tem uma lista do que revisar hoje. O sistema decide por você — baseado no SM-2, o mesmo algoritmo do Anki. Não precisa lembrar quando estudou o quê. A plataforma lembra. Você só estuda.
                        </p>
                        <ul className="mt-4 space-y-2 text-body-sm text-white/70">
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Repetição espaçada SM-2</strong>, cientificamente validada</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span><strong className="font-semibold text-white">Te avisa o que revisar</strong> a cada dia, sem você planejar</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-primary-400" />
                                <span>Atalhos 1/2/3/4 no teclado pra revisar rápido</span>
                            </li>
                        </ul>
                        <div className="mt-5">
                            <ProductWindow url="app.rendipro.com.br/revisar">
                                <img
                                    src="/screenshots/dashboard-final.webp"
                                    alt="Dashboard do RendiPro mostrando o que revisar hoje com a repetição espaçada"
                                    className="block h-auto w-full"
                                    loading="lazy"
                                />
                            </ProductWindow>
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
                            'Tire dúvidas com a IA enquanto estuda, sem sair da plataforma',
                        ].map((f) => (
                            <li key={f} className="flex items-start gap-2 text-body-sm text-white/70">
                                <Check size={15} className="mt-0.5 shrink-0 text-accent-300" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-center text-caption text-white/40">
                        O limite de usos de IA por mês varia com o plano — veja em Preços abaixo.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
