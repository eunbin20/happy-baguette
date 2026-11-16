export type MbtiCompatibility = {
  type: string;
  best: string[];
  tricky: string[];
  hook: string;
  good: string;
  conflict: string;
  advice: string;
};

export const mbtiCompatibility: MbtiCompatibility[] = [
  { type: 'INFP', best: ['ENFJ', 'ENTJ'], tricky: ['ESTJ', 'ISTJ'], hook: '마음의 결을 알아주는 사람에게 오래 머문다', good: 'ENFJ의 따뜻한 추진력은 망설이는 INFP를 밖으로 끌어내고, INFP의 섬세함은 ENFJ가 놓친 감정을 채워준다.', conflict: '현실적인 해결부터 말하는 유형과 만나면 이해받지 못한다고 느끼기 쉽다. 반대로 상대는 대화가 결론 없이 맴돈다고 답답해한다.', advice: '감정부터 충분히 들어준 뒤 해결책을 말하는 순서만 지켜도 싸움이 크게 줄어든다.' },
  { type: 'ENFP', best: ['INFJ', 'INTJ'], tricky: ['ISTJ', 'ESTJ'], hook: '재미와 깊이를 동시에 주는 사람에게 빠진다', good: 'INFJ와 INTJ는 ENFP의 수많은 생각을 정리해주면서도 호기심을 꺾지 않는다. 서로 다른 템포가 오히려 균형이 된다.', conflict: '계획과 규칙을 중요하게 보는 상대는 ENFP의 즉흥성을 무책임하게 느낄 수 있다.', advice: '자유를 요구하기 전에 꼭 지켜야 할 약속 두세 개를 먼저 합의하는 게 좋다.' },
  { type: 'INFJ', best: ['ENFP', 'ENTP'], tricky: ['ESTP', 'ISTP'], hook: '말하지 않은 마음까지 읽어주는 관계를 원한다', good: 'ENFP와 ENTP는 INFJ가 혼자 품고 있던 생각을 말하게 만든다. INFJ는 이들의 산만한 감정을 깊이 있는 대화로 묶어준다.', conflict: '행동이 먼저인 유형과 만나면 충분히 생각할 시간을 빼앗긴다고 느낄 수 있다.', advice: '상대가 알아서 눈치채길 기다리지 말고 원하는 반응을 짧게라도 직접 말해야 한다.' },
  { type: 'ENFJ', best: ['INFP', 'ISFP'], tricky: ['ISTP', 'INTP'], hook: '표현을 주고받을수록 사랑이 커진다', good: 'INFP와 ISFP의 섬세한 감정은 ENFJ의 다정함을 당연하게 여기지 않는다. 서로를 응원하는 힘이 큰 조합이다.', conflict: '반응이 적은 상대를 만나면 혼자만 애쓰는 기분이 들고 확인을 반복하게 된다.', advice: '표현 방식이 다르다는 걸 인정하고 연락 횟수와 혼자 있을 시간을 구체적으로 맞춰야 한다.' },
  { type: 'INTP', best: ['ENTJ', 'ESTJ'], tricky: ['ESFJ', 'ISFJ'], hook: '대화가 끊이지 않으면서 혼자일 틈도 필요하다', good: 'ENTJ는 INTP의 아이디어를 현실로 옮기고, INTP는 ENTJ가 지나친 결론을 내리지 않게 새로운 관점을 준다.', conflict: '정서적 확인이 잦은 상대에게는 압박을 느끼고 더 말이 없어질 수 있다.', advice: '감정을 완벽히 설명하려 하지 말고 지금 필요한 게 위로인지 시간인지 한 문장으로 말하면 된다.' },
  { type: 'ENTP', best: ['INFJ', 'INTJ'], tricky: ['ISFJ', 'ESFJ'], hook: '자기 말을 받아치면서 중심이 있는 사람에게 약하다', good: 'INFJ와 INTJ는 ENTP의 장난 뒤에 있는 진심을 읽는다. ENTP는 조용한 상대의 세계를 넓혀준다.', conflict: '농담과 토론을 공격으로 받아들이는 상대와는 사소한 말이 오래 남는다.', advice: '이기려는 대화와 관계를 위한 대화를 구분하고, 미안할 때 설명보다 사과를 먼저 해야 한다.' },
  { type: 'INTJ', best: ['ENFP', 'ENTP'], tricky: ['ESFP', 'ISFP'], hook: '서로의 세계를 존중하는 독립적인 연애가 잘 맞는다', good: 'ENFP와 ENTP의 생동감은 INTJ의 계획에 예상 밖의 즐거움을 더한다. INTJ는 관계에 안정적인 방향을 준다.', conflict: '즉흥적인 감정 표현이 반복되면 관계를 예측하기 어렵다고 느껴 문을 닫는다.', advice: '모든 감정을 분석해 결론 내리기 전에 상대가 원하는 반응부터 한 번 보여주는 연습이 필요하다.' },
  { type: 'ENTJ', best: ['INFP', 'INTP'], tricky: ['ISFP', 'ESFP'], hook: '자기 삶이 있으면서 함께 성장하는 사람을 원한다', good: 'INFP는 ENTJ에게 감정의 결을 알려주고, INTP는 지적인 긴장감을 준다. 서로의 부족한 부분을 채우기 쉽다.', conflict: '빠른 결정과 직설적인 조언이 상대에게 통제처럼 느껴질 수 있다.', advice: '해결책을 내기 전에 상대가 조언을 원하는지 묻는 것만으로 관계의 온도가 달라진다.' },
  { type: 'ISFP', best: ['ENFJ', 'ESFJ'], tricky: ['ENTJ', 'INTJ'], hook: '편안함과 다정함이 쌓여야 마음을 연다', good: 'ENFJ와 ESFJ는 표현이 적은 ISFP의 마음을 기다려주고 관계를 따뜻하게 이끈다.', conflict: '목표와 효율을 앞세우는 상대에게 감정이 평가받는다고 느끼면 말없이 멀어진다.', advice: '서운한 일을 참다가 한꺼번에 닫지 말고 작을 때 바로 말하는 게 가장 중요하다.' },
  { type: 'ESFP', best: ['ISFJ', 'ISTJ'], tricky: ['INTJ', 'INTP'], hook: '같이 웃고 움직이며 사랑을 확인한다', good: 'ISFJ와 ISTJ의 안정감은 ESFP가 마음 놓고 즐길 바탕이 된다. ESFP는 관계에 활기와 표현을 더한다.', conflict: '반응이 적고 계획만 이야기하는 상대에게 사랑받는 느낌이 부족할 수 있다.', advice: '즉흥적인 약속과 소비에서 서로의 기준을 미리 정하면 불필요한 싸움을 막을 수 있다.' },
  { type: 'ISTP', best: ['ESFJ', 'ESTJ'], tricky: ['ENFJ', 'INFJ'], hook: '말이 없어도 편한 관계에서 오래 간다', good: 'ESFJ와 ESTJ는 관계의 방향을 분명히 하고, ISTP는 과열된 상황을 차분하게 정리한다.', conflict: '감정을 계속 확인하려는 상대에게 압박을 느끼면 연락부터 줄어든다.', advice: '혼자 있을 시간이 필요할 때 사라지지 말고 언제 다시 연락할지만 알려주는 게 좋다.' },
  { type: 'ESTP', best: ['ISFJ', 'ISTJ'], tricky: ['INFJ', 'INFP'], hook: '함께 움직이면서도 자신을 붙잡지 않는 사람이 좋다', good: 'ISFJ와 ISTJ의 안정감은 ESTP의 빠른 삶을 잡아준다. ESTP는 이들에게 새로운 경험을 열어준다.', conflict: '생각할 시간이 긴 상대를 답답해하고 결론을 재촉하면 감정의 골이 깊어진다.', advice: '당장 풀려고 몰아붙이기보다 상대가 정리할 시간을 정해주는 방식이 잘 맞는다.' },
  { type: 'ISFJ', best: ['ESFP', 'ESTP'], tricky: ['ENTP', 'INTP'], hook: '일상의 작은 챙김을 알아주는 사람에게 깊어진다', good: 'ESFP와 ESTP는 ISFJ의 조용한 일상에 즐거움을 더하고, ISFJ는 흔들리지 않는 편이 되어준다.', conflict: '약속이 자주 바뀌거나 농담이 거칠면 신뢰가 빠르게 무너질 수 있다.', advice: '괜찮다고 넘기기보다 무엇이 서운했는지 그날 말해야 상대도 고칠 기회를 얻는다.' },
  { type: 'ESFJ', best: ['ISFP', 'ISTP'], tricky: ['INTP', 'ENTP'], hook: '확실한 표현과 안정적인 관계에서 행복하다', good: 'ISFP와 ISTP의 담백함은 ESFJ의 감정을 차분하게 만들고, ESFJ는 관계에 필요한 표현을 채워준다.', conflict: '답장과 반응이 적으면 혼자 의미를 해석하다가 불안이 커질 수 있다.', advice: '연락의 양을 사랑의 크기로 바로 연결하지 말고 서로 편한 최소 기준을 정하는 게 낫다.' },
  { type: 'ISTJ', best: ['ESFP', 'ESTP'], tricky: ['ENFP', 'INFP'], hook: '약속을 지키며 차곡차곡 쌓는 사랑이 편하다', good: 'ESFP와 ESTP는 ISTJ에게 계획 밖의 즐거움을 주고, ISTJ는 이들이 돌아올 안정적인 자리를 만든다.', conflict: '즉흥적인 변화와 감정적인 결정이 반복되면 미래를 함께 그리기 어렵다고 느낀다.', advice: '계획이 바뀔 때 이유와 대안을 같이 말하면 통제받는 느낌 없이 조율할 수 있다.' },
  { type: 'ESTJ', best: ['INTP', 'ISTP'], tricky: ['INFP', 'ISFP'], hook: '함께 현실을 꾸려갈 수 있는 사람에게 끌린다', good: 'INTP와 ISTP는 ESTJ가 보지 못한 효율적인 방법을 제시하고 감정 과열 없이 문제를 푼다.', conflict: '직설적인 말이 섬세한 상대에게 비판으로 들리고, 상대의 침묵은 ESTJ에게 회피로 보인다.', advice: '옳은 말을 하는 것보다 상대가 들을 수 있는 방식으로 말하는 게 관계에서는 더 중요하다.' },
];

export function getMbtiCompatibility(type: string) {
  return mbtiCompatibility.find((item) => item.type.toLowerCase() === type.toLowerCase());
}
