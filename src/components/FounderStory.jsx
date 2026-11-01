import { useSectionView } from '../lib/useSectionView'

export function FounderStory() {
    const sectionRef = useSectionView('founder_story')
    return (
        <section ref={sectionRef} className="py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <p className="text-micro font-bold uppercase tracking-[0.14em] text-accent-300">
                    Por que o RendiPro existe
                </p>
                <h2 className="mt-3 max-w-3xl text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    A Jessica passou no MP-RS depois de quatro anos montando cronograma à mão.
                </h2>
                <article className="mt-10 grid items-start gap-6 rounded-3xl border border-white/10 bg-surface-900 p-6 md:grid-cols-[180px_1fr] md:p-8">
                    <img
                        src="/founder-jessica.webp"
                        width="320"
                        height="320"
                        loading="lazy"
                        decoding="async"
                        alt="Jessica Marques"
                        className="h-28 w-28 rounded-2xl object-cover md:h-40 md:w-40"
                    />
                    <div>
                        <p className="text-body-lg leading-relaxed text-white/85">
                            &quot;Quatro anos de preparação, provas e editais diferentes, cada um com seu cronograma.
                            Além de estudar, eu passava tempo demais controlando o andamento de cada plano e
                            reorganizando o que tinha ficado para trás.&quot;
                        </p>
                        <p className="mt-4 font-semibold text-white">Jessica Marques</p>
                        <p className="text-body-sm text-white/55">Promotora de Justiça · co-criadora do RendiPro</p>
                        <a
                            href="https://www.mprs.mp.br/media/areas/concursos/arquivos/xlix/ed_051_2023_resultado_definitivo_concurso.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex font-semibold text-white underline underline-offset-4"
                        >
                            Verificar a nomeação no MP-RS
                        </a>
                        <p className="mt-5 border-t border-white/10 pt-4 text-body-sm text-white/55">
                            Ela passou sem o RendiPro. O RendiPro é o que ela queria ter tido: o plano feito pelo
                            edital, que se refaz sozinho quando a semana sai do roteiro.
                        </p>
                    </div>
                </article>
            </div>
        </section>
    )
}
