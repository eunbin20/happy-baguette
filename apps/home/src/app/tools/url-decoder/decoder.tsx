'use client';

import { useState } from 'react';

export default function Decoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'decode' | 'encode'>('decode');
  const [plusAsSpace, setPlusAsSpace] = useState(false);
  const [notice, setNotice] = useState('');
  let result = '';
  let error = '';
  try {
    result =
      mode === 'decode'
        ? decodeURIComponent(plusAsSpace ? input.replace(/\+/g, ' ') : input)
        : encodeURIComponent(input);
  } catch {
    error =
      mode === 'decode'
        ? '디코딩할 수 없어요. % 뒤에 두 자리 16진수가 있는지, UTF-8 문자가 끝까지 입력되었는지 확인해주세요.'
        : '인코딩할 수 없는 문자가 있어요. 입력 내용을 확인해주세요.';
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setNotice('결과를 복사했어요.');
    } catch {
      setNotice('복사하지 못했어요. 결과를 직접 선택해 복사해주세요.');
    }
  }

  return (
    <section className="converter" aria-label="URL 변환 도구">
      <div className="toolbar">
        <div className="mode-switch" aria-label="변환 방식" role="group">
          <button
            type="button"
            aria-pressed={mode === 'decode'}
            onClick={() => {
              setMode('decode');
              setNotice('');
            }}
          >
            디코딩
          </button>
          <button
            type="button"
            aria-pressed={mode === 'encode'}
            onClick={() => {
              setMode('encode');
              setNotice('');
            }}
          >
            인코딩
          </button>
        </div>
        <button
          className="text-button"
          type="button"
          onClick={() => {
            setInput(
              '%ED%96%89%EB%B3%B5%ED%95%9C%20%EB%B0%94%EA%B2%8C%ED%8A%B8',
            );
            setMode('decode');
            setNotice('');
          }}
        >
          예시 넣기 ↗
        </button>
      </div>
      <div className="editor-grid">
        <div className="editor">
          <label htmlFor="url-input">
            입력 <span>{input.length.toLocaleString()}자</span>
          </label>
          <textarea
            id="url-input"
            spellCheck={false}
            value={input}
            placeholder={
              mode === 'decode'
                ? '%EC%95%88%EB%85%95 …'
                : '인코딩할 텍스트를 입력하세요'
            }
            onChange={(event) => {
              setInput(event.target.value);
              setNotice('');
            }}
            aria-describedby={error ? 'conversion-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </div>
        <div className="editor result-editor">
          <label htmlFor="url-result">
            결과 <span>{result.length.toLocaleString()}자</span>
          </label>
          <textarea
            id="url-result"
            spellCheck={false}
            readOnly
            value={result}
            placeholder="변환 결과가 여기에 나타나요"
          />
        </div>
      </div>
      <div className="toolbar bottom-toolbar">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={plusAsSpace}
            disabled={mode === 'encode'}
            onChange={(event) => {
              setPlusAsSpace(event.target.checked);
              setNotice('');
            }}
          />{' '}
          +를 공백으로 해석 <span>(폼·쿼리 값)</span>
        </label>
        <div className="actions">
          <button
            type="button"
            className="text-button"
            disabled={!input}
            onClick={() => {
              setInput('');
              setNotice('');
            }}
          >
            초기화
          </button>
          <button
            type="button"
            className="primary-button"
            disabled={!result || Boolean(error)}
            onClick={copy}
          >
            결과 복사
          </button>
        </div>
      </div>
      {error && (
        <p id="conversion-error" className="error" role="alert">
          {error}
        </p>
      )}
      <p className="notice" role="status">
        {notice}
      </p>
    </section>
  );
}
