import { notFound } from "next/navigation"
import { POSTS_DATA } from "@/lib/blog-data"
import BlogDetailClient from "@/components/blog/blog-detail-client"

export async function generateStaticParams() {
  return Object.keys(POSTS_DATA).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS_DATA[slug]
  if (!post) return {}

  return {
    title: `${post.title} | GROMANTRA Blog`,
    description: post.excerpt,
    keywords: [post.category, "digital marketing", "growth strategy", "Jatin Gehani", "signal architecture"],
    alternates: { canonical: `https://thegromantra.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl, width: 1200, height: 630 }],
      type: "article",
      authors: [post.author.name],
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS_DATA[slug]

  if (!post) {
    notFound()
  }

  // Get related posts (all posts except current, max 3)
  const relatedPosts = Object.values(POSTS_DATA).filter((p) => p.slug !== slug).slice(0, 3)

  // JSON-LD Article structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "url": "https://thegromantra.com/about/jatin-gehani"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://thegromantra.com/#organization",
      "name": "GROMANTRA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thegromantra.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thegromantra.com/blog/${slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  )
}
