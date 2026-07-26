"use client"

import { useState } from "react"
import Link from "next/link"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
}

export default function BlogIndexClient({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All Transmissions")

  const categories = ["All Transmissions", "SEO", "Social Media", "Web Development", "Performance Marketing", "Branding"]

  const filteredPosts = selectedCategory === "All Transmissions"
    ? posts
    : posts.filter(post => {
        const cat = post.category.toLowerCase();
        const sel = selectedCategory.toLowerCase();
        return cat === sel || cat.includes(sel) || sel.includes(cat);
      })

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const formatBlogDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const month = months[parseInt(parts[1], 10) - 1] || "";
    return `${month} ${parts[2]}, ${parts[0]}`;
  };

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((tag) => {
          const isActive = selectedCategory === tag
          return (
            <button
              key={tag}
              onClick={() => setSelectedCategory(tag)}
              className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                isActive
                  ? "bg-[#1D4ED8] border-[#5EC6FF] text-white glow-blue"
                  : "bg-[#171A1F] border-[#343C43] text-[rgba(255,255,255,0.7)] hover:border-[#5EC6FF] hover:text-[#5EC6FF]"
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full group relative z-50 cursor-pointer">
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#343c43] p-2 transition-transform duration-500 hover:-translate-y-2">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-[#343c43] bg-black p-6 transition-colors duration-500 group-hover:border-[#5ec6ff]/30">
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(94, 198, 255, 0.05))", zIndex: -10, pointerEvents: 'none' }} />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-[#5EC6FF] border border-[#5EC6FF]/30 bg-[#5EC6FF]/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] text-[rgba(255,255,255,0.5)]">
                      {formatBlogDate(post.date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#5ec6ff] transition-colors duration-300 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm font-sans text-[rgba(255,255,255,0.6)] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 flex items-center text-[#5EC6FF] font-mono text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                  Read Transmission <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
