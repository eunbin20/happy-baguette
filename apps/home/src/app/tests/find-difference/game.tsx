'use client';

import { useEffect, useRef, useState } from 'react';

const stages = [
  { normal: '🍅', odd: '🍎', position: 14, columns: 5 },
  { normal: '🐶', odd: '🐱', position: 28, columns: 6 },
  { normal: '⭐', odd: '🌟', position: 7, columns: 6 },
  { normal: '🌕', odd: '🌝', position: 31, columns: 7 },
  { normal: '🙂', odd: '😎', position: 39, columns: 7 },
];

function resultFor(seconds: number, misses: number) {
  const score = seconds + misses * 2;
  if (score < 18) return { emoji: '🦅', name: '매의 눈', text: '작은 차이도 순식간에 포착하는 관찰력의 달인!' };
  if (score < 28) return { emoji: '🐈', name: '예리한 고양이', text: '시선을 한 번 훑는 것만으로 중요한 차이를 찾아내요.' };
  if (score < 42) return { emoji: '🦊', name: '꼼꼼한 탐색가', text: '서두르지 않고 정확하게 단서를 찾아내는 타입이에요.' };
  return { emoji: '🐢', name: '신중한 거북이', text: '시간이 걸려도 포기하지 않고 끝까지 답을 찾아냈어요.' };
}

export default function FindDifference() {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(0);
  const [misses, setMisses] = useState(0);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [flash, setFlash] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => { if (started) startedAt.current = performance.now(); }, [started]);

  function choose(index: number) {
    if (index !== stages[stage].position) { setMisses((value) => value + 1); setFlash(index); window.setTimeout(() => setFlash(null), 280); return; }
    if (stage === stages.length - 1) { setElapsed((performance.now() - startedAt.current) / 1000); }
    else setStage((value) => value + 1);
  }

  function reset() { setStarted(false); setStage(0); setMisses(0); setElapsed(null); setFlash(null); setCopied(false); }
  async function share() {
    if (elapsed === null) return; const result = resultFor(elapsed, misses); const text = `다른 그림 찾기 ${elapsed.toFixed(1)}초! 나의 관찰력은 '${result.name}'`;
    try { if (navigator.share) await navigator.share({ title: '다른 그림 찾기', text, url: window.location.href }); else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setCopied(true); } } catch { /* 공유 취소 */ }
  }

  if (!started) return <section className="difference-intro">
    <div className="difference-sample" aria-hidden="true">● ● ●<br />● ○ ●<br />● ● ●</div><p>OBSERVATION GAME</p><h1>다른 그림 찾기</h1>
    <div><span>5단계</span><span>시간 측정</span><span>오답 기록</span></div><button onClick={() => setStarted(true)}>시작하기</button>
  </section>;

  if (elapsed !== null) { const result = resultFor(elapsed, misses); return <section className="difference-result">
    <p>나의 관찰력 결과</p><div>{result.emoji}</div><h1>{result.name}</h1><h2>{elapsed.toFixed(1)}초 · 오답 {misses}회</h2><p>{result.text}</p>
    <button className="quiz-button" onClick={share}>{copied ? '결과가 복사됐어요!' : '결과 공유하기'}</button><button className="reset-button" onClick={reset}>다시 도전하기</button>
  </section>; }

  const current = stages[stage]; const count = current.columns * current.columns;
  return <section className="difference-game">
    <div className="difference-status"><b>STAGE {stage + 1}</b><span>오답 {misses}</span></div><h1>다른 그림 하나를 찾아보세요</h1>
    <div className="emoji-board" style={{ gridTemplateColumns: `repeat(${current.columns}, 1fr)` }}>
      {Array.from({ length: count }, (_, index) => <button className={flash === index ? 'wrong' : ''} key={index} onClick={() => choose(index)} aria-label={`${index + 1}번째 그림`}>{index === current.position ? current.odd : current.normal}</button>)}
    </div><div className="stage-dots">{stages.map((_, index) => <i className={index <= stage ? 'active' : ''} key={index} />)}</div>
  </section>;
}
