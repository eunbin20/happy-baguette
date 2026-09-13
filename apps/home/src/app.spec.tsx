import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './app/page';

it('links to the URL decoder from the home page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Happy Bagguete' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'URL 디코더 · 인코더 ↗' }),
  ).toBeInTheDocument();
});
