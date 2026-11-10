import { ShieldCheck } from 'lucide-react'
import { useSectionView } from '../lib/useSectionView'
import { CAMPANHA_ANUAL_ATIVA } from '../data/campanha-anual'

export function Garantia() {
    const sectionRef = useSectionView('garantia')
    return (
        <section ref={sectionRef} className="py-16 md:py-20">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-white/10 bg-surface-900 p-7 text-center md:p-10">
                    <ShieldCheck
                        size={30}
                        className="mx-auto rounded-2xl bg-primary-500/15 p-4 box-content text-primary-400"
                    />
                    <h2 className="mt-5 text-display-md font-extrabold text-white">Garantia de 7 dias</h2>
                    {CAMPANHA_ANUAL_ATIVA ? (
                        <>
                            <p className="mx-auto mt-4 max-w-2xl text-body-lg leading-relaxed text-white/80">
                                Monte o plano, estude os primeiros dias e veja o seu dia decidido na tela. Se nessa semana o
                                RendiPro não for para você, você sai sem pagar nada.
                            </p>
                            <p className="mt-4 text-body-sm text-white/55">
                                No cartão, nada é cobrado nesses 7 dias. No Pix, o dinheiro volta inteiro.
                            </p>
                        </>
                    ) : (
                        /* Oferta nova (09/11/2026): o cartão cobra no dia da compra. A
                           garantia vira reversão de risco. 10/11/2026: o fundador aprovou a
                           garantia com PROMESSA DE RESULTADO, mesmos 7 dias e a mesma devolução.
                           ⚠ A devolução continua SEM condição (termos do anual, item 4: "o
                             cancelamento é livre"): a frase promete o resultado, não pede prova.
                             Cancelar por qualquer motivo nos 7 dias devolve tudo. */
                        <>
                            <p className="mx-auto mt-4 max-w-2xl text-body-lg leading-relaxed text-white/80">
                                Use 7 dias. Se não ficar mais fácil saber o que estudar, devolvemos tudo.
                            </p>
                            <p className="mt-4 text-body-sm text-white/55">
                                É só cancelar no app. Depois do 7º dia, o plano segue pelos 12 meses.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
