import { useSectionView } from '../lib/useSectionView'
import { trackLinkedinClick, trackWhatsappClick } from '../lib/tracking'

// 18/11/2026: no lugar da seção da Jessica (saiu em f0e3457). Texto = opção A, aprovada pelo
// hormozi e escolhida pelo fundador. Regras: a Jessica não aparece (nem nome, nem relação);
// nada de preço, plano, resultado ou "me chama" (não pode parecer empresa de uma pessoa só,
// nem inventar equipe). O WhatsApp é o mesmo número do suporte do app (src/config/suporte.js).
const WHATSAPP = '5511974047168'
const MENSAGEM = 'Oi! Vim do site e tenho uma dúvida antes de assinar.'
// LinkedIn: incluído a pedido do fundador (18/11) depois de atualizar o perfil (Fundador do RendiPro
// na Successus Tecnologia Digital). Abre em outra aba, para a landing continuar aberta.
const LINKEDIN = 'https://www.linkedin.com/in/bruno-grande-694b4649'
const LINK_WHATSAPP = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`

export function QuemFez() {
    const sectionRef = useSectionView('quem_fez')
    return (
        <section ref={sectionRef} className="py-16 md:py-20">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <article className="grid items-start gap-6 rounded-3xl border border-white/10 bg-surface-900 p-6 md:grid-cols-[150px_1fr] md:gap-8 md:p-8">
                    <img
                        src="/bruno-grande.webp"
                        width="320"
                        height="320"
                        loading="lazy"
                        decoding="async"
                        alt="Bruno Grande, fundador do RendiPro"
                        className="h-28 w-28 rounded-2xl object-cover md:h-[150px] md:w-[150px]"
                    />
                    <div>
                        <h2 className="text-h2 font-bold text-white">Quem fez o RendiPro</h2>
                        <p className="mt-3 text-body-lg leading-relaxed text-white/80">
                            Sou o Bruno Grande e trabalho com software desde 2013. Criei o RendiPro depois de ver de
                            perto alguém estudar anos para concurso e perder horas toda semana refazendo cronograma.
                        </p>
                        <p className="mt-3 text-body-lg leading-relaxed text-white/80">
                            Aqui não tem aula nem apostila: você segue com o seu curso e o seu material, e o RendiPro
                            organiza o resto.
                        </p>
                        <p className="mt-3 text-body-lg leading-relaxed text-white/80">
                            Se em 7 dias não for o que você queria, cancele no app e a devolução é automática. Dúvida
                            antes de assinar?{' '}
                            <a
                                href={LINK_WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsappClick('quem_fez')}
                                className="font-semibold text-white underline underline-offset-4"
                            >
                                Chame no WhatsApp.
                            </a>
                        </p>
                        <p className="mt-5 border-t border-white/10 pt-4 font-semibold text-white">
                            Bruno Grande, fundador do RendiPro
                            <span className="font-normal text-white/40"> · </span>
                            <a
                                href={LINKEDIN}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackLinkedinClick('quem_fez')}
                                className="font-normal text-white/70 underline underline-offset-4 hover:text-white"
                            >
                                LinkedIn
                            </a>
                        </p>
                    </div>
                </article>
            </div>
        </section>
    )
}
