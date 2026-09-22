export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-surface-950 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="col-span-2">
                        <div className="flex items-center">
                            <img
                                src="/LogoRendiPro-v05-2026-sem-fundo.webp"
                                alt="RendiPro"
                                className="h-9 w-auto object-contain"
                            />
                        </div>
                        <p className="mt-4 max-w-sm text-body-sm leading-relaxed text-white/55">
                            O RendiPro organiza o estudo inteiro de quem se prepara para concurso, OAB, ENEM ou vestibular: cronograma pelo edital, revisão no dia certo, treino com o seu material e redação corrigida. Tudo em um plano só.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Atalhos</h3>
                        <ul className="space-y-4">
                            <li><a href="#plano" className="text-sm text-white/50 hover:text-white transition-colors">Como funciona</a></li>
                            <li><a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Planos</a></li>
                            <li><a href="https://app.rendipro.com.br/login" className="text-sm text-white/50 hover:text-white transition-colors">Entrar no app</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Legal</h3>
                        <ul className="space-y-4">
                            <li><a href="https://app.rendipro.com.br/termos" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Termos de Uso</a></li>
                            <li><a href="https://app.rendipro.com.br/privacidade" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Privacidade</a></li>
                            <li><a href="mailto:contato@rendipro.com.br" className="text-sm text-white/50 hover:text-white transition-colors">contato@rendipro.com.br</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8">
                    <div className="mb-6 text-center text-xs text-white/50 space-y-1">
                        <p>RendiPro · CNPJ:65.675.764/0001-22</p>
                        <p>SUCCESSUS TECNOLOGIA DIGITAL LTDA · RUA PAIS LEME, 215 - CONJ 1713, PINHEIROS. SÃO PAULO/SP - CEP 05.424-150.</p>
                    </div>
                    <p className="text-center text-sm text-white/50">
                        © {new Date().getFullYear()} RendiPro. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
