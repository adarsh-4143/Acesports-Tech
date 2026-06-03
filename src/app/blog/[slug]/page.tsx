import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { blogs } from "@/lib/data";
import CTABanner from "@/components/CTABanner";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return { title: "Blog Not Found" };
  return {
    title: `${blog.title} | ACE Sports Tech`,
    description: blog.summary,
  };
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default function BlogDetailPage({ params }: Props) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <article className="min-h-screen bg-slate-50 pt-20">
        {/* Article Header (Hero) */}
        <header className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-16 bg-[#060f1e] overflow-hidden">
          <div className="absolute inset-0">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] via-[#060f1e]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-5 w-full">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#39FF14] text-xs font-bold uppercase tracking-widest mb-6 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#39FF14]" />
                {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#39FF14]" />
                {blog.author}
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-5 py-16 lg:py-24 bg-white shadow-xl -mt-8 relative z-20 rounded-t-3xl border border-slate-200">
          
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-10 pb-10 border-b border-slate-100">
              {blog.summary}
            </p>
            
            {/* Split content by double linebreaks and render as paragraphs for our dummy data */}
            <div className="text-slate-700 leading-loose space-y-6">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Footer Share actions */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Share this</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#39FF14] hover:text-[#060f1e] transition-colors border border-slate-200">
                <Share2 size={16} />
              </button>
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
