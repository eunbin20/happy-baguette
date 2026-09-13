import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it('does not invent a canonical origin when the deployment domain is unknown', async () => {
  vi.stubEnv('SITE_URL', '');
  const { absoluteUrl } = await import('./site');
  const { default: sitemap } = await import('../app/sitemap');
  expect(absoluteUrl('/')).toBeUndefined();
  expect(sitemap()).toEqual([]);
});

it('uses the production origin consistently for canonical, robots and sitemap', async () => {
  vi.stubEnv('SITE_URL', 'https://example.com');
  const { absoluteUrl } = await import('./site');
  const { default: sitemap } = await import('../app/sitemap');
  const { default: robots } = await import('../app/robots');
  expect(absoluteUrl('/tools/url-decoder/')).toBe(
    'https://example.com/tools/url-decoder/',
  );
  expect(sitemap().map((entry) => entry.url)).toEqual([
    'https://example.com/',
    'https://example.com/tools/url-decoder/',
  ]);
  expect(robots().sitemap).toBe('https://example.com/sitemap.xml');
});

it('rejects a deployment URL containing a path rather than emitting incorrect URLs', async () => {
  vi.stubEnv('SITE_URL', 'https://example.com/tools/');
  await expect(import('./site')).rejects.toThrow('SITE_URL must be');
});
