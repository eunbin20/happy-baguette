import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';
import { mbtiLovePosts } from '../lib/mbti-love';
import { mbtiCompatibility } from '../lib/mbti-compatibility';
import { dreamPosts } from '../lib/dream-posts';
import { mbtiReunionPosts } from '../lib/mbti-reunion';
import { contentUpdatedAt } from '../lib/seo';
import { mbtiCelebrityPosts } from '../lib/mbti-celebrities';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const pages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/tests/animal/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/patience/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/travel-worldcup/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/celebrity-lookalike/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/trend-2026/', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tests/reunion-chance/', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/photobook/', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/about/', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/editorial-policy/', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/privacy/', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/contact/', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/tests/', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/mbti/', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/mbti/compatibility/', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/dream/', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/mbti/reunion/', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/posts/salary-by-age/', changeFrequency: 'yearly' as const, priority: 0.75 },
    { path: '/posts/use-dreams/', changeFrequency: 'yearly' as const, priority: 0.7 },
    { path: '/posts/secretly-popular-person/', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/posts/mbti-crush-behavior/', changeFrequency: 'monthly' as const, priority: 0.85 },
    ...mbtiLovePosts.map((post) => ({
      path: `/mbti/${post.type.toLowerCase()}/love-signs/`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...mbtiCompatibility.map((post) => ({ path: `/mbti/${post.type.toLowerCase()}/compatibility/`, changeFrequency: 'monthly' as const, priority: 0.75 })),
    ...mbtiReunionPosts.map((post) => ({ path: `/mbti/${post.type.toLowerCase()}/reunion/`, changeFrequency: 'monthly' as const, priority: 0.75 })),
    ...mbtiCelebrityPosts.map((post) => ({ path: `/mbti/${post.type.toLowerCase()}/celebrities/`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...dreamPosts.map((post) => ({ path: `/dream/${post.slug}/`, changeFrequency: 'monthly' as const, priority: 0.75 })),
  ];
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteUrl).href,
    lastModified: contentUpdatedAt,
    changeFrequency,
    priority,
  }));
}
