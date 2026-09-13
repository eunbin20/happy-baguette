import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';
import { siteUrl } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  title: { default: 'Happy Bagguete', template: '%s | Happy Bagguete' },
  description:
    'URL 디코더와 인코더 등 브라우저에서 바로 사용하는 무료 온라인 도구 모음입니다.',
  openGraph: {
    title: 'Happy Bagguete',
    description: '브라우저에서 동작하는 유용한 도구들',
    siteName: 'Happy Bagguete',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
