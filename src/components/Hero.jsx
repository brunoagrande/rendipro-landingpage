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
            <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14 lg:px-8">
                <div>
                    <p className="inline-flex rounded-full border border-primary-500/30 bg-primary-500/10 px-3.5 py-1.5 text-body-sm font-semibold text-primary-300">
                        Para concurso · mais de 250 editais prontos
                    </p>
                    <h1 className="mt-5 text-[33px] font-extrabold leading-[1.08] tracking-tight text-white md:text-[60px]">
                        Todo dia você abre e já sabe o que estudar.{' '}
                        <span className="text-primary-400">Até a prova.</span>
                    </h1>
                    <p className="mt-4 text-body-lg leading-relaxed text-white/70 md:text-[20px]">
                        Escolha o seu concurso e diga quantas horas tem por dia. O RendiPro divide o edital em dias, até
                        a data da prova, e mostra o que estudar com o seu material, por quanto tempo e o que revisar.
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
                        <p className="text-white/50">{oferta.textoHeroRodape}</p>
                    </div>
                </div>
                <div className="relative mx-auto w-full max-w-[420px]">
                    <p className="mb-3 text-center text-micro font-bold uppercase tracking-[0.14em] text-accent-300 md:text-left">
                        O que você vê ao abrir o app
                    </p>
                    <img
                        src="/screenshots/inicio-sessao.webp"
                        width="840"
                        height="736"
                        fetchPriority="high"
                        decoding="async"
                        alt="Tela real do RendiPro: sua primeira sessão, Direito Previdenciário, 60 minutos, com os botões Começar e Já estudei hoje, registrar"
                        className="w-full rounded-2xl border border-white/15 shadow-glow-primary"
                    />
                    <p className="mt-3 text-center text-caption text-white/50 md:text-left">
                        Tela real, plano de um concurso do INSS.
                    </p>
                </div>
            </div>
        </section>
    )
}
