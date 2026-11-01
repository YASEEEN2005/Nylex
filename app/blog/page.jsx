import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

export const metadata = {
  title: "Blog & Engineering Insights | NYLEX Digital Studio",
  description:
    "Actionable engineering insights, design philosophies, and technological deep dives on web development, AI automation, and UI/UX from NYLEX Digital Studio.",
  alternates: {
    canonical: "https://nylex.online/blog",
  },
  openGraph: {
    title: "Blog & Insights | NYLEX Digital Studio",
    description:
      "Articles and deep dives on modern Next.js development, AI workflows, and digital brand building.",
    url: "https://nylex.online/blog",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function BlogListingPage() {
  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Hero Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
            STUDIO JOURNAL & INSIGHTS
          </div>
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            Thoughts on Modern Engineering, AI & Design.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Practical breakdowns, architectural patterns, and industry trends curated by the team
            at NYLEX Digital Studio.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-14 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs hover:border-[#00507D]/40 hover:shadow-xl transition-all duration-300"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-xs">
                  {post.category}
                </div>
              </Link>

              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-manrope text-xl font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 group-hover:border-[#00507D] group-hover:bg-[#00507D] group-hover:text-white transition-all duration-300"
                    aria-label={`Read ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

