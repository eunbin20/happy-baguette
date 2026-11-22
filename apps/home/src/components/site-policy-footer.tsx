import Link from 'next/link';

export default function SitePolicyFooter() {
  return <footer className="global-policy-footer">
    <nav aria-label="사이트 안내">
      <Link href="/about/">사이트 소개</Link>
      <Link href="/editorial-policy/">콘텐츠 작성 원칙</Link>
      <Link href="/privacy/">개인정보처리방침</Link>
      <Link href="/contact/">문의하기</Link>
    </nav>
    <p>© 2026 happy baguette</p>
  </footer>;
}
