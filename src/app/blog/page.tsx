import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { blogs } from "@/lib/data";
import AnimatedBackgroundLight from "@/components/AnimatedBackgroundLight";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Latest news, insights, and updates from ACE Sports Tech on sports infrastructure and technology.",
};

function BlogCard({ blog, index }: { blog: typeof blogs[0]; index: number }) {
  return (
    <div
      className="group relative flex flex-col h-full bg-white border border-slate-200 hover:border-[#39FF14] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(57,255,20,0.15)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-[#060f1e]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Date Badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 shadow-sm flex items-center gap-1.5">
          <Calendar size={12} className="text-[#39FF14]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800">{blog.date}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-[2px] bg-[#39FF14]" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#39FF14]">{blog.author}</span>
        </div>
        
        <h3 className="text-xl font-display font-bold text-slate-900 leading-tight mb-3 group-hover:text-[#39FF14] transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-grow">
          {blog.summary}
        </p>

        <Link
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-[#39FF14] transition-colors mt-auto w-fit"
        >
          Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <Hero
        variant="page"
        eyebrow="Insights & News"
        headline="Our Latest Stories"
        subheadline="Stay updated with the latest in sports technology, infrastructure development, and facility management."
        ctaPrimary={{ label: "Start a Project", href: "/contact" }}
        imageSrc="/services/tech.png"
      />

      <section className="relative section-pad overflow-hidden bg-slate-50">
        <AnimatedBackgroundLight />
        <div className="absolute inset-0 grid-pattern-light opacity-50 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <SectionHeading eyebrow="Latest Articles" title="From The Blog" className="mb-0" theme="light" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Build Your Next Facility?"
        subtitle="Get in touch with our experts to discuss your sports infrastructure requirements."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        secondaryLabel="Our Portfolio"
        secondaryHref="/projects"
      />
    </>
  );
}
