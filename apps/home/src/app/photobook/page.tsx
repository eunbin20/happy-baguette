import type { Metadata } from 'next';
import { absoluteUrl } from '../../lib/site';
import PhotobookMaker from './photobook-maker';

export const metadata: Metadata = {
  title: '올해의 우리 - 연말 포토보드 만들기',
  description: '함께 찍은 사진과 짧은 코멘트를 모아 나만의 연말 메모보드를 만들어보세요.',
  alternates: { canonical: absoluteUrl('/photobook/') },
};

export default function PhotobookPage() {
  return <PhotobookMaker />;
}
