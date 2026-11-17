import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = {
  title: '재밌는 테스트',
  description: '심심할 때 바로 해보는 성격 테스트와 이상형 월드컵.',
  alternates: { canonical: absoluteUrl('/tests/') },
};

const tests = [
  { href: '/tests/animal/', title: '내가 동물이라면?', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=88' },
  { href: '/tests/patience/', title: '나의 인내심 테스트', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=88' },
  { href: '/tests/travel-worldcup/', title: '여행지 이상형 월드컵', image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=88' },
  { href: '/tests/celebrity-lookalike/', title: '당신과 닮은 유명인 찾기', image: 'https://img.sbs.co.kr/newsnet/etv/upload/2025/05/23/30000993477_1280.jpg' },
  { href: '/tests/trend-2026/', title: '2026 트렌드 고사', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=88' },
];

export default function TestsPage() {
  return <main className="home-shell feed-home test-feed-page">
    <header className="feed-header">
      <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
      <span className="header-note">심심할 때 찾아와요</span>
    </header>
    <nav className="feed-tabs" aria-label="콘텐츠 종류">
      <Link href="/">재밌는 글</Link>
      <Link className="active" href="/tests/">재밌는 테스트</Link>
    </nav>
    <div className="test-feed-grid">
      {tests.map((test) => <Link className="test-feed-card" href={test.href} key={test.title}>
        <img src={test.image} alt={test.title} />
        <h2>{test.title}</h2>
      </Link>)}
    </div>
    <footer><strong>happy baguette</strong><span>© 2026 happy baguette</span></footer>
  </main>;
}
