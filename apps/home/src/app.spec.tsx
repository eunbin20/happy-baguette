import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Home from './app/page';

it('presents the visual feed and links to every published test', () => {
  render(<Home />);
  expect(screen.getByRole('link', { name: 'happy baguette 홈' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /내가 동물이라면/ })).toHaveAttribute('href', '/tests/animal');
  expect(screen.getByRole('link', { name: /몇 초 만에 화면을 누를까/ })).toHaveAttribute('href', '/tests/patience');
  expect(screen.getByRole('link', { name: /여행지 월드컵/ })).toHaveAttribute('href', '/tests/travel-worldcup');
  expect(screen.getByRole('link', { name: /나랑 닮은 유명인은 누구/ })).toHaveAttribute('href', '/tests/celebrity-lookalike');
});
