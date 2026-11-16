import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/tests/animal/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/patience/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/travel-worldcup/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/celebrity-lookalike/', changeFrequency: 'monthly' as const, priority: 0.8 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).href,
    changeFrequency,
    priority,
  }));
}
