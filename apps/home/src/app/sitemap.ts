import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ['/', '/tests/animal/', '/tests/patience/', '/tests/travel-worldcup/', '/tests/celebrity-lookalike/', '/tests/find-difference/'].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
