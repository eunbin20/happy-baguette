'use client';

import { useState } from 'react';

type Destination = { name: string; country: string; image: string; tagline: string };

const destinations: Destination[] = [
  { name: '파리', country: '프랑스', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=82', tagline: '거리마다 낭만이 흐르는 도시' },
  { name: '발리', country: '인도네시아', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=82', tagline: '숲과 바다 사이의 느긋한 휴식' },
  { name: '도쿄', country: '일본', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=82', tagline: '취향을 끝없이 발견하는 도시' },
  { name: '뉴욕', country: '미국', image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1000&q=82', tagline: '잠들지 않는 거대한 에너지' },
  { name: '로마', country: '이탈리아', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=82', tagline: '시간을 걷는 듯한 골목 여행' },
  { name: '하와이', country: '미국', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=82', tagline: '파도와 노을이 있는 완벽한 하루' },
  { name: '런던', country: '영국', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=82', tagline: '고전과 새로움이 공존하는 도시' },
  { name: '스위스', country: '스위스', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=82', tagline: '그림 같은 알프스 풍경' },
  { name: '방콕', country: '태국', image: 'https://images.unsplash.com/photo-1563492065-5c0c34640f70?auto=format&fit=crop&w=1000&q=82', tagline: '맛과 활기가 가득한 여행' },
  { name: '시드니', country: '호주', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=82', tagline: '도시와 자연을 동시에' },
  { name: '바르셀로나', country: '스페인', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1000&q=82', tagline: '색감과 햇살이 선명한 도시' },
  { name: '아이슬란드', country: '아이슬란드', image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1000&q=82', tagline: '지구 밖에 온 듯한 대자연' },
  { name: '교토', country: '일본', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=82', tagline: '고요한 계절을 걷는 여행' },
  { name: '세부', country: '필리핀', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=82', tagline: '투명한 바다 속 모험' },
  { name: '프라하', country: '체코', image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=82', tagline: '동화 속에 머무는 듯한 밤' },
  { name: '두바이', country: '아랍에미리트', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=82', tagline: '사막 위 화려한 미래 도시' },
];

export default function TravelWorldCup() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState<Destination[]>(destinations);
  const [index, setIndex] = useState(0);
  const [winners, setWinners] = useState<Destination[]>([]);
  const [champion, setChampion] = useState<Destination | null>(null);
  const [copied, setCopied] = useState(false);

  const roundName = round.length === 2 ? '결승' : `${round.length}강`;

  function choose(item: Destination) {
    const nextWinners = [...winners, item];
    if (index + 2 < round.length) { setWinners(nextWinners); setIndex(index + 2); return; }
    if (round.length === 2) { setChampion(item); return; }
    setRound(nextWinners); setWinners([]); setIndex(0);
  }

  function reset() { setStarted(false); setRound(destinations); setIndex(0); setWinners([]); setChampion(null); setCopied(false); }

  async function share() {
    if (!champion) return;
    const text = `나의 여행지 이상형은 ${champion.name}!`;
    try { if (navigator.share) await navigator.share({ title: '여행지 이상형 월드컵', text, url: window.location.href }); else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setCopied(true); } } catch { /* 공유 취소 */ }
  }

  if (!started) return <section className="worldcup-intro">
    <div className="intro-versus"><span>🏖️</span><b>VS</b><span>🏙️</span></div><p>IDEAL WORLD CUP</p><h1>여행지 이상형 월드컵</h1>
    <div className="worldcup-rule"><span>16개 여행지</span><span>15번의 선택</span><span>약 2분</span></div>
    <button onClick={() => setStarted(true)}>16강 시작하기</button>
  </section>;

  if (champion) return <section className="champion-panel">
    <p>나의 최종 여행지</p><div className="champion-art" style={{ backgroundImage: `url(${champion.image})` }} />
    <small>{champion.country}</small><h1>{champion.name}</h1><h2>{champion.tagline}</h2>
    <button className="quiz-button" onClick={share}>{copied ? '결과가 복사됐어요!' : '결과 공유하기'}</button><button className="reset-button" onClick={reset}>다시 하기</button>
  </section>;

  const pair = [round[index], round[index + 1]];
  return <section className="worldcup-game">
    <div className="worldcup-progress"><b>{roundName}</b><span>{index / 2 + 1} / {round.length / 2}</span></div>
    <h1>더 떠나고 싶은 곳을 선택하세요</h1>
    <div className="matchup">
      {pair.map((item, itemIndex) => <button key={item.name} onClick={() => choose(item)}>
        <div className="destination-art" style={{ backgroundImage: `url(${item.image})` }} />
        <small>{item.country}</small><strong>{item.name}</strong><p>{item.tagline}</p>{itemIndex === 0 && <i>VS</i>}
      </button>)}
    </div>
    <p className="photo-credit">Photos from Unsplash</p>
  </section>;
}
