'use client';

import { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import celebrityData from '../../../data/celebrity-embeddings.json';
import { downloadResultImage } from '../../../lib/download-result';

type GenderChoice = 'female' | 'male' | 'all';
type CelebrityRecord = { name: string; image: string; embedding: number[] };
type Match = CelebrityRecord & { similarity: number };

const maleNames = new Set([
  'BTS 뷔', 'NCT태용', '강호동', '공유', '곽튜브', '김영광', '남주혁', '문세윤', '박보검', '배성재',
  '서장훈', '스트레이키즈 현진', '윤시윤', '윤태영', '육성재', '이광수', '이도현', '장성규', '전현무',
  '정해인', '조정석', '조정식', '지창욱', '차은우', '한석준', '황제성',
]);

let humanPromise: Promise<any> | null = null;

async function getHuman() {
  if (!humanPromise) {
    humanPromise = new Promise<any>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-human-face]');
      if ((window as any).Human) { resolve((window as any).Human); return; }
      const script = existing ?? document.createElement('script');
      script.dataset.humanFace = 'true';
      script.src = '/human.js';
      script.onload = () => resolve((window as any).Human);
      script.onerror = () => reject(new Error('얼굴 분석 모델을 불러오지 못했어요. 잠시 후 다시 시도해주세요.'));
      if (!existing) document.head.appendChild(script);
    }).then(async (HumanModule) => {
      const human = new HumanModule.Human({
        modelBasePath: '/human-models/',
        cacheSensitivity: 0,
        filter: { enabled: true, equalization: true },
        face: {
          enabled: true,
          detector: { enabled: true, modelPath: 'blazeface.json', rotation: true, maxDetected: 2, minConfidence: 0.25 },
          mesh: { enabled: true, modelPath: 'facemesh.json' },
          description: { enabled: true, modelPath: 'faceres.json' },
          iris: { enabled: false }, emotion: { enabled: false },
          antispoof: { enabled: false }, liveness: { enabled: false },
        },
        body: { enabled: false }, hand: { enabled: false }, object: { enabled: false }, gesture: { enabled: false },
      });
      await human.load();
      await human.warmup();
      return human;
    });
  }
  return humanPromise;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function uniqueBestMatches(human: any, embedding: number[], gender: GenderChoice) {
  const bestByName = new Map<string, Match>();
  for (const record of celebrityData.records as CelebrityRecord[]) {
    const isMale = maleNames.has(record.name);
    if ((gender === 'female' && isMale) || (gender === 'male' && !isMale)) continue;
    const similarity = human.match.similarity(embedding, record.embedding, { order: 2, multiplier: 25, min: 0.2, max: 0.8 });
    const current = bestByName.get(record.name);
    if (!current || similarity > current.similarity) bestByName.set(record.name, { ...record, similarity });
  }
  return [...bestByName.values()].sort((a, b) => b.similarity - a.similarity).slice(0, 3);
}

export default function CelebrityLookalike() {
  const [preview, setPreview] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [gender, setGender] = useState<GenderChoice>('female');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const result = matches[0];

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function analyze(file: File) {
    if (!file.type.startsWith('image/')) { setError('이미지 파일을 선택해주세요.'); return; }
    if (file.size > 12 * 1024 * 1024) { setError('12MB 이하의 사진을 선택해주세요.'); return; }
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url); setError(''); setMatches([]); setAnalyzing(true);
    try {
      const [human, image] = await Promise.all([getHuman(), loadImage(url)]);
      const detected = await human.detect(image);
      if (detected.face.length === 0) throw new Error('사진에서 얼굴을 찾지 못했어요. 얼굴이 크게 나온 사진을 선택해주세요.');
      if (detected.face.length > 1) throw new Error('한 명만 나온 사진을 선택해주세요.');
      const embedding = detected.face[0].embedding;
      if (!embedding?.length) throw new Error('얼굴 특징을 분석하지 못했어요. 다른 사진을 선택해주세요.');
      setMatches(uniqueBestMatches(human, Array.from(embedding), gender));
    } catch (caught) {
      humanPromise = null;
      setError(caught instanceof Error ? caught.message : '분석 중 문제가 생겼어요. 다른 사진으로 다시 시도해주세요.');
    } finally {
      setAnalyzing(false);
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null); setMatches([]); setAnalyzing(false); setCopied(false); setError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  async function share() {
    if (!result) return;
    const text = `나와 가장 닮은 유명인은 ${result.name}!`;
    try {
      if (navigator.share) await navigator.share({ title: '닮은 유명인 찾기', text, url: window.location.href });
      else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setCopied(true); }
    } catch { /* 공유 취소 */ }
  }

  if (result && preview) return <section className="lookalike-result">
    <p>나와 가장 닮은 유명인은</p>
    <div className="result-photo"><NextImage src={result.image} alt={result.name} width={420} height={420} unoptimized /><span>{Math.round(result.similarity * 100)}%</span></div>
    <h1>{result.name}</h1>
    <div className="lookalike-ranking">
      {matches.map((match, index) => <div key={match.name}><b>{index + 1}</b><NextImage src={match.image} alt="" width={54} height={54} unoptimized /><strong>{match.name}</strong><span>{Math.round(match.similarity * 100)}%</span></div>)}
    </div>
    <button className="save-result-button" onClick={() => downloadResultImage({ title: '당신과 닮은 유명인 찾기', result: result.name, description: `얼굴 유사도 ${Math.round(result.similarity * 100)}%`, emoji: '✨', accent: '#ff716f', photo: result.image })}>결과 이미지 저장</button>
    <button className="quiz-button" onClick={share}>{copied ? '결과가 복사됐어요!' : '결과 공유하기'}</button>
    <button className="reset-button" onClick={reset}>다른 사진으로 다시 하기</button>
  </section>;

  return <section className="lookalike-upload">
    <div><p>FACE MATCH</p><h1>당신과 닮은 유명인 찾기</h1></div>
    <div className="lookalike-gender" aria-label="비교할 연예인 선택">
      <button className={gender === 'female' ? 'active' : ''} onClick={() => setGender('female')}>여성</button>
      <button className={gender === 'male' ? 'active' : ''} onClick={() => setGender('male')}>남성</button>
      <button className={gender === 'all' ? 'active' : ''} onClick={() => setGender('all')}>전체</button>
    </div>
    <button className={`photo-drop ${preview ? 'has-photo' : ''}`} onClick={() => !analyzing && fileRef.current?.click()} disabled={analyzing}>
      {preview ? <NextImage src={preview} alt="선택한 사진 미리보기" width={760} height={570} unoptimized /> : <><b>＋</b><strong>사진 선택하기</strong></>}
      {analyzing && <span className="photo-loading"><i />얼굴 특징을 비교하고 있어요...</span>}
    </button>
    <input ref={fileRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) analyze(file); }} />
    {error && <><p className="error">{error}</p><button className="reset-button" onClick={reset}>다른 사진 선택하기</button></>}
    <p className="local-privacy">🔒 사진은 서버로 전송되거나 저장되지 않습니다.</p>
  </section>;
}
