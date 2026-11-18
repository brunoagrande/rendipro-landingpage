// Molduras GENÉRICAS de notebook e celular, feitas em CSS (18/11/2026, gramática da
// Leruma adaptada ao fundo navy). Nada de moldura de marca: a da Apple só vale para app
// de loja e proíbe inclinar ou recortar. A tela dentro é sempre print REAL do app.
// 18/11: enquanto a imagem (lazy) carrega, a tela mostra uma prévia borrada dela, nunca preto.

function PreviaBorrada({ src }) {
    const previa = TELAS_PREVIA[src]
    if (!previa) return null
    return (
        <span
            aria-hidden="true"
            className="absolute inset-0 scale-110 bg-cover bg-top blur-lg"
            style={{ backgroundImage: `url(${previa})` }}
        />
    )
}

import { TELAS_PREVIA } from '../data/telasPrevia'

const SOMBRA_APARELHO = 'shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]'

export function Notebook({ src, width, height, alt, prioridade = false, className = '' }) {
    return (
        <figure className={`m-0 ${className}`}>
            <div className={`rounded-[18px_18px_6px_6px] bg-[#141a2b] px-[10px] pt-[10px] ${SOMBRA_APARELHO}`}>
                <div className="relative overflow-hidden rounded-t-[8px] bg-surface-950">
                    <PreviaBorrada src={src} />
                    <img
                        src={src}
                        width={width}
                        height={height}
                        alt={alt}
                        decoding="async"
                        {...(prioridade ? { fetchPriority: 'high' } : { loading: 'lazy' })}
                        className="relative block aspect-[16/10] w-full object-cover object-top"
                    />
                </div>
            </div>
            {/* base do notebook: um pouco mais larga que a tampa */}
            <div className="relative -mx-[6%] h-[12px] rounded-b-[14px] bg-gradient-to-b from-[#2a3247] to-[#151b2c] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.8)]">
                <div className="absolute left-1/2 top-0 h-[5px] w-[14%] -translate-x-1/2 rounded-b-[6px] bg-[#0d1220]" />
            </div>
        </figure>
    )
}

export function Celular({ src, width, height, alt, prioridade = false, className = '' }) {
    return (
        <figure className={`m-0 ${className}`}>
            <div className={`rounded-[16%/7.4%] bg-[#0b0f1a] p-[7px] ring-1 ring-white/15 ${SOMBRA_APARELHO}`}>
                <div className="relative overflow-hidden rounded-[13%/6%] bg-surface-950">
                    <PreviaBorrada src={src} />
                    <img
                        src={src}
                        width={width}
                        height={height}
                        alt={alt}
                        decoding="async"
                        {...(prioridade ? { fetchPriority: 'high' } : { loading: 'lazy' })}
                        className="relative block aspect-[9/19.5] w-full object-cover object-top"
                    />
                </div>
            </div>
        </figure>
    )
}
