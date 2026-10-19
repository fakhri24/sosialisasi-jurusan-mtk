# MathSphere FMIPA Deck: Sistem Transisi Keynote Dramatis (`3D Slide-Cube` & `Fade-Scale`) + *Staggered Card Reveal*

Peningkatan pengalaman visual perpindahan slide pada **MathSphere FMIPA Deck** menggunakan **Framer Motion** dengan perspektif 3D perangkat keras (*GPU-accelerated 3D perspective*) agar setiap pergantian halaman di layar besar proyektor dan MacBook Air M1 terasa seperti presentasi **Apple Keynote** profesional.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Keputusan animasi dan transisi berikut telah dikonfirmasi berdasarkan preferensi Anda:

- **Keputusan Terkonfirmasi 1 — Dukungan Ganda `3D Slide-Cube` & `Fade-Scale` dengan Pemilih di Bar Bawah**: Pengguna dapat memilih efek transisi secara *real-time* melalui tombol pemilih di bar bawah (atau menekan tombol **`T`** pada keyboard) untuk beralih antara **Efek Kubus 3D (*Slide-Cube*)** dan **Efek Zoom Sinematik (*Fade-Scale*)**.
- **Keputusan Terkonfirmasi 2 — Animasi Muncul Bertahap (*Staggered Reveal*) pada Kartu Internal**: Selain perpindahan panggung utama, elemen-elemen di dalam slide (header slide, kartu kiri/kanan, metrik angka besar, dan grafik) diberikan efek muncul berurutan (*staggered entrance*) yang cepat dan luwes saat slide terbuka.

---

## 1. Overview & Core Concept

- **Apa yang Ditambahkan**:
  1. **Mesin Transisi 3D Perspektif (`perspective: 1600px`)**: Mengubah kontainer panggung slide menjadi ruang tiga dimensi dengan poros rotasi dinamis (`transformOrigin: left center` atau `right center` mengikuti arah navigasi maju/mundur).
  2. **Varian `Slide-Cube` (Default)**: Saat berpindah ke slide berikutnya, slide lama berputar keluar pada sumbu Y (`rotateY: -78deg`, `x: -55%`, `scale: 0.88`) sementara slide baru berputar masuk dari sisi berlawanan (`rotateY: 78deg` $\to$ `0deg`) membentuk ilusi rotasi kubus tiga dimensi yang presisi.
  3. **Varian `Fade-Scale`**: Slide lama membesar halus sambil memudar (`scale: 1.08`, `opacity: 0`), sementara slide baru muncul dari kedalaman layar (`scale: 0.86` $\to$ `1.0`, `opacity: 0` $\to$ `1`) dengan kurva pegas (*spring physics*) khas Keynote.
  4. **Orkestrasi *Staggered Reveal* di Dalam Slide**: Kartu dan panel utama di dalam setiap slide muncul secara bertahap dengan jeda `50ms` antar-zona menggunakan komponen pembungkus animasi terpadu.

---

## 2. User Experience & Visual Design

### Detail Mekanika Transisi & Interaksi

1. **Pemilih Efek Transisi di Bar Bawah**:
   - Di sebelah kiri tombol `Prev / Next` pada bar kontrol bawah, tersedia tombol pengalih cepat **`Transisi: Cube 3D`** / **`Transisi: Fade-Scale`** (juga dapat diakses lewat tombol keyboard **`T`**).
2. **Responsivitas Arah Navigasi (`slideDirection`)**:
   - Menekan `→` / `Space` (maju) memutar kubus dari kanan ke kiri, sedangkan menekan `←` (mundur) membalik arah putaran kubus dari kiri ke kanan secara alami.
3. **Animasi Masuk Bertahap (*Staggered Card Entrance*)**:
   - Begitu transisi slide dimulai, baris judul atas, panel interaktif kiri, dan panel metrik/grafik kanan masuk dengan gerakan vertikal lembut (`y: 16px` $\to$ `0px`, `opacity: 0` $\to$ `1`) dalam waktu `240ms`, memberikan aksen dramatis tanpa menghambat kecepatan baca guru maupun siswa.

---

## 3. Key Product Decisions & Trade-Offs

- **Keputusan 1 — Penggunaan Properti Kompositor 3D (`rotateY`, `translateX`, `scale`, `opacity`)**:
  - *Pendekatan Terpilih*: Menerapkan `perspective: 1600px` dan `transformStyle: 'preserve-3d'` pada panggung utama serta mengatur `transformOrigin` secara dinamis berdasarkan arah perpindahan slide.
  - *Alasan*: Menghasilkan efek kubus 3D yang tajam dan realistis pada chip Apple M1 dengan tetap mempertahankan 60fps tanpa memicu perhitungan ulang tata letak (*reflow*).
- **Keputusan 2 — Fisika Pegas Teredam (*Critically Damped Spring*)**:
  - *Pendekatan Terpilih*: Menggunakan konfigurasi transisi `type: "spring", stiffness: 220, damping: 26, mass: 0.9` untuk perputaran kubus dan zoom skala.
  - *Alasan*: Memberikan kesan bobot fisik yang mewah dan dramatis di awal gerakan namun berhenti dengan mulus tanpa pantulan berlebih yang mengganggu keterbacaan teks besar.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Diagram Orkestrasi Animasi Framer Motion

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION STAGE (perspective: 1600px)                 │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ AnimatePresence (mode="wait", custom={ direction, transitionStyle })   │  │
│  │                                                                        │  │
│  │  ├── Mode 1: "cube" (3D Slide-Cube)                                    │  │
│  │  │    • Enter : rotateY(±78° -> 0°), x(±55% -> 0%), scale(0.86 -> 1)   │  │
│  │  │    • Exit  : rotateY(0° -> ∓78°), x(0% -> ∓55%), scale(1 -> 0.86)   │  │
│  │  │                                                                     │  │
│  │  └── Mode 2: "fade-scale" (Cinematic Zoom)                             │  │
│  │       • Enter : scale(0.85 -> 1.0), y(24px -> 0), opacity(0 -> 1)      │  │
│  │       • Exit  : scale(1.0 -> 1.08), y(0 -> -18px), opacity(1 -> 0)     │  │
│  │                                                                        │  │
│  │       ┌────────────────────────────────────────────────────────┐       │  │
│  │       │ Staggered Slide Content Wrapper                        │       │  │
│  │       │  ├── Zona Header / Tab   (delay: 0.04s, y: 14 -> 0)    │       │  │
│  │       │  ├── Zona Panel Kiri     (delay: 0.09s, y: 18 -> 0)    │       │  │
│  │       │  └── Zona Metrik Kanan   (delay: 0.14s, y: 18 -> 0)    │       │  │
│  │       └────────────────────────────────────────────────────────┘       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Pemetaan Kontrol Transisi

| Kontrol Pengguna | Aksi Sistem & Respons Visual |
| :--- | :--- |
| **Tombol `Cube 3D / Fade-Scale` di Bar Bawah (atau tombol `T`)** | Mengubah state `transitionStyle` antara `'cube'` dan `'fade-scale'` serta langsung diterapkan pada perpindahan slide berikutnya. |
| **Navigasi Slide (`←`, `→`, `Space`, `1-9`)** | Menghitung vektor arah (`direction: 1` atau `-1`), mengatur titik tumpu 3D (`transformOrigin`), menjalankan animasi panggung utama, dan memicu *staggered reveal* pada kartu di dalam slide. |
| **Klik Tab Jurusan / Tahun / Era di Dalam Slide** | Memicu animasi transisi mikro (`scale: 0.97` $\to$ `1.0`, `opacity`) pada kartu konten yang berubah sehingga interaksi di dalam slide juga terasa hidup. |
