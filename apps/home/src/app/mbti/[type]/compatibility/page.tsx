import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMbtiCompatibility, mbtiCompatibility } from '../../../../lib/mbti-compatibility';
import { absoluteUrl } from '../../../../lib/site';
import { articleJsonLd, breadcrumbJsonLd, defaultShareImage } from '../../../../lib/seo';

type Props = { params: Promise<{ type: string }> };
export function generateStaticParams() { return mbtiCompatibility.map((item) => ({ type: item.type.toLowerCase() })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params; const item = getMbtiCompatibility(type); if (!item) return {};
  const path = `/mbti/${type}/compatibility/`; const description = `${item.type}와 잘 맞는 MBTI, 자주 부딪히는 유형과 오래 만나는 법.`;
  return { title: `${item.type} 연애 궁합`, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title: `${item.type} 연애 궁합`, description, type: 'article', url: path, images: [defaultShareImage] }, twitter: { card: 'summary_large_image', title: `${item.type} 연애 궁합`, description, images: [defaultShareImage] } };
}
export default async function CompatibilityPage({ params }: Props) {
  const { type } = await params; const item = getMbtiCompatibility(type); if (!item) notFound();
  const path = `/mbti/${type}/compatibility/`; const title = `${item.type} 연애 궁합`; const description = `${item.type}와 잘 맞는 MBTI, 자주 부딪히는 유형과 오래 만나는 법.`;
  return <main className="love-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title, description, path, section: 'MBTI 궁합' })) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: 'MBTI 궁합', path: '/mbti/compatibility/' }, { name: item.type, path }])) }} />
    <header className="mbti-header"><Link className="logo" href="/"><span>happy baguette</span></Link><Link href="/mbti/compatibility/">궁합 전체</Link></header>
    <article className="ramble-post compatibility-post">
      <div className="plain-post-title"><span>MBTI 궁합</span><h1>{item.type} 연애 궁합</h1><strong>{item.hook}</strong></div>
      <div className="ramble-copy">
        <p>{item.type}는 연애할 때 자기만의 속도와 기준이 꽤 분명한 편이다. 그래서 단순히 성격이 비슷한 사람보다 서로의 부족한 부분을 편하게 채워주는 사람과 만났을 때 관계가 오래 간다.</p>
        <h2>잘 맞는 궁합: {item.best.join(', ')}</h2><p>{item.good}</p>
        <p>처음부터 완벽하게 편하다기보다는, 서로 다른 점이 매력으로 느껴지고 갈등이 생겨도 대화를 이어갈 힘이 있는 조합에 가깝다.</p>
        <h2>조금 어려운 궁합: {item.tricky.join(', ')}</h2><p>{item.conflict}</p>
        <p>물론 MBTI만으로 안 맞는 관계가 정해지는 건 아니다. 다만 같은 문제로 계속 싸운다면 두 유형이 중요하게 보는 기준이 무엇인지 비교해볼 필요는 있다.</p>
        <h2>{item.type}와 오래 만나려면</h2><p>{item.advice}</p>
        <p>결국 좋은 궁합은 원래 잘 맞는 두 사람이 아니라, 다른 점을 알게 된 뒤에도 상대가 이해할 수 있는 방식으로 표현하는 두 사람에 더 가깝다.</p>
      </div>
      <nav className="love-related"><Link href="/mbti/compatibility/">16개 궁합 전체 보기</Link><Link href={`/mbti/${item.type.toLowerCase()}/love-signs/`}>{item.type} 찐사랑 특징 →</Link></nav>
    </article>
  </main>;
}
