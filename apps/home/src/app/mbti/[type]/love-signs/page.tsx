import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMbtiLovePost, mbtiLovePosts } from '../../../../lib/mbti-love';
import { absoluteUrl } from '../../../../lib/site';

type PageProps = { params: Promise<{ type: string }> };

export function generateStaticParams() {
  return mbtiLovePosts.map((post) => ({ type: post.type.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const post = getMbtiLovePost(type);
  if (!post) return {};
  const path = `/mbti/${type.toLowerCase()}/love-signs/`;
  return {
    title: `${post.type}가 진짜 좋아할 때 하는 행동`,
    description: `${post.type}의 진짜 호감 신호 4가지와 마음을 움직이는 방법. ${post.hook}`,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: `${post.type}가 진짜 좋아할 때 하는 행동`, description: post.hook, type: 'article' },
  };
}

export default async function MbtiLovePage({ params }: PageProps) {
  const { type } = await params;
  const post = getMbtiLovePost(type);
  if (!post) notFound();
  const index = mbtiLovePosts.findIndex((item) => item.type === post.type);
  const next = mbtiLovePosts[(index + 1) % mbtiLovePosts.length];

  return (
    <main className="love-article">
      <header className="mbti-header">
        <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
        <Link href="/mbti/">MBTI 전체</Link>
      </header>

      <article>
        <section className="love-hero" style={{ backgroundColor: post.color }}>
          <span className="love-kicker">LOVE SIGNAL · {post.type}</span>
          <h1>{post.type}가 진짜<br />좋아할 때 하는 행동</h1>
          <strong>{post.hook}</strong>
        </section>

        <p className="love-intro">{post.intro}</p>

        <section className="love-signs">
          {post.signals.map((signal, signalIndex) => (
            <div className="love-sign" key={signal.title}>
              <b>{String(signalIndex + 1).padStart(2, '0')}</b>
              <div><h2>{signal.title}</h2><p>{signal.body}</p></div>
            </div>
          ))}
        </section>

        <section className="love-move">
          <span>HOW TO MOVE</span>
          <h2>{post.type} 마음을 움직이는 법</h2>
          <p>{post.move}</p>
        </section>

        <nav className="love-related">
          <Link href="/mbti/">16개 유형 전체 보기</Link>
          <Link href={`/mbti/${next.type.toLowerCase()}/love-signs/`}>다음: {next.type} →</Link>
        </nav>
      </article>
    </main>
  );
}
