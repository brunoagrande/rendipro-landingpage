import { ArrowRight } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { obterOfertaLanding } from '../data/oferta-landing'

export function Hero() {
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()
    const oferta = obterOfertaLanding(influencerData, applyDiscount)
    const sectionRef = useSectionView('hero')

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-7 md:py-20">
            <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[140px]" />
            <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14 lg:grid-cols-[1.15fr_1fr] lg:px-8">
                <div>
                    <p className="inline-flex rounded-full border border-primary-500/30 bg-primary-500/10 px-3.5 py-1.5 text-body-sm font-semibold text-primary-300">
                        Para concurso · mais de 250 editais prontos
                    </p>
                    <h1 className="mt-5 text-balance text-[33px] font-extrabold leading-[1.08] tracking-tight text-white md:text-[48px]">
                        Você estuda com o seu material.{' '}
                        <span className="text-primary-400">O RendiPro organiza o resto.</span>
                    </h1>
                    <p className="mt-4 text-body-lg leading-relaxed text-white/70 md:text-[20px]">
                        Todo dia você abre e já sabe o que estudar, por quanto tempo e o que revisar. O RendiPro monta o
                        plano do seu edital, dividido em dias.
                    </p>
                    <p className="mt-4 text-balance text-body-sm leading-relaxed text-white/60">
                        <span className="font-semibold text-white/80">Funciona com o que você já usa:</span> cursinho,
                        apostila, videoaula, site de questões ou PDF.
                    </p>
                    <a
                        href={getCheckoutUrl(
                            'https://app.rendipro.com.br/register?plano=starter-anual&utm_content=hero',
                        )}
                        onClick={() =>
                            trackRegisterCta({
                                buttonText: 'Montar meu plano',
                                location: 'hero',
                                plan: 'starter-anual',
                            })
                        }
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-500 px-6 py-4 text-body-lg font-extrabold text-surface-950 shadow-glow-primary transition hover:bg-primary-400 md:w-auto"
                    >
                        Montar meu plano <ArrowRight size={18} />
                    </a>
                    <p className="mt-3 text-body-sm text-white/55">
                        {oferta.textoHero}
                        {oferta.textoHeroDestaque && (
                            <strong className="font-bold text-white"> {oferta.textoHeroDestaque}</strong>
                        )}
                    </p>
                    <div className="mt-5 border-t border-white/10 pt-5 text-body-sm leading-relaxed text-white/70">
                        <p>
                            <strong className="font-semibold text-white">
                                A partir de {oferta.precoMensal} por mês
                            </strong>{' '}
                            no plano anual de 12 meses.
                        </p>
                        <p className="mt-1 font-semibold text-white/85">{oferta.textoHeroRodape}</p>
                    </div>
                </div>
                <div className="relative mx-auto w-full max-w-[420px]">
                    <p className="mb-3 text-center text-micro font-bold uppercase tracking-[0.14em] text-accent-300 md:text-left">
                        O seu edital, dividido em dias
                    </p>
                    <img
                        src="/screenshots/plano-semana-2dias.webp"
                        width="1000"
                        height="693"
                        fetchPriority="high"
                        decoding="async"
                        alt="Tela real do RendiPro: terça e quarta do plano, com 6 matérias por dia, como Direito Administrativo, Direito Constitucional, Direito Penal, Português e Raciocínio Lógico"
                        className="w-full rounded-2xl border border-white/15 shadow-glow-primary"
                    />
                    <p className="mt-3 text-center text-caption text-white/50 md:text-left">
                        Tela real, plano de um concurso da PRF.
                    </p>
                </div>
            </div>
        </section>
    )
}
