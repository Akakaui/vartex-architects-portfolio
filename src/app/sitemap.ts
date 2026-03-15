import { MetadataRoute } from 'next'
import { getAllProjects } from '@/sanity/lib/service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vartex.pro'
  
  // Static routes
  const routes = [
    '',
    '/portfolio',
    '/about',
    '/contact',
    '/process',
    '/capabilities',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  try {
    const projects = await getAllProjects()
    const projectRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
    
    return [...routes, ...projectRoutes]
  } catch (error) {
    return routes
  }
}
