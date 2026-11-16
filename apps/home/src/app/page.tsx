import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../lib/site';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

const tiles = [
  {
    href: '/mbti/',
    title: 'MBTI별\n찐사랑 특징',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=88',
    label: 'LOVE',
  },
  { href: '/tests/celebrity-lookalike/', title: '나랑 닮은\n유명인은 누구?', image: 'https://img.sbs.co.kr/newsnet/etv/upload/2025/05/23/30000993477_1280.jpg', label: 'NEW' },
  { href: '/tests/patience/', title: '몇 초 만에\n화면을 누를까?', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88', label: 'TEST' },
  { href: '/tests/animal/', title: '내가 동물이라면\n무슨 동물일까?', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=88', label: 'HOT' },
  { href: '/tests/travel-worldcup/', title: '죽기 전에 꼭 갈\n여행지 월드컵', image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=88', label: 'VS' },
  { href: '/mbti/infp/love-signs/', title: 'INFP가 진짜\n사랑에 빠지면', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=88', label: 'INFP' },
  { title: '겨울마다 찾게 되는\n붕어빵 스팟', image: 'https://japanese.korea.net/upload/content/editImage/20211206131120268_AVKZF9KM.jpeg', label: 'MAP', pending: true },
  { href: '/mbti/entp/love-signs/', title: 'ENTP가 갑자기\n다정해지는 순간', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=88', label: 'ENTP' },
  { title: '동네 목욕탕\n가격까지 한눈에', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=88', label: 'MAP', pending: true },
  { title: '퇴근 후 갈 수 있는\n발레학원 모음', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=88', label: 'MAP', pending: true },
  { href: '/mbti/istp/love-signs/', title: 'ISTP가 이러면\n이미 찐사랑', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=88', label: 'ISTP' },
  { href: '/mbti/enfp/love-signs/', title: 'ENFP의 친절과\n호감 구별법', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88', label: 'ENFP' },
];

export default function Home() {
  const homeUrl = absoluteUrl('/');
  return (
    <main className="home-shell feed-home">
      {homeUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'happy baguette',
        alternateName: '해피 바게트',
        url: homeUrl,
      }) }} />}
      <header className="feed-header">
        <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
        <span className="header-note">심심할 때 찾아와요</span>
      </header>

      <div className="feed-search" aria-hidden="true"><span>⌕</span> 궁금한 걸 찾아보세요</div>

      <div className="click-grid" id="tests">
        {tiles.map((tile, index) => {
          const content = <>
            <img src={tile.image} alt="" />
            <span className="tile-label">{tile.label}</span><h2>{tile.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>{'pending' in tile && tile.pending && <b className="pending-label">준비중</b>}
          </>;
          return 'href' in tile && tile.href
            ? <Link className={`click-tile tile-${index + 1}`} href={tile.href} key={tile.title}>{content}</Link>
            : <article className={`click-tile tile-${index + 1} pending`} key={tile.title}>{content}</article>;
        })}
      </div>

      <footer><strong>happy baguette</strong><span>© 2026 happy baguette</span></footer>
    </main>
  );
}
