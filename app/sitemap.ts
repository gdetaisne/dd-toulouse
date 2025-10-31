import { MetadataRoute } from 'next'
import { env } from '@/lib/env'
import { getCityDataFromUrl } from '@/lib/cityData'
import { getCanonicalUrl } from '@/lib/canonical-helper'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Fonction pour lire les articles de blog de la ville
function getCityBlogPosts() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  
  if (!fs.existsSync(blogDirectory)) {
    console.warn('Blog directory not found:', blogDirectory)
    return []
  }
  
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const allPosts: any[] = []

  categories.forEach(category => {
    const categoryPath = path.join(blogDirectory, category)
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md')

    files.forEach(file => {
      const filePath = path.join(categoryPath, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      allPosts.push({
        slug: data.slug || file.replace('.md', ''),
        title: data.title,
        category: category,
        type: data.type || 'satellite',
        publish_date: data.publish_date || data.date || new Date().toISOString().split('T')[0]
      })
    })
  })

  return allPosts.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
}

export default function sitemap(): MetadataRoute.Sitemap {
  const city = getCityDataFromUrl(env.SITE_URL)
  
  // Récupérer les articles de blog de la ville
  const blogPosts = getCityBlogPosts()
  
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
      url: getCanonicalUrl('inventaire-ia'),
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
    url: getCanonicalUrl(`blog/${post.category}/${post.slug}`),
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
