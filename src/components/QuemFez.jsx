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
        <section ref={sectionRef} className="py-10 md:py-14">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Celular: foto pequena ao lado do rótulo, texto na largura toda. Computador: foto à esquerda. */}
                <article className="grid grid-cols-[56px_1fr] items-center gap-x-4 gap-y-3 rounded-2xl border border-white/10 bg-surface-900/70 p-5 md:grid-cols-[88px_1fr] md:items-start md:gap-x-6 md:gap-y-0 md:p-6">
                    <img
                        src="/bruno-grande.webp"
                        width="320"
                        height="320"
                        loading="lazy"
                        decoding="async"
                        alt="Bruno Grande, fundador do RendiPro"
                        className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15 md:row-span-2 md:h-[88px] md:w-[88px]"
                    />
                    <h2 className="text-micro font-bold uppercase tracking-[0.14em] text-accent-300 md:mt-1">Quem fez o RendiPro</h2>
                    <div className="col-span-2 md:col-span-1 md:col-start-2">
                        <p className="mt-3 text-body leading-relaxed text-white/70">
                            Sou o Bruno Grande e trabalho com software desde 2013. Criei o RendiPro depois de ver de
                            perto alguém estudar anos para concurso e perder horas toda semana refazendo cronograma.
                        </p>
                        <p className="mt-3 text-body leading-relaxed text-white/70">
                            Aqui não tem aula nem apostila: você segue com o seu curso e o seu material, e o RendiPro
                            organiza o resto.
                        </p>
                        <p className="mt-3 text-body leading-relaxed text-white/70">
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
                        <p className="mt-4 text-body-sm font-semibold text-white">
                            Bruno Grande, fundador do RendiPro
                            <a
                                href={LINKEDIN}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackLinkedinClick('quem_fez')}
                                aria-label="Perfil de Bruno Grande no LinkedIn"
                                title="LinkedIn"
                                className="ml-2 inline-flex rounded-[4px] align-[-4px] opacity-90 transition hover:opacity-100"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                                    <rect width="24" height="24" rx="4" fill="#0A66C2" />
                                    <path
                                        fill="#fff"
                                        d="M7.1 9.5h-2.6V18h2.6V9.5zM5.8 5.4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM18.6 13.3c0-2.3-.5-4-3.2-4-1.3 0-2.2.7-2.5 1.4h-.04V9.5h-2.5V18h2.6v-4.2c0-1.1.2-2.2 1.6-2.2 1.4 0 1.4 1.3 1.4 2.3V18h2.6v-4.7z"
                                    />
                                </svg>
                            </a>
                        </p>
                    </div>
                </article>
            </div>
        </section>
    )
}
