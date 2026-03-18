import { Helmet } from 'react-helmet-async'

/**
 * Componente reutilizável de SEO.
 * Gerencia title, description, Open Graph, Twitter Card, canonical e robots
 * dinamicamente para ambos os modos (beta com noindex / oficial com index).
 *
 * @param {string}  title       - Título da página (também usado no OG e Twitter)
 * @param {string}  description - Meta description (também OG e Twitter)
 * @param {string}  ogImage     - Caminho relativo da imagem OG (ex: "/og-beta.png")
 * @param {string}  canonical   - URL canônica completa (ex: "https://rendipro.com.br/")
 * @param {boolean} noindex     - Se true, instrui robôs a NÃO indexar a página
 */
export function SEOHead({
  title,
  description,
  ogImage = '/og-oficial.png',
  canonical = 'https://rendipro.com.br/',
  noindex = false,
}) {
  const robots = noindex ? 'noindex, nofollow' : 'index, follow'
  const ogImageUrl = `https://rendipro.com.br${ogImage}`

  return (
    <Helmet>
      {/* Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="rendiPRO" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  )
}
