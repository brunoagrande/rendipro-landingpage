import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { isFoundersActive } from '../lib/founders'

const InfluencerContext = createContext()

export function InfluencerProvider({ children }) {
    const [influencerData, setInfluencerData] = useState(null)
    const [isLoadingInfluencer, setIsLoadingInfluencer] = useState(true)
    const [isInvalidOrExpired, setIsInvalidOrExpired] = useState(false)

    useEffect(() => {
        async function fetchInfluencer() {
            try {
                // Capturar o slug da URL (?ref=slug)
                const urlParams = new URLSearchParams(window.location.search)
                let slug = urlParams.get('ref')

                // Ou pela rota (/i/slug) caso necessário
                if (!slug && window.location.pathname.startsWith('/i/')) {
                    const parts = window.location.pathname.split('/')
                    if (parts.length >= 3) {
                        slug = decodeURIComponent(parts[2])
                    }
                }

                console.log("InfluencerContext: Slug parsed from URL ->", slug);

                if (!slug) {
                    setIsLoadingInfluencer(false)
                    return
                }

                const { data, error } = await supabase
                    .from('tbcupons')
                    .select('desconto_porcentagem, desconto_valor_fixo, nome_influencer, data_expiracao, slug')
                    .eq('slug', slug)
                    .eq('tipo', 'influencer')
                    .eq('ativo', true)
                    .single()

                if (error) {
                    if (error.code === 'PGRST116') {
                        setIsInvalidOrExpired(true) // Not found
                    } else {
                        throw error
                    }
                } else if (data) {
                    // Validar se não está expirado
                    const dataExpiracao = new Date(data.data_expiracao)
                    if (dataExpiracao > new Date()) {
                        setInfluencerData(data)
                    } else {
                        setIsInvalidOrExpired(true) // Expired
                    }
                }
            } catch (err) {
                console.error('Erro ao buscar cupom:', err.message)
                // Se der erro de query, também consideramos inválido
                setIsInvalidOrExpired(true)
            } finally {
                setIsLoadingInfluencer(false)
            }
        }

        fetchInfluencer()
    }, [])

    const dismissInvalidModal = () => {
        setIsInvalidOrExpired(false)
        // Remove from URL without reloading
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.delete('ref')
        const newUrl = window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : '') + window.location.hash
        window.history.replaceState({}, '', newUrl)
    }

    const applyDiscount = (originalPriceCents) => {
        if (!influencerData) return originalPriceCents

        let newPrice = originalPriceCents

        // Priorizar a porcentagem se ambos vierem (ou você pode ajustar a regra de negócio)
        if (influencerData.desconto_porcentagem > 0) {
            newPrice = originalPriceCents * (1 - (influencerData.desconto_porcentagem / 100))
        } else if (influencerData.desconto_valor_fixo > 0) {
            // Assumiremos que desconto_valor_fixo está em REAIS, então precisamos converter para centavos
            const descontoCentavos = Math.round(influencerData.desconto_valor_fixo * 100)
            newPrice = Math.max(0, originalPriceCents - descontoCentavos)
        }

        return Math.round(newPrice)
    }

    const getCheckoutUrl = (baseUrl) => {
        // Parâmetros de atribuição que devem ser propagados ao checkout para
        // que o Meta/Google consigam fechar o loop de conversão. Sem isso, a
        // verba paga é gasta às cegas — o anúncio que trouxe a venda fica órfão.
        const TRACKING_PARAMS = [
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
            'fbclid', 'gclid', 'gad_source', 'gbraid', 'wbraid', 'msclkid', 'ttclid',
        ]

        try {
            const url = new URL(baseUrl)

            if (typeof window !== 'undefined') {
                const currentParams = new URLSearchParams(window.location.search)
                TRACKING_PARAMS.forEach((param) => {
                    const value = currentParams.get(param)
                    if (value && !url.searchParams.has(param)) {
                        url.searchParams.append(param, value)
                    }
                })

                // Fallback: fbclid pode ter sumido da URL se o usuário navegou
                // pela landing antes de clicar no CTA. Recupera do localStorage
                // onde foi salvo no carregamento inicial (index.html).
                if (!url.searchParams.has('fbclid')) {
                    try {
                        const raw = localStorage.getItem('rp_landing_fbclid')
                        if (raw) {
                            const parsed = JSON.parse(raw)
                            if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
                                url.searchParams.append('fbclid', parsed.value)
                            } else {
                                localStorage.removeItem('rp_landing_fbclid')
                            }
                        }
                    } catch (_) {}
                }

                // _fbp: cookie criado pelo Pixel. O app repassa ao CAPI server-side
                // para melhorar a qualidade de correspondência da atribuição.
                try {
                    const match = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/)
                    if (match && !url.searchParams.has('_fbp')) {
                        url.searchParams.append('_fbp', match[1])
                    }
                } catch (_) {}
            }

            if (influencerData?.slug) {
                url.searchParams.append('influencerSlug', influencerData.slug)
            }

            // Durante a janela da promo Fundadores, qualquer CTA que não
            // carregue cupom próprio (founder= ou cupom=) ganha founder=true
            // — assim o desconto vale pra qualquer caminho do funil, não
            // só pra quem clicou no card da seção Fundadores.
            const hasOwnCoupon = url.searchParams.has('founder') || url.searchParams.has('cupom')
            if (!hasOwnCoupon && !influencerData?.slug && isFoundersActive()) {
                url.searchParams.append('founder', 'true')
            }

            return url.toString()
        } catch (e) {
            // Fallback para URLs malformadas (caso raríssimo)
            if (!influencerData?.slug) return baseUrl
            const separator = baseUrl.includes('?') ? '&' : '?'
            return `${baseUrl}${separator}influencerSlug=${influencerData.slug}`
        }
    }

    return (
        <InfluencerContext.Provider value={{
            influencerData,
            isLoadingInfluencer,
            isInvalidOrExpired,
            dismissInvalidModal,
            applyDiscount,
            getCheckoutUrl
        }}>
            {children}
        </InfluencerContext.Provider>
    )
}

export function useInfluencer() {
    return useContext(InfluencerContext)
}
