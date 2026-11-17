import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PNG } from 'pngjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HumanModule = await import(pathToFileURL(path.join(root, 'node_modules/@vladmandic/human/dist/human.node-wasm.js')));
const Human = HumanModule.Human;
const sourceDir = path.join(root, 'apps/home/public/celebrity-references');
const modelDir = path.join(root, 'apps/home/public/human-models');
const outputFile = path.join(root, 'apps/home/src/data/celebrity-embeddings.json');

const nativeFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.startsWith('file://')) {
    const data = fs.readFileSync(fileURLToPath(url));
    return new Response(data, { status: 200 });
  }
  return nativeFetch(input, init);
};

const human = new Human({
  modelBasePath: `${pathToFileURL(modelDir).href}/`,
  cacheSensitivity: 0,
  filter: { enabled: true, equalization: true },
  face: {
    enabled: true,
    detector: { enabled: true, modelPath: 'blazeface.json', rotation: true, maxDetected: 1, minConfidence: 0.25 },
    mesh: { enabled: true, modelPath: 'facemesh.json' },
    description: { enabled: true, modelPath: 'faceres.json' },
    iris: { enabled: false },
    age: { enabled: false },
    gender: { enabled: false },
    emotion: { enabled: false },
    antispoof: { enabled: false },
    liveness: { enabled: false },
  },
  body: { enabled: false },
  hand: { enabled: false },
  object: { enabled: false },
  gesture: { enabled: false },
});

function labelFromFile(filename) {
  return path.basename(filename, path.extname(filename)).replace(/_\d+$/, '').normalize('NFC');
}

function pngTensor(filename) {
  const png = PNG.sync.read(fs.readFileSync(filename));
  const rgb = new Uint8Array(png.width * png.height * 3);
  for (let source = 0, target = 0; source < png.data.length; source += 4) {
    rgb[target++] = png.data[source];
    rgb[target++] = png.data[source + 1];
    rgb[target++] = png.data[source + 2];
  }
  return human.tf.tensor3d(rgb, [png.height, png.width, 3], 'int32');
}

await human.tf.ready();
await human.load();

const files = fs.readdirSync(sourceDir).filter((file) => file.toLowerCase().endsWith('.png')).sort();
const records = [];
const rejected = [];

for (const [index, filename] of files.entries()) {
  const tensor = pngTensor(path.join(sourceDir, filename));
  try {
    const result = await human.detect(tensor);
    const face = result.face[0];
    if (!face?.embedding?.length) {
      rejected.push({ filename, reason: 'face-not-found' });
      console.log(`[${index + 1}/${files.length}] 얼굴을 찾지 못함: ${filename}`);
      continue;
    }
    records.push({
      name: labelFromFile(filename),
      image: `/celebrity-references/${encodeURIComponent(filename)}`,
      embedding: Array.from(face.embedding, (value) => Number(value.toFixed(7))),
    });
    console.log(`[${index + 1}/${files.length}] 완료: ${filename}`);
  } finally {
    tensor.dispose();
  }
}

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify({ generatedAt: new Date().toISOString(), records, rejected }, null, 2)}\n`);
console.log(`저장 완료: ${records.length}개, 제외: ${rejected.length}개`);
