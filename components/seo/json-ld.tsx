import React from "react"

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GROMANTRA",
    "url": "https://thegromantra.com",
    "logo": "https://thegromantra.com/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Jatin Gehani"
    },
    "sameAs": [
      "https://x.com/gromantra",
      "https://www.linkedin.com/in/the-gromantra",
      "https://www.instagram.com/gromantraa?igsh=MXA5NnUzbGRqaWVmcA=="
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GROMANTRA",
    "url": "https://thegromantra.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://thegromantra.com/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": [post.imageUrl],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "GROMANTRA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thegromantra.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thegromantra.com/blog/${post.slug}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({ name, description, slug }: { name: string; description: string; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": name,
    "provider": {
      "@type": "Organization",
      "name": "GROMANTRA",
      "url": "https://thegromantra.com"
    },
    "description": description,
    "url": `https://thegromantra.com/services/${slug}`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
