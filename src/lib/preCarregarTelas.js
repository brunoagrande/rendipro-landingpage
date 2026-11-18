// 18/11/2026: na 1ª visita com rede lenta, as telas lazy das seções de baixo só começavam a
// baixar quando a pessoa rolava até elas, e os aparelhos ficavam vazios por segundos (relato
// do fundador). Depois que a página termina de carregar e o navegador fica ocioso, esta
// função troca para "eager" só as imagens lazy que estão RENDERIZADAS (as escondidas por
// md:hidden / hidden md:block não baixam). Assim o topo carrega primeiro, sem disputa, e as
// telas de baixo já estão prontas quando a pessoa chega nelas.
export function preCarregarTelas() {
    if (typeof window === 'undefined') return () => {}
    let cancelado = false
    const timers = []
    const carregar = () => {
        if (cancelado) return
        document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
            if (img.getClientRects().length > 0) img.loading = 'eager'
        })
    }
    const quandoOcioso = () => {
        const agenda = window.requestIdleCallback || ((fn) => setTimeout(fn, 200))
        agenda(carregar)
        // seções lazy podem montar depois do load: uma segunda passada pega as que faltaram
        timers.push(setTimeout(() => agenda(carregar), 3500))
    }
    if (document.readyState === 'complete') timers.push(setTimeout(quandoOcioso, 800))
    else window.addEventListener('load', () => timers.push(setTimeout(quandoOcioso, 800)), { once: true })
    return () => {
        cancelado = true
        timers.forEach(clearTimeout)
    }
}
