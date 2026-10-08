import { motion } from 'framer-motion'
import { FileUp, Info } from 'lucide-react'
import { Eyebrow } from './ui/Eyebrow'
import { useSectionView } from '../lib/useSectionView'

/**
 * TragaOEdital: o caminho de quem não acha a prova no catálogo. Fica logo
 * depois do PlanoShowcase, que já cita o PDF numa frase; aqui ele ganha a
 * prova visual.
 *
 * Texto aprovado pelo fundador em 07/10/2026
 * (Marketing/landing/2026-10-07-mande-seu-edital/RASCUNHO-TEXTOS.md, item 3).
 * O que NÃO dizer: "lê qualquer PDF" (escaneado não vira texto, por isso a
 * nota) e "a IA monta sozinha" (o valor está na conferência).
 *
 * Telas REAIS, capturadas em 08/10/2026 em app.rendipro.com.br na conta de
 * demonstração, com o edital oficial dos Correios (Edital 270/2024, página 46).
 * A conferência mostra 38/38 porque é o que o app mostra para esse arquivo;
 * se a tela mudar, recapturar, nunca editar a imagem.
 */

const easeSpring = [0.16, 1, 0.3, 1]
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

function Tela({ src, alt, legenda, className = '' }) {
    return (
        <figure className={className}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-900 shadow-elevation-5">
                <img src={src} alt={alt} width="860" height="1260" className="block h-auto w-full" loading="lazy" decoding="async" />
            </div>
            <figcaption className="mt-3 text-center text-body-sm text-white/60">{legenda}</figcaption>
        </figure>
    )
}

export function TragaOEdital() {
    const sectionRef = useSectionView('traga-o-edital')

    return (
        <section ref={sectionRef} id="traga-o-edital" className="relative overflow-hidden py-14 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: easeSpring }}
                    className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
                >
                    <div className="lg:order-2">
                        <Eyebrow variant="primary" className="mb-4">
                            <FileUp size={14} />
                            Edital em PDF
                        </Eyebrow>
                        <h2 className="text-display-sm sm:text-display-md font-extrabold leading-tight tracking-tight text-white">
                            Sua prova ainda não está na lista?{' '}
                            <span className="text-gradient-primary">Traga o edital</span>.
                        </h2>
                        <p className="mt-4 text-body text-white/70">
                            Novos editais entram no catálogo toda semana. Se o seu ainda não chegou, não precisa esperar: importe o PDF do edital. Antes de começar a estudar, você confere o que o RendiPro leu: cada matéria, quantos tópicos ela tem e quanto do plano ela ocupa.
                        </p>
                        <p className="mt-5 flex items-start gap-2 text-body-sm text-white/60">
                            <Info size={15} className="mt-0.5 shrink-0 text-white/50" />
                            <span>Edital escaneado (só imagem) não dá para ler. Nesse caso, cole o texto do conteúdo programático e siga normalmente.</span>
                        </p>
                    </div>

                    {/* No celular só a conferência: duas telas lado a lado a
                        360px ficam ilegíveis. Do md para cima, as duas. */}
                    <div className="grid gap-5 md:grid-cols-2 lg:order-1">
                        <Tela
                            className="hidden md:block"
                            src="/screenshots/edital-pdf-paginas.webp"
                            alt="Passo do RendiPro que pergunta em que páginas está o conteúdo programático e mostra como a página 46 do edital começa: Anexo V, conteúdos programáticos"
                            legenda="Você confere a página antes da leitura."
                        />
                        <Tela
                            className="mx-auto w-full max-w-[340px] md:max-w-none"
                            src="/screenshots/edital-pdf-conferir.webp"
                            alt="Conferência do RendiPro: 38 de 38 itens do edital entraram no plano, com o aviso de que dá para desmarcar a matéria que não quer estudar agora, e Língua Portuguesa, Matemática, Noções de Informática, Conhecimentos Gerais e Código de Conduta, cada uma com seus tópicos e sua fatia do plano"
                            legenda="Depois, cada matéria antes de criar o plano."
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
