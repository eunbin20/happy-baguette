import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../../lib/site';
import PatienceTest from './test';

export const metadata: Metadata = {
  title: '나의 인내심 테스트',
  description: '로딩 화면을 터치하기까지 걸린 시간으로 확인하는 인내심 게임',
  alternates: { canonical: absoluteUrl('/tests/patience/') },
};

export default function PatienceTestPage() {
  return <main className="test-page">
    <header className="compact-header"><Link className="logo" href="/"><span>happy</span></Link></header>
    <PatienceTest />
  </main>;
}
