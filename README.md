# MATRO Web Sitesi

Bursa Teknik Üniversitesi **Makine Teknolojileri Robot ve Otomasyon Topluluğu** resmî web sitesi.

| | |
|---|---|
| **Yayında** | https://wildgenie.github.io/btu-matro/ |
| **İçerik paneli** | https://app.pagescms.org |
| **Hedef alan adı** | btumatro.com *(henüz bağlanmadı — aşağıya bakın)* |

Site tamamen statiktir: sunucu, veritabanı ve barındırma ücreti yoktur. Tüm içerik bu deponun içinde metin dosyası olarak durur; içerik panelinden yapılan her düzenleme buraya kaydedilir ve site **1–2 dakika içinde** otomatik güncellenir.

---

## 📝 İçeriği nasıl düzenlerim?

> **Kod bilmene gerek yok.** Aşağıdaki panel, Word'de yazı yazmak kadar basit.

### İlk giriş

1. https://app.pagescms.org adresine git.
2. **Sign in with GitHub** ile GitHub hesabınla giriş yap.
3. Karşına çıkan listeden **btu-matro** deposunu seç.
4. Sol menüde sayfaların listelendiğini göreceksin.

> Deponun listede çıkmaması, GitHub hesabının depoya yazma yetkisi olmadığı anlamına gelir. Topluluk sorumlusundan seni depoya **Write** yetkisiyle eklemesini iste.

### Sol menüdeki bölümler

| Bölüm | Ne düzenlenir |
|---|---|
| 🏠 **Anasayfa** | Giriş yazısı, butonlar, sayaç rakamları, tanıtım videosu |
| ℹ️ **Hakkımızda** | Biz kimiz, vizyon, misyon, değerler, tarihçe |
| 🏆 **Başarılarımız** | Tüm dereceler ve ödüller tablosu |
| 🎓 **Faaliyetlerimiz** | Eğitim kampı, teknik gezi, seminer, sosyal sorumluluk |
| 🤖 **Takımlarımız** | Her takımın kendi sayfası |
| 🤝 **Sponsorlar** | Güncel ve geçmiş sponsor listesi |
| 💼 **Sponsorluk Paketleri** | Platin/Altın/Gümüş/Bronz paket içerikleri |
| 📝 **Bize Katılın** | Başvuru formu bağlantısı, adımlar, SSS |
| 📸 **Galeri** | Fotoğraflar |
| ⚙️ **Site Ayarları & İletişim** | E-posta, adres, telefon, sosyal medya |

### Düzenleme yaparken

- Değişiklikten sonra sağ üstteki **Save** düğmesine bas. Site kendiliğinden güncellenir.
- Listelerde (örneğin başarılar, sponsorlar) sağdaki **+** ile yeni satır ekler, sürükleyerek sıralarsın.
- **Sıralama** alanı olan yerlerde küçük sayı üstte görünür (1, 2, 3…).
- Fotoğraf alanlarında **Upload** ile bilgisayarından görsel yükleyebilirsin. Yüklenen görseller `public/media` klasörüne gider.

### Sık yapılan işler

**Yeni bir derece/ödül eklemek**
🏆 Başarılarımız → *Dereceler ve Ödüller* listesinde **+** → yıl, yarışma, kategori, derece → Save.
Anasayfada da görünsün istiyorsan **Anasayfada öne çıkar** kutusunu işaretle.

**Yeni takım açmak**
🤖 Takımlarımız → sağ üstte **Add entry** → takım adı, alt başlık, kategori, özet ve detay metnini gir → Save.
Takım sayfası otomatik oluşur ve listeye eklenir.

**Bir takımı arşive kaldırmak**
Takımı aç → **Durum** alanını `Arşiv` yap → Save. Takım listeden kalkar ama içerik silinmez.

**Başvuru formunu bağlamak**
📝 Bize Katılın → *Başvuru formu bağlantısı* alanına Google Forms adresini yapıştır → Save.
(Boş bırakılırsa sitede Instagram butonu gösterilir.)

**Başkan bilgisini güncellemek**
⚙️ Site Ayarları → *Yetkililer* → ilgili satırı doldur → Save.
Telefon/e-posta boş bırakılırsa sitede hiç gösterilmez.

### ⚠️ Dikkat

- **Sponsor tutarları sitede görünmez.** `Tutar` alanı yalnızca topluluk içi kayıt içindir. Ama bu depo herkese açıksa dosya içeriği de görülebilir — hassas bulunuyorsa alanı boş bırakın.
- **Kişisel telefon/e-posta yayınlarken izin alın.** ⚙️ Site Ayarları → Yetkililer bölümündeki bilgiler herkese açık şekilde sitede görünür.

---

## 🌐 btumatro.com alan adını bağlama

Alan adı Cloudflare'de kayıtlı. Bağlamak için sırasıyla:

### 1. GitHub tarafı
Depo → **Settings** → **Pages** → *Custom domain* alanına `btumatro.com` yaz → **Save**.
(DNS ayarlanmadığı için bir süre uyarı gösterecek, normal.)

### 2. Cloudflare DNS kayıtları
Cloudflare → btumatro.com → **DNS** → **Records** → aşağıdaki kayıtları ekle.
**Proxy status mutlaka `DNS only` (gri bulut) olmalı** — turuncu bulut açıkken GitHub sertifika üretemez.

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `wildgenie.github.io` |

### 3. Cloudflare SSL ayarı
**SSL/TLS** → **Overview** → şifreleme modunu **Full** yap.
`Flexible` seçilirse site sonsuz yönlendirme döngüsüne girer.

### 4. Sertifikayı bekle
GitHub → Settings → Pages sayfasında **Enforce HTTPS** kutusu aktifleşene kadar bekle (genelde 10 dk – 1 saat). Aktifleşince işaretle.

### 5. Siteyi yeni adrese geçir
`site.config.mjs` dosyasını aç ve şu iki satırı değiştir:

```js
export const SITE_URL = 'https://btumatro.com';
export const BASE_PATH = '/';
```

Ardından `public/CNAME` adında bir dosya oluştur, içine tek satır yaz:

```
btumatro.com
```

Kaydet (commit). Site birkaç dakika içinde btumatro.com üzerinden yayına girer.

---

## 🛠️ Geliştirici notları

### Kurulum

```bash
npm install
```

### Geliştirme sunucusu

```bash
npm run dev
```

### Yayın derlemesi

```bash
npm run build
```

### Logo ve marka görsellerini yeniden üret

Logo dosyaları değişirse `src/assets/logo-kaynak/` içindekileri güncelle, sonra:

```bash
node scripts/make-brand.mjs && node scripts/make-og.mjs
```

Bu iki betik `public/` altındaki logo, favicon, iOS simgesi ve sosyal medya önizleme
görsellerini kaynak dosyalardan yeniden üretir.

### Teknoloji yığını

- **[Astro](https://astro.build)** — statik site üreteci (SSG)
- **[Tailwind CSS v4](https://tailwindcss.com)** — stil
- **[Pages CMS](https://pagescms.org)** — barındırılan, sunucusuz içerik paneli
- **GitHub Actions + GitHub Pages** — otomatik derleme ve yayın

> **Not:** İlk planda geçen Keystatic, GitHub Pages ile çalışmaz — GitHub mode'u sunucu tarafı API route'u (`prerender: false`) gerektirir, GitHub Pages ise yalnızca statik dosya sunar. Bu yüzden aynı işi sunucusuz yapan Pages CMS tercih edildi.

### Klasör yapısı

```
.pages.yml               İçerik panelinin form şeması
site.config.mjs          Site adresi / alt klasör ayarı
astro.config.mjs         Astro yapılandırması
.github/workflows/       Otomatik yayın (GitHub Actions)
public/
  media/                 Panelden yüklenen görseller
  logo-*.png             Üretilen logolar (elle düzenlemeyin)
  favicon.png            Sekme simgesi (üretilir)
  og.png                 Sosyal medya önizleme görseli (üretilir)
scripts/
  make-brand.mjs         Logo, favicon ve simgeleri üretir
  make-og.mjs            Sosyal medya önizleme görselini üretir
src/
  assets/logo-kaynak/    Orijinal logo dosyaları (kaynak)
  data/*.json            Tekil sayfa içerikleri
  content/teams/*.md     Takım sayfaları
  content/activities/*.md Faaliyetler
  components/            Arayüz bileşenleri
  layouts/               Sayfa iskeleti
  pages/                 Site sayfaları (dosya = URL)
  styles/global.css      Renk paleti ve tipografi
```

### Renkleri ve yazı tiplerini değiştirmek

`src/styles/global.css` içindeki `@theme` bloğu tüm paleti ve tipografiyi tanımlar. Oradaki değerleri değiştirmek tüm siteyi etkiler.

### Marka kullanımı

- **MATRO logosu:** Koyu zeminlerde beyaz varyant (`logo-matro-beyaz.png`), açık zeminlerde renkli varyant (`logo-matro.png`) kullanılır. Kaynak dosyaların tamamı `src/assets/logo-kaynak/` altındadır.
- **BTÜ logosu:** [btu.edu.tr kurumsal kimlik sayfasındaki](https://btu.edu.tr/tr/sayfa/detay/3401/kurumsal-kimlik) resmi dosyalardır. Footer'da beyaz yatay sürüm kullanılır.
- **Yazı tipi:** Başlıklarda üniversitenin kurumsal fontu **Barlow**, gövde metinlerinde ekran okunabilirliği için **Inter**, teknik etiket ve sayılarda **JetBrains Mono** kullanılır. Üçü de npm paketi olarak sitede barındırılır; dışarıya font isteği gitmez.

---

## 🆘 Sorun giderme

**Değişikliğim sitede görünmüyor**
Depo → **Actions** sekmesine bak. Sarı nokta = derleniyor, yeşil tik = yayınlandı, kırmızı çarpı = hata. Kırmızıysa üzerine tıklayıp hatayı oku.

**Panelde depo görünmüyor**
GitHub hesabına depo üzerinde **Write** yetkisi verilmiş olmalı. Ayrıca app.pagescms.org ilk girişte GitHub uygulaması kurulum izni ister; kabul edildiğinden emin ol.

**Görsel yükledim ama çıkmıyor**
Görselin ilgili alana (örn. *Kapak görseli*) seçildiğinden ve **Save** yapıldığından emin ol. Sadece yüklemek yetmez, alana atanması gerekir.

**Site bozuk görünüyor / stiller yok**
Genelde `site.config.mjs` içindeki `BASE_PATH` ile gerçek adres uyuşmuyordur. GitHub adresinde `'/btu-matro'`, kendi alan adında `'/'` olmalı.
