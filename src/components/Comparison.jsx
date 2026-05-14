import { motion } from 'framer-motion'
import { Check, Scale, X } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'

/**
 * Comparison — RendiPro vs stack comportamental (planilha + Anki + plataforma de questões + plataforma de redação).
 *
 * Padrão Notion/Asana "Switch from {tool}" — reposiciona o preço-cabeça do
 * prospect. Antes da Comparison: ele compara com Anki (R$ 0). Depois: compara
 * com R$ ~100–200/mês de stack agrupada. Diferença de 5× no preço-cabeça.
 *
 * ESTRATÉGIA: compara contra comportamentos (não marcas específicas).
 * - Incontestável: ninguém vai defender "4 apps separados é melhor"
 * - Sem risco de dado desatualizado de concorrente
 * - Não entrega o visitante em dúvida para marcas com mais prova social
 */

const easeSpring = [0.16, 1, 0.3, 1]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}

const STACK_ITEMS = [
    {
        tool: 'Planilha ou Notion',
        purpose: 'Cronograma de estudos',
        cost: 'R$ 0',
        pain: 'Horas montando · desatualiza toda semana',
    },
    {
        tool: 'Anki',
        purpose: 'Flashcards com SM-2',
        cost: 'R$ 0',
        pain: 'Sem decks prontos · ~40h de setup antes de estudar',
    },
    {
        tool: 'Plataforma de questões',
        purpose: 'Banco de questões comentadas',
        cost: 'R$ 25–80/mês',
        pain: 'Conta separada · sem cronograma · sem redação',
    },
    {
        tool: 'Plataforma de redação',
        purpose: 'Correção por professor humano',
        cost: 'R$ 30–80/mês',
        pain: 'Conta separada · só redação · sem questões',
    },
]

const RENDIPRO_INCLUDES = [
    'Cronograma adaptado ao seu plano (auto, manual ou import PDF/CSV)',
    '+8.000 flashcards SM-2 prontos em 69 baralhos',
    '+6.000 questões comentadas por alternativa',
    'Correção de redação manuscrita por professor humano com nota nas 5 competências do ENEM',
    'Provas oficiais com PDF sincronizado e cronômetro real',
    'Gamificação completa: streak, XP, ligas e missões',
    'Até 3 cronogramas paralelos (exclusivo)',
]

export function Comparison() {
    return (
        <section
            id="comparison"
            className="relative overflow-hidden py-24 sm:py-32"
        >
            {/* Background — sutil para não competir com Features */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-800)_0%,_transparent_60%)] opacity-40" />

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
                    <Eyebrow variant="ghost" className="mb-4">
                        <Scale size={14} />
                        Comparativo honesto
                    </Eyebrow>
                    <h2 className="mx-auto max-w-4xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Em vez de juntar{' '}
                        <span className="text-gradient-primary">4 apps separados</span>,
                        <br />
                        usa 1 que faz tudo.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
                        Você provavelmente já paga por algumas dessas coisas em apps diferentes — somando contas, senhas, boletos e tempo. RendiPro reúne tudo num plano só, geralmente por menos de 1/3 do total.
                    </p>
                </motion.div>

                {/* ─── 2-column comparison ─────────────────────────────── */}
                <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* LEFT · Stack atual */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, ease: easeSpring }}
                        className="flex flex-col rounded-3xl border border-white/10 bg-surface-900/40 p-8 sm:p-10"
                    >
                        <div className="mb-6">
                            <p className="text-micro font-semibold uppercase tracking-widest text-white/40">
                                Sua stack atual
                            </p>
                            <h3 className="mt-2 text-h2 font-bold text-white/80">
                                4 apps, 4 mensalidades
                            </h3>
                        </div>

                        <ul className="flex-1 space-y-5">
                            {STACK_ITEMS.map((item) => (
                                <li key={item.tool} className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                                        <X size={14} className="text-white/40" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-white/80">
                                            {item.tool}
                                        </p>
                                        <p className="text-body-sm text-white/55">
                                            {item.purpose} · <span className="text-white/70">{item.cost}</span>
                                        </p>
                                        <p className="mt-0.5 text-caption text-white/40">
                                            {item.pain}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 border-t border-white/5 pt-6">
                            <p className="text-body-sm text-white/50">Custo somado</p>
                            <p className="mt-1 text-h2 font-bold text-white/70">
                                ~R$ 100–160<span className="text-body-sm font-medium text-white/40">/mês</span>
                            </p>
                            <p className="mt-2 text-caption text-white/40">
                                4 contas · 4 senhas · 4 boletos · 4 logins
                            </p>
                        </div>
                    </motion.div>

                    {/* RIGHT · RendiPro */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: easeSpring }}
                        className="relative flex flex-col rounded-3xl border border-primary-500/40 bg-gradient-to-br from-surface-900 via-primary-500/[0.05] to-surface-900 p-8 shadow-glow-primary sm:p-10"
                    >
                        <div className="mb-6">
                            <p className="text-micro font-semibold uppercase tracking-widest text-primary-400">
                                Com o RendiPro
                            </p>
                            <h3 className="mt-2 text-h2 font-bold text-white">
                                1 plano, tudo dentro
                            </h3>
                        </div>

                        <ul className="flex-1 space-y-3">
                            {RENDIPRO_INCLUDES.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary-500/30 bg-primary-500/15">
                                        <Check size={14} className="text-primary-300" />
                                    </div>
                                    <p className="text-body-sm text-white/80">{item}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 border-t border-primary-500/20 pt-6">
                            <p className="text-body-sm text-white/60">
                                Plano comparável <span className="text-white/40">(Pro Anual)</span>
                            </p>
                            <p className="mt-1 text-h2 font-bold text-white">
                                R$ 59,90<span className="text-body-sm font-medium text-white/60">/mês</span>
                            </p>
                            <p className="mt-2 text-caption text-primary-300">
                                4 redações/mês incluídas · 1 login · 1 cobrança
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ─── Footnote sobre verificação de preços ───────────── */}
                <p className="mx-auto mt-10 max-w-3xl text-center text-caption text-white/35">
                    Faixas de preço baseadas em pesquisa de mercado de plataformas de questões e correção de redação disponíveis no Brasil (maio/2026). Valores podem variar conforme plano e promoção.
                </p>
            </div>
        </section>
    )
}
