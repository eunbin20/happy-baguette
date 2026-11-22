import type { Metadata } from 'next';
import PolicyPage from '../../components/policy-page';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = { title: '사이트 소개', description: 'happy baguette가 만드는 콘텐츠와 운영 원칙을 소개합니다.', alternates: { canonical: absoluteUrl('/about/') } };

export default function AboutPage() {
  const url = absoluteUrl('/about/');
  return <PolicyPage eyebrow="ABOUT" title="happy baguette는 이런 곳입니다" intro="일상에서 가볍게 읽고 직접 해볼 수 있는 콘텐츠를 만듭니다.">
    {url && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'happy baguette 소개', url, mainEntity: { '@type': 'Organization', name: 'happy baguette', url: absoluteUrl('/') } }) }} />}
    <h2>무엇을 다루나요?</h2>
    <p>happy baguette는 MBTI를 소재로 한 연애 이야기, 관계에서 자주 생기는 고민, 기억에 남은 꿈을 돌아보는 방법, 그리고 짧게 즐길 수 있는 참여형 테스트를 다룹니다. 한 가지 정답을 강요하기보다 독자가 자기 상황을 이해하는 데 사용할 수 있는 구체적인 관점을 제공하는 것을 목표로 합니다.</p>
    <h2>누가 만드나요?</h2>
    <p>모든 글과 테스트는 happy baguette 편집팀이 기획하고 검토합니다. 자동화 도구를 초안 작성과 반복 작업에 활용할 수 있지만, 제목과 구성, 사실관계, 표현의 적절성은 공개 전에 사람이 확인합니다. 존재하지 않는 전문가나 자격을 내세우지 않습니다.</p>
    <h2>어떤 기준으로 운영하나요?</h2>
    <p>검색 유입만을 위해 비슷한 문서를 대량으로 만드는 것보다 실제 방문자가 끝까지 읽거나 직접 사용해볼 이유가 있는 콘텐츠를 우선합니다. 오류를 발견하면 내용을 수정하고 업데이트 날짜를 표시합니다. 자세한 기준은 콘텐츠 작성 원칙에서 확인할 수 있습니다.</p>
    <h2>알아두어야 할 점</h2>
    <p>MBTI, 꿈해몽, 닮은꼴 및 관계 테스트는 오락과 자기 성찰을 위한 콘텐츠입니다. 의료·법률·재정 상담이나 객관적인 진단을 대신하지 않습니다. 중요한 결정은 해당 분야의 자격을 갖춘 전문가 및 신뢰할 수 있는 공식 자료를 기준으로 판단해야 합니다.</p>
  </PolicyPage>;
}
