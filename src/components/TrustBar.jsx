export function TrustBar() {
    const exams = [
        "ENEM", "Vestibulares", "Concursos Públicos", "OAB", "Ensino Médio", "Residência Médica"
    ]

    return (
        <div className="border-y border-white/5 bg-white/[0.02] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">
                    Plataforma otimizada para qualquer tipo de prova ou exame
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
                    {exams.map((exam) => (
                        <span key={exam} className="text-sm font-bold text-white hover:text-primary-400 transition-colors cursor-default whitespace-nowrap">
                            {exam}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
