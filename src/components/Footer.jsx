export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-surface-950 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2">
                            <img src="/logo-new.png" alt="RendiPro Logo" className="h-8 w-8 object-contain" />
                            <span className="text-xl font-bold tracking-tight text-white">RendiPro</span>
                        </div>
                        <p className="max-w-sm text-white/50 text-sm leading-relaxed">
                            Transformando a forma como concurseiros estudam. Tecnologia e ciência a serviço da sua aprovação.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Links Rápidos</h4>
                        <ul className="space-y-4">
                            <li><a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Recursos</a></li>
                            <li><a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Preços</a></li>
                            <li><a href="https://app.rendipro.com.br/login" className="text-sm text-white/50 hover:text-white transition-colors">Sistema</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Legal</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Termos de Uso</a></li>
                            <li><a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacidade</a></li>
                            <li><a href="mailto:contato@rendipro.com.br" className="text-sm text-white/50 hover:text-white transition-colors">Contato</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-white/30">
                    © {new Date().getFullYear()} RendiPro. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}
