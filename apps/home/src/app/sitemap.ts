import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';
import { mbtiLovePosts } from '../lib/mbti-love';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const pages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/tests/animal/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/patience/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/travel-worldcup/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/celebrity-lookalike/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/mbti/', changeFrequency: 'weekly' as const, priority: 0.9 },
    ...mbtiLovePosts.map((post) => ({
      path: `/mbti/${post.type.toLowerCase()}/love-signs/`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).href,
    changeFrequency,
    priority,
  }));
}
