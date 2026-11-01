import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Share2, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | NYLEX Digital Studio",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | NYLEX Blog`,
    description: post.desc,
    alternates: {
      canonical: `https://nylex.online/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.desc,
      url: `https://nylex.online/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.desc,
    image: post.image,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "NYLEX Digital Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://nylex.online/nylex-icon.png",
      },
    },
    datePublished: post.date,
    mainEntityOfPage: `https://nylex.online/blog/${slug}`,
  };

  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-neutral-950 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
          {post.category}
        </div>

        <h1 className="font-manrope text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.15]">
          {post.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-inter">
          {post.desc}
        </p>

        {/* Metadata Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
              <User className="w-4 h-4 text-[#00507D]" />
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neutral-400" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-400" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Feature Image */}
        <div className="mt-8 relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Article Body */}
      <article className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-3xl mx-auto mt-12 font-inter text-neutral-700 leading-relaxed space-y-6 text-base sm:text-lg">
        {post.content
          .trim()
          .split("\n\n")
          .map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h2
                  key={idx}
                  className="font-manrope text-2xl sm:text-3xl font-bold text-neutral-950 pt-6"
                >
                  {trimmed.replace("### ", "")}
                </h2>
              );
            }
            return (
              <p key={idx} className="text-neutral-600 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
      </article>

      {/* Footer / CTA inside Article */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-3xl mx-auto mt-16 pt-8 border-t border-neutral-200">
        <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-manrope text-lg font-bold text-neutral-950">
              Need technical help scaling your web platform?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600">
              Talk directly with our engineering team at NYLEX Digital Studio.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-[#00507D] hover:bg-[#003e61] text-white px-6 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}

