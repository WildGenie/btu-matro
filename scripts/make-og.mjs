/**
 * Sosyal medya önizleme görselini (Open Graph) üretir.
 *
 *   node scripts/make-og.mjs
 *
 * Önce `node scripts/make-brand.mjs` çalıştırılmış olmalıdır —
 * bu betik public/logo-matro-beyaz.png dosyasını kullanır.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2] ?? path.join(root, 'public/og.png');
const badgeFile = path.join(root, 'public/logo-matro-beyaz.png');

const W = 1200;
const H = 630;
const BADGE = 132;
const FONT = 'Barlow, Helvetica Neue, Helvetica, Arial, sans-serif';
const MONO = 'Menlo, Monaco, monospace';

const grid = [];
for (let x = 0; x <= W; x += 60) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" />`);
for (let y = 0; y <= H; y += 60) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" />`);

const background = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#04070d"/>
      <stop offset="1" stop-color="#0b111d"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.22" cy="0.1" r="0.75">
      <stop offset="0" stop-color="#29dcff" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#29dcff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g stroke="#ffffff" stroke-opacity="0.045" stroke-width="1">${grid.join('')}</g>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <text x="248" y="128" font-family="${FONT}" font-size="46" font-weight="700" fill="#eef3fb" letter-spacing="-1">MATRO</text>
  <text x="249" y="162" font-family="${MONO}" font-size="17" fill="#8496b3" letter-spacing="3">BTÜ · EST. 2013</text>

  <text x="84" y="330" font-family="${FONT}" font-size="62" font-weight="700" fill="#eef3fb" letter-spacing="-2">Geleceğin teknolojilerini</text>
  <text x="84" y="404" font-family="${FONT}" font-size="62" font-weight="700" fill="#29dcff" letter-spacing="-2">bugün şekillendiriyoruz</text>

  <text x="84" y="470" font-family="${FONT}" font-size="25" fill="#b9c6dc">Makine Teknolojileri Robot ve Otomasyon Topluluğu</text>

  <g transform="translate(84,528)">
    <rect width="336" height="46" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="20" y="30" font-family="${MONO}" font-size="16" fill="#7ff0ff" letter-spacing="1">30+ ÖDÜL · 15 BİRİNCİLİK</text>
    <rect x="354" width="300" height="46" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="374" y="30" font-family="${MONO}" font-size="16" fill="#7ff0ff" letter-spacing="1">MİLLİ TEKNOLOJİ HAMLESİ</text>
  </g>

  <text x="1116" y="566" text-anchor="end" font-family="${MONO}" font-size="17" fill="#8496b3" letter-spacing="1">btumatro.com</text>
</svg>`;

const badge = await sharp(badgeFile)
  .resize(BADGE, BADGE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp(Buffer.from(background))
  .composite([{ input: badge, left: 84, top: 58 }])
  .png({ compressionLevel: 9 })
  .toFile(target);

console.log('Önizleme görseli üretildi →', target);
