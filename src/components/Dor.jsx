import { useSectionView } from '../lib/useSectionView'

const dores = [
    ['Abre o edital e trava.', 'Matéria demais, peso diferente para cada uma, e nenhuma ideia de por onde começar.'],
    ['Começa o dia decidindo, não estudando.', 'O tempo que era para estudar vai embora escolhendo o que estudar.'],
    ['Furou dois dias, a planilha morreu.', 'Refazer tudo dá tanto trabalho que você larga o plano.'],
    ['Estudou, e um mês depois sumiu.', 'Sem revisão marcada, o que você estudou não chega inteiro até a prova.'],
]

export function Dor() {
    const sectionRef = useSectionView('dor')

    return (
        <section ref={sectionRef} className="border-y border-white/5 bg-surface-900 py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="max-w-3xl text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    Você não precisa de mais material. Precisa de um plano que aguente a vida real.
                </h2>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                    {dores.map(([titulo, texto]) => (
                        <article key={titulo} className="rounded-2xl border border-white/10 bg-surface-800/60 p-6">
                            <h3 className="text-h3 font-bold text-white">{titulo}</h3>
                            <p className="mt-2 text-body leading-relaxed text-white/55">{texto}</p>
                        </article>
                    ))}
                </div>
                <p className="mt-8 text-body-lg text-white/75">
                    O RendiPro resolve essas quatro coisas.{' '}
                    <strong className="text-white">O estudo continua sendo seu.</strong>
                </p>
            </div>
        </section>
    )
}
