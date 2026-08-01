import sharp from 'sharp';

const files = process.argv.slice(2);
const STEP = 100;

for (const f of files) {
  const m = await sharp(f).metadata();
  const W = m.width, H = m.height;
  let g = '';
  for (let x = 0; x <= W; x += STEP) {
    g += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#00ff00" stroke-width="2" opacity="0.55"/>`;
    g += `<text x="${x + 4}" y="26" fill="#00ff00" font-size="24" font-family="monospace">${x}</text>`;
  }
  for (let y = 0; y <= H; y += STEP) {
    g += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#00ff00" stroke-width="2" opacity="0.55"/>`;
    g += `<text x="4" y="${y - 6}" fill="#00ff00" font-size="24" font-family="monospace">${y}</text>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${g}</svg>`;
  const out = f.split('/').pop().replace(/\.(jpg|png)$/, '-grid.jpg');
  await sharp(f).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).jpeg({ quality: 88 }).toFile(out);
  console.log(out, `${W}x${H}`);
}
