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
    <main className="mbti-index">
      <header className="mbti-header">
        <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
        <Link href="/">HOME</Link>
      </header>

      <section className="mbti-intro">
        <span>LOVE × MBTI</span>
        <h1>MBTI별<br />찐사랑 특징</h1>
        <p>상대방 MBTI를 눌러보세요.</p>
      </section>

      <div className="mbti-grid">
        {mbtiLovePosts.map((post, index) => (
          <Link
            className="mbti-card"
            href={`/mbti/${post.type.toLowerCase()}/love-signs/`}
            key={post.type}
            style={{ backgroundColor: post.color, transform: `rotate(${index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0}deg)` }}
          >
            <b>{post.type}</b>
            <span>{post.hook}</span>
            <i>확인하기 →</i>
          </Link>
        ))}
      </div>
    </main>
  );
}
