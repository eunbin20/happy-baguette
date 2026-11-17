'use client';

type ResultImage = { title: string; result: string; description?: string; emoji?: string; accent?: string; photo?: string | null };

function wrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' '); let line = ''; let currentY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (context.measureText(test).width > maxWidth && line) { context.fillText(line, x, currentY); line = word; currentY += lineHeight; }
    else line = test;
  }
  if (line) context.fillText(line, x, currentY);
}

export async function downloadResultImage({ title, result, description = '', emoji = '✨', accent = '#ff6d63', photo }: ResultImage) {
  const canvas = document.createElement('canvas'); canvas.width = 1080; canvas.height = 1350;
  const context = canvas.getContext('2d'); if (!context) return;
  const gradient = context.createLinearGradient(0, 0, 1080, 1350); gradient.addColorStop(0, '#fff9e9'); gradient.addColorStop(1, accent);
  context.fillStyle = gradient; context.fillRect(0, 0, 1080, 1350);
  context.fillStyle = '#ffffffdd'; context.fillRect(70, 70, 940, 1210);
  context.fillStyle = '#17131a'; context.font = '900 42px system-ui, sans-serif'; context.fillText('happy baguette', 120, 155);
  context.fillStyle = accent; context.fillRect(120, 205, 110, 12);
  if (photo) {
    const image = new Image(); image.src = photo; await image.decode();
    context.save(); context.beginPath(); context.arc(540, 430, 170, 0, Math.PI * 2); context.clip(); context.drawImage(image, 370, 260, 340, 340); context.restore();
  } else { context.textAlign = 'center'; context.font = '150px system-ui'; context.fillText(emoji, 540, 540); context.textAlign = 'left'; }
  context.textAlign = 'center'; context.fillStyle = '#686068'; context.font = '800 34px system-ui, sans-serif'; context.fillText(title, 540, 700);
  context.fillStyle = '#17131a'; context.font = '900 76px system-ui, sans-serif'; wrappedText(context, result, 540, 820, 760, 92);
  context.font = '600 31px system-ui, sans-serif'; context.fillStyle = '#5c555c'; wrappedText(context, description, 540, 1030, 760, 48);
  context.font = '700 25px system-ui, sans-serif'; context.fillStyle = '#8a828a'; context.fillText('happybaguette.com', 540, 1210);
  canvas.toBlob((blob) => { if (!blob) return; const link = document.createElement('a'); link.download = `happy-baguette-${Date.now()}.png`; link.href = URL.createObjectURL(blob); link.click(); URL.revokeObjectURL(link.href); }, 'image/png');
}
