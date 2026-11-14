import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Home from './app/page';

it('presents Happy Test and links to the first test', () => {
  render(<Home />);
  expect(screen.getByRole('link', { name: '해피 홈' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /내가 동물이라면/ })).toHaveAttribute('href', '/tests/animal');
  expect(screen.getByRole('link', { name: /나의 인내심 테스트/ })).toHaveAttribute('href', '/tests/patience');
  expect(screen.getByRole('link', { name: /여행지 이상형 월드컵/ })).toHaveAttribute('href', '/tests/travel-worldcup');
  expect(screen.getByRole('link', { name: /당신과 닮은 유명인 찾기/ })).toHaveAttribute('href', '/tests/celebrity-lookalike');
  expect(screen.getByRole('link', { name: /다른 그림 찾기/ })).toHaveAttribute('href', '/tests/find-difference');
});
