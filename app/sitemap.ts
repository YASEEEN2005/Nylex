import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nylex.online',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add additional routes here when pages are created
  ];
}
