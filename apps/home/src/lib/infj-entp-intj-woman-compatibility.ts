import { createWomanSeries } from './woman-compatibility-factory';

export const infjWomanCompatibilitySeries = createWomanSeries({
  womanType: 'INFJ',
  intro: 'INFJ 여자는 많은 사람에게 쉽게 마음을 열기보다 상대의 말과 행동이 같은 방향인지 오래 지켜보는 편입니다. 한 번 신뢰하면 표면적인 즐거움보다 가치관과 미래까지 연결된 깊은 관계를 원합니다.',
  strength: 'INFJ 여자의 매력은 말하지 않은 감정의 맥락을 읽고 상대가 더 나은 자신이 되도록 조용히 지지하는 데 있습니다. 이 통찰이 존중받을 때 관계에는 강한 정서적 유대가 생깁니다.',
  insecurity: 'INFJ 여자는 상처를 즉시 드러내기보다 혼자 정리하다 갑자기 거리를 둘 수 있습니다. 상대가 이유를 추측하게 두기 전에 필요한 시간과 다시 대화할 시점을 알려주는 것이 중요합니다.',
  charm: '겉모습 너머의 의도와 가능성을 알아보고 깊이 있는 대화를 만드는 INFJ 여자의 태도',
  loveStyle: '조용한 관찰과 진심 어린 지지',
  conflictStyle: '상처를 오래 분석한 뒤 마음의 문을 닫는 경향',
  growth: '직관으로 내린 결론을 질문으로 확인하고 현실적인 약속으로 옮기는 노력',
  scores: [77,89,91,94,68,83,92,87,66,78,95,90,64,86,96,82],
  tones: ['깊은 통찰','조용한 다정함','단단한 가치관','미래를 보는 시선'],
});

export const entpWomanCompatibilitySeries = createWomanSeries({
  womanType: 'ENTP',
  intro: 'ENTP 여자는 관계에서도 호기심과 솔직한 대화를 중요하게 생각합니다. 자신에게 맞춰주는 사람보다 새로운 관점을 던지고 서로의 자유를 존중하면서도 지적인 긴장감을 주는 상대에게 끌립니다.',
  strength: 'ENTP 여자의 매력은 익숙한 상황을 새롭게 보고 상대가 숨겨둔 가능성을 실험하게 만드는 데 있습니다. 유머와 질문이 안전하게 오갈 때 연인은 가장 재미있는 대화 상대이자 동료가 됩니다.',
  insecurity: 'ENTP 여자는 불편한 감정을 논리나 농담으로 우회할 수 있습니다. 상대의 반응을 시험하기보다 실제로 두려운 점과 원하는 확신을 직접 말해야 갈등이 불필요한 논쟁으로 번지지 않습니다.',
  charm: '예상 밖의 질문과 유머로 관계에 생기와 지적 자극을 더하는 ENTP 여자의 태도',
  loveStyle: '장난 속에서도 상대의 생각을 끝없이 궁금해하는 적극성',
  conflictStyle: '감정 문제까지 토론의 승패로 바꾸거나 약한 마음을 농담으로 감추는 경향',
  growth: '논리적으로 맞는 답보다 두 사람 모두 안전하다고 느끼는 결론을 선택하는 노력',
  scores: [72,74,86,92,82,77,84,94,88,83,91,89,69,75,87,93],
  tones: ['재치','독립성','도전적인 호기심','솔직한 추진력'],
});

export const intjWomanCompatibilitySeries = createWomanSeries({
  womanType: 'INTJ',
  intro: 'INTJ 여자는 감정의 속도보다 신뢰할 만한 태도와 관계의 방향을 중요하게 봅니다. 쉽게 마음을 열지는 않지만 자신의 시간과 계획 안에 상대를 들이면 오래 보고 책임지는 사랑을 합니다.',
  strength: 'INTJ 여자의 매력은 문제의 핵심을 보고 더 나은 미래를 구체적으로 설계하는 데 있습니다. 상대의 독립성을 존중하면서도 필요할 때 흔들리지 않는 기준을 제시해 강한 동반자가 됩니다.',
  insecurity: 'INTJ 여자는 감정이 복잡할수록 설명 가능한 부분만 말하고 약한 마음은 감출 수 있습니다. 해결책을 제시하기 전 현재 느끼는 불안과 서운함도 관계의 중요한 정보로 공유해야 합니다.',
  charm: '자기 기준과 목표를 지키면서도 신뢰한 사람에게 깊은 책임감을 보이는 INTJ 여자의 태도',
  loveStyle: '시간과 계획, 실질적인 도움으로 애정을 증명하는 방식',
  conflictStyle: '감정을 분석으로 대체하고 비효율적인 대화를 빠르게 끝내려는 경향',
  growth: '완벽한 해결보다 공감 한 문장과 작은 애정 표현을 먼저 건네는 노력',
  scores: [90,78,91,88,85,72,84,92,76,67,93,95,86,74,89,94],
  tones: ['단단한 기준','집중력','현실적인 책임감','독립적인 매력'],
});

export const additionalWomanCompatibilitySeries = [infjWomanCompatibilitySeries, entpWomanCompatibilitySeries, intjWomanCompatibilitySeries];
