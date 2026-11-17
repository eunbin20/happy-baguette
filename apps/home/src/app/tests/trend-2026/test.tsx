'use client';
import { useState } from 'react';
import { downloadResultImage } from '../../../lib/download-result';
import TestShareButton from '../../../components/test-share-button';

const questions = [
  ['사람 대신 목표를 받고 여러 단계를 수행하는 AI를 부르는 말은?', ['AI 에이전트', '디지털 트윈', '클라우드 봇'], 0],
  ['말로 설명하며 앱과 서비스를 만드는 흐름에 가장 가까운 말은?', ['노코드 쇼핑', '바이브 코딩', '소셜 코딩'], 1],
  ['짧고 자극적인 콘텐츠를 계속 소비해 집중력이 흐려진 느낌을 표현하는 밈은?', ['브레인 롯', '딥 워크', '슬로 코어'], 0],
  ['꾸민 티를 줄이고 자연스러운 취향과 생활감을 보여주는 콘텐츠는?', ['로우키 라이프', '맥시멀 로그', '하이프 코어'], 0],
  ['검색 대신 여러 사람의 실제 경험을 찾을 때 자주 함께 보는 플랫폼은?', ['커뮤니티와 숏폼', '팩스와 문자', '전자사전'], 0],
  ['물건보다 경험과 기록에 돈을 쓰는 소비 흐름에 가까운 것은?', ['경험 소비', '무조건 절약', '대량 구매'], 0],
  ['내 취향에 맞춰 AI가 추천과 제작을 동시에 해주는 흐름은?', ['초개인화', '표준화', '오프라인화'], 0],
  ['유행을 그대로 따르기보다 오래 쓸 물건과 취향을 고르는 태도는?', ['의식적 소비', '충동 소비', '과시 소비'], 0],
  ['SNS에서 완벽한 결과보다 과정과 실패담이 반응을 얻는 이유는?', ['현실감과 공감', '화질이 낮아서', '글이 짧아서'], 0],
  ['2026년 트렌드를 가장 잘 따라가는 방법은?', ['모든 유행을 따라 산다', '내 생활에 맞는 것만 골라 쓴다', '유행을 전부 거부한다'], 1],
] as const;

function resultFor(score: number) { if (score >= 9) return ['트렌드 만점자', '유행을 외우는 수준을 넘어 맥락까지 읽는 사람', '🏆', '#ff5c78']; if (score >= 7) return ['트렌드 레이더', '새로운 흐름을 빠르게 발견하고 적당히 즐기는 사람', '📡', '#735cff']; if (score >= 4) return ['취향 중심 관찰자', '유행보다 내 취향이 중요하지만 필요한 건 놓치지 않는 사람', '👀', '#28a985']; return ['마이웨이 인간', '세상이 뭐라 하든 내 방식대로 사는 강한 취향의 소유자', '🛤️', '#f18b3b']; }

export default function TrendTest() {
  const [started, setStarted] = useState(false); const [index, setIndex] = useState(0); const [score, setScore] = useState(0); const [done, setDone] = useState(false);
  function answer(choice: number) { const next = score + (choice === questions[index][2] ? 1 : 0); if (index === questions.length - 1) { setScore(next); setDone(true); } else { setScore(next); setIndex(index + 1); } }
  function reset() { setStarted(false); setIndex(0); setScore(0); setDone(false); }
  if (!started) return <section className="quiz-panel intro-panel"><div className="intro-animals">🤖 📱 🧠 ✨</div><p className="result-overline">10문제로 확인하는 나의 유행 감각</p><h1>2026 트렌드 고사</h1><button className="quiz-button" onClick={() => setStarted(true)}>시험 시작하기</button></section>;
  if (done) { const [name, description, emoji, color] = resultFor(score); return <section className="quiz-panel result-panel"><p className="result-overline">2026 트렌드 점수</p><strong className="elapsed-time">{score * 10}<small>점</small></strong><div className="result-emoji">{emoji}</div><h1>{name}</h1><p className="result-description">{description}</p><button className="save-result-button" onClick={() => downloadResultImage({ title: '2026 트렌드 고사', result: name, description: `${score * 10}점 · ${description}`, emoji, accent: color })}>결과 이미지 저장</button><TestShareButton title="2026 트렌드 고사" /><button className="reset-button" onClick={reset}>다시 풀기</button></section>; }
  const question = questions[index]; return <section className="quiz-panel question-panel"><div className="progress-row"><span>{index + 1} / {questions.length}</span><span>{Math.round(((index + 1) / questions.length) * 100)}%</span></div><div className="progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div><p className="question-number">2026 TREND {String(index + 1).padStart(2, '0')}</p><h1>{question[0]}</h1><div className="answer-list">{question[1].map((option, choice) => <button key={option} onClick={() => answer(choice)}><b>{choice + 1}</b>{option}</button>)}</div></section>;
}
