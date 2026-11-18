import { ArrowRight } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { obterOfertaLanding } from '../data/oferta-landing'
import { Notebook, Celular } from './Aparelhos'

// Capturas de 18/11/2026 na conta de vitrine TJ-SP (conta de teste, uso registrado pela tela
// do app). As três são do MESMO dia: 2 de 4 sessões feitas hoje nos dois aparelhos.
const TELAS_HERO = {
    notebook: {
        src: '/screenshots/hero-semana-1811.webp',
        width: 1280,
        height: 800,
        alt: 'Tela real do RendiPro no computador: a semana de um plano de exemplo do TJ-SP, com as sessões de cada dia e 2 de 4 feitas hoje',
    },
    celular: {
        src: '/screenshots/hero-inicio-1811.webp',
        width: 600,
        height: 1298,
        alt: 'Tela real do RendiPro no celular: o início do dia com 2 sessões feitas, a próxima revisão de Língua Portuguesa, o botão Começar e a semana em 4h24 de 14h',
    },
    amanha: {
        src: '/screenshots/hero-amanha-1811.webp',
        width: 714,
        height: 234,
        alt: 'Cartão Amanhã do app: 5 sessões, cerca de 1h55, começa por Direito Administrativo',
    },
}

export function Hero() {
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()
    const oferta = obterOfertaLanding(influencerData, applyDiscount)
    const sectionRef = useSectionView('hero')

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-7 md:py-20">
            <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[140px]" />
            <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_1.12fr] lg:px-8">
                <div>
                    <p className="inline-flex rounded-full border border-primary-500/30 bg-primary-500/10 px-3.5 py-1.5 text-body-sm font-semibold text-primary-300">
                        Para concurso · qualquer edital vira plano
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
                <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
                    {/* Computador: notebook com a Semana + celular com o Início + cartão "Amanhã".
                        Imagens lazy de propósito: no celular este bloco fica escondido e não
                        baixa nada; no computador ele está na tela e carrega na hora. */}
                    <div className="relative hidden pb-10 pr-[16%] md:block xl:-mr-16 min-[1440px]:-mr-28">
                        <Notebook
                            src={TELAS_HERO.notebook.src}
                            width={TELAS_HERO.notebook.width}
                            height={TELAS_HERO.notebook.height}
                            alt={TELAS_HERO.notebook.alt}
                        />
                        <Celular
                            src={TELAS_HERO.celular.src}
                            width={TELAS_HERO.celular.width}
                            height={TELAS_HERO.celular.height}
                            alt={TELAS_HERO.celular.alt}
                            className="absolute bottom-0 right-0 w-[34%]"
                        />
                        {TELAS_HERO.amanha && (
                            <img
                                src={TELAS_HERO.amanha.src}
                                width={TELAS_HERO.amanha.width}
                                height={TELAS_HERO.amanha.height}
                                alt={TELAS_HERO.amanha.alt}
                                loading="lazy"
                                decoding="async"
                                className="absolute -left-[6%] bottom-2 w-[46%] rounded-2xl shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)]"
                            />
                        )}
                    </div>
                    {/* Celular: só o aparelho, depois do preço. */}
                    <Celular
                        src={TELAS_HERO.celular.src}
                        width={TELAS_HERO.celular.width}
                        height={TELAS_HERO.celular.height}
                        alt={TELAS_HERO.celular.alt}
                        className="mx-auto w-[76%] max-w-[290px] md:hidden"
                    />
                    <p className="mt-4 text-center text-caption text-white/50 md:text-left">
                        Plano de exemplo, em telas reais do app.
                    </p>
                </div>
            </div>
        </section>
    )
}
