import { motion } from 'framer-motion'
import { Sparkles, Check, FileText, Camera, Target } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { useSectionView } from '../lib/useSectionView'

/**
 * AiSuite — o diferencial do pivô: a IA que transforma o MATERIAL DO ALUNO em
 * questões (Treino) e flashcards (Snap). Vem logo após o Hero pra liderar com o
 * que ninguém mais faz. Dois blocos split (copy + screenshot), alternando lado.
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

export function AiSuite() {
    const sectionRef = useSectionView('ai-suite')

    return (
        <section ref={sectionRef} id="ia" className="relative overflow-hidden py-14 sm:py-24">
            <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary-500/[0.05] blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-14 text-center"
                >
                    <Eyebrow variant="primary" className="mb-4">
                        <Sparkles size={14} />
                        O que ninguém mais faz
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        E em cima do seu plano, uma IA que estuda com o{' '}
                        <span className="text-gradient-primary">seu material</span>.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-body text-white/60">
                        O cronograma organiza a sua semana. Aí entra a parte que ninguém mais faz: sua apostila, seu resumo, a foto do quadro viram questão e flashcard. Você pratica o que de verdade caiu na sua aula.
                    </p>
                </motion.div>

                {/* ── Bloco 1 · Treino (copy esq · print dir) ── */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: easeSpring }}
                    className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
                >
                    <div>
                        <Eyebrow variant="primary" className="mb-4">
                            <FileText size={14} />
                            Treino
                        </Eyebrow>
                        <h3 className="text-h2 sm:text-display-sm font-bold leading-tight text-white">
                            Manda o seu PDF.{' '}
                            <span className="text-gradient-primary">Ele vira questão</span>.
                        </h3>
                        <p className="mt-4 text-body text-white/70">
                            Envie uma apostila, um resumo ou a matéria da aula. A IA cria questões de múltipla escolha com o seu conteúdo, com gabarito e explicação. Você pratica o que estudou de verdade, não questão genérica da internet.
                        </p>
                        <ul className="mt-5 space-y-2.5 text-body-sm text-white/70">
                            <Bullet><strong className="font-semibold text-white">O seu material vira prova.</strong> Você treina com o que está estudando agora.</Bullet>
                            <Bullet><strong className="font-semibold text-white">Gabarito e explicação</strong> em toda questão. Dá pra ver onde você errou.</Bullet>
                            <Bullet><strong className="font-semibold text-white">Puxa primeiro o que você ainda não respondeu</strong> e o que você errou. O foco vai pro ponto fraco.</Bullet>
                        </ul>
                    </div>
                    <ProductWindow url="app.rendipro.com.br/treino" glow>
                        <img
                            src="/screenshots/treino-quiz.webp"
                            alt="Questão de múltipla escolha gerada por IA a partir do material do aluno, com a alternativa correta destacada em verde e o gabarito explicado"
                            className="block h-auto w-full"
                            loading="lazy"
                        />
                    </ProductWindow>
                </motion.div>

                {/* ── Bloco 2 · Snap (print esq · copy dir) ── */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: easeSpring }}
                    className="mt-16 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 sm:mt-24"
                >
                    <ProductWindow url="app.rendipro.com.br/flashcards" className="lg:order-1 order-2">
                        <img
                            src="/screenshots/snap-modal.webp"
                            alt="Modal de geração de flashcards com IA mostrando o botão Enviar foto do quadro ou caderno"
                            className="block h-auto w-full"
                            loading="lazy"
                        />
                    </ProductWindow>
                    <div className="lg:order-2 order-1">
                        <Eyebrow variant="primary" className="mb-4">
                            <Camera size={14} />
                            Snap &amp; Study
                        </Eyebrow>
                        <h3 className="text-h2 sm:text-display-sm font-bold leading-tight text-white">
                            Tirou foto do quadro?{' '}
                            <span className="text-gradient-primary">Vira flashcard</span>.
                        </h3>
                        <p className="mt-4 text-body text-white/70">
                            Tira uma foto do quadro ou da página do caderno e pronto: a IA monta os flashcards pra você. O que estava no papel entra na sua revisão em segundos, sem digitar nada.
                        </p>
                        <ul className="mt-5 space-y-2.5 text-body-sm text-white/70">
                            <Bullet><strong className="font-semibold text-white">Foto vira flashcard</strong> na hora, já com a repetição espaçada rodando.</Bullet>
                            <Bullet>Também cria a partir de qualquer texto que você colar. Serve o trecho do livro, sua anotação, um resumo.</Bullet>
                            <Bullet>Você revisa, edita ou apaga o que quiser. Quem manda é você.</Bullet>
                        </ul>
                    </div>
                </motion.div>

                {/* Nota de confiança */}
                <motion.p
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true }} transition={{ duration: 0.6, ease: easeSpring }}
                    className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-2 text-center text-caption text-white/45"
                >
                    <Target size={14} className="shrink-0 text-primary-400" />
                    As questões e flashcards são gerados por IA a partir do seu material. Confira o gabarito antes de confiar.
                </motion.p>
            </div>
        </section>
    )
}
