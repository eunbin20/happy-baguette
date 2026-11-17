import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dreamPosts, getDreamPost } from '../../../lib/dream-posts';
import { absoluteUrl } from '../../../lib/site';
import { articleJsonLd, breadcrumbJsonLd } from '../../../lib/seo';
import RelatedPosts from '../../../components/related-posts';

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
      </div>
      <RelatedPosts currentPath={path} title="꿈을 꾼 뒤 함께 읽어보세요" />
      <nav className="love-related"><Link href="/dream/">다른 꿈 찾아보기</Link><Link href={`/dream/${dreamPosts[(dreamPosts.indexOf(post) + 1) % dreamPosts.length].slug}/`}>다음 꿈 →</Link></nav>
    </article>
  </main>;
}
