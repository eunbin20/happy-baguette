import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './app';

it('renders the project home and its empty state', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Happy Bagguete' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: '첫 번째 실험을 준비 중이에요.' }),
  ).toBeInTheDocument();
});
