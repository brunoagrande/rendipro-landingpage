import { motion } from 'framer-motion'
import {
    Bot,
    Calendar,
    Check,
    FileText,
    Layers,
    PenTool,
    Sparkles,
    SquareStack,
    Timer,
} from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { Kbd } from './ui/KbdKeys'

/**
 * Features — Bento Grid asymmetric com os 6 diferenciais reais.
 *
 * Ordem moat-first (Agente 6 v2 + Agente 4 v3):
 *  1. Redação humana (col-span-7, GLOW, MOAT)
 *  2. Multi-plano até 3 (col-span-5, EXCLUSIVO badge)
 *  3. Cronograma adaptado (col-span-5)
 *  4. Provas oficiais sincronizadas (col-span-7)
 *  5. Flashcards SM-2 (col-span-6)
 *  6. Questões comentadas (col-span-6)
 *
 * Cada card tem:
 *  - eyebrow + headline + sub + bullets
 *  - asset visual (screenshot) com treatment adequado por card
 *  - fade-up sequencial conforme entra viewport (whileInView)
 *
 * Mobile: tudo empilha vertical (col-span-1).
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

export function Features() {
    return (
        <section id="features" className="relative overflow-hidden py-24 sm:py-32">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute top-[20%] left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-primary-500/[0.04] blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── Section header ──────────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-16 text-center sm:mb-20"
                >
                    <Eyebrow variant="primary" className="mb-4">
                        <Sparkles size={14} />
                        O que tem dentro
                    </Eyebrow>
                    <h2 className="mx-auto max-w-4xl text-display-md sm:text-display-lg lg:text-display-xl font-extrabold tracking-tight text-white">
                        Seis ferramentas integradas.{' '}
                        <span className="text-gradient-primary">Você abre o app e a próxima coisa que precisa fazer já está lá.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Num só plano. Sem app extra, sem planilha paralela, sem conta separada.
                    </p>
                </motion.div>

                {/* ─── Bento Grid ──────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                    {/* ── Card 1 · Redação humana (MOAT) ─ col-span-7 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary-500/30 bg-gradient-to-br from-surface-900 via-primary-500/[0.05] to-surface-900 p-8 shadow-glow-primary lg:col-span-7 sm:p-10"
                    >
                        <div className="relative z-10">
                            <Eyebrow variant="primary" className="mb-5">
                                <PenTool size={14} />
                                Redação
                            </Eyebrow>
                            <h3 className="text-h2 sm:text-display-sm font-bold leading-tight text-white">
                                Sua redação <span className="text-gradient-primary">manuscrita</span>, corrigida por professor humano.
                            </h3>
                            <p className="mt-4 max-w-xl text-body text-white/70">
                                Você fotografa pelo celular. Em até 72h volta com nota nas 5 competências do ENEM, marcações direto no seu texto e radar mostrando onde subir.
                            </p>
                            <ul className="mt-6 space-y-2.5">
                                {[
                                    'Correção por professor humano com formação em Letras — não é IA, não é bot',
                                    'Marcações em laranja circulando trecho por trecho do seu texto',
                                    'Nota nas 5 competências (C1 a C5) com radar de evolução',
                                    'De 2 a 8 redações por mês conforme o plano',
                                ].map((b) => (
                                    <li
                                        key={b}
                                        className="flex items-start gap-2.5 text-body-sm text-white/70"
                                    >
                                        <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-caption italic text-white/45">
                                Plataformas especializadas só em redação cobram entre R$ 30 e R$ 80/mês. Aqui faz parte do pacote.
                            </p>
                        </div>

                        {/* Asset: redação manuscrita + radar overlay */}
                        <div className="relative mt-8">
                            <img
                                src="/screenshots/redacao-manuscrita.png"
                                alt="Foto da redação manuscrita corrigida por professor humano, com marcações em laranja circulando trechos com problemas"
                                className="w-full rounded-xl border border-white/10 shadow-elevation-4"
                                loading="lazy"
                            />
                            <img
                                src="/screenshots/redacao-radar.png"
                                alt="Radar de evolução nas 5 competências do ENEM"
                                className="absolute -bottom-6 -right-4 hidden w-2/5 rounded-lg border border-white/10 shadow-elevation-5 sm:block"
                                loading="lazy"
                            />
                        </div>
                    </motion.article>

                    {/* ── Card 2 · Multi-plano (EXCLUSIVO) ─ col-span-5 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.08, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-accent-500/30 bg-gradient-to-br from-surface-900 via-accent-500/[0.05] to-surface-900 p-8 lg:col-span-5 sm:p-10"
                    >
                        <div className="relative z-10">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-500/15 px-2.5 py-1 text-micro font-bold uppercase tracking-wider text-accent-300">
                                <Sparkles size={11} />
                                Exclusivo RendiPro
                            </div>
                            <Eyebrow variant="accent" className="mb-4">
                                <Layers size={14} />
                                Multi-plano
                            </Eyebrow>
                            <h3 className="text-h2 font-bold leading-tight text-white">
                                Mantenha até{' '}
                                <span className="text-gradient-primary">3 cronogramas</span> paralelos.
                            </h3>
                            <p className="mt-4 text-body text-white/70">
                                ENEM e vestibular ao mesmo tempo? Cursinho e concurso em paralelo? Cada objetivo no seu próprio plano — sem misturar, sem perder o foco. Alternância em 1 clique.
                            </p>
                        </div>
                        <div className="mt-6 flex-1">
                            <ProductWindow url="app.rendipro.com.br/planos-estudo" className="h-full">
                                <img
                                    src="/screenshots/planos-estudo.png"
                                    alt="Tela de Planos de Estudo do RendiPro mostrando 3 planos paralelos ativos"
                                    className="block h-auto w-full"
                                    loading="lazy"
                                />
                            </ProductWindow>
                        </div>
                    </motion.article>

                    {/* ── Card 3 · Cronograma ─ col-span-5 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-8 backdrop-blur-sm lg:col-span-5 sm:p-10"
                    >
                        <div className="relative z-10">
                            <Eyebrow variant="primary" className="mb-5">
                                <Calendar size={14} />
                                Cronograma
                            </Eyebrow>
                            <h3 className="text-h2 font-bold leading-tight text-white">
                                Seu cronograma <span className="text-gradient-primary">do jeito que combina</span> com você.
                            </h3>
                            <p className="mt-4 text-body text-white/70">
                                Três jeitos de começar — escolhe o que cabe na sua rotina:
                            </p>
                            <ul className="mt-5 space-y-2.5">
                                <li className="flex items-start gap-2.5 text-body-sm text-white/70">
                                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                                    <span><strong className="font-semibold text-white">Geração automática</strong> baseada nas horas que você tem por dia (segunda 8h, terça 4h, sábado livre — configura por dia da semana)</span>
                                </li>
                                <li className="flex items-start gap-2.5 text-body-sm text-white/70">
                                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                                    <span><strong className="font-semibold text-white">Importação</strong> do plano que você já tem (PDF ou planilha)</span>
                                </li>
                                <li className="flex items-start gap-2.5 text-body-sm text-white/70">
                                    <Check size={16} className="mt-0.5 shrink-0 text-primary-400" />
                                    <span><strong className="font-semibold text-white">Cadastro manual</strong> do zero, do seu jeito</span>
                                </li>
                            </ul>
                            <p className="mt-5 text-caption text-white/55">
                                Em qualquer caminho, você escolhe entre formato <strong className="font-semibold text-white/75">fixo</strong> (matérias por dia), <strong className="font-semibold text-white/75">ciclo</strong> (rotação livre) ou <strong className="font-semibold text-white/75">híbrido</strong>.
                            </p>
                        </div>
                        <div className="mt-6 flex-1">
                            <ProductWindow url="app.rendipro.com.br/cronograma" className="h-full">
                                <img
                                    src="/screenshots/cronograma-dia.png"
                                    alt="Visão diária do cronograma adaptado: sessões de revisão, próxima sessão recomendada e resumo do dia"
                                    className="block h-auto w-full"
                                    loading="lazy"
                                />
                            </ProductWindow>
                        </div>
                    </motion.article>

                    {/* ── Card 4 · Provas oficiais sincronizadas ─ col-span-7 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.08, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-8 backdrop-blur-sm lg:col-span-7 sm:p-10"
                    >
                        <div className="relative z-10">
                            <Eyebrow variant="primary" className="mb-5">
                                <Timer size={14} />
                                Provas oficiais
                            </Eyebrow>
                            <h3 className="text-h2 font-bold leading-tight text-white">
                                Prova oficial em PDF,{' '}
                                <span className="text-gradient-primary">cronômetro do dia da prova</span>{' '}
                                e cartão sincronizado.
                            </h3>
                            <p className="mt-4 max-w-2xl text-body text-white/70">
                                Você abre uma prova real (ENEM 2025, por exemplo), o cronômetro inicia em 5h30, e ao marcar a questão 11 no cartão, o PDF rola sozinho até a página onde ela está. O mais próximo possível do dia da prova.
                            </p>
                        </div>
                        <div className="mt-6">
                            <ProductWindow url="app.rendipro.com.br/provas">
                                <img
                                    src="/screenshots/prova-cronometro.png"
                                    alt="Prova oficial do ENEM 2025 com cronômetro de 3h56min restantes e cartão de respostas sincronizado"
                                    className="block h-auto w-full"
                                    loading="lazy"
                                />
                            </ProductWindow>
                        </div>
                    </motion.article>

                    {/* ── Card 5 · Flashcards SM-2 ─ col-span-6 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-8 backdrop-blur-sm lg:col-span-6 sm:p-10"
                    >
                        <div className="relative z-10">
                            <Eyebrow variant="primary" className="mb-5">
                                <SquareStack size={14} />
                                Flashcards
                            </Eyebrow>
                            <h3 className="text-h2 font-bold leading-tight text-white">
                                +8.000 flashcards prontos.{' '}
                                <span className="text-gradient-primary">Algoritmo do Anki</span>.
                            </h3>
                            <p className="mt-4 text-body text-white/70">
                                Algoritmo SM-2 cientificamente validado decide quando você deve revisar cada card pra fixar na memória de longo prazo — em vez de revisar tudo toda noite antes de esquecer. 69 baralhos cobrindo todas as matérias do ENEM e ensino médio.
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-2 text-caption text-white/60">
                                <span>Atalhos:</span>
                                <Kbd>1</Kbd> <span className="text-white/40">Não</span>
                                <Kbd>2</Kbd> <span className="text-white/40">Difícil</span>
                                <Kbd>3</Kbd> <span className="text-white/40">Bom</span>
                                <Kbd>4</Kbd> <span className="text-white/40">Fácil</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                            <img
                                src="/screenshots/flashcard-pergunta.png"
                                alt="Flashcard mostrando pergunta sobre Física com botão Revelar Resposta"
                                className="block h-auto w-full rounded-xl border border-white/10 shadow-elevation-3"
                                loading="lazy"
                            />
                            <img
                                src="/screenshots/flashcard-resposta.png"
                                alt="Flashcard revelado mostrando resposta E=mc² com 4 botões SM-2: Não lembrei, Difícil, Bom, Fácil"
                                className="block h-auto w-full rounded-xl border border-white/10 shadow-elevation-3"
                                loading="lazy"
                            />
                        </div>
                    </motion.article>

                    {/* ── Card 6 · Questões comentadas ─ col-span-6 ─ */}
                    <motion.article
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.08, ease: easeSpring }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-900/60 p-8 backdrop-blur-sm lg:col-span-6 sm:p-10"
                    >
                        <div className="relative z-10">
                            <Eyebrow variant="primary" className="mb-5">
                                <FileText size={14} />
                                Questões
                            </Eyebrow>
                            <h3 className="text-h2 font-bold leading-tight text-white">
                                +6.000 questões com comentário{' '}
                                <span className="text-gradient-primary">por alternativa</span>.
                            </h3>
                            <p className="mt-4 text-body text-white/70">
                                Não é "B porque sim". Cada questão explica por que a alternativa correta é correta E por que as 4 erradas estão erradas, uma por uma. Tira-dúvida com IA disponível em qualquer questão.
                            </p>
                        </div>
                        <div className="mt-6 flex-1">
                            <ProductWindow url="app.rendipro.com.br/questoes" className="h-full">
                                <img
                                    src="/screenshots/questao-comentada.png"
                                    alt="Questão de Português com alternativas e comentário detalhado explicando por que B é correta e A, C, D, E estão erradas"
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
                    className="mx-auto mt-10 max-w-4xl rounded-2xl border border-accent-500/20 bg-surface-900/40 p-6 backdrop-blur-sm sm:p-8"
                >
                    <p className="flex items-center justify-center gap-2 text-micro font-semibold uppercase tracking-widest text-accent-300">
                        <Bot size={14} />
                        Inteligência artificial integrada em todos os planos
                    </p>
                    <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                        {[
                            'Gere flashcards personalizados com IA — instantâneo',
                            'Cronograma reajustado com IA conforme seu ritmo muda',
                            'Tira-dúvidas com IA em qualquer questão, sem sair do app',
                        ].map((f) => (
                            <li key={f} className="flex items-start gap-2 text-body-sm text-white/70">
                                <Check size={16} className="mt-0.5 shrink-0 text-accent-300" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-center text-caption text-white/40">
                        Quantidade de usos por mês varia conforme o plano — detalhes em Preços.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
