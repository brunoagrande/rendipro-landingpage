import { useSectionView } from '../lib/useSectionView'
import { Celular, Notebook } from './Aparelhos'

// 18/11/2026: telas reais em aparelho. Revisões e simulado: conta de vitrine TJ-SP. Questão do PDF:
// conta de vitrine do INSS (a do TJ-SP nunca gerou questões; gerar de novo custaria IA).

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
                        <Celular
                            src="/screenshots/revisoes-1811.webp"
                            width={600}
                            height={1298}
                            alt="Tela real do RendiPro no celular: Revisões, com 28 assuntos em revisão e a lista dos próximos 7 dias"
                            className="mx-auto mt-6 w-[78%] max-w-[270px] md:w-[62%] md:max-w-[240px]"
                        />
                    </article>
                    <article className="rounded-2xl border border-white/10 bg-surface-800/60 p-5">
                        <h3 className="text-h3 font-bold text-white">Questões tiradas da sua apostila</h3>
                        <p className="mt-2 text-body leading-relaxed text-white/55">
                            Mande o PDF da sua apostila e treine com questões de múltipla escolha tiradas dele, com
                            gabarito e explicação.
                        </p>
                        <Celular
                            src="/screenshots/questao-pdf-1811.webp"
                            width={600}
                            height={1298}
                            alt="Tela real do RendiPro no celular: questão de múltipla escolha feita a partir do material, com a alternativa certa e o gabarito explicado"
                            className="mx-auto mt-6 w-[78%] max-w-[270px] md:w-[62%] md:max-w-[240px]"
                        />
                    </article>
                    <article className="grid items-center gap-5 rounded-2xl border border-white/10 bg-surface-800/60 p-5 md:col-span-2 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
                        <div>
                            <h3 className="text-h3 font-bold text-white">Registre os simulados que você faz</h3>
                            <p className="mt-2 text-body leading-relaxed text-white/55">
                                Fez um simulado? Lance os acertos de cada matéria e veja qual está puxando sua nota para baixo.
                            </p>
                        </div>
                        <Notebook
                            src="/screenshots/simulado-analise-1811.webp"
                            width={1280}
                            height={800}
                            alt="Tela real do RendiPro no computador: análise de um simulado com 73% de desempenho, Raciocínio Lógico como matéria crítica e o desempenho por matéria"
                            className="mx-auto hidden w-full max-w-[660px] px-[4%] pb-2 md:block md:justify-self-end"
                        />
                        <Celular
                            src="/screenshots/simulado-analise-cel-1811.webp"
                            width={600}
                            height={1298}
                            alt="Tela real do RendiPro no celular: análise de um simulado com 73% de desempenho e Raciocínio Lógico como matéria crítica"
                            className="mx-auto w-[78%] max-w-[270px] md:hidden"
                        />
                    </article>
                </div>
                <p className="mt-5 text-center text-caption text-white/50">Telas reais de contas de exemplo.</p>
            </div>
        </section>
    )
}
