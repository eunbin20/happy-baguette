import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../lib/site';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

const posts = [
  { href: '/mbti/infp/love-signs/', title: 'INFP가 진짜 사랑에 빠지면 생기는 일', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=88', label: 'INFP' },
  { href: '/mbti/entp/love-signs/', title: 'ENTP가 갑자기 다정해졌다면', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=88', label: 'ENTP' },
  { href: '/mbti/istp/love-signs/', title: 'ISTP가 이러면 이미 찐사랑임', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=88', label: 'ISTP' },
  { href: '/mbti/enfp/love-signs/', title: 'ENFP의 친절과 호감 구별하는 법', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88', label: 'ENFP' },
  { href: '/mbti/intj/love-signs/', title: 'INTJ가 자기 계획에 나를 넣었다', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88', label: 'INTJ' },
  { href: '/mbti/isfj/love-signs/', title: 'ISFJ의 다정함이 사랑으로 바뀌는 순간', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=88', label: 'ISFJ' },
  { href: '/mbti/estp/love-signs/', title: 'ESTP가 한 사람에게 정착할 때', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=900&q=88', label: 'ESTP' },
  { href: '/mbti/', title: '나머지 MBTI 찐사랑 특징 전부 보기', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=88', label: '16 TYPES' },
];

export default function Home() {
  const homeUrl = absoluteUrl('/');
  return (
    <main className="home-shell feed-home">
      {homeUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebSite', name: 'happy baguette', alternateName: '해피 바게트', url: homeUrl,
      }) }} />}
      <header className="feed-header">
        <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
        <span className="header-note">심심할 때 찾아와요</span>
      </header>
      <nav className="feed-tabs" aria-label="콘텐츠 종류">
        <Link className="active" href="/">재밌는 글</Link>
        <Link href="/tests/">재밌는 테스트</Link>
      </nav>
      <div className="feed-search" aria-hidden="true"><span>⌕</span> 궁금한 MBTI를 찾아보세요</div>
      <div className="click-grid post-feed">
        {posts.map((post) => <Link className="click-tile" href={post.href} key={post.title}>
          <img src={post.image} alt="" />
          <span className="tile-label">{post.label}</span>
          <h2>{post.title}</h2>
        </Link>)}
      </div>
      <footer><strong>happy baguette</strong><span>© 2026 happy baguette</span></footer>
    </main>
  );
}
