import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';
import { siteUrl } from '../lib/site';
import { defaultShareImage } from '../lib/seo';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  title: { default: 'happy baguette', template: '%s | happy baguette' },
  description:
    'MBTI 연애, MBTI 궁합, 꿈해몽과 심심할 때 바로 해보는 재미있는 테스트.',
  applicationName: 'happy baguette',
  authors: [{ name: 'happy baguette', url: '/' }],
  creator: 'happy baguette',
  publisher: 'happy baguette',
  keywords: ['MBTI', 'MBTI 연애', 'MBTI 궁합', '꿈해몽', '심리테스트', '이상형 월드컵'],
  category: 'entertainment',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'happy baguette',
    description: '심심할 때 찾아와요',
    siteName: 'happy baguette',
    locale: 'ko_KR',
    type: 'website',
    url: '/',
    images: [{ url: defaultShareImage, width: 1200, height: 800, alt: 'happy baguette' }],
  },
  twitter: { card: 'summary_large_image', title: 'happy baguette', description: 'MBTI 연애·궁합, 꿈해몽, 재미있는 테스트', images: [defaultShareImage] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5635541147972856"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
