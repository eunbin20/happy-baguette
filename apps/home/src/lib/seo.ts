import { absoluteUrl } from './site';

export const contentUpdatedAt = new Date('2026-11-22T00:00:00+09:00');
export const defaultShareImage = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=88';

type ArticleSeo = { title: string; description: string; path: string; image?: string; section: string };

export function articleJsonLd({ title, description, path, image = defaultShareImage, section }: ArticleSeo) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [image],
    datePublished: '2026-11-17T00:00:00+09:00',
    dateModified: contentUpdatedAt.toISOString(),
    articleSection: section,
    inLanguage: 'ko-KR',
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'happy baguette', url: absoluteUrl('/') },
    publisher: { '@type': 'Organization', name: 'happy baguette', url: absoluteUrl('/') },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
}
