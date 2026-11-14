'use client';

import { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';

type StarResult = { name: string; keyword: string; emoji: string; description: string; traits: string[]; color: string };

const stars: StarResult[] = [
  { name: '아이유', keyword: '맑고 따뜻한 분위기', emoji: '🌼', description: '부드러운 인상 속에 또렷한 자신만의 색이 느껴지는 타입이에요.', traits: ['맑은 인상', '따뜻한 색감', '차분한 매력'], color: '#e6b85c' },
  { name: '김태리', keyword: '자연스럽고 선명한 분위기', emoji: '🌿', description: '꾸미지 않은 순간에도 생동감과 단단한 에너지가 드러나는 타입이에요.', traits: ['자연스러움', '생동감', '단단한 인상'], color: '#4f8d72' },
  { name: '카리나', keyword: '차갑고 또렷한 분위기', emoji: '💎', description: '선명한 대비와 시크한 무드가 돋보이는 도시적인 타입이에요.', traits: ['시크함', '높은 대비', '도시적 무드'], color: '#6d72c7' },
  { name: '박보검', keyword: '편안하고 반듯한 분위기', emoji: '☀️', description: '밝고 안정적인 인상으로 주변을 편안하게 만드는 타입이에요.', traits: ['편안함', '반듯한 인상', '밝은 에너지'], color: '#e29a57' },
  { name: '차은우', keyword: '정돈되고 깨끗한 분위기', emoji: '✨', description: '깨끗한 색감과 균형 잡힌 무드가 먼저 눈에 들어오는 타입이에요.', traits: ['깔끔함', '균형감', '선명한 인상'], color: '#5d8fbd' },
  { name: '변우석', keyword: '부드럽고 여유로운 분위기', emoji: '🌙', description: '낮은 채도와 편안한 표정에서 은근한 존재감이 느껴지는 타입이에요.', traits: ['부드러움', '여유', '은근한 존재감'], color: '#8978a9' },
];

export default function CelebrityLookalike() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<StarResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function analyze(file: File) {
    if (!file.type.startsWith('image/')) { setError('이미지 파일을 선택해주세요.'); return; }
    if (file.size > 12 * 1024 * 1024) { setError('12MB 이하의 사진을 선택해주세요.'); return; }
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(file);
    setPreview(url); setError(''); setResult(null); setAnalyzing(true);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = 48; canvas.height = 48;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) { setError('사진을 읽지 못했어요.'); setAnalyzing(false); return; }
      context.drawImage(image, 0, 0, 48, 48);
      const pixels = context.getImageData(0, 0, 48, 48).data;
      let r = 0, g = 0, b = 0, contrast = 0;
      for (let i = 0; i < pixels.length; i += 4) { r += pixels[i]; g += pixels[i + 1]; b += pixels[i + 2]; contrast += Math.abs(pixels[i] - pixels[i + 2]); }
      const count = pixels.length / 4; const brightness = (r + g + b) / (count * 3); const warmth = (r - b) / count;
      const index = Math.abs(Math.floor(brightness * 3 + warmth * 5 + contrast / count + file.size / 1000)) % stars.length;
      window.setTimeout(() => { setResult(stars[index]); setAnalyzing(false); }, 1350);
    };
    image.onerror = () => { setError('사진을 읽지 못했어요. 다른 사진을 선택해주세요.'); setAnalyzing(false); };
    image.src = url;
  }

  function reset() { if (preview) URL.revokeObjectURL(preview); setPreview(null); setResult(null); setAnalyzing(false); setCopied(false); if (fileRef.current) fileRef.current.value = ''; }
  async function share() {
    if (!result) return; const text = `나의 스타 분위기 닮은꼴은 ${result.name}!`;
    try { if (navigator.share) await navigator.share({ title: '닮은꼴 연예인 찾기', text, url: window.location.href }); else { await navigator.clipboard.writeText(`${text} ${window.location.href}`); setCopied(true); } } catch { /* 공유 취소 */ }
  }

  if (result && preview) return <section className="lookalike-result">
    <p>나의 닮은꼴 연예인은</p><div className="result-photo"><NextImage src={preview} alt="선택한 사진 미리보기" width={420} height={420} unoptimized /><span style={{ background: result.color }}>{result.emoji}</span></div>
    <small>{result.keyword}</small><h1>{result.name}</h1><p className="star-description">{result.description}</p>
    <div className="trait-list">{result.traits.map((trait) => <span key={trait}>#{trait}</span>)}</div>
    <button className="quiz-button" onClick={share}>{copied ? '결과가 복사됐어요!' : '결과 공유하기'}</button><button className="reset-button" onClick={reset}>다른 사진으로 다시 하기</button>
  </section>;

  return <section className="lookalike-upload">
    <div><p>PHOTO TEST</p><h1>당신과 닮은 유명인 찾기</h1></div>
    <button className={`photo-drop ${preview ? 'has-photo' : ''}`} onClick={() => !analyzing && fileRef.current?.click()} disabled={analyzing}>
      {preview ? <NextImage src={preview} alt="선택한 사진 미리보기" width={760} height={570} unoptimized /> : <><b>＋</b><strong>사진 선택하기</strong></>}
      {analyzing && <span className="photo-loading"><i />분위기를 분석하고 있어요...</span>}
    </button>
    <input ref={fileRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) analyze(file); }} />
    {error && <p className="error">{error}</p>}<p className="local-privacy">🔒 사진은 서버로 전송되거나 저장되지 않습니다.</p>
  </section>;
}
