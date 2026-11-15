import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../lib/site';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

const tests = [
  { href: '/tests/animal/', title: '내가 동물이라면?', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=88', label: 'HOT' },
  { href: '/tests/patience/', title: '나의 인내심 테스트', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=88', label: 'GAME' },
  { href: '/tests/travel-worldcup/', title: '여행지 이상형 월드컵', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=88', label: 'VS' },
  { href: '/tests/celebrity-lookalike/', title: '당신과 닮은 유명인 찾기', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=88', label: 'NEW' },
];

const maps = [
  { title: '붕어빵 맵', image: 'https://japanese.korea.net/upload/content/editImage/20211206131120268_AVKZF9KM.jpeg', tone: 'coral' },
  { title: '목욕탕 맵', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=88', tone: 'blue' },
  { title: '발레학원 맵', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=900&q=88', tone: 'pink' },
];

const tiles = [
  { ...tests[0], size: 'hero-tile' },
  { ...tests[1], size: 'tall-tile' },
  { ...tests[2], size: 'wide-tile' },
  { ...maps[0], label: 'MAP', size: 'square-tile', pending: true },
  { ...tests[3], size: 'portrait-tile' },
  { ...maps[1], label: 'MAP', size: 'wide-tile', pending: true },
  { ...maps[2], label: 'MAP', size: 'square-tile', pending: true },
];

export default function Home() {
  return (
    <main className="home-shell feed-home">
      <header className="feed-header">
        <Link className="logo" href="/" aria-label="해피 홈"><span>happy!</span></Link>
        <span className="header-note">심심할 때 누르는 곳</span>
      </header>

      <div className="click-grid" id="tests">
        {tiles.map((tile, index) => {
          const content = <><img src={tile.image} alt="" /><span className="tile-label">{tile.label}</span><h2>{tile.title}</h2>{'pending' in tile && tile.pending && <b className="pending-label">곳 열림</b>}</>;
          return 'href' in tile
            ? <Link className={`click-tile ${tile.size} tile-${index + 1}`} href={tile.href} key={tile.title}>{content}</Link>
            : <article className={`click-tile ${tile.size} tile-${index + 1} pending`} key={tile.title}>{content}</article>;
        })}
      </div>

      <footer><strong>happy!</strong><span>© 2026 Happy</span></footer>
    </main>
  );
}
