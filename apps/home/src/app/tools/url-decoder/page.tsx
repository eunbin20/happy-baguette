import type { Metadata } from 'next';
import Link from 'next/link';
import Decoder from './decoder';

const title = 'URL 디코더 · 인코더';
const description =
  '퍼센트 인코딩된 URL을 읽기 쉬운 한글과 텍스트로 변환하세요. UTF-8 URL 디코딩과 인코딩을 브라우저에서 바로 처리합니다.';
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'ko_KR',
    type: 'website',
    siteName: 'Happy Bagguete',
  },
};

export default function UrlDecoderPage() {
  return (
    <main className="tool-page">
      <Link className="brand-link" href="/">
        🥖 Happy Bagguete
      </Link>
      <header className="tool-header">
        <p className="eyebrow">001</p>
        <h1>
          URL 디코더<span className="heading-dot">.</span>
        </h1>
        <p>
          복잡한 URL을 읽기 쉽게.
          <br />
          붙여넣으면 바로 변환해드릴게요.
        </p>
      </header>
      <Decoder />
      <section className="guide" aria-labelledby="guide-title">
        <p className="eyebrow">HOW TO</p>
        <h2 id="guide-title">URL 속에 숨은 글자를 꺼내보세요.</h2>
        <p>
          URL 디코딩은 <code>%EC%95%88%EB%85%95</code>처럼 퍼센트 기호로 표현된
          문자를 <strong>안녕</strong>처럼 읽을 수 있는 텍스트로 바꾸는
          작업이에요. 입력창에 붙여넣고 결과를 복사하면 끝입니다.
        </p>
        <div className="guide-grid">
          <div>
            <h3>인코딩은 언제 쓰나요?</h3>
            <p>
              검색어처럼 URL의 한 부분에 넣을 값을 변환할 때 사용하세요. 인코딩
              모드는 <code>encodeURIComponent</code> 방식으로, 전체 URL을 넣으면{' '}
              <code>:</code>, <code>/</code>, <code>?</code>도 변환됩니다.
            </p>
          </div>
          <div>
            <h3>+가 공백으로 바뀌지 않나요?</h3>
            <p>
              기본값은 +를 그대로 유지합니다. 폼이나 쿼리 값에서 +를 공백으로
              사용한 경우에는 ‘+를 공백으로 해석’을 켜주세요. <code>%2B</code>는
              켜도 +로 변환됩니다.
            </p>
          </div>
          <div>
            <h3>변환 오류가 나타나나요?</h3>
            <p>
              잘린 퍼센트 코드나 UTF-8이 아닌 인코딩은 변환할 수 없어요. 원문을
              끝까지 복사했는지 확인하세요. EUC-KR 디코딩은 지원하지 않습니다.
            </p>
          </div>
          <div>
            <h3>한 번 더 인코딩된 URL이라면?</h3>
            <p>
              한 번에 한 단계만 디코딩합니다. 결과에 인코딩이 남아 있다면 결과를
              입력창에 다시 붙여넣으세요. 디코딩된 주소의 구분자는 의미가 달라질
              수 있으니 사용 전에 확인하세요.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
