import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles.css';

export const metadata: Metadata = {
  title: { default: 'Happy Bagguete', template: '%s | Happy Bagguete' },
  description:
    '다양한 도메인을 탐험하며, 브라우저에서 동작하는 작은 도구들을 만드는 공간입니다.',
  openGraph: {
    title: 'Happy Bagguete',
    description:
      '브라우저에서 동작하는 유용한 도구들',
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
