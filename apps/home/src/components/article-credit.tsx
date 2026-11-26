import Link from 'next/link';

export default function ArticleCredit() {
  return <div className="article-credit">
    <span>작성 · 검토</span>
    <Link href="/about/">happy baguette 편집팀</Link>
    <time dateTime="2026-11-27">2026년 11월 27일 업데이트</time>
  </div>;
}
