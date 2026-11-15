import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../../lib/site';
import CelebrityLookalike from './lookalike';

export const metadata: Metadata = {
  title: '당신과 닮은 유명인 찾기',
  description: '사진 한 장으로 확인하는 나의 닮은꼴 연예인 테스트',
  alternates: { canonical: absoluteUrl('/tests/celebrity-lookalike/') },
};

export default function CelebrityLookalikePage() {
  return <main className="lookalike-page">
    <header className="compact-header"><Link className="logo" href="/"><span>happy baguette</span></Link></header>
    <CelebrityLookalike />
  </main>;
}
