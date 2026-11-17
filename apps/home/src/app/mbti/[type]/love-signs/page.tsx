import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMbtiLovePost, mbtiLovePosts } from '../../../../lib/mbti-love';
import { getMbtiLoveExtra } from '../../../../lib/mbti-love-extras';
import { getMbtiLoveDeep } from '../../../../lib/mbti-love-deep';
import { absoluteUrl } from '../../../../lib/site';
import { articleJsonLd, breadcrumbJsonLd, defaultShareImage } from '../../../../lib/seo';
import RelatedPosts from '../../../../components/related-posts';

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
    openGraph: { title: `${post.type}가 진짜 좋아할 때 하는 행동`, description: post.hook, type: 'article', url: path, images: [defaultShareImage], publishedTime: '2026-11-17T00:00:00+09:00', modifiedTime: '2026-11-17T00:00:00+09:00' },
    twitter: { card: 'summary_large_image', title: `${post.type}가 진짜 좋아할 때 하는 행동`, description: post.hook, images: [defaultShareImage] },
  };
}

export default async function MbtiLovePage({ params }: PageProps) {
  const { type } = await params;
  const post = getMbtiLovePost(type);
  if (!post) notFound();
  const extra = getMbtiLoveExtra(post.type);
  const deep = getMbtiLoveDeep(post.type);
  const index = mbtiLovePosts.findIndex((item) => item.type === post.type);
  const next = mbtiLovePosts[(index + 1) % mbtiLovePosts.length];
  const path = `/mbti/${type.toLowerCase()}/love-signs/`;
  const title = `${post.type}가 진짜 좋아할 때 하는 행동`;

  return (
    <main className="love-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title, description: post.hook, path, section: 'MBTI 연애' })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: 'MBTI 연애', path: '/mbti/' }, { name: post.type, path }])) }} />
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
          {deep && <>
            <h2>연락에서는 이렇게 티가 난다</h2>
            <p>{deep.contact}</p>
            <p>짝사랑하는 입장에서는 답장 속도 하나만 보고 하루에도 몇 번씩 마음이 바뀐다. 그런데 {post.type}의 마음을 볼 때는 한 번의 빠른 답장보다 대화를 다시 이어오는지, 당신이 했던 말을 기억하는지, 굳이 필요하지 않은 순간에도 연락할 이유를 만드는지를 함께 보는 편이 정확하다. 마음이 있는 사람은 결국 자기 방식으로 대화의 끈을 남긴다.</p>

            <h2>직접 만났을 때 더 분명해지는 행동</h2>
            <p>{deep.inPerson}</p>
            <p>여기서 중요한 건 다른 사람과 있을 때의 모습과 비교하는 것이다. 원래 조용한 사람이 당신에게만 말을 많이 하는지, 원래 활발한 사람이 당신 앞에서만 이상하게 긴장하는지처럼 평소의 기준에서 벗어나는 순간이 호감 신호가 된다. 눈을 마주치는 시간, 옆자리를 고르는 방식, 헤어진 뒤 다시 연락하는지까지 이어서 보면 작은 행동들이 하나의 방향을 가리키기 시작한다.</p>

            <h2>다른 이성 이야기가 나왔을 때</h2>
            <p>{deep.jealousy}</p>
            <p>질투는 꼭 화를 내거나 대놓고 캐묻는 모습으로만 나오지 않는다. 어떤 유형은 장난이 늘고, 어떤 유형은 갑자기 조용해지며, 어떤 유형은 관계를 논리적으로 확인한다. 평소와 다르게 그 사람 이야기를 기억하고 다시 꺼낸다면 적어도 당신의 연애 가능성에 관심을 두고 있다는 뜻으로 볼 수 있다.</p>
          </>}
          {post.signals.map((signal, signalIndex) => <div className="ramble-bit" key={signal.title}>
            <h2>{signalIndex + 1}. {signal.title}</h2>
            <p>{signal.body} 이런 건 한두 번으로 판단하기보다는 자꾸 반복되는지를 보는 게 맞다.</p>
          </div>)}
          {extra && <>
            <p>근데 여기서 은근 많이 헷갈리는 게 있다. {extra.confusing}</p>
            <h2>실제로는 대충 이런 식이다</h2>
            {extra.stories.map((story) => <p className="story-line" key={story}>— {story}</p>)}
          </>}
          {deep && <>
            <h2>고백하기 직전에는 무엇이 달라질까</h2>
            <p>{deep.beforeConfession}</p>
            <p>호감이 커질수록 관계를 잃는 것도 무서워진다. 그래서 고백 직전에는 오히려 잠깐 거리를 두거나, 이상형을 떠보거나, 둘이 사귀는 상황을 농담처럼 던지는 행동이 나올 수 있다. 이때 당신이 편안하게 호감을 돌려주면 상대는 비로소 다음 단계로 움직일 명분을 얻는다.</p>

            <h2>원래 친절한 것과 나를 좋아하는 것의 차이</h2>
            <p>{deep.justKind}</p>
            <p>한 가지 행동만 떼어놓으면 얼마든지 친절로 설명할 수 있다. 하지만 연락, 기억, 시간, 약속이 동시에 당신에게 쌓인다면 이야기가 달라진다. 특히 대가가 없는데도 귀찮음을 감수하고, 당신의 반응에 따라 다음 행동을 바꾸고, 관계를 계속 이어갈 장면을 만든다면 단순한 호의보다 마음에 가까울 가능성이 높다.</p>

            <h2>그래도 희망을 가져봐도 되는 순간</h2>
            <p>{deep.hopeful}</p>
            <p>당신이 작은 호감을 보냈을 때 상대도 한 걸음 가까워지는지가 가장 중요하다. 먼저 연락했더니 다음에는 상대가 먼저 찾아오고, 한 번 만났더니 다음 약속을 상대가 꺼내고, 사적인 이야기를 했더니 자기 이야기도 돌려주는 식이다. 짝사랑은 혼자 해석할 때 끝없이 불안하지만 관계는 결국 주고받는 움직임에서 앞으로 간다.</p>
          </>}
          <p>그래서 어떻게 다가가야 하냐면, {post.move}</p>
          <p>결국 한 가지 행동보다 나한테만 꾸준히 달라지는지를 보면 된다. 관심 없는 사람에게 계속 시간과 에너지를 쓰는 사람은 생각보다 많지 않으니까.</p>
        </div>
        <RelatedPosts currentPath={path} />

        <nav className="love-related">
          <Link href="/mbti/">16개 유형 전체 보기</Link>
          <Link href={`/mbti/${next.type.toLowerCase()}/love-signs/`}>다음: {next.type} →</Link>
        </nav>
      </article>
    </main>
  );
}
