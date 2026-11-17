'use client';

import { useState } from 'react';

export default function TestShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = `${title} 같이 해봐요!`;
    try {
      if (navigator.share) await navigator.share({ title, text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
      }
    } catch { /* 공유 취소 */ }
  }

  return <button className="quiz-button" onClick={share}>{copied ? '테스트 링크가 복사됐어요!' : '테스트 공유하기'}</button>;
}
