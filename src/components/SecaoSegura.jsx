import { Component } from 'react'

/**
 * Protege a página contra a falha de UMA seção carregada sob demanda (lazy).
 *
 * Por quê (22/10/2026, gravação do Clarity): uma visitante vinda do Instagram
 * pediu `/assets/AiSuite-BNmL8Wvp.js`, que já não existia (404) porque a landing
 * tinha sido publicada de novo e os nomes dos arquivos mudam a cada publicação.
 * Sem nenhum ErrorBoundary, o erro de UMA seção desmontava a página inteira,
 * inclusive o Hero, e ela saiu em 5 segundos.
 *
 * Agora: se for falha de arquivo (versão velha ou rede ruim), recarrega a página
 * UMA vez para pegar a versão atual. Se não der (já recarregou há pouco, ou
 * outro tipo de erro), só aquela seção some e o resto continua de pé.
 */

const CHAVE = 'rp_recarregou_por_secao'
const JANELA_MS = 5 * 60 * 1000

const FALHA_DE_ARQUIVO = /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS|ChunkLoadError/i

export function ehFalhaDeArquivo(erro) {
    return FALHA_DE_ARQUIVO.test(String(erro?.message ?? erro ?? ''))
}

/**
 * Recarrega a página no máximo uma vez a cada 5 minutos. Devolve true se
 * recarregou. Sem sessionStorage (aba anônima, bloqueio), NÃO recarrega:
 * sem a trava, um arquivo que falha sempre viraria laço infinito.
 */
export function recarregarUmaVez() {
    try {
        const ultima = Number(window.sessionStorage.getItem(CHAVE) || 0)
        if (Date.now() - ultima < JANELA_MS) return false
        window.sessionStorage.setItem(CHAVE, String(Date.now()))
    } catch {
        return false
    }
    window.location.reload()
    return true
}

export class SecaoSegura extends Component {
    constructor(props) {
        super(props)
        this.state = { falhou: false }
    }

    static getDerivedStateFromError() {
        return { falhou: true }
    }

    componentDidCatch(erro) {
        const arquivo = ehFalhaDeArquivo(erro)
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'secao_falhou', {
                section_name: this.props.nome,
                reason: arquivo ? 'arquivo' : 'outro',
            })
        }
        if (arquivo) recarregarUmaVez()
    }

    render() {
        return this.state.falhou ? null : this.props.children
    }
}
