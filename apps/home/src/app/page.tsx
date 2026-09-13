import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl } from '../lib/site';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function App() {
  return (
    <main>
      <span className="bread" role="img" aria-label="바게트">
        🥖
      </span>
      <p className="eyebrow">바로 꺼내 쓰는 도구 모음</p>
      <h1>Happy Bagguete</h1>
      <p>
        다양한 도메인을 탐험하며, 브라우저에서 동작하는 작은 도구들을 만듭니다.
      </p>
      <section aria-labelledby="tools-title">
        <p className="eyebrow">001</p>
        <h2 id="tools-title">
          <Link href="/tools/url-decoder/">URL 디코더 · 인코더 ↗</Link>
        </h2>
        <p>복잡한 URL을 읽기 쉬운 텍스트로. 붙여넣고, 변환하고, 복사하세요.</p>
      </section>
    </main>
  );
}
