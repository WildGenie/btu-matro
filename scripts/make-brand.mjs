/**
 * Marka görsellerini üretir.
 *
 *   node scripts/make-brand.mjs
 *
 * KAYNAK DOSYALAR — src/assets/logo-kaynak/
 *   MATRO.png        Renkli rozet, beyaz daire zeminli (her zeminde çalışır)
 *   MATRO1.png       Siyah monokrom (açık zemin)
 *   MATRO2.png       Renkli rozet, şeffaf zemin (açık zemin)
 *   MATRO3.png       Beyaz monokrom (koyu zemin)  ← sitenin ana logosu
 *   MATRO_GENEL.png  Dört varyantın bir arada olduğu tanıtım görseli
 *
 * BTÜ kurumsal kimlik dosyaları (btu.edu.tr/tr/sayfa/detay/3401/kurumsal-kimlik):
 *   BTU5.png             Renkli, dikey
 *   BTU.png              Siyah, dikey
 *   BTU-beyaz-yatay.png  Beyaz, yatay  ← footer'da kullanılan resmi sürüm
 *   BTU-beyaz-dikey.png  Beyaz, dikey
 *
 * ÜRETİLENLER — public/
 *   logo-matro-beyaz.png   Header ve footer (koyu zemin)
 *   logo-matro.png         Renkli rozet (açık zemin, paylaşım)
 *   logo-btu.png           Üniversite logosu, renkli (açık zemin)
 *   logo-btu-beyaz.png     Üniversite logosu, beyaz yatay (footer)
 *   favicon.png            Tarayıcı sekmesi simgesi
 *   apple-touch-icon.png   iOS ana ekran simgesi
 *
 * Logolar güncellenirse kaynakları değiştirip bu betiği tekrar çalıştırın.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => path.join(root, 'src/assets/logo-kaynak', f);
const out = (f) => path.join(root, 'public', f);

const INK = '#0b111d';
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Rozeti kırpıp kare tuvale ortalar. */
const badge = (file, size) =>
  sharp(file)
    .trim({ threshold: 1 })
    .resize(size, size, { fit: 'contain', background: TRANSPARENT })
    .png({ compressionLevel: 9 });

/** Rozeti yuvarlatılmış koyu bir kare üzerine yerleştirip simge üretir. */
async function icon(badgeFile, size, file) {
  const pad = Math.round(size * 0.13);
  const inner = size - pad * 2;
  const radius = Math.round(size * 0.22);
  const plate = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <rect width="${size}" height="${size}" rx="${radius}" fill="${INK}"/>
     </svg>`
  );
  const mark = await sharp(badgeFile).resize(inner, inner, { fit: 'contain', background: TRANSPARENT }).toBuffer();
  await sharp(plate)
    .composite([{ input: mark, left: pad, top: pad }])
    .png({ compressionLevel: 9 })
    .toFile(file);
}

await badge(src('MATRO3.png'), 512).toFile(out('logo-matro-beyaz.png'));
await badge(src('MATRO.png'), 512).toFile(out('logo-matro.png'));

// BTÜ logoları — btu.edu.tr/tr/sayfa/detay/3401/kurumsal-kimlik adresindeki resmi dosyalar
await sharp(src('BTU5.png'))
  .trim({ threshold: 1 })
  .resize({ width: 480, fit: 'inside' })
  .png({ compressionLevel: 9 })
  .toFile(out('logo-btu.png'));

await sharp(src('BTU-beyaz-yatay.png'))
  .trim({ threshold: 1 })
  .resize({ width: 560, fit: 'inside' })
  .png({ compressionLevel: 9 })
  .toFile(out('logo-btu-beyaz.png'));

await icon(out('logo-matro-beyaz.png'), 512, out('favicon.png'));
await icon(out('logo-matro-beyaz.png'), 180, out('apple-touch-icon.png'));

console.log('Marka görselleri üretildi → public/');
