export function TrustBar() {
    const exams = [
        "Receita Federal", "Polícia Federal", "OAB", "Tribunais (TJ/TRT)", "Carreiras Policiais", "ENARE"
    ]

    return (
        <div className="border-y border-white/5 bg-white/[0.02] py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">
                    Plataforma otimizada para os principais exames e concursos
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
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
