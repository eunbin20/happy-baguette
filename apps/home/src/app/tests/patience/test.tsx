'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { downloadResultImage } from '../../../lib/download-result';

type Result = { emoji: string; name: string; message: string; color: string };

function getResult(seconds: number): Result {
  if (seconds < 0.8) return { emoji: '⚡', name: '로딩을 용납하지 않는 손', message: '화면이 뜨자마자 바로 눌렀어요. 기다림보다 행동이 먼저인 타입!', color: '#ff716f' };
  if (seconds < 2.5) return { emoji: '👆', name: '빠른 해결 선호형', message: '잠깐은 기다렸지만 곧 직접 해결에 나섰어요.', color: '#ff916b' };
  if (seconds < 5) return { emoji: '⏱️', name: '평균적인 인내심', message: '이 정도면 충분히 기다렸다고 판단했군요. 가장 현실적인 반응이에요.', color: '#7b73d8' };
  if (seconds < 10) return { emoji: '🌿', name: '꽤 느긋한 사람', message: '로딩을 의심하면서도 제법 오래 지켜봤어요.', color: '#458f80' };
  return { emoji: '🪨', name: '끝을 보는 인내의 달인', message: '이 화면을 이렇게 오래 기다리다니… 인내심만큼은 확실합니다.', color: '#4e5968' };
}

export default function PatienceTest() {
  const startedAt = useRef(0);
  const finished = useRef(false);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [run, setRun] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    startedAt.current = performance.now();
    finished.current = false;
    setElapsed(null);
    setCopied(false);
  }, [run]);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setElapsed((performance.now() - startedAt.current) / 1000);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') finish();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  async function share() {
    if (elapsed === null) return;
    const result = getResult(elapsed);
    const text = `나는 로딩 화면을 ${elapsed.toFixed(2)}초 만에 눌렀다! 결과는 '${result.name}'`;
    try {
      if (navigator.share) await navigator.share({ title: '나의 인내심 테스트', text, url: window.location.href });
      else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setCopied(true); }
    } catch { /* 공유 취소 */ }
  }

  if (elapsed === null) {
    return <section
      className="patience-game"
      onPointerDown={finish}
      role="button"
      tabIndex={0}
      aria-label="로딩 중. 화면을 누르면 인내심 결과가 표시됩니다."
    >
      <div className="loading-spinner" aria-hidden="true" />
      <p>불러오는 중...</p>
    </section>;
  }

  const result = getResult(elapsed);
  return <section className="quiz-panel result-panel patience-result" style={{ '--result-color': result.color } as CSSProperties}>
    <p className="result-overline">당신이 화면을 터치하기까지</p>
    <strong className="elapsed-time">{elapsed.toFixed(2)}<small>초</small></strong>
    <div className="result-emoji">{result.emoji}</div><h1>{result.name}</h1>
    <p className="result-description">{result.message}</p>
    <button className="save-result-button" onClick={() => downloadResultImage({ title: '나의 인내심 테스트', result: result.name, description: `${elapsed.toFixed(2)}초 만에 화면을 터치했어요`, emoji: result.emoji, accent: result.color })}>결과 이미지 저장</button>
    <button className="quiz-button" onClick={share}>{copied ? '결과가 복사됐어요!' : '결과 공유하기'}</button>
    <button className="reset-button" onClick={() => setRun((value) => value + 1)}>다시 측정하기</button>
  </section>;
}
