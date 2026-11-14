import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';
import { siteUrl } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  title: { default: '해피', template: '%s | 해피' },
  description:
    '재미있는 테스트와 지역별 생활 지도를 한곳에서 확인하세요.',
  openGraph: {
    title: '해피',
    description: '테스트와 생활 지도를 한곳에서',
    siteName: '해피',
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
