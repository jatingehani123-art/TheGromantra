import { MetadataRoute } from "next"
import { POSTS_DATA } from "@/lib/blog-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gromantra.studio"

  // 1. Static site routes
  const routes = ["", "/about", "/contact", "/services", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  // 2. Dynamic services routes
  const services = ["seo", "social-media", "web-development", "performance-marketing", "branding"]
  const serviceRoutes = services.map((id) => ({
    url: `${baseUrl}/services/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // 3. Dynamic blog posts routes
  const blogRoutes = Object.keys(POSTS_DATA).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(), // Using current date or specific metadata dates
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...routes, ...serviceRoutes, ...blogRoutes]
}
