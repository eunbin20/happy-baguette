import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../../lib/site';
import AnimalTest from './test';

export const metadata: Metadata = {
  title: '내가 동물이라면? 성격 테스트',
  description: '10개의 질문으로 알아보는 내 안의 동물 캐릭터 테스트',
  alternates: { canonical: absoluteUrl('/tests/animal/') },
};

export default function AnimalTestPage() {
  return <main className="test-page">
    <header className="compact-header"><Link className="logo" href="/"><span>happy baguette</span></Link></header>
    <AnimalTest />
  </main>;
}
