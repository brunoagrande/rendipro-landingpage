import { useSectionView } from '../lib/useSectionView'

export function DepoisDeEstudar() {
    const sectionRef = useSectionView('depois_de_estudar')
    return (
        <section ref={sectionRef} className="border-y border-white/5 bg-surface-900 py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <p className="text-micro font-bold uppercase tracking-[0.14em] text-accent-300">Depois de estudar</p>
                <h2 className="mt-3 max-w-3xl text-balance text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    Revise no dia certo, treine e veja onde perde ponto.
                </h2>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <article className="rounded-2xl border border-white/10 bg-surface-800/60 p-5">
                        <h3 className="text-h3 font-bold text-white">Revisão marcada sozinha</h3>
                        <p className="mt-2 text-body leading-relaxed text-white/55">
                            Cada tópico estudado ganha data de revisão. Você abre e a lista de hoje está lá.
                        </p>
                        <img
                            src="/screenshots/revisoes-hoje.webp"
                            width="840"
                            height="736"
                            loading="lazy"
                            decoding="async"
                            alt="Tela real: revisões de hoje"
                            className="mt-5 w-full rounded-2xl border border-white/15"
                        />
                    </article>
                    <article className="rounded-2xl border border-white/10 bg-surface-800/60 p-5">
                        <h3 className="text-h3 font-bold text-white">Questões tiradas da sua apostila</h3>
                        <p className="mt-2 text-body leading-relaxed text-white/55">
                            Mande o PDF da sua apostila e treine com questões de múltipla escolha tiradas dele, com
                            gabarito e explicação.
                        </p>
                        <img
                            src="/screenshots/treino-questao-pdf-v2.webp"
                            width="840"
                            height="736"
                            loading="lazy"
                            decoding="async"
                            alt="Tela real: questão gerada de um PDF"
                            className="mt-5 w-full rounded-2xl border border-white/15"
                        />
                    </article>
                    <article className="grid items-center gap-5 rounded-2xl border border-white/10 bg-surface-800/60 p-5 md:col-span-2 md:grid-cols-[1fr_1.1fr] md:gap-8">
                        <div>
                            <h3 className="text-h3 font-bold text-white">Registre os simulados que você faz</h3>
                            <p className="mt-2 text-body leading-relaxed text-white/55">
                                Fez um simulado? Lance os acertos de cada matéria e veja qual está puxando sua nota para baixo.
                            </p>
                        </div>
                        <img
                            src="/screenshots/simulado-materias-criticas.webp"
                            width="1074"
                            height="668"
                            loading="lazy"
                            decoding="async"
                            alt="Tela real: análise de um simulado com 63% de desempenho e Raciocínio Lógico-Matemático como matéria crítica, 5 de 10"
                            className="w-full rounded-2xl border border-white/15 md:max-w-[460px] md:justify-self-end"
                        />
                    </article>
                </div>
            </div>
        </section>
    )
}
