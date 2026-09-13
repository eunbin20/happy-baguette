/** Set SITE_URL to the production origin at build time. */
export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  const url = new URL(value);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment.',
    );
  }
  return url;
}

export const siteUrl = getSiteUrl();
export function absoluteUrl(path: string): string | undefined {
  return siteUrl ? new URL(path, siteUrl).href : undefined;
}
