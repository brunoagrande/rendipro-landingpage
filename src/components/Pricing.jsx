import { Check } from 'lucide-react'
import { useInfluencer } from '../contexts/InfluencerContext'
import { trackRegisterCta, trackWhatsappClick } from '../lib/tracking'
import { useSectionView } from '../lib/useSectionView'
import { obterOfertaLanding, SUPORTE_NO_APP_ATIVO } from '../data/oferta-landing'
import { ehBlackFriday } from '../data/black-friday'
import { LINK_WHATSAPP } from '../data/contato'

const itens = [
    'Sem aula nem apostila: você estuda com as suas.',
    'Plano do seu edital, dia por dia, até a prova.',
    'Revisão marcada no dia certo.',
    'Até 3 concursos ao mesmo tempo.',
    '6 PDFs por mês viram questão com gabarito.',
    '50 flashcards por mês, com a foto do caderno. Seus baralhos do Anki também entram.',
    '6 redações corrigidas por mês.',
]

export function Pricing() {
    const { influencerData, applyDiscount, getCheckoutUrl } = useInfluencer()
    const oferta = obterOfertaLanding(influencerData, applyDiscount)
    const sectionRef = useSectionView('oferta')
    const naBlackFriday = ehBlackFriday(influencerData)

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
                                    Ajuda da equipe no WhatsApp para montar o plano.
                                </li>
                            )}
                        </ul>
                        {naBlackFriday ? (
                            <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-body">
                                <div className="flex justify-between gap-4 text-white/55">
                                    <dt>12 meses no mensal</dt>
                                    <dd>{oferta.comparacao.mensal}</dd>
                                </div>
                                <div className="flex justify-between gap-4 font-semibold text-white">
                                    <dt>Black Friday no Pix</dt>
                                    <dd>{oferta.comparacao.pix}</dd>
                                </div>
                                <div className="flex justify-between gap-4 font-bold text-primary-300">
                                    <dt>Você economiza</dt>
                                    <dd>{oferta.comparacao.economia}</dd>
                                </div>
                            </dl>
                        ) : (
                            <p className="mt-6 border-t border-white/10 pt-5 text-body-sm leading-relaxed text-white/55">
                                {oferta.textoPilha}
                            </p>
                        )}
                    </div>
                    <aside className="rounded-3xl border border-primary-500/40 bg-surface-800 p-6 md:sticky md:top-24 md:p-8">
                        {oferta.campanhaAtiva && (
                            <p className="inline-flex rounded-full bg-primary-500/15 px-3 py-1 text-caption font-bold text-primary-300">
                                {oferta.selo}
                            </p>
                        )}
                        {oferta.comInfluencer && influencerData?.origem === 'parceiro' && (
                            <p className="inline-flex rounded-full bg-primary-500/15 px-3 py-1 text-caption font-bold text-primary-300">
                                {influencerData.nome_influencer}: {influencerData.desconto_porcentagem}% no 1º ano
                            </p>
                        )}
                        {oferta.comInfluencer && influencerData?.origem !== 'parceiro' && (
                            <p className="text-body-sm text-white/45">
                                De <span className="line-through">{oferta.precoMensalSemDesconto}</span> por mês, com o
                                desconto do seu cupom:
                            </p>
                        )}
                        {naBlackFriday ? (
                            <>
                                <p className="mt-4 font-display text-[40px] font-extrabold leading-none tracking-tight text-white">
                                    {oferta.cartao}
                                </p>
                                <p className="mt-1.5 text-body text-white/60">no cartão</p>
                                <p className="mt-5 border-t border-white/10 pt-5 text-body text-white/60">
                                    ou{' '}
                                    <strong className="font-display text-[26px] font-extrabold tracking-tight text-white">
                                        {oferta.precoPix}
                                    </strong>{' '}
                                    no Pix
                                </p>
                                {oferta.porDia && <p className="mt-0.5 text-body text-primary-300">{oferta.porDia}</p>}
                            </>
                        ) : (
                            <>
                                <p className="mt-4">
                                    <span className="font-mono text-[48px] font-bold leading-none text-white">
                                        {oferta.precoMensal}
                                    </span>
                                    <span className="ml-1 text-body-lg text-white/55"> por mês</span>
                                </p>
                                <p className="mt-3 text-body leading-relaxed text-white/80">{oferta.textoCartao}</p>
                                <p className="mt-1 text-body-sm text-white/55">{oferta.textoPix}</p>
                            </>
                        )}
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
                        <p className="mt-3 text-center text-body-sm text-white/75">
                            Garantia de 7 dias
                            {naBlackFriday && (
                                <>
                                    {' · '}
                                    <a
                                        href={LINK_WHATSAPP}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsappClick('oferta')}
                                        className="font-semibold text-white underline underline-offset-4"
                                    >
                                        Tirar dúvida no WhatsApp
                                    </a>
                                </>
                            )}
                        </p>
                        {/* ⚠ Com desconto de link (Black Friday) o 2º ano volta ao preço cheio: a promessa de
                            "fica com esse valor" seria falsa. Mesmo corte do app (selo some com desconto, 19/11). */}
                        {oferta.comInfluencer && influencerData?.origem === 'parceiro' ? (
                            <p className="mt-5 text-caption leading-relaxed text-white/50">
                                {oferta.textoRenovacao ||
                                    `O desconto vale nas 12 mensalidades do 1º ano. Na renovação, o anual volta a ${oferta.precoMensalSemDesconto} por mês.`}
                            </p>
                        ) : (
                            <p className="mt-5 text-caption leading-relaxed text-white/50">
                                Depois do 7º dia, as 12 mensalidades vão até o fim. Preço de lançamento: quem assina agora fica com esse valor enquanto for assinante, mesmo
                                quando o preço subir.
                            </p>
                        )}
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
                            {naBlackFriday
                                ? ', sem desconto.'
                                : `, sem compromisso de 12 meses${influencerData?.origem === 'parceiro' ? ' (o desconto vale só no anual).' : '.'}`}
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    )
}
