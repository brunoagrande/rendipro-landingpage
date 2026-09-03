import { Layers, PenLine, FileSearch, ArrowRight } from 'lucide-react'
import { useSectionView } from '../lib/useSectionView'

/**
 * VejaPorDentro — as três telas em que dá pra usar o produto sem criar conta.
 *
 * POR QUE ESTA SEÇÃO EXISTE. Até 03/09 a landing tinha oito páginas públicas
 * prontas e funcionando (amostra de flashcards, correção de redação, catálogo
 * de editais) e NENHUM link apontava para elas. Todo CTA levava direto ao
 * registro. Quem chegava tinha que decidir pagar tendo só lido sobre o produto.
 *
 * A objeção que isto ataca é a que o trial resolveria — e não podemos ter trial
 * (`project_modelo_monetizacao`). Deixar a pessoa USAR três pedaços reais custa
 * zero e não fere a regra.
 *
 * ⚠️ São telas REAIS do produto, não mockups: a amostra roda o mesmo motor de
 * repetição espaçada, e a correção mostra uma redação de verdade com a nota
 * oficial ao lado. Se algum dia virarem simulação, esta seção passa a mentir.
 */

const APP = 'https://app.rendipro.com.br'

const PROVAS = [
    {
        icone: Layers,
        titulo: 'Estude 10 flashcards agora',
        texto:
            'O mesmo motor de revisão que o RendiPro usa por dentro. Você responde, ele calcula quando aquele card volta.',
        rotulo: 'Abrir o baralho',
        href: `${APP}/amostra?utm_source=landing&utm_content=veja_por_dentro`,
        tempo: '40 segundos',
    },
    {
        icone: PenLine,
        titulo: 'Veja uma redação corrigida',
        texto:
            'Redação real, manuscrita, com a nota de cada competência e o comentário que explica cada uma. Ao lado, a nota oficial.',
        rotulo: 'Ver a correção',
        href: `${APP}/correcao-exemplo?utm_source=landing&utm_content=veja_por_dentro`,
        tempo: '2 minutos',
    },
    {
        icone: FileSearch,
        titulo: 'Procure o seu edital',
        texto:
            'Conteúdo programático completo de 76 editais, tópico a tópico, do jeito que a banca escreveu. Sem conta, sem e-mail.',
        rotulo: 'Ver os editais',
        // ⚠️ NÃO apontar para /editais/previstos: aquela página é dos editais que
        // ainda VÃO sair e hoje está vazia ("nenhum edital previsto ativo").
        // Quem lista os 76 com conteúdo, e leva para cada página individual, é
        // /editais/por-area — que abre em "todos" sem precisar de parâmetro.
        href: `${APP}/editais/por-area?utm_source=landing&utm_content=veja_por_dentro`,
        tempo: 'agora',
    },
]

export function VejaPorDentro() {
    const sectionRef = useSectionView('veja_por_dentro')

    return (
        <section
            ref={sectionRef}
            id="veja-por-dentro"
            aria-label="Partes do RendiPro que você pode usar sem criar conta"
            className="border-y border-white/5 bg-surface-950/50 py-16 backdrop-blur-sm sm:py-24"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-body-sm font-semibold uppercase tracking-wider text-primary-400">
                        Sem cadastro
                    </p>
                    <h2 className="mt-3 text-h2 font-bold text-white">
                        Antes de pagar, use três pedaços do produto
                    </h2>
                    <p className="mt-4 text-body text-white/70">
                        Não é vídeo nem print. São telas de verdade, funcionando, abertas para
                        qualquer pessoa.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {PROVAS.map(({ icone: Icone, titulo, texto, rotulo, href, tempo }) => (
                        <a
                            key={href}
                            href={href}
                            className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-primary-500/40 hover:bg-white/[0.07]"
                        >
                            <div className="flex items-center justify-between">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                                    <Icone size={20} aria-hidden="true" />
                                </span>
                                <span className="text-body-sm text-white/40">{tempo}</span>
                            </div>

                            <h3 className="mt-5 text-h4 font-bold text-white">{titulo}</h3>
                            <p className="mt-2 flex-1 text-body-sm leading-relaxed text-white/70">
                                {texto}
                            </p>

                            <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-primary-400">
                                {rotulo}
                                <ArrowRight
                                    size={16}
                                    aria-hidden="true"
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VejaPorDentro
