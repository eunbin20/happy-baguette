import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ['/', '/tools/url-decoder/'].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
