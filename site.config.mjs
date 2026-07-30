/**
 * ============================================================
 *  SİTE ADRESİ AYARI
 * ============================================================
 *
 * Site şu an GitHub'ın verdiği ücretsiz adreste yayında:
 *   https://btumatro.github.io/
 *
 * Depo adı `btumatro.github.io` olduğu için site alt klasörde
 * değil, doğrudan kökte yayınlanır. Bu yüzden BASE_PATH '/' olarak
 * kalır ve alan adı bağlandığında da değişmesi gerekmez.
 *
 * ► btumatro.com alan adını bağladıktan sonra (README'deki
 *   "Alan adı bağlama" adımlarını yaptıktan sonra) yalnızca
 *   aşağıdaki adresi değiştir:
 *
 *     export const SITE_URL = 'https://btumatro.com';
 *
 *   Ayrıca `public/CNAME` dosyasını oluşturup içine tek satır
 *   olarak `btumatro.com` yaz. Hepsi bu kadar.
 */

export const SITE_URL = 'https://btumatro.github.io';
export const BASE_PATH = '/';
