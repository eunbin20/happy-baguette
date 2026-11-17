import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Home from './app/page';
import TestsPage from './app/tests/page';

it('separates MBTI posts from the test feed', () => {
  render(<Home />);
  expect(screen.getByRole('link', { name: 'happy baguette 홈' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '재밌는 테스트' })).toHaveAttribute('href', '/tests');
  expect(screen.getByRole('link', { name: /INFP가 진짜 사랑에 빠지면/ })).toHaveAttribute('href', '/mbti/infp/love-signs');
});

it('links to every published test without revealing the patience mechanic', () => {
  render(<TestsPage />);
  expect(screen.getByRole('link', { name: /내가 동물이라면/ })).toHaveAttribute('href', '/tests/animal');
  expect(screen.getByRole('link', { name: /나의 인내심 테스트/ })).toHaveAttribute('href', '/tests/patience');
  expect(screen.getByRole('link', { name: /여행지 이상형 월드컵/ })).toHaveAttribute('href', '/tests/travel-worldcup');
  expect(screen.getByRole('link', { name: /당신과 닮은 유명인 찾기/ })).toHaveAttribute('href', '/tests/celebrity-lookalike');
  expect(screen.getByRole('link', { name: /2026 트렌드 고사/ })).toHaveAttribute('href', '/tests/trend-2026');
});
