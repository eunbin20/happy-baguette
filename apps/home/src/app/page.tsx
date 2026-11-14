import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '../lib/site';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

const categories = [
  { icon: '▦', label: '전체', active: true },
  { icon: '☺', label: '성격' },
  { icon: '◎', label: '얼굴' },
  { icon: '⌁', label: '관찰력' },
  { icon: 'VS', label: '월드컵' },
];

const maps = [
  { art: 'fishbread', type: '먹거리', title: '붕어빵 맵', description: '붕어빵 판매점의 영업시간, 메뉴와 가격', fields: ['위치', '영업시간', '메뉴', '가격'] },
  { art: 'bath', type: '생활', title: '목욕탕 맵', description: '동네 목욕탕과 사우나의 이용 정보', fields: ['위치', '이용료', '운영시간', '시설'] },
  { art: 'ballet', type: '배움', title: '발레학원 맵', description: '지역별 발레학원의 수업과 등록 정보', fields: ['위치', '수강료', '대상', '시간표'] },
];

const tests = [
  { href: '/tests/animal/', art: 'animal', badge: '성격', title: '내가 동물이라면?', description: '10개의 질문으로 알아보는 나의 동물 캐릭터', meta: '10문항 · 3분', available: true },
  { href: '/tests/patience/', art: 'patience', badge: '게임', title: '나의 인내심 테스트', description: '로딩 화면 앞에서 나는 얼마나 기다릴까?', meta: '터치 게임 · 1분', available: true },
  { href: '/tests/travel-worldcup/', art: 'worldcup', badge: '월드컵', title: '여행지 이상형 월드컵', description: '지금 가장 떠나고 싶은 여행지는 어디?', meta: '16강 · 2분', available: true },
  { href: '/tests/celebrity-lookalike/', art: 'face', badge: '얼굴', title: '당신과 닮은 유명인 찾기', description: '사진으로 확인하는 나의 닮은꼴', meta: '사진 테스트 · 1분', available: true },
  { href: '/tests/find-difference/', art: 'focus', badge: '관찰력', title: '다른 그림 찾기', description: '그림 사이에 숨어 있는 다른 하나를 찾아보세요', meta: '5단계 · 1분', available: true },
  { art: 'mood', badge: '성격', title: '오늘의 기분 컬러', description: '지금 끌리는 색으로 확인하는 오늘의 마음', meta: '8문항 · 2분' },
];

function TestCard({ test }: { test: (typeof tests)[number] }) {
  const content = <>
    <div className={`test-thumb thumb-${test.art}`}>
      {test.art === 'animal' && <div className="thumb-emoji">🐶 <span>🦊</span></div>}
      {test.art === 'patience' && <div className="thumb-symbol">10</div>}
      {test.art === 'face' && <div className="thumb-emoji single">✨</div>}
      {test.art === 'worldcup' && <div className="versus"><span>🏖️</span><b>VS</b><span>🏙️</span></div>}
      {test.art === 'focus' && <div className="focus-grid">● ● ●<br />● ○ ●<br />● ● ●</div>}
      {test.art === 'mood' && <div className="color-dots"><i /><i /><i /><i /></div>}
      {!test.available && <span className="status-badge">준비 중</span>}
    </div>
    <div className="test-info">
      <span className="test-type">{test.badge}</span>
      <h3>{test.title}</h3>
      <p>{test.description}</p>
      <span className="test-meta">{test.meta}</span>
    </div>
  </>;
  return test.available ? <Link className="catalog-card" href={test.href ?? '/'}>{content}</Link> : <article className="catalog-card is-upcoming">{content}</article>;
}

export default function Home() {
  return <main className="home-shell">
    <header className="home-header">
      <Link className="logo" href="/" aria-label="해피 홈"><span>happy</span></Link>
      <nav aria-label="주요 메뉴"><a href="#tests">테스트</a><a href="#maps">지도</a></nav>
    </header>

    <section className="main-banner" aria-labelledby="banner-title">
      <div className="banner-copy">
        <span className="banner-label">NEW TEST</span>
        <h1 id="banner-title">내가 동물이라면?</h1>
        <p>나와 닮은 동물 캐릭터를 확인해보세요.</p>
        <Link href="/tests/animal/">테스트 시작 <span>→</span></Link>
      </div>
      <div className="banner-art" aria-hidden="true">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <span className="banner-animal dog">🐶</span><span className="banner-animal fox">🦊</span>
        <span className="banner-animal cat">🐱</span><span className="banner-animal bear">🐻</span>
      </div>
      <div className="banner-dots" aria-hidden="true"><i className="active" /><i /><i /></div>
    </section>

    <section className="service-section" aria-labelledby="service-title">
      <h2 id="service-title">둘러보기</h2>
      <div className="service-grid">
        <a className="service-card tests" href="#tests"><span className="service-icon">✓</span><div><b>테스트</b><p>성격, 얼굴, 관찰력, 이상형 월드컵</p></div><i>→</i></a>
        <a className="service-card maps" href="#maps"><span className="service-icon">⌖</span><div><b>지도</b><p>지역별 장소와 가격, 운영 정보</p></div><i>→</i></a>
      </div>
    </section>

    <section className="category-section" id="tests" aria-labelledby="category-title">
      <div className="content-kicker">TEST</div><h2 id="category-title">테스트 카테고리</h2>
      <div className="category-list">
        {categories.map((category) => <button className={category.active ? 'active' : ''} key={category.label} type="button">
          <span>{category.icon}</span><b>{category.label}</b>
        </button>)}
      </div>
    </section>

    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-heading"><div><h2 id="catalog-title">전체 테스트</h2><p>새로운 테스트가 계속 추가됩니다.</p></div><button type="button">최신순 <span>⌄</span></button></div>
      <div className="catalog-grid">{tests.map((test) => <TestCard key={test.title} test={test} />)}</div>
    </section>

    <section className="map-section" id="maps" aria-labelledby="map-title">
      <div className="section-heading map-heading"><div><span className="content-kicker">MAP</span><h2 id="map-title">생활 지도</h2><p>필요한 장소 정보를 지도에서 확인하세요.</p></div><button type="button">전체 지역 <span>⌄</span></button></div>
      <div className="map-grid">
        {maps.map((map) => <article className="map-card" key={map.title}>
          <div className={`map-preview map-${map.art}`}>
            <div className="map-lines" /><span className="map-pin">{map.art === 'fishbread' ? '🐟' : map.art === 'bath' ? '♨' : '🩰'}</span>
            <span className="status-badge">준비 중</span>
          </div>
          <div className="map-info"><span>{map.type}</span><h3>{map.title}</h3><p>{map.description}</p><div>{map.fields.map((field) => <b key={field}>{field}</b>)}</div></div>
        </article>)}
      </div>
    </section>

    <footer><strong>happy</strong><span>© 2026 Happy</span><span>테스트와 생활 지도를 제공합니다.</span></footer>
  </main>;
}
