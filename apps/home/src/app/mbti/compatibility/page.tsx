import type { Metadata } from 'next';
import Link from 'next/link';
import { mbtiCompatibility } from '../../../lib/mbti-compatibility';
import { absoluteUrl } from '../../../lib/site';

export const metadata: Metadata = { title: 'MBTI별 연애 궁합', description: '16개 MBTI 유형별 잘 맞는 궁합과 자주 싸우는 이유.', alternates: { canonical: absoluteUrl('/mbti/compatibility/') } };

export default function CompatibilityIndex() {
  return <main className="mbti-board">
    <header className="feed-header"><Link className="logo" href="/"><span>happy baguette</span></Link><span className="header-note">MBTI 궁합</span></header>
    <nav className="article-categories"><Link className="active" href="/">관계와 마음</Link></nav>
    <div className="board-title"><h1>MBTI별 연애 궁합</h1><p>잘 맞는 이유와 자주 싸우는 지점</p></div>
    <div className="board-list">
      <div className="board-labels"><span>유형</span><span>한 줄 궁합</span><span>글</span></div>
      {mbtiCompatibility.map((item) => <Link className="board-row" href={`/mbti/${item.type.toLowerCase()}/compatibility/`} key={item.type}>
        <b>{item.type}</b><div><strong>{item.hook}</strong><p>잘 맞는 유형 {item.best.join(' · ')} / 부딪히기 쉬운 유형 {item.tricky.join(' · ')}</p></div><span>더보기 →</span>
      </Link>)}
    </div>
  </main>;
}
