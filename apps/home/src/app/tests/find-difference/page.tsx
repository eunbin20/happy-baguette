import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../../lib/site';
import FindDifference from './game';

export const metadata: Metadata = {
  title: '다른 그림 찾기',
  description: '5단계 그림판에서 다른 하나를 찾아 관찰력을 확인해보세요.',
  alternates: { canonical: absoluteUrl('/tests/find-difference/') },
};

export default function FindDifferencePage() {
  return <main className="difference-page">
    <header className="compact-header"><Link className="logo" href="/"><span>happy</span></Link></header>
    <FindDifference />
  </main>;
}
