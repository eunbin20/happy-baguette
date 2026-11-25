import Link from 'next/link';

export default function ArticleCredit() {
  return <div className="article-credit">
    <span>작성 · 검토</span>
    <Link href="/about/">happy baguette 편집팀</Link>
    <time dateTime="2026-11-26">2026년 11월 26일 업데이트</time>
  </div>;
}
