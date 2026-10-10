/**
 * Brique `seo-identite` — faire comprendre à Google QUI tu es.
 *
 * Contexte : sur « Mouhamadou Diouf », Google mélange plusieurs homonymes
 * (dont un historien de Columbia, très bien référencé). Pour sortir devant
 * sur ton nom + ton domaine, il faut que Google relie sans ambiguïté ton
 * site, ton LinkedIn, ton GitHub et tes produits à UNE même entité.
 *
 * Outil : un bloc JSON-LD schema.org `Person` avec `sameAs` (tous tes
 * profils), `worksFor` / `founder` (Liggeyo, Auryntix…), plus un sitemap et
 * un robots.txt servis par l'app. Les produits (Liggeyo) publient en retour
 * un `Organization` avec `founder` pointant vers le même `@id` → le lien
 * est fait dans les deux sens.
 *
 * Usage (Next.js App Router) :
 *   // src/lib/identite.ts
 *   export const moi: Identite = { name: 'Mouhamadou Diouf', url: 'https://…', … }
 *   // src/app/layout.tsx, dans <body>
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd(moi)) }} />
 *   // src/app/sitemap.ts
 *   export default () => buildSitemap(moi.url, [{ path: '/', priority: 1 }, …])
 *   // src/app/robots.ts
 *   export default () => buildRobots(moi.url, { disallow: ['/api/'] })
 *
 * `jsonLdString` échappe `<` : un nom ou une description contenant
 * `</script>` ne peut pas casser la page (XSS).
 */

export interface Identite {
  name: string
  /** Variantes du nom (ex. « LeM », « Mouhamadou Diouf (LeM) »). */
  alternateName?: string[]
  /** URL canonique du site personnel — sert aussi d'identifiant (@id). */
  url: string
  jobTitle: string
  description: string
  image?: string
  email?: string
  /** TOUS les profils officiels : LinkedIn, GitHub, Malt, X, YouTube… */
  sameAs: string[]
  /** Organisations où la personne travaille. */
  worksFor?: Array<{ name: string; url: string }>
  /** Produits / entreprises fondés. */
  founderOf?: Array<{ name: string; url: string; description?: string }>
  alumniOf?: Array<{ name: string; url?: string }>
  knowsAbout?: string[]
  address?: { locality: string; country: string }
}

export const personId = (siteUrl: string) => `${siteUrl.replace(/\/+$/, '')}/#person`

export function personJsonLd(p: Identite): Record<string, unknown> {
  const id = personId(p.url)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': id,
    name: p.name,
    ...(p.alternateName?.length ? { alternateName: p.alternateName } : {}),
    url: p.url,
    jobTitle: p.jobTitle,
    description: p.description,
    ...(p.image ? { image: p.image } : {}),
    ...(p.email ? { email: `mailto:${p.email}` } : {}),
    sameAs: [...new Set(p.sameAs)],
    ...(p.worksFor?.length
      ? { worksFor: p.worksFor.map((o) => ({ '@type': 'Organization', name: o.name, url: o.url })) }
      : {}),
    ...(p.alumniOf?.length
      ? {
          alumniOf: p.alumniOf.map((o) => ({
            '@type': 'EducationalOrganization',
            name: o.name,
            ...(o.url ? { url: o.url } : {}),
          })),
        }
      : {}),
    ...(p.knowsAbout?.length ? { knowsAbout: p.knowsAbout } : {}),
    ...(p.address
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: p.address.locality,
            addressCountry: p.address.country,
          },
        }
      : {}),
  }
}

/**
 * JSON-LD d'un produit fondé (à poser sur liggeyo.com) : `founder` pointe
 * vers le même @id que le site perso — c'est ce lien croisé qui compte.
 */
export function organizationJsonLd(
  org: { name: string; url: string; description?: string; logo?: string; sameAs?: string[] },
  founderSiteUrl: string,
  founderName: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${org.url.replace(/\/+$/, '')}/#organization`,
    name: org.name,
    url: org.url,
    ...(org.description ? { description: org.description } : {}),
    ...(org.logo ? { logo: org.logo } : {}),
    ...(org.sameAs?.length ? { sameAs: org.sameAs } : {}),
    founder: { '@type': 'Person', '@id': personId(founderSiteUrl), name: founderName, url: founderSiteUrl },
  }
}

/** Sérialise pour <script type="application/ld+json"> sans risque d'injection. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replaceAll(String.fromCharCode(0x2028), '\\u2028')
    .replaceAll(String.fromCharCode(0x2029), '\\u2029')
}

// Formes compatibles avec MetadataRoute.Sitemap / MetadataRoute.Robots de
// Next.js, sans importer `next` (la brique reste testable seule).
export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export interface SitemapRoute {
  path: string
  lastModified?: Date | string
  changeFrequency?: ChangeFrequency
  priority?: number
  /** true = page en noindex : JAMAIS dans le sitemap (piège classique). */
  noindex?: boolean
}

export function buildSitemap(baseUrl: string, routes: SitemapRoute[]) {
  const base = baseUrl.replace(/\/+$/, '')
  const seen = new Set<string>()
  return routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const path = r.path.startsWith('/') ? r.path : `/${r.path}`
      if (r.priority !== undefined && (r.priority < 0 || r.priority > 1)) {
        throw new Error(`priority hors [0,1] pour ${path}`)
      }
      return {
        url: path === '/' ? base : `${base}${path}`,
        ...(r.lastModified ? { lastModified: r.lastModified } : {}),
        ...(r.changeFrequency ? { changeFrequency: r.changeFrequency } : {}),
        ...(r.priority !== undefined ? { priority: r.priority } : {}),
      }
    })
    .filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)))
}

export function buildRobots(baseUrl: string, opts: { disallow?: string[]; allowAi?: boolean } = {}) {
  const base = baseUrl.replace(/\/+$/, '')
  return {
    rules: [{ userAgent: '*', allow: '/', ...(opts.disallow?.length ? { disallow: opts.disallow } : {}) }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
