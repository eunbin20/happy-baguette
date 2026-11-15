import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';
import { siteUrl } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  title: { default: 'happy baguette', template: '%s | happy baguette' },
  description:
    '심심할 때 찾아와요. 재미있는 테스트와 생활 지도를 만나보세요.',
  openGraph: {
    title: 'happy baguette',
    description: '심심할 때 찾아와요',
    siteName: 'happy baguette',
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
