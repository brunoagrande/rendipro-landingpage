import { StatBlock } from './ui/StatBlock'

/**
 * TrustStrip — funde TrustBar (números) + LogoMarquee (exames) em uma seção só.
 * Animado via CSS puro (sem framer-motion no path crítico).
 */

const CATEGORIAS = [
    'ENEM',
    'Qualquer vestibular',
    'Qualquer concurso público',
    'OAB',
    'Residência Médica',
    'Provas escolares',
]

export function TrustStrip() {
    return (
        <section
            aria-label="Catálogo de conteúdo e exames cobertos pelo RendiPro"
            className="border-y border-white/5 bg-surface-950/50 py-10 backdrop-blur-sm sm:py-14"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 4 stats */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 animate-fade-in-up">
                    <StatBlock value={6000} label="questões comentadas" />
                    <StatBlock
                        value={8000}
                        label="flashcards prontos"
                        sublabel="em 69 baralhos"
                    />
                    <StatBlock value={100} label="temas de redação" />
                    <StatBlock
                        value={10}
                        label="provas oficiais"
                        sublabel="com gabarito comentado"
                    />
                </div>

                {/* Lista de exames (estática, legível) */}
                <div
                    className="mt-10 border-t border-white/5 pt-6 animate-fade-in"
                    style={{ animationDelay: '200ms' }}
                >
                    <p className="text-center text-micro font-semibold uppercase tracking-widest text-primary-400">
                        Funciona pra qualquer prova
                    </p>
                    <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-body-sm font-medium text-white/65">
                        {CATEGORIAS.map((cat, i) => (
                            <li key={cat} className="flex items-center gap-5">
                                <span>{cat}</span>
                                {i < CATEGORIAS.length - 1 && (
                                    <span className="text-white/20" aria-hidden="true">
                                        ·
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-center text-caption text-white/40">
                        Inclui FUVEST, UNICAMP, UFRGS, PRF, INSS, TJ, Banco do Brasil, Receita Federal e qualquer outra prova com edital público.
                    </p>
                </div>
            </div>
        </section>
    )
}
