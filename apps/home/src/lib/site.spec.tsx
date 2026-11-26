import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it('uses the confirmed production domain when the build variable is missing', async () => {
  vi.stubEnv('SITE_URL', '');
  const { absoluteUrl } = await import('./site');
  const { default: sitemap } = await import('../app/sitemap');
  expect(absoluteUrl('/')).toBe('https://happybaguette.com/');
  expect(sitemap()).toHaveLength(393);
});

it('uses the production origin consistently for canonical, robots and sitemap', async () => {
  vi.stubEnv('SITE_URL', 'https://example.com');
  const { absoluteUrl } = await import('./site');
  const { default: sitemap } = await import('../app/sitemap');
  const { default: robots } = await import('../app/robots');
  expect(absoluteUrl('/tests/animal/')).toBe(
    'https://example.com/tests/animal/',
  );
  const urls = sitemap().map((entry) => entry.url);
  expect(urls).toHaveLength(393);
  expect(urls).toEqual(expect.arrayContaining([
    'https://example.com/',
    'https://example.com/mbti/infp/love-signs/',
    'https://example.com/mbti/infp/compatibility/',
    'https://example.com/dream/',
    'https://example.com/dream/snake/',
    'https://example.com/dream/traffic-accident/',
    'https://example.com/tests/trend-2026/',
    'https://example.com/tests/reunion-chance/',
    'https://example.com/mbti/infp/reunion/',
    'https://example.com/posts/mbti-crush-behavior/',
    'https://example.com/mbti/enfp-woman/intj-man/compatibility/',
    'https://example.com/mbti/infp-woman/intj-man/compatibility/',
    'https://example.com/mbti/infj-woman/enfj-man/compatibility/',
    'https://example.com/mbti/entp-woman/intp-man/compatibility/',
    'https://example.com/mbti/intj-woman/entj-man/compatibility/',
    'https://example.com/mbti/istj-woman/esfp-man/compatibility/',
    'https://example.com/mbti/isfj-woman/enfj-man/compatibility/',
    'https://example.com/mbti/istp-woman/estp-man/compatibility/',
    'https://example.com/mbti/isfp-woman/infp-man/compatibility/',
    'https://example.com/mbti/intp-woman/entp-man/compatibility/',
    'https://example.com/mbti/estp-woman/istp-man/compatibility/',
    'https://example.com/mbti/esfp-woman/isfp-man/compatibility/',
    'https://example.com/mbti/estj-woman/entj-man/compatibility/',
    'https://example.com/mbti/esfj-woman/isfj-man/compatibility/',
    'https://example.com/mbti/enfj-woman/infj-man/compatibility/',
    'https://example.com/mbti/entj-woman/intj-man/compatibility/',
    'https://example.com/mbti/infp/celebrities/',
  ]));
  expect(robots().sitemap).toBe('https://example.com/sitemap.xml');
});

it('publishes 16 celebrity posts with at least 30 unique names each', async () => {
  const { mbtiCelebrityPosts } = await import('./mbti-celebrities');
  expect(mbtiCelebrityPosts).toHaveLength(16);
  for (const post of mbtiCelebrityPosts) {
    expect(post.names.length, post.type).toBeGreaterThanOrEqual(30);
    expect(new Set(post.names).size, post.type).toBe(post.names.length);
  }
});

it('rejects a deployment URL containing a path rather than emitting incorrect URLs', async () => {
  vi.stubEnv('SITE_URL', 'https://example.com/tools/');
  await expect(import('./site')).rejects.toThrow('SITE_URL must be');
});

it('publishes every woman and man MBTI compatibility combination exactly once', async () => {
  vi.stubEnv('SITE_URL', 'https://example.com');
  const { default: sitemap } = await import('../app/sitemap');
  const types = ['istj', 'isfj', 'infj', 'intj', 'istp', 'isfp', 'infp', 'intp', 'estp', 'esfp', 'enfp', 'entp', 'estj', 'esfj', 'enfj', 'entj'];
  const urls = sitemap().map((entry) => entry.url);
  const pairUrls = urls.filter((url) => /\/mbti\/[a-z]{4}-woman\/[a-z]{4}-man\/compatibility\/$/.test(url));
  const expected = types.flatMap((woman) => types.map((man) => `https://example.com/mbti/${woman}-woman/${man}-man/compatibility/`));
  expect(pairUrls).toHaveLength(256);
  expect(new Set(pairUrls).size).toBe(256);
  expect(pairUrls).toEqual(expect.arrayContaining(expected));
});
