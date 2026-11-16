import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMbtiLovePost, mbtiLovePosts } from '../../../../lib/mbti-love';
import { getMbtiLoveExtra } from '../../../../lib/mbti-love-extras';
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
  const extra = getMbtiLoveExtra(post.type);
  const index = mbtiLovePosts.findIndex((item) => item.type === post.type);
  const next = mbtiLovePosts[(index + 1) % mbtiLovePosts.length];

  return (
    <main className="love-article">
      <header className="mbti-header">
        <Link className="logo" href="/" aria-label="happy baguette 홈"><span>happy baguette</span></Link>
        <Link href="/mbti/">MBTI 전체</Link>
      </header>

      <article className="ramble-post">
        <section className="love-hero" style={{ backgroundColor: post.color }}>
          <span className="love-kicker">LOVE SIGNAL · {post.type}</span>
          <h1>{post.type}가 진짜<br />좋아할 때 하는 행동</h1>
          <strong>{post.hook}</strong>
        </section>

        <div className="ramble-copy">
          <p>{post.intro}</p>
          {extra && <p>일단 찐사랑이 되면 좀 다르다. {extra.serious}</p>}
          {post.signals.map((signal, signalIndex) => <div className="ramble-bit" key={signal.title}>
            <h2>{signalIndex + 1}. {signal.title}</h2>
            <p>{signal.body} 이런 건 한두 번으로 판단하기보다는 자꾸 반복되는지를 보는 게 맞다.</p>
          </div>)}
          {extra && <>
            <p>근데 여기서 은근 많이 헷갈리는 게 있다. {extra.confusing}</p>
            <h2>실제로는 대충 이런 식이다</h2>
            {extra.stories.map((story) => <p className="story-line" key={story}>— {story}</p>)}
          </>}
          <p>그래서 어떻게 다가가야 하냐면, {post.move}</p>
          <p>결국 한 가지 행동보다 나한테만 꾸준히 달라지는지를 보면 된다. 관심 없는 사람에게 계속 시간과 에너지를 쓰는 사람은 생각보다 많지 않으니까.</p>
        </div>

        <nav className="love-related">
          <Link href="/mbti/">16개 유형 전체 보기</Link>
          <Link href={`/mbti/${next.type.toLowerCase()}/love-signs/`}>다음: {next.type} →</Link>
        </nav>
      </article>
    </main>
  );
}
