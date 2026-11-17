import type {Metadata} from 'next'; import Link from 'next/link'; import {absoluteUrl} from '../../../lib/site'; import ReunionCalculator from './test';
export const metadata:Metadata={title:'재회 확률 계산기',description:'이별 상황과 상대 MBTI를 입력하고 재회 가능성과 연락 전략을 확인하세요.',alternates:{canonical:absoluteUrl('/tests/reunion-chance/')}};
export default function Page(){return <main className="test-page"><header className="compact-header"><Link className="logo" href="/"><span>happy baguette</span></Link></header><ReunionCalculator/></main>}
