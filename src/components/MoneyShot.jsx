import { motion } from 'framer-motion'
import { LayoutDashboard } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'

/**
 * MoneyShot — "see the product big" momentum section.
 *
 * Estratégia (Linear/Vercel pattern): antes de listar features, mostre o produto
 * inteiro num plano dramático. O cérebro do prospect precisa "ver" o produto
 * antes de ler sobre ele (IKEA Effect antecipado).
 *
 * Asset: dashboard-final.png — mostra cronograma + próxima missão + agenda +
 * gamificação (streak, XP, ligas) em uma só tela. Esta é a "vitrine".
 *
 * Posição na pipeline: entre LogoMarquee e Features.
 */

const easeSpring = [0.16, 1, 0.3, 1]

export function MoneyShot() {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            {/* Background — glow accent + grain feeling */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-600)_0%,_transparent_60%)] opacity-[0.12]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[140px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: easeSpring }}
                    className="mb-14 text-center"
                >
                    <Eyebrow variant="accent" className="mb-4">
                        <LayoutDashboard size={14} />
                        Painel de comando
                    </Eyebrow>
                    <h2 className="mx-auto max-w-3xl text-display-md sm:text-display-lg font-extrabold tracking-tight text-white">
                        Seu plano inteiro,{' '}
                        <span className="text-gradient-primary">numa tela só</span>.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-body-lg text-white/60">
                        Cronograma de hoje, próxima sessão, missões do dia, streak, agenda da semana. Você abre e já sabe o que fazer agora.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 36 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.9, ease: easeSpring }}
                    className="relative mx-auto max-w-6xl"
                >
                    <ProductWindow url="app.rendipro.com.br/inicio" glow>
                        <img
                            src="/screenshots/dashboard-final.png"
                            alt="Dashboard do RendiPro: cronograma, próxima missão, agenda do dia, sequência de 31 dias, missões e liga semanal"
                            className="block h-auto w-full"
                            loading="lazy"
                        />
                    </ProductWindow>
                </motion.div>
            </div>
        </section>
    )
}
