import type { Metadata } from 'next';
import Link from 'next/link';
import { mbtiLovePosts } from '../../lib/mbti-love';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: 'MBTI별 찐사랑 특징',
  description: 'MBTI 16가지 유형별로 알아보는 진짜 호감 신호와 연애 공략법.',
  alternates: { canonical: absoluteUrl('/mbti/') },
};

export default function MbtiIndexPage() {
  return (
    <main className="mbti-board">
      <header className="feed-header">
        <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
        <span className="header-note">심심할 때 찾아와요</span>
      </header>
      <nav className="feed-tabs" aria-label="콘텐츠 종류">
        <Link className="active" href="/">재밌는 글</Link>
        <Link href="/tests/">재밌는 테스트</Link>
      </nav>

      <div className="board-title">
        <h1>MBTI별 찐사랑 특징</h1>
        <p>좋아할 때 유독 달라지는 행동들</p>
      </div>

      <div className="board-list">
        <div className="board-labels"><span>유형</span><span>간단 특징</span><span>글</span></div>
        {mbtiLovePosts.map((post) => (
          <Link className="board-row" href={`/mbti/${post.type.toLowerCase()}/love-signs/`} key={post.type}>
            <b>{post.type}</b>
            <div>
              <strong>{post.hook}</strong>
              <p>{post.intro}</p>
            </div>
            <span>더보기 →</span>
          </Link>
        ))}
      </div>

      <footer><strong>happy baguette</strong><span>© 2026 happy baguette</span></footer>
    </main>
  );
}
