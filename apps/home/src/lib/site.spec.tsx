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
  expect(absoluteUrl('/tests/animal/')).toBe(
    'https://example.com/tests/animal/',
  );
  expect(sitemap().map((entry) => entry.url)).toEqual([
    'https://example.com/',
    'https://example.com/tests/animal/',
    'https://example.com/tests/patience/',
    'https://example.com/tests/travel-worldcup/',
    'https://example.com/tests/celebrity-lookalike/',
    'https://example.com/tests/',
    'https://example.com/mbti/',
    'https://example.com/mbti/infp/love-signs/',
    'https://example.com/mbti/enfp/love-signs/',
    'https://example.com/mbti/infj/love-signs/',
    'https://example.com/mbti/enfj/love-signs/',
    'https://example.com/mbti/intp/love-signs/',
    'https://example.com/mbti/entp/love-signs/',
    'https://example.com/mbti/intj/love-signs/',
    'https://example.com/mbti/entj/love-signs/',
    'https://example.com/mbti/isfp/love-signs/',
    'https://example.com/mbti/esfp/love-signs/',
    'https://example.com/mbti/istp/love-signs/',
    'https://example.com/mbti/estp/love-signs/',
    'https://example.com/mbti/isfj/love-signs/',
    'https://example.com/mbti/esfj/love-signs/',
    'https://example.com/mbti/istj/love-signs/',
    'https://example.com/mbti/estj/love-signs/',
  ]);
  expect(robots().sitemap).toBe('https://example.com/sitemap.xml');
});

it('rejects a deployment URL containing a path rather than emitting incorrect URLs', async () => {
  vi.stubEnv('SITE_URL', 'https://example.com/tools/');
  await expect(import('./site')).rejects.toThrow('SITE_URL must be');
});
