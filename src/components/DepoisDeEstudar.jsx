import { useSectionView } from '../lib/useSectionView'

export function DepoisDeEstudar() {
    const sectionRef = useSectionView('depois_de_estudar')
    return (
        <section ref={sectionRef} className="border-y border-white/5 bg-surface-900 py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <p className="text-micro font-bold uppercase tracking-[0.14em] text-accent-300">Depois de estudar</p>
                <h2 className="mt-3 max-w-3xl text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    O que você estudou volta no dia certo. E vira treino.
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
                        <h3 className="text-h3 font-bold text-white">O PDF da sua apostila vira questão</h3>
                        <p className="mt-2 text-body leading-relaxed text-white/55">
                            Mande o PDF e treine com questões de múltipla escolha, com gabarito e explicação.
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
                </div>
            </div>
        </section>
    )
}
