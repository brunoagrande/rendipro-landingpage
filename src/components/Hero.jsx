import { ArrowRight, Rocket, Shield, Sparkles } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { ProductWindow } from './ui/ProductWindow'
import { CAMPANHA_ANUAL_ATIVA } from '../data/campanha-anual'
import { InteractiveFlashcard } from './ui/InteractiveFlashcard'

/**
 * Hero — animado via CSS (sem framer-motion no path crítico).
 * Convertido em 2026-05-24 para tirar 127KB do bundle inicial e
 * reduzir LCP mobile de 4.8s para <2.5s.
 */

const trackHeroCta = () => trackRegisterCta({ buttonText: 'Montar meu cronograma', location: 'hero' })

export function Hero() {
    const { getCheckoutUrl } = useInfluencer()
    const sectionRef = useSectionView('hero')

    return (
        <section ref={sectionRef} className="relative overflow-hidden pt-6 pb-12 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
            {/* ─── Background layers ───────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--color-primary-600)_0%,_transparent_55%)] opacity-10" />
            <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-[140px]" />
            <div className="pointer-events-none absolute top-[20%] right-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent-500/15 blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* ─── LEFT · Copy ──────────────────────────────── */}
                    <div className="text-center lg:text-left">
                        {/* A prova (MP-RS) fica em TODA largura. Antes o celular via só
                            "Nasceu de uma aprovação real", sem dizer qual: truncava justo a
                            parte que prova. */}
                        <div className="inline-flex animate-fade-in-up">
                            <Eyebrow variant="primary">
                                <Sparkles size={14} />
                                <span className="md:hidden">Feito por quem passou no <span className="whitespace-nowrap">MP-RS</span></span>
                                <span className="hidden md:inline">Nasceu de uma aprovação real no MP-RS em 2023</span>
                            </Eyebrow>
                        </div>

                        {/* H1 SEM animação — é o LCP element em mobile, qualquer fade-in c/ opacity:0
                            inicial atrasa o LCP. Pintura instantânea para Lighthouse marcar cedo.

                            O texto é o MESMO do anúncio que traz o tráfego pago
                            ("Seu edital vira cronograma. Sem planilha."). Message match
                            entre criativo e dobra é o ajuste de maior efeito em tráfego pago:
                            a pessoa confere em 1 segundo que chegou no lugar certo. */}
                        <h1
                            className="mt-4 md:mt-6 text-display-sm sm:text-display-lg lg:text-display-xl text-white"
                        >
                            Seu edital vira <span className="text-gradient-primary">cronograma</span>.
                            <br className="sm:hidden" />{' '}Sem planilha.
                        </h1>

                        {/* Subtitle SEM animação — candidato a LCP em desktop (texto longo).
                            Pintura instantânea para Lighthouse marcar cedo.

                            Encurtado de ~60 para ~20 palavras em 24/09/2026: a sessão média
                            da campanha do Instagram é de 16s e só este parágrafo levava ~18s
                            para ser lido. Apostila virando questão e redação corrigida saíram
                            daqui; já têm seção inteira mais abaixo. */}
                        <p
                            className="mt-4 md:mt-6 max-w-2xl mx-auto lg:mx-0 text-body-lg text-white/70 text-pretty"
                        >
                            Escolha o edital e o RendiPro monta a semana inteira:{' '}
                            <strong className="font-semibold text-white">o que estudar hoje, por quanto tempo e quando revisar.</strong>
                        </p>

                        <div
                            className="mt-5 sm:mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start animate-fade-in-up"
                            style={{ animationDelay: '300ms' }}
                        >
                            <Button
                                as="a"
                                href={getCheckoutUrl('https://app.rendipro.com.br/register?plano=starter-anual&utm_content=hero')}
                                onClick={trackHeroCta}
                                variant="primary"
                                size="lg"
                                className="px-6 sm:px-10"
                            >
                                Montar meu cronograma
                                <Rocket
                                    size={20}
                                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                                />
                            </Button>
                            {/* Rótulo igual ao CTA do anúncio, de propósito. */}
                            <Button as="a" href="#plano" variant="secondary" size="lg" className="px-6 sm:px-10">
                                Ver como funciona
                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Button>
                        </div>

                        {/* Preço: "A partir de R$ 9,90 mensais" omitia que os R$ 9,90 são o
                            anual dividido por 12 (o mensal de verdade é R$ 16,90). O arquivo
                            pricing-plans.js já tinha derrubado uma âncora pelo mesmo motivo
                            (CDC art. 37). Agora a condição vem junto do número. */}
                        <p
                            className="mt-4 text-body font-semibold text-white animate-fade-in"
                            style={{ animationDelay: '400ms' }}
                            data-testid="hero-preco"
                        >
                            R$ 9,90 por mês no plano anual
                        </p>
                        {/* Três linhas de reforço viraram uma: em 16 segundos ninguém lê rodapé
                            de hero, e cada linha empurrava o print do produto para fora da tela. */}
                        <p
                            className="mt-1.5 inline-flex items-center justify-center lg:justify-start gap-1.5 text-caption text-white/55 animate-fade-in"
                            style={{ animationDelay: '450ms' }}
                        >
                            <Shield size={13} className="shrink-0 text-primary-400" />
                            {CAMPANHA_ANUAL_ATIVA ? '1º mês grátis · ' : ''}Garantia de 7 dias · Pagamento seguro
                        </p>
                    </div>

                    {/* ─── RIGHT · Asset stack ──────────────────────── */}
                    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
                        {/* Main: Cronograma in ProductWindow — sem animation para não atrasar
                            LCP em desktop (em desktop esta imagem é o LCP element). */}
                        <div>
                            <ProductWindow
                                url="app.rendipro.com.br/cronograma"
                                glow
                                className="relative z-10"
                            >
                                {/* CELULAR: recorte. O print é de uma tela de 1440px; jogado
                                    inteiro numa coluna de 358px ele vira um borrão (a barra
                                    lateral do app sozinha comia 25% da largura e cada sessão
                                    virava um risco colorido de 3px). Aqui o recorte mostra
                                    três dias da semana em tamanho legível, que é a única
                                    coisa que o anúncio prometeu mostrar. No md+ a imagem
                                    volta inteira, que lá ela cabe.
                                    Recorte na origem: x 740..1186, y 380..620 de 1440x900.
                                    A janela foi recalibrada em 24/09 junto com a troca do
                                    print: o de ENEM tinha os dias cheios mais à esquerda, e
                                    a mesma janela no de concurso pegava dois dias vazios.
                                    O deslocamento é por `translate`, que a porcentagem
                                    resolve contra o PRÓPRIO elemento: assim o recorte não
                                    depende de altura percentual herdada do pai, que é o
                                    ponto onde `aspect-ratio` costuma escorregar no Safari.
                                    322,87% = 1440/446 · translate = -740/1440 e -380/900. */}
                                <div className="relative aspect-[446/240] overflow-hidden md:aspect-auto md:overflow-visible">
                                    <img
                                        src="/screenshots/cronograma-semana.webp"
                                        alt="Cronograma semanal do RendiPro com as sessões de cada dia: Direito Constitucional, Administrativo, Penal e Processual"
                                        width="1440"
                                        height="900"
                                        className="absolute left-0 top-0 block h-auto w-[322.87%] max-w-none translate-x-[-51.389%] translate-y-[-42.222%] md:static md:w-full md:translate-x-0 md:translate-y-0"
                                        loading="eager"
                                        fetchPriority="high"
                                    />
                                    {/* O recorte corta no meio da quarta coluna. O fade deixa
                                        claro que a semana continua, em vez de parecer print
                                        mal cortado. */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface-950 via-surface-950/60 to-transparent md:hidden" />
                                </div>
                            </ProductWindow>
                        </div>

                        {/* Interactive flashcard floating bottom-right */}
                        <div
                            className="absolute -bottom-6 -right-4 z-20 hidden md:block"
                            style={{ animation: 'fade-in-rotated 0.7s cubic-bezier(0.16,1,0.3,1) 0.85s both', transformOrigin: 'center' }}
                        >
                            <InteractiveFlashcard />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
