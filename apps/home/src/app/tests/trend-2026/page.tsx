import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../../lib/site';
import TrendTest from './test';

export const metadata: Metadata = { title: '2026 트렌드 고사', description: 'AI부터 밈까지, 2026년 트렌드 감각을 확인하는 10문제 테스트.', alternates: { canonical: absoluteUrl('/tests/trend-2026/') } };
export default function TrendTestPage() { return <main className="test-page"><header className="compact-header"><Link className="logo" href="/"><span>happy baguette</span></Link></header><TrendTest /></main>; }
