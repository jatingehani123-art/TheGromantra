"use client"

import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogPost } from "@/lib/blog-data"

export default function BlogDetailClient({ 
  post, 
  relatedPosts 
}: { 
  post: BlogPost; 
  relatedPosts: BlogPost[] 
}) {
  return (
    <main className="bg-black min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay -z-10 pointer-events-none" />
      
      <Navbar />
      
      <article className="flex-1 pt-40 pb-24 relative z-10">
        <div className="max-w-[680px] mx-auto px-4 sm:px-6">
          
          {/* Meta Row */}
          <div className="flex items-center gap-4 mb-8 font-mono text-[10px] md:text-xs uppercase tracking-widest">
            <span className="text-[#5EC6FF] border border-[#5EC6FF]/30 bg-[#5EC6FF]/10 px-2 py-1 rounded">
              {post.category}
            </span>
            <span className="text-[rgba(255,255,255,0.5)]">{post.date}</span>
            <span className="text-[rgba(255,255,255,0.5)]">· {post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Hero Image */}
          <div className="w-full aspect-video bg-[#171A1F] border border-[#343C43] rounded-xl mb-12 flex items-center justify-center relative overflow-hidden group">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
            <div className="font-mono text-[#5EC6FF] text-xs tracking-[0.3em] relative z-10 glow-cyan">
              // TRANSMISSION_SECURE
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-invert prose-lg max-w-none font-sans leading-relaxed select-text">
            {post.content.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="mb-6 font-sans text-[rgba(255,255,255,0.8)] text-base md:text-lg leading-relaxed select-text">
                      {block.text}
                    </p>
                  );
                case "heading2":
                  return (
                    <h2 key={index} className="text-2xl sm:text-3xl font-display font-bold text-white mt-12 mb-6 select-text">
                      {block.text}
                    </h2>
                  );
                case "heading3":
                  return (
                    <h3 key={index} className="text-xl sm:text-2xl font-display font-bold text-white mt-10 mb-4 select-text">
                      {block.text}
                    </h3>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-disc pl-6 mb-8 text-[rgba(255,255,255,0.8)] space-y-3 font-sans select-text">
                      {block.items?.map((item, idx) => (
                        <li key={idx} className="leading-relaxed select-text">{item}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote key={index} className="border-l-2 border-[#5EC6FF] pl-6 my-10 italic text-[rgba(255,255,255,0.9)] bg-[#1D4ED8]/10 py-6 pr-4 rounded-r-lg select-text">
                      &quot;{block.text}&quot;
                      {block.author && (
                        <span className="block mt-2 text-xs font-mono text-[#5EC6FF] not-italic">— {block.author}</span>
                      )}
                    </blockquote>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Author Bio Card (E-E-A-T Signal) */}
          <div className="mt-16 p-6 rounded-xl border border-[#343C43] bg-[#171A1F]/50 backdrop-blur-md flex flex-col sm:flex-row gap-6 items-center select-text">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-16 h-16 rounded-full border border-[#5EC6FF] object-cover shrink-0" 
              onError={(e) => {
                // Fail-safe if image avatar fails
                e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
              }}
            />
            <div className="text-center sm:text-left select-text">
              <h4 className="text-white font-display font-bold text-lg mb-1 select-text">Written By {post.author.name}</h4>
              <p className="text-[#5EC6FF] font-mono text-xs uppercase mb-2 select-text">{post.author.role}</p>
              <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed select-text">{post.author.bio}</p>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-[#343C43] flex items-center justify-between">
            <Link href="/blog" className="text-[#5EC6FF] font-mono text-xs uppercase tracking-widest hover:glow-cyan transition-all flex items-center gap-2">
              <span className="rotate-180 inline-block">→</span> Back to Transmissions
            </Link>
          </div>

        </div>
      </article>

      {/* Related Posts Section */}
      <section className="border-t border-[#343C43] bg-[#050508] py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-display font-bold text-2xl text-white mb-10 uppercase">
            Related Transmissions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <Link key={relPost.slug} href={`/blog/${relPost.slug}`} className="block group">
                <div className="bg-[#171A1F] border border-[#343C43] rounded-xl p-6 transition-all duration-300 hover:border-[#5EC6FF]/50 hover:shadow-[0_0_20px_rgba(94,198,255,0.1)] h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#5EC6FF] mb-3 block">{relPost.category.toUpperCase()}</span>
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-[#5EC6FF] transition-colors mb-2">
                      {relPost.title}
                    </h4>
                    <p className="text-sm text-[rgba(255,255,255,0.6)] line-clamp-2">
                      {relPost.excerpt}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#5EC6FF]/70 mt-4 block">Read Transmission →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
