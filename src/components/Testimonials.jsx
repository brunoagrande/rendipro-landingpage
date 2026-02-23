import { motion } from 'framer-motion'
import { Star, Quote, Rocket } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'

export function Testimonials() {
    const { getCheckoutUrl } = useInfluencer()

    return (
        <section id="testimonials" className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Feito por quem <span className="text-primary-500">viveu</span> o desafio
                    </h2>
                    <p className="mt-4 text-white/50">Uma plataforma criada a partir de experiência real de estudos.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                    {/* Founder Story Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-8 rounded-3xl border border-white/10 bg-white/5"
                    >
                        <Quote className="absolute top-6 right-8 text-primary-500/20" size={40} />
                        <div className="flex gap-1 mb-4">
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">A história por trás do RendiPro</span>
                        </div>
                        <p className="text-white/80 italic mb-4 leading-relaxed">
                            "Minha esposa perdia horas da semana tentando se organizar no papel. Ela tinha dificuldade para saber onde estavam seus pontos fortes e fracos — tempo precioso que deveria ser dedicado aos estudos."
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Criei o algoritmo do RendiPro para resolver essa dor. Com as revisões otimizadas, ela superou essas dificuldades, passou no Ministério Público e hoje atua como Promotora de Justiça.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                                F
                            </div>
                            <div>
                                <p className="font-bold text-white">Fundador</p>
                                <p className="text-sm text-white/40">Criador do RendiPro</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Early Adopter CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative p-8 rounded-3xl border border-primary-500/20 bg-primary-500/5 flex flex-col items-center justify-center text-center"
                    >
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} size={20} className="text-white/20" />
                            ))}
                        </div>
                        <h3 className="text-xl font-bold text-white mt-4 mb-2">
                            Seja um dos primeiros a avaliar
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                            Estamos abrindo vagas para membros fundadores. Entre agora, teste tudo e deixe sua avaliação real.
                        </p>
                        <a
                            href={getCheckoutUrl("https://app.rendipro.com.br/register")}
                            className="group inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-bold text-white transition-all active:scale-95 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-600/20"
                        >
                            Quero ser fundador
                            <Rocket size={16} className="transition-transform group-hover:-translate-y-0.5" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
