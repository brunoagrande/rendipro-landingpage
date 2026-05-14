import { cn } from '../lib/utils'

/**
 * Marquee horizontal infinito de provas/exames cobertos.
 * Substitui o "TrustBar de exames" antigo (que era estático).
 *
 * Padrão Stripe (logos de clientes) adaptado para "logos de provas".
 * CSS-only animation (sem JS) — performance-friendly.
 *
 * O array é duplicado pra criar loop seamless via translateX(-50%).
 * Pausa no hover (desktop). Em mobile, pausa por toque longo (opcional).
 *
 * Edge mask gradient (linear-gradient transparente → opaco → transparente)
 * cria o efeito "fade nas pontas" típico de marquees premium.
 */

const EXAMES = [
    'ENEM',
    'FUVEST',
    'UNICAMP',
    'UFRGS',
    'UNESP',
    'UFRJ',
    'OAB',
    'Residência Médica',
    'PF',
    'INSS',
    'TJ',
    'Banco do Brasil',
    'Caixa',
    'Receita Federal',
]

export function LogoMarquee({ className }) {
    // Duplicamos a lista 2x para criar o loop infinito sem "salto" visual.
    // O CSS animate-marquee translada de 0 a -50% (que é exatamente o ponto
    // onde o segundo set começa do início), criando continuidade.
    const items = [...EXAMES, ...EXAMES]

    return (
        <section
            aria-label="Provas e exames cobertos pelo RendiPro"
            className={cn('relative py-8 border-b border-white/5', className)}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="mb-6 text-center text-micro font-semibold uppercase tracking-widest text-white/40">
                    Do ENEM ao concurso federal — um cronograma que se adapta ao seu edital
                </p>

                <div
                    className="relative overflow-hidden"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                    }}
                >
                    <div
                        className="flex w-max gap-12 sm:gap-16"
                        style={{ animation: 'marquee 32s linear infinite' }}
                    >
                        {items.map((exame, i) => (
                            <span
                                key={i}
                                className="flex shrink-0 items-center text-h3 font-bold tracking-tight text-white/35 transition-colors hover:text-white/60"
                                aria-hidden={i >= EXAMES.length ? 'true' : undefined}
                            >
                                {exame}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
