/**
 * Sponsor duyuru görsellerindeki dairesel logo rozetlerini otomatik bulup kırpar.
 *
 *   node scripts/crop-sponsor-logos.mjs
 *
 * Kaynak : public/media/sponsor-*.jpg  (Instagram'da yayınlanan duyuru görselleri)
 * Çıktı  : public/media/logolar/*.png  (saydam köşeli dairesel logo rozetleri)
 *
 * Yöntem: diskin rengine uyan pikseller işaretlenir, yaklaşık merkezin
 * çevresinden tohumlanan bir taşma doldurma ile diskin bağlantılı bölgesi
 * bulunur, sınırlayıcı kutusundan merkez ve yarıçap ölçülür. Böylece
 * halkanın kopuk yayları ve dış parlama ölçümü bozmaz.
 */
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const OUT = process.argv[2] ?? 'public/media/logolar';
const SRC = 'public/media';
const SIZE = 320;

const test = {
  beyaz: (r, g, b) => Math.min(r, g, b) > 232,
  siyah: (r, g, b) => Math.max(r, g, b) < 14,
  koyuNotr: (r, g, b) => Math.max(r, g, b) < 42 && Math.max(r, g, b) - Math.min(r, g, b) < 12,
  koyuKontrast: (r, g, b) => {
    const mx = Math.max(r, g, b);
    return mx < 42 && mx - Math.min(r, g, b) < 12 && mx > 13;
  },
  teal: (r, g, b) => b > 52 && b - r > 38 && r < 28,
};

// [dosya, çıktı adı, yaklaşık merkez X, yaklaşık merkez Y, disk tipi, beklenen yarıçap]
const jobs = [
  ['sponsor-altin.jpg', 'luna-robotics', 553, 508, 'teal', 168],
  ['sponsor-altin.jpg', 'kayra-yemek', 258, 960, 'beyaz', 168],
  ['sponsor-altin.jpg', 'biyolift', 822, 962, 'beyaz', 168],

  ['sponsor-bronz.jpg', 'ibras', 195, 290, 'beyaz', 88],
  ['sponsor-bronz.jpg', 'finemold', 530, 290, 'beyaz', 88],
  ['sponsor-bronz.jpg', 'akkus-enerji', 195, 505, 'beyaz', 88],
  ['sponsor-bronz.jpg', 'cakir', 530, 505, 'beyaz', 88],
  ['sponsor-bronz.jpg', 'pinar-metal', 195, 727, 'beyaz', 88],
  ['sponsor-bronz.jpg', 'marka-lazer', 530, 727, 'koyuKontrast', 88],

  ['sponsor-gonullu.jpg', 'dr-tablet', 297, 442, 'siyah', 160],
  ['sponsor-gonullu.jpg', 'mercan', 812, 447, 'beyaz', 160],
  ['sponsor-gonullu.jpg', 'pocketbook', 302, 952, 'beyaz', 160],
  ['sponsor-gonullu.jpg', 'off-ee', 817, 957, 'koyuNotr', 160],

  ['sponsor-platin-vatanjet.jpg', 'vatanjet', 540, 645, 'beyaz', 270],
  ['sponsor-bronz-tsg.jpg', 'tsg', 540, 640, 'beyaz', 270],
];

const cache = new Map();
async function raw(file) {
  if (!cache.has(file)) {
    cache.set(
      file,
      await sharp(path.join(SRC, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    );
  }
  return cache.get(file);
}

fs.mkdirSync(OUT, { recursive: true });

for (const [file, name, ax, ay, tip, beklenen] of jobs) {
  const { data, info } = await raw(file);
  const { width: W, height: H, channels: C } = info;
  const uye = test[tip];

  // Yaklaşık merkez çevresinde bir pencere içinde çalış
  const pad = Math.round(beklenen * 1.5);
  const x0 = Math.max(0, ax - pad), y0 = Math.max(0, ay - pad);
  const x1 = Math.min(W - 1, ax + pad), y1 = Math.min(H - 1, ay + pad);
  const w = x1 - x0 + 1, h = y1 - y0 + 1;

  const mask = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = ((y + y0) * W + (x + x0)) * C;
      if (uye(data[i], data[i + 1], data[i + 2])) mask[y * w + x] = 1;
    }
  }

  // Merkez çevresinde bir halka üzerinden tohum topla (logo yazısına denk gelmesin diye)
  const seeds = [];
  for (const frac of [0.55, 0.75, 0.88]) {
    for (let a = 0; a < 24; a++) {
      const t = (a / 24) * Math.PI * 2;
      const sx = Math.round(ax - x0 + Math.cos(t) * beklenen * frac);
      const sy = Math.round(ay - y0 + Math.sin(t) * beklenen * frac);
      if (sx >= 0 && sy >= 0 && sx < w && sy < h && mask[sy * w + sx]) seeds.push(sy * w + sx);
    }
  }
  if (!seeds.length) { console.error(`${name}: tohum bulunamadı`); continue; }

  // Taşma doldurma
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (const s of seeds) if (!seen[s]) { seen[s] = 1; stack.push(s); }
  let minX = w, maxX = -1, minY = h, maxY = -1, count = 0;
  while (stack.length) {
    const p = stack.pop();
    const px = p % w, py = (p - px) / w;
    count++;
    if (px < minX) minX = px; if (px > maxX) maxX = px;
    if (py < minY) minY = py; if (py > maxY) maxY = py;
    if (px > 0 && mask[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; stack.push(p - 1); }
    if (px < w - 1 && mask[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; stack.push(p + 1); }
    if (py > 0 && mask[p - w] && !seen[p - w]) { seen[p - w] = 1; stack.push(p - w); }
    if (py < h - 1 && mask[p + w] && !seen[p + w]) { seen[p + w] = 1; stack.push(p + w); }
  }

  const cx = Math.round(x0 + (minX + maxX) / 2);
  const cy = Math.round(y0 + (minY + maxY) / 2);
  const r = Math.round(Math.min(maxX - minX, maxY - minY) / 2);
  const sapma = Math.round((100 * Math.abs(r - beklenen)) / beklenen);

  if (r < beklenen * 0.7 || r > beklenen * 1.35) {
    console.error(`${name}: şüpheli yarıçap r=${r} (beklenen ~${beklenen})`);
    continue;
  }

  const left = cx - r, top = cy - r, size = r * 2;
  const cropped = await sharp(path.join(SRC, file))
    .extract({ left, top, width: size, height: size })
    .resize(SIZE, SIZE, { fit: 'cover' })
    .png()
    .toBuffer();

  const circle = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 1}" fill="#fff"/></svg>`
  );

  await sharp(cropped)
    .composite([{ input: circle, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, `${name}.png`));

  console.log(
    `${name.padEnd(16)} ${tip.padEnd(13)} merkez=(${cx},${cy}) r=${r} (beklenen ${beklenen}, sapma %${sapma}) piksel=${count}`
  );
}
