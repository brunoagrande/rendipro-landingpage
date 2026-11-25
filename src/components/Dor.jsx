import { useSectionView } from '../lib/useSectionView'

const dores = [
    'Abre o edital e trava.',
    'Perde tempo escolhendo o que estudar.',
    'Furou dois dias, a planilha morreu.',
    'Estudou, e um mês depois esqueceu.',
]

export function Dor() {
    const sectionRef = useSectionView('dor')

    return (
        <section ref={sectionRef} className="border-y border-white/5 bg-surface-900 py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="max-w-3xl text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    Você não precisa de mais material. Precisa de um plano.
                </h2>
                <ul className="mt-8 grid gap-3 md:grid-cols-2">
                    {dores.map((dor) => (
                        <li
                            key={dor}
                            className="rounded-2xl border border-white/10 bg-surface-800/60 px-5 py-4 text-body-lg font-semibold text-white"
                        >
                            {dor}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
