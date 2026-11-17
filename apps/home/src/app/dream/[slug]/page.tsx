import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dreamPosts, getDreamPost } from '../../../lib/dream-posts';
import { absoluteUrl } from '../../../lib/site';
import { articleJsonLd, breadcrumbJsonLd } from '../../../lib/seo';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return dreamPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = getDreamPost(slug); if (!post) return {}; const path = `/dream/${slug}/`; return { title: post.title, description: post.hook, alternates: { canonical: absoluteUrl(path) }, openGraph: { title: post.title, description: post.hook, type: 'article', url: path, images: [post.image] }, twitter: { card: 'summary_large_image', title: post.title, description: post.hook, images: [post.image] } }; }
export default async function DreamPage({ params }: Props) {
  const { slug } = await params; const post = getDreamPost(slug); if (!post) notFound(); const path = `/dream/${slug}/`;
  return <main className="love-article dream-post">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ title: post.title, description: post.hook, path, image: post.image, section: '꿈해몽' })) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '꿈해몽', path: '/dream/' }, { name: post.title, path }])) }} />
    <header className="mbti-header"><Link className="logo" href="/"><span>happy baguette</span></Link><Link href="/dream/">꿈해몽 전체</Link></header>
    <article className="ramble-post"><div className="dream-cover"><img src={post.image} alt={post.title} /><span>꿈해몽</span><h1>{post.title}</h1><strong>{post.hook}</strong></div>
      <div className="ramble-copy"><p>{post.intro}</p>{post.cases.map((item) => <div className="ramble-bit" key={item.title}><h2>{item.title}</h2><p>{item.body}</p></div>)}<p>{post.ending}</p>
        <section className="dream-life-note">
          <h2>꿈을 활용해서 조금 더 나은 삶을 사는 법</h2>
          <p>길몽을 꿨다고 가만히 있어도 좋은 일이 생기는 건 아니다. 기분 좋은 꿈을 꿨다면 요즘 미뤄둔 연락이나 시작하고 싶었던 일을 해보는 계기로 쓰는 게 훨씬 낫다. 꿈이 준 좋은 기분을 실제 행동으로 이어가는 셈이다.</p>
          <p>흉몽도 무조건 나쁜 일의 예고라고 볼 필요는 없다. 오히려 내가 요즘 무엇을 불안해하는지, 어디에서 무리하고 있는지를 보여주는 알람처럼 사용할 수 있다. 인간관계가 신경 쓰였다면 대화를 해보고, 돈이 걱정됐다면 지출을 확인하고, 몸이 피곤했다면 쉬어가는 식이다.</p>
          <p>결국 좋은 꿈과 나쁜 꿈을 가르는 건 꿈의 장면보다 꿈을 꾼 다음의 태도일지도 모른다. 좋은 꿈은 용기로, 불편한 꿈은 점검의 기회로 쓰면 어떤 꿈이든 현실에 도움이 된다.</p>
        </section>
      </div>
      <nav className="love-related"><Link href="/dream/">다른 꿈 찾아보기</Link><Link href={`/dream/${dreamPosts[(dreamPosts.indexOf(post) + 1) % dreamPosts.length].slug}/`}>다음 꿈 →</Link></nav>
    </article>
  </main>;
}
