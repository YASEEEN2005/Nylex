import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, CheckCircle2, Sparkles, Layers, Award } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projectData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | NYLEX Digital Studio",
      description: "The requested project case study could not be found.",
    };
  }

  return {
    title: `${project.title} | Case Study | NYLEX Digital Studio`,
    description:
      project.description ||
      `Explore how NYLEX Digital Studio engineered ${project.title} with high-performance web architecture and design.`,
    alternates: {
      canonical: `https://nylex.online/work/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Study | NYLEX Digital Studio`,
      description: project.description,
      url: `https://nylex.online/work/${slug}`,
      images: project.image_url ? [{ url: project.image_url }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const tags = Array.isArray(project.tags)
    ? project.tags
    : typeof project.tags === "string"
      ? project.tags.split(",").map((t) => t.trim())
      : [];

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <main className="w-full bg-white text-neutral-900 font-inter pt-28 sm:pt-32 pb-20 sm:pb-28">
      {/* Back to Work link & Breadcrumb */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-neutral-950 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Project Header */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {project.type && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f9ff] border border-[#00507D]/15 text-[#00507D] text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#00507D]" />
              {project.type}
            </div>
          )}
          <h1 className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.15]">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-5 text-base sm:text-xl text-neutral-600 leading-relaxed font-inter">
              {project.description}
            </p>
          )}

          {/* Key Metric / Result Pill */}
          {project.result && (
            <div className="mt-6 inline-flex items-center gap-3 p-3.5 sm:px-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-medium">
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Outcome:</strong> {project.result}
              </span>
            </div>
          )}
        </div>

        {/* Hero Image */}
        <div className="mt-10 sm:mt-14 relative w-full aspect-[16/9] max-h-[640px] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-md">
          <img
            src={project.image_url || "/projects/taste_of_malabar.jpg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Project Specs & Content Details */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-[120px] max-w-7xl mx-auto mt-14 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-bold text-neutral-950">
                Project Overview & Challenge
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed font-inter">
                For {project.title}, NYLEX Digital Studio was tasked with delivering a bespoke digital
                solution engineered to maximize brand authority, streamline customer workflows, and
                provide an exceptionally responsive user journey.
              </p>
            </div>

            <div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-bold text-neutral-950">
                Our Engineering Approach
              </h2>
              <ul className="mt-4 space-y-3 font-inter text-neutral-600 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00507D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Architecture & Performance:</strong> Built with modern Next.js server components,
                    fluid Tailwind styling, and optimized asset delivery for sub-second page loads.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00507D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Responsive Design:</strong> Rigorously calibrated and tested across 320px to
                    1920px viewports ensuring fluid typography and touch interactions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00507D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Technical SEO & Visibility:</strong> Implemented canonical structures, semantic
                    microdata, and optimized OpenGraph assets to maximize Google discovery.
                  </span>
                </li>
              </ul>
            </div>

            {/* Gallery Images if present */}
            {gallery.length > 0 && (
              <div className="pt-8 border-t border-neutral-200">
                <h2 className="font-manrope text-2xl font-bold text-neutral-950 mb-6">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img, gIdx) => (
                    <div
                      key={img.id || gIdx}
                      className="rounded-2xl overflow-hidden border border-neutral-200 aspect-[16/10] bg-neutral-100"
                    >
                      <img
                        src={img.image_url}
                        alt={img.caption || `${project.title} screenshot ${gIdx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50/50 p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  CLIENT / PROJECT
                </span>
                <p className="mt-1 font-manrope text-lg font-bold text-neutral-950">
                  {project.title}
                </p>
              </div>

              {project.type && (
                <div className="pt-4 border-t border-neutral-200/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    DISCIPLINE
                  </span>
                  <p className="mt-1 text-sm font-semibold text-neutral-800">
                    {project.type}
                  </p>
                </div>
              )}

              {tags.length > 0 && (
                <div className="pt-4 border-t border-neutral-200/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    TECHNOLOGIES & TOOLS
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-lg bg-white border border-neutral-200/80 px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <div className="pt-6 border-t border-neutral-200/80">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#00507D] hover:bg-[#003e61] text-white py-3 px-5 text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

