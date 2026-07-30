import sharp from 'sharp';


const W = 1200;
const H = 630;

const grid = [];
for (let x = 0; x <= W; x += 60) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" />`);
for (let y = 0; y <= H; y += 60) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" />`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#04070d"/>
      <stop offset="1" stop-color="#0b111d"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.22" cy="0.1" r="0.75">
      <stop offset="0" stop-color="#29dcff" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#29dcff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7ff0ff"/>
      <stop offset="0.55" stop-color="#29dcff"/>
      <stop offset="1" stop-color="#0396b6"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g stroke="#ffffff" stroke-opacity="0.045" stroke-width="1">${grid.join('')}</g>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g transform="translate(84,78)">
    <rect width="104" height="104" rx="28" fill="url(#mark)"/>
    <path d="M22 78V30h10.5l19.5 27 19.5-27H82v48h-10.5V47.5L55 70h-6L32.5 47.5V78H22Z" fill="#04070d"/>
  </g>

  <text x="212" y="128" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="46" font-weight="700" fill="#eef3fb" letter-spacing="-1">MATRO</text>
  <text x="213" y="162" font-family="Menlo, Monaco, monospace" font-size="17" fill="#8496b3" letter-spacing="3">BTU · EST. 2013</text>

  <text x="84" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="62" font-weight="700" fill="#eef3fb" letter-spacing="-2">Geleceğin teknolojilerini</text>
  <text x="84" y="404" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="62" font-weight="700" fill="#29dcff" letter-spacing="-2">bugün şekillendiriyoruz</text>

  <text x="84" y="470" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" fill="#b9c6dc">Makine Teknolojileri Robot ve Otomasyon Topluluğu</text>

  <g transform="translate(84,528)">
    <rect width="336" height="46" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="20" y="30" font-family="Menlo, Monaco, monospace" font-size="16" fill="#7ff0ff" letter-spacing="1">30+ ÖDÜL · 15 BİRİNCİLİK</text>
    <rect x="354" width="300" height="46" rx="12" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="374" y="30" font-family="Menlo, Monaco, monospace" font-size="16" fill="#7ff0ff" letter-spacing="1">MİLLİ TEKNOLOJİ HAMLESİ</text>
  </g>

  <text x="1116" y="566" text-anchor="end" font-family="Menlo, Monaco, monospace" font-size="17" fill="#8496b3" letter-spacing="1">btumatro.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(process.argv[2]);
console.log('OG image written to', process.argv[2]);
