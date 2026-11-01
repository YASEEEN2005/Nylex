import { getAllProjects } from "@/lib/projectData";
import { blogPosts } from "@/lib/blogData";

export default async function sitemap() {
  const baseUrl = "https://nylex.online";
  const currentDate = new Date().toISOString();

  // Static core routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic project case studies
  let projectRoutes = [];
  try {
    const projects = await getAllProjects();
    projectRoutes = projects.map((p) => {
      const slug =
        p.slug ||
        (p.title
          ? p.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          : String(p.id));
      return {
        url: `${baseUrl}/work/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    });
  } catch (err) {
    console.warn("Could not fetch projects for sitemap, continuing with static routes:", err);
  }

  // Dynamic blog articles
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
