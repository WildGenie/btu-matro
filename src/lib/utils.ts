/**
 * Site kök adresini (base path) hesaba katan bağlantı üretici.
 * GitHub Pages alt klasörde de, kendi alan adında da doğru çalışır.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/**
 * CMS'ten gelen görsel yolunu çözer. Boşsa null döner ki
 * bileşenler yer tutucu gösterebilsin.
 */
export function media(path?: string | null): string | null {
  if (!path || !path.trim()) return null;
  const p = path.trim();
  if (/^https?:\/\//i.test(p)) return p;
  return url(p);
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

/**
 * Üst menü. `children` verilen öğe açılır menü olur; ana bağlantı yine
 * kendi sayfasına gider, alt bağlantılar menüde listelenir.
 */
export const NAV: NavItem[] = [
  {
    label: 'Topluluk',
    href: '/hakkimizda',
    children: [
      { label: 'Hakkımızda', href: '/hakkimizda', description: 'Biz kimiz, vizyon, misyon, tarihçe' },
      { label: 'Ekibimiz', href: '/ekibimiz', description: 'Yönetim kurulu ve ekipler' },
      { label: 'Faaliyetlerimiz', href: '/faaliyetlerimiz', description: 'Eğitimler, geziler, sosyal sorumluluk' },
      { label: 'Galeri', href: '/galeri', description: 'Atölye ve yarışmalardan kareler' },
    ],
  },
  { label: 'Takımlarımız', href: '/takimlarimiz' },
  { label: 'Başarılarımız', href: '/basarilarimiz' },
  { label: 'Haberler', href: '/haberler' },
  { label: 'Sponsorluk', href: '/sponsorluk' },
  { label: 'İletişim', href: '/iletisim' },
];

/** Alt bilgideki düz site haritası. */
export const FOOTER_LINKS = [
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Ekibimiz', href: '/ekibimiz' },
  { label: 'Takımlarımız', href: '/takimlarimiz' },
  { label: 'Başarılarımız', href: '/basarilarimiz' },
  { label: 'Faaliyetlerimiz', href: '/faaliyetlerimiz' },
  { label: 'Haberler', href: '/haberler' },
  { label: 'Sponsorluk', href: '/sponsorluk' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Bize Katılın', href: '/bize-katilin' },
  { label: 'İletişim', href: '/iletisim' },
] as const;

/**
 * Haber ve duyuruları yeniden eskiye sıralar; taslakları eler.
 * `pinned` olanlar anasayfa şeridinde gösterilir, `expiresOn` geçince düşer.
 */
export function publishedNews<
  T extends { data: { draft: boolean; expiresOn: string; date: Date; pinned: boolean } },
>(entries: T[], opts: { onlyPinned?: boolean } = {}): T[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return entries
    .filter((e) => {
      if (e.data.draft) return false;
      if (opts.onlyPinned && !e.data.pinned) return false;
      const until = e.data.expiresOn?.trim();
      if (!until) return true;
      const end = new Date(until);
      return Number.isNaN(end.getTime()) ? true : end >= today;
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Sponsorluk paketine göre renk sınıfı */
export function packageTone(name: string): { ring: string; text: string; bg: string } {
  const n = name.toLocaleLowerCase('tr');
  if (n.includes('ana') || n.includes('platin'))
    return { ring: 'border-volt-400/45', text: 'text-volt-300', bg: 'bg-volt-400/10' };
  if (n.includes('altın'))
    return { ring: 'border-medal-400/45', text: 'text-medal-400', bg: 'bg-medal-400/10' };
  if (n.includes('gümüş'))
    return { ring: 'border-mist-300/35', text: 'text-mist-300', bg: 'bg-mist-300/10' };
  if (n.includes('bronz'))
    return { ring: 'border-ember-400/35', text: 'text-ember-400', bg: 'bg-ember-400/10' };
  return { ring: 'border-white/12', text: 'text-mist-500', bg: 'bg-white/5' };
}

/** Dereceyi madalya rengine eşler (1./2./3. ve özel ödüller) */
export function degreeTone(degree: string): string {
  const d = degree.toLocaleLowerCase('tr');
  if (d.includes('1.')) return 'text-medal-400';
  if (d.includes('2.') || d.includes('3.')) return 'text-mist-100';
  if (d.includes('ödül')) return 'text-volt-300';
  return 'text-mist-300';
}
