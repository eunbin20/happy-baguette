import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Decoder from './decoder';

function input(value: string) {
  fireEvent.change(screen.getByLabelText(/^입력/), { target: { value } });
}

it('decodes UTF-8 and leaves literal plus intact by default', () => {
  render(<Decoder />);
  input('%EC%95%88%EB%85%95+%2B');
  expect(screen.getByLabelText(/^결과/)).toHaveValue('안녕++');
  fireEvent.click(screen.getByRole('checkbox'));
  expect(screen.getByLabelText(/^결과/)).toHaveValue('안녕 +');
});

it('reports invalid input and clears stale results, then recovers', () => {
  render(<Decoder />);
  input('hello');
  input('%ED');
  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(screen.getByLabelText(/^결과/)).toHaveValue('');
  expect(screen.getByRole('button', { name: '결과 복사' })).toBeDisabled();
  input('%25');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByLabelText(/^결과/)).toHaveValue('%');
});

it('encodes URL components and decodes only one layer', () => {
  render(<Decoder />);
  input('%2520');
  expect(screen.getByLabelText(/^결과/)).toHaveValue('%20');
  fireEvent.click(screen.getByRole('button', { name: '인코딩' }));
  input('a b/+');
  expect(screen.getByLabelText(/^결과/)).toHaveValue('a%20b%2F%2B');
  expect(screen.getByRole('checkbox')).toBeDisabled();
});

it('copies output and handles clipboard rejection', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
  render(<Decoder />);
  input('%3Cscript%3E');
  fireEvent.click(screen.getByRole('button', { name: '결과 복사' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent('결과를 복사했어요.'),
  );
  expect(writeText).toHaveBeenCalledWith('<script>');
  writeText.mockRejectedValueOnce(new Error('denied'));
  fireEvent.click(screen.getByRole('button', { name: '결과 복사' }));
  await waitFor(() =>
    expect(screen.getByRole('status')).toHaveTextContent('직접 선택해 복사'),
  );
});

it('loads a working example and resets both editors', () => {
  render(<Decoder />);
  fireEvent.click(screen.getByRole('button', { name: /예시 넣기/ }));
  expect(screen.getByLabelText(/^결과/)).toHaveValue('행복한 바게트');
  fireEvent.click(screen.getByRole('button', { name: '초기화' }));
  expect(screen.getByLabelText(/^입력/)).toHaveValue('');
  expect(screen.getByLabelText(/^결과/)).toHaveValue('');
});
