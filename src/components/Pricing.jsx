import { Check } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { obterOfertaLanding, SUPORTE_NO_APP_ATIVO } from '../data/oferta-landing'

const itens = [
    'O plano do seu edital, pelo catálogo ou pelo PDF do seu, dividido em dias até a prova.',
    'A sessão de cada dia: matéria, tópico e tempo.',
    'Revisão no dia certo de cada tópico que você estuda.',
    'Replanejar em um clique quando a semana sai do roteiro.',
    'Até 3 concursos ao mesmo tempo.',
    'Seu PDF vira questão com gabarito: 6 PDFs por mês.',
    'Flashcards: foto do caderno vira cartão (50 por mês) e seus baralhos do Anki entram como estão.',
    'Redação corrigida com nota por competência: 6 por mês.',
]

export function Pricing() {
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()
    const oferta = obterOfertaLanding(influencerData, applyDiscount)
    const sectionRef = useSectionView('oferta')

    return (
        <section
            ref={sectionRef}
            id="oferta"
            className="relative border-y border-white/5 bg-gradient-to-b from-surface-900 to-surface-950 py-16 md:py-24"
        >
            <span id="pricing" className="absolute top-0" />
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <p className="text-center text-micro font-bold uppercase tracking-[0.14em] text-accent-300">
                    O plano anual
                </p>
                <h2 className="mt-3 text-center text-display-md font-extrabold text-white sm:text-display-lg">
                    Plano Até a Prova
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-body-lg text-white/70">
                    O seu edital dividido em dias, do primeiro até a prova. Tudo o que vem nele:
                </p>
                <div className="mt-10 grid items-start gap-6 md:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-3xl border border-white/10 bg-surface-800/60 p-6 md:p-8">
                        <ul className="space-y-4 text-body text-white/80">
                            {itens.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <Check size={20} className="mt-0.5 shrink-0 text-primary-400" />
                                    {item}
                                </li>
                            ))}
                            {SUPORTE_NO_APP_ATIVO && (
                                <li className="flex gap-3">
                                    <Check size={20} className="mt-0.5 shrink-0 text-primary-400" />
                                    Ajuda para montar o seu plano. Travou em algum passo? Fale com a equipe pelo
                                    WhatsApp, de dentro do app.
                                </li>
                            )}
                        </ul>
                        <p className="mt-6 border-t border-white/10 pt-5 text-body-sm leading-relaxed text-white/55">
                            {oferta.textoPilha}
                        </p>
                    </div>
                    <aside className="rounded-3xl border border-primary-500/40 bg-surface-800 p-6 md:sticky md:top-24 md:p-8">
                        {oferta.campanhaAtiva && (
                            <p className="inline-flex rounded-full bg-primary-500/15 px-3 py-1 text-caption font-bold text-primary-300">
                                {oferta.selo}
                            </p>
                        )}
                        {oferta.comInfluencer && (
                            <p className="text-body-sm text-white/45">
                                De <span className="line-through">{oferta.precoMensalSemDesconto}</span> por mês, com o
                                desconto do seu cupom:
                            </p>
                        )}
                        <p className="mt-4">
                            <span className="font-mono text-[48px] font-bold leading-none text-white">
                                {oferta.precoMensal}
                            </span>
                            <span className="ml-1 text-body-lg text-white/55"> por mês</span>
                        </p>
                        <p className="mt-3 text-body leading-relaxed text-white/80">{oferta.textoCartao}</p>
                        <p className="mt-1 text-body-sm text-white/55">{oferta.textoPix}</p>
                        <a
                            href={getCheckoutUrl(
                                'https://app.rendipro.com.br/register?plano=starter-anual&utm_content=oferta',
                            )}
                            onClick={() =>
                                trackRegisterCta({
                                    buttonText: 'Montar meu plano',
                                    location: 'oferta',
                                    plan: 'starter-anual',
                                })
                            }
                            className="mt-6 flex w-full justify-center rounded-2xl bg-primary-500 px-5 py-4 font-extrabold text-surface-950 shadow-glow-primary transition hover:bg-primary-400"
                        >
                            Montar meu plano
                        </a>
                        <p className="mt-3 text-center text-body-sm text-white/75">Garantia de 7 dias</p>
                        <p className="mt-5 text-caption leading-relaxed text-white/50">
                            Preço de lançamento: quem assina agora fica com esse valor enquanto for assinante, mesmo
                            quando o preço subir.
                        </p>
                        <p className="mt-4 border-t border-white/10 pt-4 text-body-sm text-white/55">
                            Prefere mês a mês?{' '}
                            <a
                                href={getCheckoutUrl(
                                    'https://app.rendipro.com.br/register?plano=starter-mensal&utm_content=oferta_mensal',
                                )}
                                onClick={() =>
                                    trackRegisterCta({
                                        buttonText: 'Plano mensal',
                                        location: 'oferta_mensal',
                                        plan: 'starter-mensal',
                                    })
                                }
                                className="text-white underline underline-offset-4"
                            >
                                Plano mensal por {oferta.precoMensalRegular}
                            </a>
                            , sem compromisso de 12 meses.
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    )
}
