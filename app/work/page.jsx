import Link from "next/link";
import { ExternalLink, ArrowRight, Sparkles, Layers } from "lucide-react";
import { getAllProjects } from "@/lib/projectData";

export const metadata = {
  title: "Our Work & Case Studies | NYLEX Digital Studio",
  description:
    "Explore selected digital products, custom web applications, and enterprise systems delivered by NYLEX Digital Studio across diverse industries.",
  alternates: {
    canonical: "https://nylex.online/work",
  },
  openGraph: {
    title: "Our Work | NYLEX Digital Studio",
    description:
      "A curated showcase of high-impact websites, web applications, and custom software delivered for our clients.",
    url: "https://nylex.online/work",
    siteName: "NYLEX Digital Studio",
    locale: "en_US",
    type: "website",
  },
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Hero Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
            FEATURED PORTFOLIO
          </div>
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12]">
            Crafting Digital Products with Measurable Impact.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Each project represents our commitment to exceptional design, clean architecture, and
            measurable commercial results for our clients worldwide.
          </p>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-14 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {projects.map((project, idx) => {
            const projectSlug =
              project.slug ||
              (project.title
                ? project.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
                : String(project.id));
            const projectImage = project.image_url || "/projects/taste_of_malabar.jpg";
            const tags = Array.isArray(project.tags)
              ? project.tags
              : typeof project.tags === "string"
              ? project.tags.split(",").map((t) => t.trim())
              : [];

            return (
              <article
                key={project.id || idx}
                className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs hover:border-[#00507D]/40 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <Link
                  href={`/work/${projectSlug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 block"
                >
                  <img
                    src={projectImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {project.type && (
                    <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-xs">
                      {project.type}
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="p-6 flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="font-manrope text-xl font-bold text-neutral-950 group-hover:text-[#00507D] transition-colors">
                      <Link href={`/work/${projectSlug}`}>{project.title}</Link>
                    </h2>
                    {project.description && (
                      <p className="mt-2 text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      href={`/work/${projectSlug}`}
                      className="text-xs font-semibold text-[#00507D] hover:underline flex items-center gap-1"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:text-[#00507D] hover:bg-neutral-100 transition-colors"
                        title="Visit Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-20 sm:mt-28">
        <div className="rounded-3xl bg-[#07090e] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#53e6ff]">
              HAVE A PROJECT?
            </span>
            <h2 className="font-manrope text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Let&apos;s build your next flagship product.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300">
              We guide you from initial architecture and UX wireframes all the way to production deployment.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 px-8 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

