import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../lib/site';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

const posts = [
  { href: '/posts/mbti-crush-behavior/', title: 'MBTI별 좋아하는 사람 앞 행동', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=88', label: 'MBTI' },
  { href: '/mbti/infp/love-signs/', title: 'INFP가 진짜 사랑에 빠지면 생기는 일', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=88', label: 'INFP' },
  { href: '/posts/naturally-attractive-woman/', title: '남자가 자연스럽게 반하게 되는 여자', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=88', label: '연애' },
  { href: '/posts/salary-by-age/', title: '내 연봉, 또래보다 높은 걸까?', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=88', label: '연봉' },
  { href: '/posts/womens-height-ranking/', title: '남자들이 좋아하는 여자 키 순위', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=88', label: '연애' },
  { href: '/posts/secretly-popular-person/', title: '남몰래 다들 좋아하는 매력 쩌는 사람', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=88', label: '매력' },
  { href: '/dream/snake/', title: '뱀 나오는 꿈, 색깔마다 뜻이 다르다', image: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=900&q=88', label: '꿈해몽' },
  { href: '/mbti/entp/compatibility/', title: 'ENTP 연애 궁합 잘 맞는 유형은?', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=88', label: '궁합' },
  { href: '/dream/teeth-falling/', title: '이빨 빠지는 꿈이 계속 신경 쓰인다면', image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=88', label: '꿈해몽' },
  { href: '/mbti/intj/love-signs/', title: 'INTJ가 자기 계획에 나를 넣었다', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88', label: 'INTJ' },
  { href: '/dream/traffic-accident/', title: '교통사고 꿈, 실제 사고의 징조일까?', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=88', label: '꿈해몽' },
  { href: '/mbti/isfj/compatibility/', title: 'ISFJ와 오래 만나는 사람들의 공통점', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=88', label: '궁합' },
  { href: '/dream/', title: '어젯밤 꾼 꿈 의미 전부 찾아보기', image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=900&q=88', label: '꿈해몽' },
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
        <Link href="/photobook/">포토보드 만들기</Link>
      </nav>
      <nav className="article-categories" aria-label="글 카테고리">
        <Link className="active" href="/">관계와 마음</Link>
      </nav>
      <div className="feed-search" aria-hidden="true"><span>⌕</span> 궁금한 MBTI를 찾아보세요</div>
      <div className="click-grid post-feed">
        {posts.map((post) => <Link className="click-tile" href={post.href} key={post.title}>
          <img src={post.image} alt={post.title} />
          <span className="tile-label">{post.label}</span>
          <h2>{post.title}</h2>
        </Link>)}
      </div>
      <footer><strong>happy baguette</strong><span>© 2026 happy baguette</span></footer>
    </main>
  );
}
