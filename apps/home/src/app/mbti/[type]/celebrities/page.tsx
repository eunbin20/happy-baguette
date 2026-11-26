import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleCredit from '../../../../components/article-credit';
import ArticleHeroImage from '../../../../components/article-hero-image';
import { getMbtiCelebrityPost, mbtiCelebrityPosts } from '../../../../lib/mbti-celebrities';
import { absoluteUrl } from '../../../../lib/site';
import { articleJsonLd, breadcrumbJsonLd, defaultShareImage } from '../../../../lib/seo';

type Props = { params: Promise<{ type: string }> };

export function generateStaticParams() {
  return mbtiCelebrityPosts.map((post) => ({ type: post.type.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const post = getMbtiCelebrityPost(type);
  if (!post) return {};
  const path = `/mbti/${type}/celebrities/`;
  const title = `${post.type} 연예인·유명인 30명 총정리`;
  const description = `${post.type} 연예인과 유명인 30명을 한눈에 정리했습니다. 국내 배우, 가수, 방송인과 해외 유명 인물을 함께 확인해보세요.`;
  return { title, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title, description, type: 'article', url: path, images: [defaultShareImage] }, twitter: { card: 'summary_large_image', title, description, images: [defaultShareImage] } };
}

export default async function MbtiCelebritiesPage({ params }: Props) {
  const { type } = await params;
  const post = getMbtiCelebrityPost(type);
  if (!post) notFound();
  const path = `/mbti/${type}/celebrities/`;
  const title = `${post.type} 연예인·유명인 30명 총정리`;
  const description = `${post.type} 연예인과 유명인 30명을 한눈에 정리했습니다. 국내 배우, 가수, 방송인과 해외 유명 인물을 함께 확인해보세요.`;
  return <main className="love-article">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title, description, path, section: '관계와 마음' })) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: post.type, path: `/mbti/${type}/love-signs/` }, { name: `${post.type} 연예인`, path }])) }} />
    <header className="mbti-header"><Link className="logo" href="/"><span>happy baguette</span></Link><Link href={`/mbti/${type}/love-signs/`}>{post.type} 특징</Link></header>
    <article className="ramble-post compatibility-post">
      <div className="plain-post-title"><span>관계와 마음</span><h1>{title}</h1><strong>{post.nickname}</strong><ArticleCredit /></div>
      <ArticleHeroImage alt={`${post.type} 연예인과 유명인 대표 이미지`} />
      <div className="ramble-copy">
        <p>{post.summary} 같은 MBTI로 알려진 사람들을 살펴보면 한 유형 안에서도 직업과 표현 방식이 얼마나 다양할 수 있는지 알 수 있습니다.</p>
        <p>아래 목록은 방송, 인터뷰, 프로필에서 공개된 결과와 국내외 성격 유형 자료에서 자주 분류되는 사례를 함께 정리한 것입니다. 검사를 다시 하면 결과가 바뀔 수 있고, 해외 유명인은 공개 언행을 바탕으로 한 편집자 분류가 포함되어 있습니다.</p>
        <h2>{post.type} 연예인·유명인 30명</h2>
        <ol className="celebrity-name-list">{post.names.map((name) => <li key={name}><strong>{name}</strong></li>)}</ol>
        <h2>{post.type} 유명인에게서 자주 보이는 이미지</h2>
        <p>{post.publicImage}</p>
        <p>다만 같은 유형이라고 해서 말투와 행동이 모두 같은 것은 아닙니다. 무대 위 역할, 직업 환경, 나이와 경험에 따라 겉으로 드러나는 모습은 크게 달라질 수 있습니다. 목록은 성격을 단정하는 기준보다 내가 좋아하는 인물과 공통점을 찾아보는 가벼운 자료로 보는 편이 좋습니다.</p>
        <h2>목록을 볼 때 확인할 점</h2>
        <p>연예인이 직접 밝힌 결과라도 검사 시점에 따라 유형이 바뀔 수 있습니다. 특히 오래된 인터뷰와 최근 프로필이 다르다면 최근에 본인이 밝힌 결과를 우선하는 것이 좋습니다. 팬이 추정한 유형과 본인이 공개한 유형도 구분해서 확인해야 합니다.</p>
        <p>이 글은 2026년 11월 공개 자료를 기준으로 정리했으며, 새로운 본인 발언이 확인되면 목록을 수정할 수 있습니다.</p>
      </div>
      <aside className="related-posts"><h2>{post.type} 글 더 보기</h2><Link href={`/mbti/${type}/love-signs/`}><span>{post.type} 찐사랑 특징</span><b>읽어보기</b></Link><Link href={`/mbti/${type}/compatibility/`}><span>{post.type} 연애 궁합</span><b>읽어보기</b></Link><Link href={`/mbti/${type}/reunion/`}><span>{post.type} 재회 가능성</span><b>읽어보기</b></Link></aside>
      <footer className="article-sources"><h2>참고 자료</h2><p><a href="https://testmbti.net/mbti-celebrities/" rel="nofollow noopener" target="_blank">본인이 밝힌 연예인 MBTI 출처 정리</a> · <a href="https://isbehind.com/유명인-mbti/" rel="nofollow noopener" target="_blank">국내 유명인 MBTI 데이터</a> · <a href="https://insightmetrics.org/famous-people/" rel="nofollow noopener" target="_blank">해외 유명인 유형별 자료</a></p></footer>
    </article>
  </main>;
}
