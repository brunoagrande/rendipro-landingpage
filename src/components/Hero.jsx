import { motion } from 'framer-motion'
import { Rocket, Sparkles } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary-600/10 blur-[100px]" />
            <div className="absolute top-[20%] right-0 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[80px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 flex justify-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold text-primary-400 backdrop-blur-md">
                            <Sparkles size={14} />
                            Otimizado para Concursos de 2026
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
                    >
                        Estude com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-indigo-400">alta performance</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mt-8 max-w-2xl text-lg text-white/50 md:text-xl"
                    >
                        A plataforma completa que organiza sua rotina, gerencia seu ciclo de estudos e acelera sua aprovação com métodos cientificamente comprovados.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <a
                            href="https://app.rendipro.com.br/signup"
                            className="group relative inline-flex h-14 items-center justify-center rounded-full bg-primary-600 px-10 text-lg font-bold text-white transition-all active:scale-95 hover:bg-primary-500 hover:shadow-2xl hover:shadow-primary-600/30"
                        >
                            Começar Agora
                            <Rocket size={20} className="ml-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#features"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 text-lg font-semibold text-white backdrop-blur-sm transition-all active:scale-95 hover:bg-white/10"
                        >
                            Ver Recursos
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
