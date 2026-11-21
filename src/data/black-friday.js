// Black Friday 2026 (fundador e hormozi, 21/11/2026): faixa na landing NORMAL para quem viu o anúncio e volta direto
// em rendipro.com.br (sem o link). Ela só leva ao link `/blackfriday`; quem dá o desconto é a ficha do parceiro
// `blackfriday` no app. Fim = o mesmo da ficha (30/11 23h59 de Brasília). Depois disso a faixa some sozinha.
export const BLACK_FRIDAY_FIM = '2026-12-01T03:00:00Z'
export const BLACK_FRIDAY_LINK = '/blackfriday?utm_content=faixa-landing'

export function blackFridayNoAr(agora = new Date()) {
    return agora < new Date(BLACK_FRIDAY_FIM)
}
