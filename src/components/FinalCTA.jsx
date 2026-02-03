import { Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary-600/10 blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 md:p-16 text-center overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                            Pronto para acelerar sua <span className="text-primary-500">aprovação</span>?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
                            Junte-se a milhares de concurseiros que já utilizam o RendiPro para organizar seus estudos e conquistar a vaga dos sonhos.
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href="https://app.rendipro.com.br/signup"
                                className="group relative inline-flex h-14 items-center justify-center rounded-full bg-primary-600 px-10 text-lg font-bold text-white transition-all active:scale-95 hover:bg-primary-500 hover:shadow-2xl hover:shadow-primary-600/30"
                            >
                                Criar conta gratuita
                                <Rocket size={20} className="ml-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </a>
                            <p className="text-sm text-white/30">
                                Teste grátis por 7 dias. Sem cartão de crédito.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
