/**
 * Cortesia de 7 dias no cadastro (fundador, 16/10/2026).
 *
 * Todo cadastro novo nasce com 7 dias grátis do Starter, sem cartão. Quem cria a
 * cortesia é o app (gatilho no banco, ligado pela chave
 * `cortesia_cadastro_campanha` em `rendipro_config`). Plano completo em
 * `Projetos/Rendipro/.agent/cortesia-7d-cadastro/PLANO.md`.
 *
 * ⚠⚠ ESTA CONSTANTE E A CHAVE DO APP ANDAM JUNTAS, E A ORDEM IMPORTA.
 *   - Ligar: o app primeiro (chave ligada em prod), a landing depois.
 *   - Desligar: a landing volta PRIMEIRO (ativa: false + deploy), depois a chave.
 *   A landing nunca pode prometer "7 dias grátis" com a chave do app desligada:
 *   a pessoa cairia num checkout que ela não esperava.
 *
 * Soma com a campanha do anual (decisão do fundador: "a cortesia é cortesia").
 * Quem assinar depois, com a campanha no ar, ganha o 1º mês grátis do anual.
 *
 * ⛔ Sem linha de "condição" (do tipo "acabaram os 7 dias e não quis assinar? não
 * paga nada"): o fundador VETOU em 16/10/2026, achou estranha. "Sem cartão" já diz
 * que não há cobrança. Não recolocar sem falar com ele.
 */
// ⚠ Nasce DESLIGADA no repositório (revisão de 16/10): o Vercel publica a landing
// a cada push, e um push antes de a chave do app ser ligada já prometeria "grátis".
// Vira `true` só no último passo da ordem de ligar.
export const CORTESIA_CADASTRO = {
    ativa: false,
    dias: 7,
}

export const CORTESIA_CADASTRO_ATIVA = CORTESIA_CADASTRO.ativa

/** Curta, para microcopy embaixo de botão e banner. */
export const CORTESIA_FRASE = `${CORTESIA_CADASTRO.dias} dias grátis, sem cartão`

