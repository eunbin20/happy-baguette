import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCredit from '../../../../../components/article-credit';
import ArticleHeroImage from '../../../../../components/article-hero-image';
import RelatedPosts from '../../../../../components/related-posts';
import { infpWomanCompatibilitySeries } from '../../../../../lib/infp-woman-compatibility';
import type { WomanCompatibilitySeries } from '../../../../../lib/infp-woman-compatibility';
import { additionalWomanCompatibilitySeries } from '../../../../../lib/infj-entp-intj-woman-compatibility';
import { isxxWomanCompatibilitySeries } from '../../../../../lib/isxx-woman-compatibility';
import { ixepWomanCompatibilitySeries } from '../../../../../lib/ixep-woman-compatibility';
import { ejxWomanCompatibilitySeries } from '../../../../../lib/ejx-woman-compatibility';
import { articleJsonLd, breadcrumbJsonLd, defaultShareImage } from '../../../../../lib/seo';
import { absoluteUrl } from '../../../../../lib/site';

type Props = { params: Promise<{ type: string; man: string }> };

// Add future woman-type series here; the route and article template remain shared.
const seriesBySlug: Record<string, WomanCompatibilitySeries> = {
  'infp-woman': infpWomanCompatibilitySeries,
  ...Object.fromEntries(additionalWomanCompatibilitySeries.map((series) => [`${series.womanType.toLowerCase()}-woman`, series])),
  ...Object.fromEntries(isxxWomanCompatibilitySeries.map((series) => [`${series.womanType.toLowerCase()}-woman`, series])),
  ...Object.fromEntries(ixepWomanCompatibilitySeries.map((series) => [`${series.womanType.toLowerCase()}-woman`, series])),
  ...Object.fromEntries(ejxWomanCompatibilitySeries.map((series) => [`${series.womanType.toLowerCase()}-woman`, series])),
};

export function generateStaticParams() {
  return Object.entries(seriesBySlug).flatMap(([type, series]) => series.posts.map((post) => ({ type, man: `${post.manType.toLowerCase()}-man` })));
}

function findPost(type: string, man: string) {
  const series = seriesBySlug[type.toLowerCase()];
  const post = series?.posts.find((item) => `${item.manType.toLowerCase()}-man` === man.toLowerCase());
  return series && post ? { series, post } : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, man } = await params;
  const found = findPost(type, man);
  if (!found) return {};
  const { series, post } = found;
  const path = `/mbti/${type}/${man}/compatibility/`;
  const title = `${series.womanType} 여자와 ${post.manType} 남자 궁합`;
  const description = `${title}, 서로 끌리는 이유와 남자의 호감 신호, 연애 갈등과 대화법, 오래 만나는 방법을 구체적으로 정리했습니다.`;
  return { title, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title, description, type: 'article', url: path, images: [defaultShareImage] }, twitter: { card: 'summary_large_image', title, description, images: [defaultShareImage] } };
}

export default async function WomanPairCompatibilityPage({ params }: Props) {
  const { type, man } = await params;
  const found = findPost(type, man);
  if (!found) notFound();
  const { series, post } = found;
  const path = `/mbti/${type}/${man}/compatibility/`;
  const title = `${series.womanType} 여자와 ${post.manType} 남자 궁합`;
  const description = `${title}, 서로 끌리는 이유와 남자의 호감 신호, 연애 갈등과 대화법, 오래 만나는 방법을 구체적으로 정리했습니다.`;
  const currentIndex = series.posts.findIndex((item) => item.manType === post.manType);
  const siblings = [1, 2, 3].map((offset) => series.posts[(currentIndex + offset) % series.posts.length]);

  return <main className="love-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title, description, path, section: '관계와 마음' })) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: title, path }])) }} />
    <header className="mbti-header"><Link className="logo" href="/"><span>happy baguette</span></Link><Link href={`/mbti/${series.womanType.toLowerCase()}/compatibility/`}>{series.womanType} 궁합</Link></header>
    <article className="ramble-post compatibility-post">
      <div className="plain-post-title"><span>관계와 마음</span><h1>{title}</h1><strong>{post.oneLine}</strong><ArticleCredit /></div>
      <ArticleHeroImage alt={`${title} 대표 이미지`} />
      <div className="ramble-copy">
        <p>{series.intro}</p>
        <p>두 사람의 궁합 점수를 굳이 숫자로 표현하면 <strong>{post.score}점</strong> 정도입니다. 이 숫자는 관계의 성공 여부가 아니라 가까워지는 속도와 표현의 차이, 갈등을 풀기 쉬운 정도를 함께 본 참고값입니다.</p>
        <h2>{series.womanType} 여자와 {post.manType} 남자가 끌리는 이유</h2>
        <p>{post.attraction}</p><p>{series.strength}</p>
        <h2>{post.manType} 남자가 {series.womanType} 여자를 좋아할 때 보이는 신호</h2>
        <p>{post.signals}</p><p>한 번의 친절이나 빠른 답장만으로 마음을 단정하기보다 시간과 질문, 약속이 같은 방향으로 반복되는지를 보는 것이 좋습니다. 진지한 관심은 자신의 일상 안에 상대를 위한 자리를 만드는 행동에서 더 분명하게 나타납니다.</p>
        <h2>실제로 연애를 시작하면</h2>
        <p>{post.dating}</p><p>초반에 잘 통한다고 느낀 부분만큼 서로 다른 생활 방식도 일찍 알아두는 편이 좋습니다. 차이는 사랑의 부족이 아니라 편안함과 애정을 느끼는 방식이 다르다는 뜻일 수 있습니다.</p>
        <h2>가장 자주 부딪히는 지점</h2>
        <p>{post.conflict}</p><p>{series.insecurity}</p>
        <h2>싸웠을 때 이렇게 대화하는 것이 좋습니다</h2>
        <p>{post.communication}</p><p>“원래 너는 그래”라고 성격을 단정하기보다 방금 있었던 행동, 내가 느낀 감정, 다음에 원하는 행동을 순서대로 말하세요. 그래야 방어적인 반응을 줄이고 실제 변화를 함께 정할 수 있습니다.</p>
        <h2>두 사람이 오래 만나려면</h2>
        <p>{post.longTerm}</p><p>좋은 궁합은 갈등이 없는 조합이 아닙니다. 서로 다른 반응을 마음의 크기로만 해석하지 않고 상대가 알아들을 수 있는 방식으로 애정을 번역할 때 궁합이 현실의 좋은 관계로 이어집니다.</p>
      </div>
      <aside className="related-posts"><h2>{series.womanType} 여자와 다른 MBTI 남자 궁합</h2>{siblings.map((item) => <Link href={`/mbti/${type}/${item.manType.toLowerCase()}-man/compatibility/`} key={item.manType}><span>{series.womanType} 여자 × {item.manType} 남자</span><b>읽어보기</b></Link>)}</aside>
      <RelatedPosts currentPath={path} />
    </article>
  </main>;
}
