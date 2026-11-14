import { ArrowRight } from 'lucide-react'
import { StatBlock } from './ui/StatBlock'
import { useSectionView } from '../lib/useSectionView'

/**
 * TrustStrip — funde TrustBar (números) + LogoMarquee (exames) em uma seção só.
 * Animado via CSS puro (sem framer-motion no path crítico).
 */

// ⚠️ NÃO apontar para /editais/previstos: aquela página é dos editais que ainda
// vão sair. /editais/por-area abre em "todos" sem precisar de parâmetro.
const CATALOGO = 'https://app.rendipro.com.br/editais/por-area?rp_origem=trust_strip'

export function TrustStrip() {
    const sectionRef = useSectionView('trust_strip')
    return (
        <section
            ref={sectionRef}
            aria-label="Catálogo de editais do RendiPro"
            className="border-y border-white/5 bg-surface-950/50 py-8 backdrop-blur-sm sm:py-12"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 3 stats. "8.000 flashcards prontos" saiu em 23/10/2026: os baralhos
                    prontos são de ENEM e vestibular, e a página é de concurso. */}
                <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 animate-fade-in-up">
                    {/* Ordem pela regua do porque (16/09/2026): os numeros provam o H1
                        (organizacao automatica), nao fazem inventario. "0 a 1000 de
                        nota" saiu: e a escala de qualquer correcao, nao um numero nosso.
                        30/10/2026 (auditoria hormozi): "2 min" virou 5 (mediana real no
                        banco: 4,7 min).
                        14/11/2026: o "+250 editais, novos toda semana" SAIU. 121 dos 268
                        editais do catálogo já tinham prova passada, o app mostra outra
                        contagem (concursos agrupados) e não entrou edital novo em 02/11 nem
                        em 09/11. Fundador escolheu a promessa sem número ("qualquer edital
                        vira plano"). Não voltar com contagem de catálogo aqui. */}
                    <StatBlock
                        value={5}
                        prefix=""
                        suffix=" min"
                        label="para montar o plano"
                    />
                    <StatBlock
                        value={3}
                        prefix=""
                        label="cronogramas em paralelo"
                    />
                </div>

                {/* Só concurso (auditoria hormozi, 30/10/2026): os chips de 6 públicos
                    (Residência Médica e provas escolares com zero editais no catálogo)
                    diziam ao concurseiro que a página não era bem para ele. O link do
                    catálogo veio da seção de telas de teste, que saiu. */}
                <div
                    className="mt-10 border-t border-white/5 pt-8 text-center animate-fade-in"
                    style={{ animationDelay: '200ms' }}
                >
                    <p className="text-h3 sm:text-h2 font-bold tracking-tight text-white">
                        Feito para <span className="text-gradient-primary">concurso</span>.
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-body text-white/70">
                        Não achou o seu edital? Mande o PDF e o RendiPro monta o plano com ele.
                    </p>
                    <a
                        href={CATALOGO}
                        className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-body font-semibold text-primary-400 transition-colors hover:text-primary-300"
                    >
                        Procure o seu edital
                        <ArrowRight size={16} className="shrink-0" />
                    </a>
                </div>
            </div>
        </section>
    )
}
