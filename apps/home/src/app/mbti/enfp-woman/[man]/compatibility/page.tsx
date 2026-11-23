import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCredit from '../../../../../components/article-credit';
import ArticleHeroImage from '../../../../../components/article-hero-image';
import RelatedPosts from '../../../../../components/related-posts';
import { enfpWomanCompatibilityPosts, getEnfpWomanCompatibility } from '../../../../../lib/enfp-woman-compatibility';
import { articleJsonLd, breadcrumbJsonLd, defaultShareImage } from '../../../../../lib/seo';
import { absoluteUrl } from '../../../../../lib/site';

type Props = { params: Promise<{ man: string }> };

export function generateStaticParams() {
  return enfpWomanCompatibilityPosts.map((post) => ({ man: `${post.manType.toLowerCase()}-man` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { man } = await params;
  const post = getEnfpWomanCompatibility(man);
  if (!post) return {};
  const path = `/mbti/enfp-woman/${man}/compatibility/`;
  const title = `ENFP 여자와 ${post.manType} 남자 궁합`;
  const description = `${title}, 서로 끌리는 이유부터 썸 신호와 갈등 해결법, 오래 만나는 방법까지 실제 연애 흐름에 맞춰 정리했습니다.`;
  return { title, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title, description, type: 'article', url: path, images: [defaultShareImage] }, twitter: { card: 'summary_large_image', title, description, images: [defaultShareImage] } };
}

export default async function EnfpWomanPairPage({ params }: Props) {
  const { man } = await params;
  const post = getEnfpWomanCompatibility(man);
  if (!post) notFound();
  const path = `/mbti/enfp-woman/${man}/compatibility/`;
  const title = `ENFP 여자와 ${post.manType} 남자 궁합`;
  const description = `${title}, 서로 끌리는 이유부터 썸 신호와 갈등 해결법, 오래 만나는 방법까지 실제 연애 흐름에 맞춰 정리했습니다.`;
  const currentIndex = enfpWomanCompatibilityPosts.findIndex((item) => item.manType === post.manType);
  const siblings = [1, 2, 3].map((offset) => enfpWomanCompatibilityPosts[(currentIndex + offset) % enfpWomanCompatibilityPosts.length]);

  return <main className="love-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title, description, path, section: '관계와 마음' })) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: title, path }])) }} />
    <header className="mbti-header"><Link className="logo" href="/"><span>happy baguette</span></Link><Link href="/mbti/enfp/compatibility/">ENFP 궁합</Link></header>
    <article className="ramble-post compatibility-post">
      <div className="plain-post-title"><span>관계와 마음</span><h1>{title}</h1><strong>{post.oneLine}</strong><ArticleCredit /></div>
      <ArticleHeroImage alt={`${title} 대표 이미지`} />
      <div className="ramble-copy">
        <p>좋아하는 사람이 생기면 작은 말과 행동에도 의미를 찾게 됩니다. 특히 ENFP 여자는 상대와 정서적으로 연결되어 있다는 느낌을 중요하게 여기기 때문에, 같은 호감이라도 {post.manType} 남자가 어떤 방식으로 표현하는지를 알면 관계를 훨씬 차분하게 볼 수 있습니다.</p>
        <p>두 사람의 궁합 점수를 굳이 숫자로 표현하면 <strong>{post.score}점</strong> 정도입니다. 점수는 관계의 성공 여부가 아니라 처음 가까워지는 속도, 감정 표현의 차이, 갈등을 풀기 쉬운 정도를 합쳐 본 참고값입니다.</p>
        <h2>ENFP 여자와 {post.manType} 남자가 끌리는 이유</h2>
        <p>{post.attraction}</p>
        <p>ENFP 여자의 밝음은 단순히 말이 많은 성격이 아니라 상대 안의 가능성을 발견하고 반응해주는 힘에 가깝습니다. 이 장점이 {post.manType} 남자의 고유한 매력과 만날 때 두 사람만의 강한 호기심이 생깁니다.</p>
        <h2>{post.manType} 남자가 ENFP 여자를 좋아할 때 보이는 신호</h2>
        <p>{post.signals}</p>
        <p>한두 번의 친절이나 빠른 답장만으로 단정하기보다는 시간, 질문, 약속이 같은 방향으로 반복되는지 확인해야 합니다. 관심은 순간적인 말보다 자신의 일상 안에 상대를 위한 자리를 만드는 행동에서 더 분명하게 드러납니다.</p>
        <h2>실제로 연애를 시작하면</h2>
        <p>{post.dating}</p>
        <p>초반의 설렘을 오래 가져가려면 서로 같다고 느낀 부분만큼 다른 부분도 빨리 알아두는 편이 좋습니다. 차이는 애정이 부족하다는 증거가 아니라 편안함을 느끼는 방식이 다르다는 뜻일 수 있습니다.</p>
        <h2>가장 자주 부딪히는 지점</h2>
        <p>{post.conflict}</p>
        <p>ENFP 여자는 관계가 불안할수록 더 많이 이야기하며 확인하려는 경향이 있습니다. 반면 상대가 생각을 정리할 시간이 필요한 유형이라면 같은 행동이 압박으로 전달될 수 있으므로, 감정의 크기와 대화의 타이밍을 분리해 보는 것이 필요합니다.</p>
        <h2>싸웠을 때 이렇게 대화하는 것이 좋습니다</h2>
        <p>{post.communication}</p>
        <p>“원래 너는 그래”라는 유형 단정 대신 방금 있었던 행동과 내가 느낀 감정, 다음에 원하는 행동을 순서대로 말해보세요. 상대의 성격을 평가하지 않아야 방어적인 반응을 줄이고 실제 변화를 이야기할 수 있습니다.</p>
        <h2>두 사람이 오래 만나려면</h2>
        <p>{post.longTerm}</p>
        <p>궁합이 좋다는 말은 갈등이 없다는 뜻이 아닙니다. 서로 다른 반응을 나에 대한 마음의 크기로만 해석하지 않고, 상대가 이해할 수 있는 방식으로 애정을 번역할 수 있을 때 좋은 궁합이 현실의 좋은 관계가 됩니다.</p>
      </div>
      <aside className="related-posts"><h2>ENFP 여자와 다른 MBTI 남자 궁합</h2>{siblings.map((item) => <Link href={`/mbti/enfp-woman/${item.manType.toLowerCase()}-man/compatibility/`} key={item.manType}><span>ENFP 여자 × {item.manType} 남자</span><b>읽어보기</b></Link>)}</aside>
      <RelatedPosts currentPath={path} />
    </article>
  </main>;
}
