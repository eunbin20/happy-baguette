import type { Metadata } from 'next';
import PolicyPage from '../../components/policy-page';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = { title: '문의하기', description: 'happy baguette 콘텐츠 정정, 개인정보 및 사이트 관련 문의 안내입니다.', alternates: { canonical: absoluteUrl('/contact/') } };

export default function ContactPage() {
  return <PolicyPage eyebrow="CONTACT" title="문의하기" intro="콘텐츠 정정, 개인정보, 저작권 및 사이트 이용에 관한 의견을 받습니다.">
    <h2>이메일 문의</h2>
    <p><a className="contact-email" href="mailto:dmsqlswkd@gmail.com">dmsqlswkd@gmail.com</a></p>
    <p>확인이 필요한 페이지 주소와 문의 내용을 함께 보내주시면 내용을 파악하는 데 도움이 됩니다. 개인정보나 민감한 사진은 꼭 필요한 경우가 아니라면 첨부하지 마십시오.</p>
    <h2>정정 및 권리 침해 요청</h2>
    <p>잘못된 정보, 출처 표시 문제, 이미지 또는 콘텐츠의 권리 침해 가능성을 발견한 경우 해당 주소와 요청 사유를 보내주십시오. 확인 후 수정 또는 삭제가 필요하다고 판단되면 가능한 범위에서 신속하게 조치합니다.</p>
    <h2>답변 안내</h2>
    <p>모든 제안에 개별 답변을 보장하지는 않지만, 개인정보 및 권리 침해와 관련된 문의를 우선하여 확인합니다. 광고 클릭 요청이나 광고 관련 보상 문의는 받지 않습니다.</p>
  </PolicyPage>;
}
