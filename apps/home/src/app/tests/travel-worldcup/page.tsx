import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../../../lib/site';
import TravelWorldCup from './worldcup';

export const metadata: Metadata = {
  title: '여행지 이상형 월드컵',
  description: '16개 여행지 중 지금 가장 떠나고 싶은 한 곳을 골라보세요.',
  alternates: { canonical: absoluteUrl('/tests/travel-worldcup/') },
};

export default function TravelWorldCupPage() {
  return <main className="worldcup-page">
    <header className="compact-header"><Link className="logo" href="/"><span>happy baguette</span></Link></header>
    <TravelWorldCup />
  </main>;
}
