import type { Metadata } from 'next';
import Link from 'next/link';
import { dreamPosts } from '../../lib/dream-posts';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = { title: '꿈해몽', description: '기억에 남는 꿈의 장면별 의미를 찾아보세요.', alternates: { canonical: absoluteUrl('/dream/') } };
export default function DreamIndex() {
  return <main className="home-shell feed-home dream-index">
    <header className="feed-header"><Link className="logo" href="/"><span>happy baguette</span></Link><span className="header-note">꿈해몽</span></header>
    <nav className="article-categories"><Link href="/mbti/">MBTI 연애</Link><Link href="/mbti/compatibility/">MBTI 궁합</Link><Link className="active" href="/dream/">꿈해몽</Link></nav>
    <div className="board-title"><h1>어젯밤 무슨 꿈 꿨어요?</h1><p>기억나는 장면부터 찾아보세요</p></div>
    <div className="dream-grid">{dreamPosts.map((post) => <Link href={`/dream/${post.slug}/`} key={post.slug}><img src={post.image} alt={post.title} /><div><h2>{post.title}</h2><p>{post.hook}</p></div></Link>)}</div>
  </main>;
}
