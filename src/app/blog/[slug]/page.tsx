import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import CTABanner from "@/components/CTABanner";

import { blogService } from "@/services/blogService";
import { getAssetUrl } from "@/config/apiConfig";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await blogService.getAllBlogs();
  const blog = res.data?.find((b) => b.slug === params.slug);
  
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: blog.metaTitle || `${blog.title} | ACE Sports Tech`,
    description: blog.metaDescription || blog.excerpt || blog.content.substring(0, 100),
    keywords: blog.metaKeywords ? blog.metaKeywords.split(',') : undefined,
    alternates: blog.canonicalUrl ? { canonical: blog.canonicalUrl } : undefined,
  };
}

export async function generateStaticParams() {
  const res = await blogService.getAllBlogs();
  if (!res.data) return [];
  return res.data.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const res = await blogService.getAllBlogs();
  const blog = res.data?.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const dateStr = blog.publishDate || blog.createdAt;
  const date = dateStr ? new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : "Recent";
  const author = blog.authorName || blog.created_by || "Admin";
  const otherBlogs = (res.data || []).filter((b) => b.slug !== params.slug);

  return (
    <>
      <article className="min-min-h-[80vh] bg-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#007AFF] text-sm font-bold uppercase tracking-widest hover:text-slate-800 transition-colors bg-slate-50 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm w-fit">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-8">
              
              {/* 1. Photo */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-12">
                <img src={getAssetUrl(blog.featured_image) || "https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070"} alt={blog.title} className="w-full h-auto max-h-[500px] object-cover" />
              </div>

              {/* 2. Author DP & Name */}
              <div className="flex flex-wrap items-center gap-6 text-slate-600 text-sm mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {blog.authorImg ? (
                    <img src={getAssetUrl(blog.authorImg) || ""} alt={author} className="w-12 h-12 rounded-full object-cover border-2 border-[#007AFF]" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-[#007AFF]">
                      <User size={24} className="text-[#007AFF]" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-base">{author}</span>
                    {blog.authorRole && <span className="text-[11px] text-slate-500 font-bold tracking-widest uppercase">{blog.authorRole}</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 ml-auto">
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar size={16} className="text-[#007AFF]" />
                    {date}
                  </div>
                  {blog.readTime && (
                    <div className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"></span>
                      {blog.readTime}
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-tight mb-12">
                {blog.title}
              </h1>

              {/* 4. Description */}
              <div className="prose prose-lg prose-slate max-w-none">
                {blog.excerpt && (
                  <p 
                    className="text-xl md:text-2xl text-slate-800 font-bold leading-relaxed mb-12 pb-8 border-b border-slate-100"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    {blog.excerpt}
                  </p>
                )}
                
                <div className="text-slate-700 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>

              {/* Author Bio Section */}
              {blog.authorBio && (
                <div className="mt-12 pt-8 border-t border-slate-100 flex items-start gap-6">
                  <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-[#007AFF] bg-slate-100">
                    {blog.authorImg ? (
                      <img src={getAssetUrl(blog.authorImg) || ""} alt={author} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-slate-900 mb-1">{author}</h4>
                    {blog.authorRole && <p className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-3">{blog.authorRole}</p>}
                    <p className="text-sm text-slate-600 leading-relaxed">{blog.authorBio}</p>
                  </div>
                </div>
              )}

              {/* Footer Share actions */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Share Article</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#007AFF] hover:text-[#09090b] transition-colors border border-slate-200 shadow-sm hover:shadow-[#007AFF]/50">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar: Related Blogs */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28">
                <h3 className="font-display font-bold text-lg uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#007AFF]"></div>
                  Related Blogs
                </h3>
                
                <div className="space-y-6">
                  {otherBlogs.slice(0, 4).map((related) => (
                    <Link key={related.id} href={`/blog/${related.slug}`} className="group flex gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-[#007AFF]/50 transition-all hover:shadow-md">
                      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-200">
                        <img 
                          src={getAssetUrl(related.featured_image) || "https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070"} 
                          alt={related.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-xs font-bold text-[#007AFF] uppercase tracking-wider mb-1 line-clamp-1">{related.created_by || "Admin"}</p>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-slate-600 transition-colors">
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                  {otherBlogs.length === 0 && (
                    <p className="text-sm text-slate-500">No related blogs found.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* More Blogs (Bottom Section) */}
          <div className="mt-16 pt-14 border-t border-slate-200">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-wide">
                More from our Blog
              </h3>
              <Link href="/blog" className="text-xs font-bold text-[#007AFF] uppercase tracking-widest bg-slate-900 px-5 py-2.5 rounded hover:bg-slate-800 transition-colors">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBlogs.slice(0, 3).reverse().map((more) => (
                <Link key={more.id} href={`/blog/${more.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#007AFF] transition-all hover:shadow-xl hover:shadow-[#007AFF]/10">
                  <div className="w-full h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={getAssetUrl(more.featured_image) || "https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=2070"} 
                      alt={more.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest mb-2">
                      {more.createdAt ? new Date(more.createdAt).toLocaleDateString() : "Recent"}
                    </p>
                    <h4 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-600 transition-colors">
                      {more.title}
                    </h4>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {more.excerpt || more.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </article>

      <CTABanner
        title="Inspired by this article?"
        subtitle="Let's build a world-class sporting facility together."
        ctaLabel="Contact Our Team"
        ctaHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />
    </>
  );
}
