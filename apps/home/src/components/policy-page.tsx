import Link from 'next/link';
import type { ReactNode } from 'react';

export default function PolicyPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <main className="policy-page">
    <header className="policy-header"><Link className="logo" href="/"><span>happy baguette</span></Link><Link href="/">홈으로</Link></header>
    <article>
      <div className="policy-title"><span>{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div>
      <div className="policy-copy">{children}</div>
    </article>
  </main>;
}
