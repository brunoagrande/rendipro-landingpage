import { Helmet } from 'react-helmet-async'
import { faqItems } from '../data/faq-data'

/**
 * Injeta dados estruturados JSON-LD no <head> via react-helmet-async.
 * Inclui 3 schemas: Organization, SoftwareApplication e FAQPage.
 *
 * Usar apenas na landing oficial (BETA_MODE=false).
 * O FAQPage é gerado automaticamente de faq-data.js — nunca fica desatualizado.
 */
export function SchemaMarkup() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'rendiPRO',
    url: 'https://rendipro.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://app.rendipro.com.br/buscar?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'rendiPRO',
    url: 'https://rendipro.com.br',
    logo: 'https://rendipro.com.br/logo.png',
    description: 'Plataforma de estudos com IA para vestibular, ENEM e concursos públicos.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'contato@rendipro.com.br',
    },
    foundingDate: '2024',
    sameAs: [
      'https://www.instagram.com/rendipro',
      'https://www.twitter.com/rendipro',
      'https://www.linkedin.com/company/rendipro',
      'https://www.youtube.com/@rendipro',
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'rendiPRO',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    url: 'https://rendipro.com.br',
    description: 'Plataforma de organização de estudos com IA: flashcards com repetição espaçada, cronograma automático, questões comentadas e correção de redações.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: '14.99',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  )
}
