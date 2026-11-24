import { Check } from 'lucide-react'
import { useSectionView } from '../lib/useSectionView'
import { Celular } from './Aparelhos'

const passos = [
    {
        numero: '01',
        titulo: 'Escolha o seu edital',
        // 18/11/2026: telas do assistente real no celular (conta de vitrine TJ-SP), sem concluir o plano.
        imagem: '/screenshots/passo1-tjsp-1811.webp',
        width: 600,
        height: 1298,
        alt: 'Tela real do assistente do RendiPro no celular: busca por TJ-SP com os cargos e a data da prova',
        // 14/11/2026: "mais de 250 editais" saiu (121 dos 268 já tinham prova passada e o app mostra
        // outra contagem) e "novos toda semana" também (nenhum edital novo em 02/11 e 09/11). O
        // fundador escolheu a promessa sem número: qualquer edital vira plano.
        texto: 'Qualquer edital vira plano: escolha o seu na lista ou mande o PDF dele. O RendiPro lê o conteúdo programático e você confere matéria por matéria antes de começar.',
    },
    {
        numero: '02',
        titulo: 'Diga suas horas e a data da prova',
        imagem: '/screenshots/passo2-data-horas-1811.webp',
        width: 600,
        height: 1298,
        alt: 'Tela real do assistente do RendiPro no celular: data da prova 14/03/2027 e 14h por semana para o plano',
        texto: 'O cronograma sai inteiro, dividido em dias, do primeiro até a prova. Estuda para dois concursos? Até 3 planos ao mesmo tempo.',
    },
    {
        numero: '03',
        titulo: 'Abra, estude e registre',
        imagem: '/screenshots/passo3-registrar-1811.webp',
        width: 600,
        height: 1225,
        alt: 'Tela real do RendiPro no celular: registrar 60 minutos de estudo, com aula do curso, 16 de 20 questões certas e a 1ª revisão marcada para amanhã',
        itens: [
            'A matéria, o tópico e quanto tempo. Já decididos.',
            'Estudou pelo seu curso ou apostila? Você marca o tempo e como estudou. A revisão já sai com data.',
            'Faltou um dia? O app mostra o que ficou para trás e reorganiza em poucos toques. Você não refaz nada.',
        ],
    },
]

export function ComoFunciona() {
    const sectionRef = useSectionView('como_funciona')
    // ⚠ 24/11/2026 (fundador): o link "Procure o seu edital agora, sem cadastro" saiu. O catálogo público e a prévia dele
    // não representam a montagem real do plano. Não religar sem falar com o fundador.
    return (
        <section ref={sectionRef} id="como-funciona" className="py-16 md:py-24">
            <span id="plano" className="absolute" />
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <p className="text-micro font-bold uppercase tracking-[0.14em] text-accent-300">Como funciona</p>
                <h2 className="mt-3 text-display-md font-extrabold leading-tight tracking-tight text-white sm:text-display-lg">
                    Três passos. O terceiro se repete todo dia.
                </h2>
                {/* 18/11/2026 (auditor-ui-ux): no celular e no tablet, zigue-zague; a partir de lg os três
                    passos ficam lado a lado, celular em cima e texto embaixo, como uma sequência. */}
                <div className="mt-12 space-y-16 lg:grid lg:grid-cols-3 lg:items-start lg:gap-10 lg:space-y-0">
                    {passos.map((passo, index) => (
                        <div
                            key={passo.numero}
                            className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:flex lg:flex-col lg:items-stretch lg:gap-7"
                        >
                            <div className={index === 1 ? 'md:order-2 lg:order-none' : ''}>
                                <p className="font-mono text-body-sm font-bold text-primary-400">{passo.numero}</p>
                                <h3 className="mt-2 text-h2 font-bold text-white">{passo.titulo}</h3>
                                {passo.texto && (
                                    <p className="mt-3 text-body-lg leading-relaxed text-white/70">{passo.texto}</p>
                                )}
                                {passo.itens && (
                                    <ul className="mt-4 space-y-3 text-body-lg text-white/70">
                                        {passo.itens.map((texto) => (
                                            <li key={texto} className="flex gap-3">
                                                <Check size={20} className="mt-1 shrink-0 text-primary-400" />
                                                {texto}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <Celular
                                src={passo.imagem}
                                width={passo.width}
                                height={passo.height}
                                alt={passo.alt}
                                className={`mx-auto w-[66%] max-w-[270px] lg:order-first lg:w-full lg:max-w-[250px] ${index === 1 ? 'md:order-1' : ''}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
