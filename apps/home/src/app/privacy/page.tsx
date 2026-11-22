import type { Metadata } from 'next';
import PolicyPage from '../../components/policy-page';
import { absoluteUrl } from '../../lib/site';

export const metadata: Metadata = { title: '개인정보처리방침', description: 'happy baguette의 개인정보 및 쿠키 처리 방침을 안내합니다.', alternates: { canonical: absoluteUrl('/privacy/') } };

export default function PrivacyPage() {
  return <PolicyPage eyebrow="PRIVACY" title="개인정보처리방침" intro="방문자가 어떤 정보를 언제 제공하는지 알기 쉽게 설명합니다.">
    <p className="policy-updated">시행일: 2026년 11월 22일</p>
    <h2>직접 수집하는 개인정보</h2>
    <p>현재 happy baguette는 회원가입, 댓글 또는 문의 양식을 운영하지 않으며 이름, 전화번호, 이메일 주소를 직접 입력받지 않습니다. 향후 개인정보를 입력받는 기능이 추가되면 수집 항목과 목적, 보관 기간을 이 방침에 먼저 공개합니다.</p>
    <h2>사진을 사용하는 테스트와 포토보드</h2>
    <p>닮은 유명인 찾기와 포토보드에서 선택한 사진은 방문자의 브라우저 안에서만 처리됩니다. 사진을 happy baguette 서버로 전송하거나 보관하지 않으며, 페이지를 닫거나 새로고침하면 선택한 사진과 편집 내용은 사라집니다.</p>
    <h2>광고와 쿠키</h2>
    <p>이 사이트는 Google AdSense를 사용하거나 사용을 준비하고 있습니다. Google을 포함한 제3자 광고 사업자는 쿠키를 사용해 방문 기록을 바탕으로 광고를 제공할 수 있으며, 광고 제공 과정에서 브라우저의 쿠키를 읽거나 웹 비콘 및 IP 주소와 같은 기술 정보를 사용할 수 있습니다. 방문자는 Google 광고 설정에서 맞춤 광고 사용 여부를 관리할 수 있습니다.</p>
    <h2>자동으로 전달될 수 있는 정보</h2>
    <p>웹사이트 접속 과정에서 호스팅 서비스와 브라우저는 IP 주소, 접속 시각, 요청한 주소, 기기 및 브라우저 종류와 같은 기술 정보를 처리할 수 있습니다. 이 정보는 사이트 제공, 보안 유지, 오류 확인을 위해 필요한 범위에서 처리될 수 있습니다.</p>
    <h2>외부 링크</h2>
    <p>사이트 안의 외부 링크를 통해 다른 서비스로 이동하면 해당 서비스의 개인정보처리방침이 적용됩니다. happy baguette는 외부 사이트의 정보 처리 방식이나 콘텐츠를 통제하지 않습니다.</p>
    <h2>방침 변경</h2>
    <p>기능 또는 관련 정책이 변경되면 이 페이지의 내용과 시행일을 갱신합니다. 중요한 변경이 있을 경우 사이트 안에서 알아보기 쉽게 안내합니다.</p>
    <h2>개인정보 관련 문의</h2>
    <p>개인정보 처리에 관한 문의는 <a href="mailto:dmsqlswkd@gmail.com">dmsqlswkd@gmail.com</a>으로 보내주십시오.</p>
  </PolicyPage>;
}
