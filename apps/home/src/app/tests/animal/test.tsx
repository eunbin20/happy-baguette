'use client';

import { useState } from 'react';

type AnimalKey = 'dog' | 'cat' | 'fox' | 'bear';
type Scores = Record<AnimalKey, number>;
type Question = { text: string; answers: { text: string; scores: Partial<Scores> }[] };

const questions: Question[] = [
  { text: '친구들과의 약속이 갑자기 취소됐다!', answers: [
    { text: '아쉽다! 바로 다른 친구에게 연락한다', scores: { dog: 2, fox: 1 } },
    { text: '오히려 좋아. 혼자만의 시간을 즐긴다', scores: { cat: 2, bear: 1 } },
  ]},
  { text: '처음 가는 모임에서 나는?', answers: [
    { text: '먼저 인사하며 분위기를 살핀다', scores: { dog: 2, fox: 1 } },
    { text: '편한 자리를 찾아 천천히 적응한다', scores: { cat: 1, bear: 2 } },
  ]},
  { text: '중요한 결정을 내려야 할 때는?', answers: [
    { text: '자료를 모으고 가장 효율적인 길을 찾는다', scores: { fox: 2, cat: 1 } },
    { text: '마음이 편안해지는 쪽을 선택한다', scores: { bear: 2, dog: 1 } },
  ]},
  { text: '친구가 고민을 털어놓는다면?', answers: [
    { text: '격하게 공감하고 함께 해결책을 찾는다', scores: { dog: 2, bear: 1 } },
    { text: '조용히 듣고 핵심을 정리해준다', scores: { cat: 1, fox: 2 } },
  ]},
  { text: '여행 계획을 세울 때 나는?', answers: [
    { text: '동선과 맛집을 꼼꼼하게 정리한다', scores: { fox: 2, bear: 1 } },
    { text: '큰 틀만 잡고 기분에 따라 움직인다', scores: { dog: 1, cat: 2 } },
  ]},
  { text: '나를 가장 충전해 주는 순간은?', answers: [
    { text: '좋아하는 사람들과 신나게 이야기할 때', scores: { dog: 2, fox: 1 } },
    { text: '아무 방해 없이 푹 쉬고 있을 때', scores: { bear: 2, cat: 1 } },
  ]},
  { text: '예상치 못한 문제가 생기면?', answers: [
    { text: '빠르게 상황을 파악하고 방법을 바꾼다', scores: { fox: 2, cat: 1 } },
    { text: '당황해도 끝까지 차근차근 해낸다', scores: { bear: 2, dog: 1 } },
  ]},
  { text: '마음에 드는 사람이 생겼다!', answers: [
    { text: '좋아하는 티가 얼굴에 그대로 난다', scores: { dog: 2, bear: 1 } },
    { text: '들키지 않게 천천히 거리를 좁힌다', scores: { cat: 2, fox: 1 } },
  ]},
  { text: '나의 책상이나 방은 보통?', answers: [
    { text: '내 나름의 규칙으로 깔끔하게 정리돼 있다', scores: { fox: 2, cat: 1 } },
    { text: '편안함이 우선, 필요한 건 다 찾을 수 있다', scores: { bear: 2, dog: 1 } },
  ]},
  { text: '주변 사람들이 자주 하는 말은?', answers: [
    { text: '너랑 있으면 기분이 좋아져', scores: { dog: 2, bear: 1 } },
    { text: '넌 생각보다 속이 깊고 영리해', scores: { fox: 2, cat: 1 } },
  ]},
];

const results: Record<AnimalKey, { emoji: string; name: string; title: string; description: string; traits: string[] }> = {
  dog: { emoji: '🐶', name: '햇살 강아지', title: '사람을 행복하게 하는 다정한 에너지', description: '마음을 숨기기보다 솔직하게 표현하고, 좋아하는 사람에게 아낌없이 애정을 줘요. 당신이 있는 곳에는 자연스럽게 웃음이 피어납니다.', traits: ['다정함', '솔직함', '긍정 에너지'] },
  cat: { emoji: '🐱', name: '느긋한 고양이', title: '내 속도로 세상을 즐기는 자유로운 영혼', description: '혼자서도 시간을 잘 보내며 취향과 기준이 분명해요. 무심한 듯 보여도 가까운 사람에게는 따뜻한 마음을 보여줍니다.', traits: ['독립적', '섬세함', '확실한 취향'] },
  fox: { emoji: '🦊', name: '영리한 여우', title: '상황을 읽고 답을 찾아내는 센스쟁이', description: '관찰력이 좋고 새로운 상황에서도 빠르게 핵심을 파악해요. 재치 있는 말과 유연한 생각으로 주변 사람들을 놀라게 합니다.', traits: ['눈치 빠름', '계획적', '재치'] },
  bear: { emoji: '🐻', name: '포근한 곰', title: '곁에 있으면 마음이 놓이는 든든한 사람', description: '서두르기보다 꾸준하게 자신의 길을 걸어요. 말보다 행동으로 마음을 보여주며, 소중한 사람의 편이 되어줍니다.', traits: ['듬직함', '인내심', '편안함'] },
};

const initialScores = (): Scores => ({ dog: 0, cat: 0, fox: 0, bear: 0 });

export default function AnimalTest() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Scores>(initialScores);
  const [result, setResult] = useState<AnimalKey | null>(null);
  const [copied, setCopied] = useState(false);

  function answer(points: Partial<Scores>) {
    const next = { ...scores };
    (Object.keys(points) as AnimalKey[]).forEach((key) => { next[key] += points[key] ?? 0; });
    if (index === questions.length - 1) {
      const winner = (Object.keys(next) as AnimalKey[]).reduce((a, b) => next[a] >= next[b] ? a : b);
      setScores(next); setResult(winner);
    } else { setScores(next); setIndex(index + 1); }
  }

  function reset() { setStarted(false); setIndex(0); setScores(initialScores()); setResult(null); setCopied(false); }

  async function share() {
    const data = { title: '내가 동물이라면?', text: `나는 ${result ? results[result].name : '어떤 동물'}! 당신도 테스트해보세요.`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); }
    } catch { /* 공유 취소 */ }
  }

  if (result) {
    const animal = results[result];
    return <section className="quiz-panel result-panel" aria-live="polite">
      <p className="result-overline">나의 동물 캐릭터는</p><div className="result-emoji" aria-hidden="true">{animal.emoji}</div>
      <h1>{animal.name}</h1><h2>{animal.title}</h2><p className="result-description">{animal.description}</p>
      <div className="trait-list">{animal.traits.map((trait) => <span key={trait}>#{trait}</span>)}</div>
      <button className="quiz-button" onClick={share}>{copied ? '링크가 복사됐어요!' : '결과 공유하기'}</button>
      <button className="reset-button" onClick={reset}>다시 해보기</button>
    </section>;
  }

  if (!started) return <section className="quiz-panel intro-panel">
    <div className="intro-animals" aria-hidden="true">🐶 🐱 🦊 🐻</div><p className="quiz-label">성격 테스트</p>
    <h1>내가 동물이라면?</h1><p>일상 속 선택으로 발견하는<br />나와 꼭 닮은 동물 캐릭터</p>
    <div className="quiz-meta"><span>10문항</span><span>약 3분</span></div>
    <button className="quiz-button" onClick={() => setStarted(true)}>시작하기</button><small>결과는 재미로 가볍게 즐겨주세요.</small>
  </section>;

  const question = questions[index];
  return <section className="quiz-panel question-panel">
    <div className="progress-row"><span>{index + 1} / {questions.length}</span><span>{Math.round(((index + 1) / questions.length) * 100)}%</span></div>
    <div className="progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
    <p className="question-number">QUESTION {String(index + 1).padStart(2, '0')}</p><h1>{question.text}</h1>
    <div className="answer-list">{question.answers.map((option, optionIndex) =>
      <button key={option.text} onClick={() => answer(option.scores)}><b>{optionIndex + 1}</b>{option.text}</button>)}</div>
  </section>;
}
