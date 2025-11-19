import { MetadataRoute } from 'next'
import { env } from '@/lib/env'
import { getCityDataFromUrl } from '@/lib/cityData'
import { getCanonicalUrl } from '@/lib/canonical-helper'
import { getAllBlogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const city = getCityDataFromUrl(env.SITE_URL)
  
  // Récupérer les articles de blog avec cleanCategory et cleanSlug
  const blogPosts = getAllBlogPosts()
  
  // Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl(),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getCanonicalUrl('services'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl(`services/demenagement-economique-${city.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getCanonicalUrl(`services/demenagement-standard-${city.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getCanonicalUrl(`services/demenagement-premium-${city.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getCanonicalUrl('partenaires'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: getCanonicalUrl('faq'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: getCanonicalUrl('contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: getCanonicalUrl('devis-gratuits'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Pages de quartiers (dynamique selon cityData)
  const neighborhoodPages: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl(city.slug),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...city.neighborhoods.map(neighborhood => ({
      url: getCanonicalUrl(`${city.slug}/${neighborhood.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  ]

  // Pages corridors (dynamique selon cityData)
  const corridorPages: MetadataRoute.Sitemap = city.corridors.map(corridor => ({
    url: getCanonicalUrl(corridor.slug),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Page principale du blog
  const blogMainPage: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl('blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Articles de blog
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: getCanonicalUrl(`blog/${post.cleanCategory}/${post.cleanSlug}`),
    lastModified: new Date(post.publish_date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: post.type === 'pilier' ? 0.9 : 0.7,
  }))

  return [
    ...staticPages, 
    ...neighborhoodPages, 
    ...corridorPages,
    ...blogMainPage, 
    ...blogPages
  ]
}
