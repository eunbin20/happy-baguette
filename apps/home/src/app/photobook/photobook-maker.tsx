'use client';

import Link from 'next/link';
import { ChangeEvent, PointerEvent as ReactPointerEvent, useRef, useState } from 'react';

type BoardTheme = 'cork' | 'wall' | 'night';
type PhotoItem = {
  id: string;
  src: string;
  comment: string;
  x: number;
  y: number;
  rotation: number;
  frame: 'polaroid' | 'strip';
};

const placements = [
  [7, 12, -5], [54, 7, 4], [29, 36, 2], [65, 42, -4],
  [5, 62, 5], [43, 67, -2], [71, 73, 3], [18, 80, -3],
];

const themeLabel: Record<BoardTheme, string> = {
  cork: '코르크 보드', wall: '하얀 벽', night: '전구 사진벽',
};

async function prepareImage(file: File) {
  const source = URL.createObjectURL(file);
  const image = new Image();
  image.src = source;
  await image.decode();
  const max = 1400;
  const scale = Math.min(1, max / Math.max(image.width, image.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const context = canvas.getContext('2d');
  if (!context) return source;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(source);
  return canvas.toDataURL('image/jpeg', 0.84);
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) {
  context.beginPath();
  context.roundRect(x, y, w, h, radius);
  context.fill();
}

function fitText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  let value = text.trim() || '우리의 한 장';
  while (context.measureText(value).width > maxWidth && value.length > 2) value = `${value.slice(0, -2)}…`;
  return value;
}

export default function PhotobookMaker() {
  const [title, setTitle] = useState('2026년, 너와 함께여서 좋았어');
  const [letter, setLetter] = useState('평범한 날도 같이 있어서 오래 기억에 남을 것 같아.');
  const [theme, setTheme] = useState<BoardTheme>('cork');
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [saving, setSaving] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);

  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, 8 - photos.length);
    const prepared = await Promise.all(files.map(prepareImage));
    setPhotos((current) => [...current, ...prepared.map((src, index) => {
      const spot = placements[current.length + index] ?? placements[index];
      return {
        id: `${Date.now()}-${index}`,
        src,
        comment: index === 0 && current.length === 0 ? '올해 제일 많이 웃었던 날' : '',
        x: spot[0], y: spot[1], rotation: spot[2],
        frame: (current.length + index) % 3 === 1 ? 'strip' : 'polaroid',
      } as PhotoItem;
    })]);
    event.target.value = '';
  }

  function beginDrag(event: ReactPointerEvent<HTMLDivElement>, item: PhotoItem) {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    dragRef.current = { id: item.id, dx: event.clientX - rect.left - rect.width * item.x / 100, dy: event.clientY - rect.top - rect.height * item.y / 100 };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function movePhoto(event: ReactPointerEvent<HTMLDivElement>) {
    const board = boardRef.current;
    const drag = dragRef.current;
    if (!board || !drag) return;
    const rect = board.getBoundingClientRect();
    const x = Math.max(0, Math.min(80, (event.clientX - rect.left - drag.dx) / rect.width * 100));
    const y = Math.max(3, Math.min(84, (event.clientY - rect.top - drag.dy) / rect.height * 100));
    setPhotos((items) => items.map((item) => item.id === drag.id ? { ...item, x, y } : item));
  }

  function updateComment(id: string, comment: string) {
    setPhotos((items) => items.map((item) => item.id === id ? { ...item, comment } : item));
  }

  function removePhoto(id: string) {
    setPhotos((items) => items.filter((item) => item.id !== id));
  }

  async function saveBoard() {
    if (!photos.length) return;
    setSaving(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext('2d');
    if (!context) return;
    const backgrounds = { cork: '#b97843', wall: '#f2eee8', night: '#171923' };
    context.fillStyle = backgrounds[theme];
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (theme === 'cork') {
      context.globalAlpha = .12;
      for (let i = 0; i < 1300; i += 18) { context.fillStyle = i % 36 ? '#fff' : '#3c1908'; context.fillRect((i * 37) % 1080, (i * 71) % 1350, 3, 3); }
      context.globalAlpha = 1;
    }
    if (theme === 'night') {
      context.strokeStyle = '#5f513a'; context.lineWidth = 5; context.beginPath(); context.moveTo(0, 82);
      for (let x = 0; x <= 1080; x += 90) context.lineTo(x, 82 + Math.sin(x / 90) * 24);
      context.stroke();
      for (let x = 45; x < 1080; x += 90) { context.fillStyle = '#ffd66b'; context.shadowColor = '#ffd66b'; context.shadowBlur = 24; context.beginPath(); context.arc(x, 86 + Math.sin(x / 90) * 24, 8, 0, Math.PI * 2); context.fill(); }
      context.shadowBlur = 0;
    }
    context.fillStyle = theme === 'night' ? '#fff8e8' : '#201b20';
    context.font = '900 52px sans-serif';
    context.textAlign = 'center';
    context.fillText(fitText(context, title, 920), 540, 104);

    await Promise.all(photos.map(async (item) => {
      const image = new Image(); image.src = item.src; await image.decode();
      const x = item.x / 100 * 1080; const y = item.y / 100 * 1350;
      const w = item.frame === 'strip' ? 230 : 300; const h = item.frame === 'strip' ? 380 : 340;
      context.save(); context.translate(x + w / 2, y + h / 2); context.rotate(item.rotation * Math.PI / 180);
      context.shadowColor = '#0005'; context.shadowBlur = 22; context.shadowOffsetY = 10;
      context.fillStyle = '#fff'; roundedRect(context, -w / 2, -h / 2, w, h, 5); context.shadowColor = 'transparent';
      const pad = 18; const photoH = h - 82; const ratio = Math.max((w - pad * 2) / image.width, photoH / image.height);
      const sw = (w - pad * 2) / ratio; const sh = photoH / ratio; const sx = (image.width - sw) / 2; const sy = (image.height - sh) / 2;
      context.drawImage(image, sx, sy, sw, sh, -w / 2 + pad, -h / 2 + pad, w - pad * 2, photoH);
      context.fillStyle = '#242026'; context.font = '700 20px sans-serif'; context.textAlign = 'center';
      context.fillText(fitText(context, item.comment, w - 30), 0, h / 2 - 22);
      context.restore();
    }));

    context.fillStyle = theme === 'night' ? '#fff8e8' : '#201b20';
    context.font = '600 25px sans-serif'; context.textAlign = 'center';
    context.fillText(fitText(context, letter, 890), 540, 1300);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a'); link.download = `올해의-우리-${Date.now()}.png`; link.href = URL.createObjectURL(blob); link.click(); URL.revokeObjectURL(link.href); setSaving(false);
    }, 'image/png');
  }

  return <main className="photobook-page">
    <header className="photobook-header">
      <Link className="logo" href="/"><span>happy baguette</span></Link>
      <span>올해의 우리</span>
    </header>
    <section className="photobook-intro">
      <p>OUR YEAR TOGETHER</p>
      <h1>같이 찍은 사진을<br />한곳에 붙여보세요</h1>
      <span>사진과 짧은 말만 있으면 돼요.</span>
    </section>

    <div className="photobook-workspace">
      <aside className="photobook-controls">
        <label>보드 제목<input value={title} maxLength={32} onChange={(event) => setTitle(event.target.value)} /></label>
        <label>마지막 한마디<textarea value={letter} maxLength={70} onChange={(event) => setLetter(event.target.value)} /></label>
        <fieldset><legend>배경 고르기</legend><div className="theme-options">
          {(Object.keys(themeLabel) as BoardTheme[]).map((value) => <button key={value} type="button" className={`${value} ${theme === value ? 'active' : ''}`} onClick={() => setTheme(value)}><i />{themeLabel[value]}</button>)}
        </div></fieldset>
        <label className="photo-upload-button">사진 추가하기 <small>{photos.length}/8</small><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addPhotos} disabled={photos.length >= 8} /></label>
        <p className="photobook-privacy">사진은 서버로 전송되지 않아요. 이 화면을 닫으면 함께 사라집니다.</p>
        {!!photos.length && <div className="photo-comment-list">{photos.map((photo, index) => <div key={photo.id}><img src={photo.src} alt="" /><input value={photo.comment} maxLength={24} placeholder={`${index + 1}번째 사진에 한마디`} onChange={(event) => updateComment(photo.id, event.target.value)} /><button type="button" aria-label={`${index + 1}번째 사진 삭제`} onClick={() => removePhoto(photo.id)}>×</button></div>)}</div>}
      </aside>

      <section className="board-stage">
        <div className={`memory-board ${theme}`} ref={boardRef} onPointerMove={movePhoto} onPointerUp={() => { dragRef.current = null; }}>
          {theme === 'night' && <div className="string-lights" />}
          <h2>{title || '우리의 한 해'}</h2>
          {!photos.length && <label className="empty-board"><b>＋</b><strong>사진을 골라주세요</strong><span>최대 8장까지 붙일 수 있어요</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addPhotos} /></label>}
          {photos.map((photo) => <div className={`board-photo ${photo.frame}`} key={photo.id} style={{ left: `${photo.x}%`, top: `${photo.y}%`, transform: `rotate(${photo.rotation}deg)` }} onPointerDown={(event) => beginDrag(event, photo)}>
            <i className="tape" /><img src={photo.src} alt={photo.comment || '추억 사진'} draggable={false} /><p>{photo.comment || '한마디를 적어보세요'}</p>
          </div>)}
          {!!photos.length && <p className="board-letter">{letter}</p>}
        </div>
        <p className="drag-hint">사진을 꾹 누르고 원하는 곳으로 옮길 수 있어요.</p>
        <button className="save-board-button" type="button" onClick={saveBoard} disabled={!photos.length || saving}>{saving ? '이미지 만드는 중…' : '완성한 보드 이미지로 저장'}</button>
      </section>
    </div>
  </main>;
}
