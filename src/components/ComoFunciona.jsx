import { Check } from 'lucide-react'
import { useSectionView } from '../lib/useSectionView'

const passos = [
    {
        numero: '01',
        titulo: 'Escolha o seu edital',
        imagem: '/screenshots/passo1-busca-prova.webp',
        width: 840,
        height: 736,
        texto: 'São mais de 250 editais de concurso prontos, e chegam novos toda semana. Não achou o seu? Mande o PDF do edital. O RendiPro lê o conteúdo programático e você confere matéria por matéria antes de começar.',
    },
    {
        numero: '02',
        titulo: 'Diga suas horas e a data da prova',
        imagem: '/screenshots/passo2-data-e-horas.webp',
        width: 840,
        height: 736,
        texto: 'O cronograma sai inteiro, dividido em dias, do primeiro até a prova. Estuda para dois concursos? Até 3 planos ao mesmo tempo.',
    },
]

export function ComoFunciona() {
    const sectionRef = useSectionView('como_funciona')
    return (
        <section ref={sectionRef} id="como-funciona" className="py-16 md:py-24">
            <span id="plano" className="absolute" />
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <p className="text-micro font-bold uppercase tracking-[0.14em] text-accent-300">Como funciona</p>
                <h2 className="mt-3 text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    Três passos. O terceiro se repete todo dia.
                </h2>
                {passos.map((passo, index) => (
                    <div key={passo.numero} className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-16">
                        <div className={index === 1 ? 'md:order-2' : ''}>
                            <p className="font-mono text-body-sm font-bold text-primary-400">{passo.numero}</p>
                            <h3 className="mt-2 text-h2 font-bold text-white">{passo.titulo}</h3>
                            <p className="mt-3 text-body-lg leading-relaxed text-white/70">{passo.texto}</p>
                            {index === 0 && (
                                <a
                                    href="https://app.rendipro.com.br/editais/por-area?rp_origem=landing_v2"
                                    className="mt-4 inline-flex font-semibold text-white underline underline-offset-4"
                                >
                                    Procure o seu edital agora, sem cadastro
                                </a>
                            )}
                        </div>
                        <img
                            src={passo.imagem}
                            width={passo.width}
                            height={passo.height}
                            loading="lazy"
                            decoding="async"
                            alt={`Tela real: ${passo.titulo}`}
                            className={`w-full max-w-[420px] rounded-2xl border border-white/15 shadow-glow-primary ${index === 1 ? 'md:order-1' : ''} mx-auto`}
                        />
                    </div>
                ))}
                <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <p className="font-mono text-body-sm font-bold text-primary-400">03</p>
                        <h3 className="mt-2 text-h2 font-bold text-white">Abra, estude e registre</h3>
                        <ul className="mt-4 space-y-3 text-body-lg text-white/70">
                            {[
                                'A matéria, o tópico e quanto tempo. Já decididos.',
                                'Estudou pelo seu curso ou apostila? Registra com um toque.',
                                'Faltou um dia? Um clique redistribui o que ficou para trás. Você não refaz nada.',
                            ].map((texto) => (
                                <li key={texto} className="flex gap-3">
                                    <Check size={20} className="mt-1 shrink-0 text-primary-400" />
                                    {texto}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <img
                        src="/screenshots/inicio-sessao.webp"
                        width="840"
                        height="736"
                        loading="lazy"
                        decoding="async"
                        alt="Tela real: a sessão do dia com os botões Começar e Já estudei hoje, registrar"
                        className="mx-auto w-full max-w-[420px] rounded-2xl border border-white/15 shadow-glow-primary"
                    />
                </div>
            </div>
        </section>
    )
}
