import { Check } from 'lucide-react'
import { StatBlock } from './ui/StatBlock'
import { useSectionView } from '../lib/useSectionView'

/**
 * TrustStrip — funde TrustBar (números) + LogoMarquee (exames) em uma seção só.
 * Animado via CSS puro (sem framer-motion no path crítico).
 */

const CATEGORIAS = [
    'Qualquer concurso público',
    'OAB',
    'ENEM',
    'Qualquer vestibular',
    'Residência Médica',
    'Provas escolares',
]

export function TrustStrip() {
    const sectionRef = useSectionView('trust_strip')
    return (
        <section
            ref={sectionRef}
            aria-label="Catálogo de conteúdo e exames cobertos pelo RendiPro"
            className="border-y border-white/5 bg-surface-950/50 py-8 backdrop-blur-sm sm:py-12"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 4 stats */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 animate-fade-in-up">
                    {/* O 2o stat era "+69 baralhos": numero de inventario, nao de
                        beneficio (e a redacao, que vende, nao aparecia). */}
                    <StatBlock value={8000} label="flashcards prontos" />
                    <StatBlock
                        value={1000}
                        prefix={'0 a '}
                        suffix=""
                        label="de nota na redação"
                        sublabel="corrigida em minutos"
                    />
                    <StatBlock
                        value={5}
                        prefix=""
                        suffix=" min"
                        label="pra montar o cronograma"
                    />
                    <StatBlock
                        value={3}
                        prefix=""
                        label="cronogramas em paralelo"
                        sublabel="exclusivo"
                    />
                </div>

                {/* Cobertura — chips visuais com check */}
                <div
                    className="mt-10 border-t border-white/5 pt-8 animate-fade-in"
                    style={{ animationDelay: '200ms' }}
                >
                    <p className="text-center text-h3 sm:text-h2 font-bold tracking-tight text-white">
                        Feito para <span className="text-gradient-primary">concurso</span>.{' '}
                        Funciona para qualquer prova.
                    </p>
                    <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                        {CATEGORIAS.map((cat) => (
                            <li
                                key={cat}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-surface-900/60 px-3 py-1.5 text-body-sm font-medium text-white/85 backdrop-blur-sm sm:px-3.5 sm:py-2"
                            >
                                <Check size={13} className="text-primary-400 shrink-0" />
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
