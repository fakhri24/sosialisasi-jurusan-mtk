export type MajorId = 'matematika' | 'aktuaria' | 'statistika' | 'sains-data' | 'ai';

export interface CourseItem {
  code: string;
  name: string;
  sks: number;
  category: 'Teori Matematika' | 'Statistika & Peluang' | 'Komputasi & AI' | 'Finansial & Industri';
  description: string; // Concise 5-7 words
}

export interface CurriculumYear {
  year: number;
  title: string;
  focusSummary: string;
  courses: CourseItem[];
}

export interface CareerProspect {
  role: string;
  industry: string;
  entrySalaryRp: string;
  seniorSalaryRp: string;
  demandGrowth2030: string;
  coreSkill: string;
}

export interface MajorProfile {
  id: MajorId;
  name: string;
  shortName: string;
  degreeTitle: string;
  accentColor: string;
  accentHex: string;
  tagline: string; // Max 5-7 words
  generalOverview: string; // Concise 1-line summary
  coreObjectOfStudy: string; // 5-7 words
  keyDifferentiator: string; // 5-7 words
  idealStudentTraits: string[]; // 3 bullets, each 5-7 words
  specialRequirements: {
    utbkAvgRange: [number, number];
    minMathReasoning: number;
    minQuantitative: number;
    snbpSupportingSubjects: string[];
    physicalAndHealthNotes: string; // 5-7 words
    certificationOrSpecialTest: string; // 5-7 words
    codingIntensity: number;
    mathAbstraction: number;
    businessFinanceFocus: number;
    dataEngineeringFocus: number;
  };
  competencyBreakdown: {
    pureMath: number;
    statisticsProb: number;
    computationCoding: number;
    domainBusiness: number;
  };
  curriculumByYear: CurriculumYear[];
  careers: CareerProspect[];
  teacherTalkingPoints: string[];
}

export interface EraMajorSnapshot {
  majorId: MajorId;
  statusInIndonesia: string;
  curriculumFocus: string;
  computingTools: string;
  researchFrontier: string;
  industryAdoption: string;
  curriculumWeight: {
    theory: number;
    appliedStats: number;
    computation: number;
    aiAndData: number;
  };
  talentDemandIndex: number;
}

export interface HistoricalEra {
  id: string;
  period: string;
  title: string;
  macroContext: string;
  keyBreakthrough: string;
  teacherNarrative: string;
  snapshots: EraMajorSnapshot[];
}

export interface UniversityProgramEntry {
  majorId: MajorId;
  programNameOfficial: string;
  facultyDepartment: string;
  accreditation: string;
  dayaTampung2026: number;
  peminat2025: number;
  keketatan2025Percent: number;
  snbpDayaTampung2026: number;
  snbpPeminat2025: number;
  passingGradeHistory: {
    year2022: number;
    year2023: number;
    year2024: number;
    year2025: number;
    projected2026: number;
  };
}

export interface UniversityPTN {
  id: string;
  code: string;
  name: string;
  city: string;
  facultyName: string;
  departmentName: string;
  establishedYear: number;
  campusEnvironmentDesc: string;
  departmentBuildingHighlight: string;
  labFacilities: string[];
  campusImageSvgUri: string;
  programs: UniversityProgramEntry[];
}

export interface IfThenRule {
  id: string;
  ruleCode: string;
  ifConditions: string[];
  thenMajorId: MajorId;
  confidenceWeight: number;
  explanation: string;
  characteristicQuote: string;
}

export interface StudentTraitOption {
  id: string;
  category: 'math_style' | 'problem_solving' | 'coding_affinity' | 'industry_goal';
  label: string;
  description: string;
  weights: Record<MajorId, number>;
}

function createCampusArchitectureSvg(config: {
  bgStart: string;
  bgEnd: string;
  accent: string;
  secondaryAccent: string;
  uniCode: string;
  buildingName: string;
  city: string;
  styleType: 'rotunda' | 'colonial-modern' | 'classical-columns' | 'futuristic-tower' | 'botanical-atrium';
}): string {
  const { bgStart, bgEnd, accent, secondaryAccent, uniCode, buildingName, city, styleType } = config;

  let structureSvg = '';
  if (styleType === 'rotunda') {
    structureSvg = `
      <ellipse cx="400" cy="390" rx="340" ry="45" fill="${accent}" fill-opacity="0.12" />
      <rect x="130" y="190" width="540" height="150" rx="6" fill="#1E293B" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.5"/>
      <line x1="130" y1="225" x2="670" y2="225" stroke="#475569" stroke-width="1.5"/>
      <line x1="130" y1="260" x2="670" y2="260" stroke="#475569" stroke-width="1.5"/>
      <line x1="130" y1="295" x2="670" y2="295" stroke="#475569" stroke-width="1.5"/>
      <path d="M310 135 C310 110, 490 110, 490 135 L490 340 L310 340 Z" fill="#0F172A" stroke="${accent}" stroke-width="2"/>
      <ellipse cx="400" cy="135" rx="90" ry="20" fill="#1E293B" stroke="${accent}" stroke-width="2"/>
      <rect x="335" y="165" width="32" height="45" rx="3" fill="${accent}" fill-opacity="0.35"/>
      <rect x="384" y="165" width="32" height="45" rx="3" fill="${secondaryAccent}" fill-opacity="0.45"/>
      <rect x="433" y="165" width="32" height="45" rx="3" fill="${accent}" fill-opacity="0.35"/>
      <rect x="165" y="205" width="110" height="16" rx="2" fill="${accent}" fill-opacity="0.25"/>
      <rect x="525" y="205" width="110" height="16" rx="2" fill="${accent}" fill-opacity="0.25"/>
      <rect x="165" y="240" width="110" height="16" rx="2" fill="${secondaryAccent}" fill-opacity="0.25"/>
      <rect x="525" y="240" width="110" height="16" rx="2" fill="${secondaryAccent}" fill-opacity="0.25"/>
    `;
  } else if (styleType === 'colonial-modern') {
    structureSvg = `
      <path d="M110 230 L260 130 L540 130 L690 230 Z" fill="#1E293B" stroke="${accent}" stroke-width="2"/>
      <path d="M250 160 L400 85 L550 160 Z" fill="#0F172A" stroke="${secondaryAccent}" stroke-width="2"/>
      <rect x="145" y="230" width="510" height="120" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <rect x="180" y="230" width="18" height="120" fill="#334155"/>
      <rect x="250" y="230" width="18" height="120" fill="#334155"/>
      <rect x="320" y="230" width="18" height="120" fill="#334155"/>
      <rect x="462" y="230" width="18" height="120" fill="#334155"/>
      <rect x="532" y="230" width="18" height="120" fill="#334155"/>
      <rect x="602" y="230" width="18" height="120" fill="#334155"/>
      <rect x="360" y="245" width="80" height="105" rx="40" fill="${accent}" fill-opacity="0.28" stroke="${accent}" stroke-width="1.5"/>
    `;
  } else if (styleType === 'classical-columns') {
    structureSvg = `
      <polygon points="220,145 400,75 580,145" fill="#1E293B" stroke="${accent}" stroke-width="2"/>
      <rect x="120" y="185" width="560" height="165" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <rect x="235" y="145" width="330" height="205" fill="#1E293B" stroke="${accent}" stroke-width="1.5"/>
      <rect x="265" y="155" width="16" height="195" fill="#475569"/>
      <rect x="325" y="155" width="16" height="195" fill="#475569"/>
      <rect x="459" y="155" width="16" height="195" fill="#475569"/>
      <rect x="519" y="155" width="16" height="195" fill="#475569"/>
      <rect x="368" y="210" width="64" height="140" fill="${accent}" fill-opacity="0.3" stroke="${secondaryAccent}" stroke-width="1.5"/>
      <rect x="145" y="215" width="65" height="28" fill="${secondaryAccent}" fill-opacity="0.25"/>
      <rect x="590" y="215" width="65" height="28" fill="${secondaryAccent}" fill-opacity="0.25"/>
      <rect x="145" y="265" width="65" height="28" fill="${accent}" fill-opacity="0.25"/>
      <rect x="590" y="265" width="65" height="28" fill="${accent}" fill-opacity="0.25"/>
    `;
  } else if (styleType === 'futuristic-tower') {
    structureSvg = `
      <rect x="115" y="220" width="570" height="130" rx="4" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
      <rect x="295" y="75" width="210" height="275" rx="6" fill="#0F172A" stroke="${accent}" stroke-width="2"/>
      <line x1="330" y1="75" x2="330" y2="350" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
      <line x1="365" y1="75" x2="365" y2="350" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
      <line x1="400" y1="75" x2="400" y2="350" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
      <line x1="435" y1="75" x2="435" y2="350" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
      <line x1="470" y1="75" x2="470" y2="350" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
      <rect x="320" y="105" width="160" height="22" rx="3" fill="${secondaryAccent}" fill-opacity="0.35"/>
      <rect x="320" y="145" width="160" height="22" rx="3" fill="${accent}" fill-opacity="0.3"/>
      <rect x="320" y="185" width="160" height="22" rx="3" fill="${secondaryAccent}" fill-opacity="0.35"/>
      <rect x="320" y="225" width="160" height="22" rx="3" fill="${accent}" fill-opacity="0.3"/>
    `;
  } else {
    structureSvg = `
      <path d="M140 350 L140 200 L290 140 L510 140 L660 200 L660 350 Z" fill="#1E293B" stroke="${accent}" stroke-width="2"/>
      <polygon points="290,140 400,85 510,140" fill="${accent}" fill-opacity="0.22" stroke="${secondaryAccent}" stroke-width="2"/>
      <line x1="290" y1="140" x2="290" y2="350" stroke="${accent}" stroke-width="1.5"/>
      <line x1="510" y1="140" x2="510" y2="350" stroke="${accent}" stroke-width="1.5"/>
      <line x1="400" y1="85" x2="400" y2="350" stroke="${secondaryAccent}" stroke-width="1.5" stroke-opacity="0.6"/>
      <rect x="315" y="170" width="70" height="55" rx="4" fill="${accent}" fill-opacity="0.3"/>
      <rect x="415" y="170" width="70" height="55" rx="4" fill="${secondaryAccent}" fill-opacity="0.3"/>
      <rect x="315" y="240" width="70" height="55" rx="4" fill="${secondaryAccent}" fill-opacity="0.25"/>
      <rect x="415" y="240" width="70" height="55" rx="4" fill="${accent}" fill-opacity="0.25"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgStart}" />
        <stop offset="100%" stop-color="${bgEnd}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="35%" r="55%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.28" />
        <stop offset="100%" stop-color="${bgEnd}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="800" height="450" fill="url(#sky)" />
    <rect width="800" height="450" fill="url(#glow)" />
    <g stroke="#334155" stroke-width="0.5" stroke-opacity="0.35">
      <line x1="0" y1="90" x2="800" y2="90" />
      <line x1="0" y1="180" x2="800" y2="180" />
      <line x1="0" y1="270" x2="800" y2="270" />
      <line x1="160" y1="0" x2="160" y2="450" />
      <line x1="320" y1="0" x2="320" y2="450" />
      <line x1="480" y1="0" x2="480" y2="450" />
      <line x1="640" y1="0" x2="640" y2="450" />
    </g>
    <circle cx="85" cy="310" r="45" fill="#064E3B" fill-opacity="0.55" />
    <circle cx="120" cy="325" r="35" fill="#047857" fill-opacity="0.45" />
    <circle cx="715" cy="310" r="48" fill="#064E3B" fill-opacity="0.55" />
    <circle cx="680" cy="325" r="36" fill="#047857" fill-opacity="0.45" />
    ${structureSvg}
    <rect x="0" y="350" width="800" height="100" fill="#090D16" />
    <line x1="0" y1="350" x2="800" y2="350" stroke="${accent}" stroke-width="2" stroke-opacity="0.6" />
    <text x="36" y="48" fill="${accent}" font-family="monospace" font-size="16" font-weight="bold" letter-spacing="2">${uniCode} · ${city.toUpperCase()}</text>
    <text x="36" y="398" fill="#F8FAFC" font-family="sans-serif" font-size="22" font-weight="bold">${buildingName}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const MAJORS_DATA: MajorProfile[] = [
  {
    id: 'matematika',
    name: 'Matematika',
    shortName: 'Matematika',
    degreeTitle: 'Sarjana Matematika (S.Mat.)',
    accentColor: 'indigo',
    accentHex: '#6366F1',
    tagline: 'Logika Deduktif, Struktur Abstrak & Pemodelan',
    generalOverview: 'Merancang bukti teorema, algoritma kriptografi, dan optimasi sistem.',
    coreObjectOfStudy: 'Aljabar, Analisis Real, Optimasi & Kriptografi',
    keyDifferentiator: 'Membangun rumus dan algoritma baru dari nol',
    idealStudentTraits: [
      'Suka membuktikan asal-usul rumus matematika',
      'Kuat dalam teka-teki logika abstrak',
      'Minat kriptografi, optimasi, dan pemodelan sistem',
    ],
    specialRequirements: {
      utbkAvgRange: [645, 725],
      minMathReasoning: 680,
      minQuantitative: 660,
      snbpSupportingSubjects: ['Matematika Lanjut', 'Matematika Wajib', 'Fisika / Informatika'],
      physicalAndHealthNotes: 'Bebas syarat buta warna di mayoritas PTN',
      certificationOrSpecialTest: 'Unggul dengan prestasi OSN atau kompetisi logika',
      codingIntensity: 55,
      mathAbstraction: 98,
      businessFinanceFocus: 45,
      dataEngineeringFocus: 50,
    },
    competencyBreakdown: {
      pureMath: 55,
      statisticsProb: 15,
      computationCoding: 20,
      domainBusiness: 10,
    },
    curriculumByYear: [
      {
        year: 1,
        title: 'Tahun 1 · Fondasi Logika & Kalkulus',
        focusSummary: 'Transisi menuju pembuktian formal dan pemrograman dasar.',
        courses: [
          {
            code: 'MAT101',
            name: 'Logika Matematika & Himpunan',
            sks: 3,
            category: 'Teori Matematika',
            description: 'Teknik pembuktian deduktif dan induksi matematika.',
          },
          {
            code: 'MAT102',
            name: 'Kalkulus Diferensial & Integral',
            sks: 8,
            category: 'Teori Matematika',
            description: 'Limit, turunan, integral, dan deret takhingga.',
          },
          {
            code: 'MAT103',
            name: 'Aljabar Linear Elementer',
            sks: 4,
            category: 'Teori Matematika',
            description: 'Ruang vektor, matriks, dan nilai eigen.',
          },
          {
            code: 'MAT104',
            name: 'Algoritma & Pemrograman Python',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Logika algoritma komputasi dan struktur kontrol.',
          },
        ],
      },
      {
        year: 2,
        title: 'Tahun 2 · Struktur Aljabar & Analisis',
        focusSummary: 'Mempelajari grup abstrak, bilangan real, dan diferensial.',
        courses: [
          {
            code: 'MAT201',
            name: 'Analisis Real I & II',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Pembuktian ketat sifat barisan dan fungsi.',
          },
          {
            code: 'MAT202',
            name: 'Struktur Aljabar (Teori Grup)',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Struktur grup dan gelanggang untuk kriptografi.',
          },
          {
            code: 'MAT203',
            name: 'Persamaan Diferensial Biasa & Parsial',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Pemodelan laju perubahan dan sistem dinamik.',
          },
          {
            code: 'MAT204',
            name: 'Matematika Diskrit & Teori Graf',
            sks: 3,
            category: 'Teori Matematika',
            description: 'Kombinatorika dan optimasi jaringan rute.',
          },
        ],
      },
      {
        year: 3,
        title: 'Tahun 3 · Komputasi & Optimasi',
        focusSummary: 'Simulasi numerik komputer dan optimasi riset operasi.',
        courses: [
          {
            code: 'MAT301',
            name: 'Metode Numerik & Komputasi Ilmiah',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Solusi persamaan kompleks dengan simulasi komputer.',
          },
          {
            code: 'MAT302',
            name: 'Riset Operasi & Optimasi',
            sks: 4,
            category: 'Finansial & Industri',
            description: 'Optimasi rantai pasok, logistik, dan antrean.',
          },
          {
            code: 'MAT303',
            name: 'Fungsi Variabel Kompleks',
            sks: 3,
            category: 'Teori Matematika',
            description: 'Kalkulus bilangan imajiner dan integral kontur.',
          },
          {
            code: 'MAT304',
            name: 'Pemodelan Matematika Terapan',
            sks: 4,
            category: 'Teori Matematika',
            description: 'Simulasi epidemiologi, iklim, dan dinamika populasi.',
          },
        ],
      },
      {
        year: 4,
        title: 'Tahun 4 · Kriptografi & Tugas Akhir',
        focusSummary: 'Spesialisasi keamanan siber, finansial stokastik, dan riset.',
        courses: [
          {
            code: 'MAT401',
            name: 'Teori Koding & Kriptografi Modern',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Algoritma enkripsi RSA, kurva eliptik, blockchain.',
          },
          {
            code: 'MAT402',
            name: 'Matematika Finansial & Stokastik',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Model harga saham dan derivatif Black-Scholes.',
          },
          {
            code: 'MAT403',
            name: 'Sains Komputasi Lanjut',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Komputasi paralel untuk simulasi skala besar.',
          },
          {
            code: 'MAT404',
            name: 'Tugas Akhir / Skripsi Matematika',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Riset mandiri aljabar, analisis, atau terapan.',
          },
        ],
      },
    ],
    careers: [
      {
        role: 'Quantitative Researcher (Quant)',
        industry: 'Investment Bank & Sekuritas',
        entrySalaryRp: 'Rp 12 – 22 Jt',
        seniorSalaryRp: 'Rp 45 – 95+ Jt',
        demandGrowth2030: '+28%',
        coreSkill: 'Kalkulus Stokastik & Algoritma Pasar',
      },
      {
        role: 'Cryptographer & Cyber Mathematician',
        industry: 'Keamanan Siber & Perbankan',
        entrySalaryRp: 'Rp 11 – 18 Jt',
        seniorSalaryRp: 'Rp 35 – 75 Jt',
        demandGrowth2030: '+35%',
        coreSkill: 'Aljabar Abstrak & Enkripsi Data',
      },
      {
        role: 'Operations Research Analyst',
        industry: 'Logistik, Penerbangan & E-Commerce',
        entrySalaryRp: 'Rp 9 – 15 Jt',
        seniorSalaryRp: 'Rp 28 – 55 Jt',
        demandGrowth2030: '+24%',
        coreSkill: 'Optimasi Rute & Rantai Pasok',
      },
      {
        role: 'Peneliti Komputasi / Akademisi',
        industry: 'Universitas, BRIN & Riset Global',
        entrySalaryRp: 'Rp 8 – 13 Jt',
        seniorSalaryRp: 'Rp 22 – 45 Jt',
        demandGrowth2030: '+18%',
        coreSkill: 'Pemodelan Sistem & Publikasi Ilmiah',
      },
    ],
    teacherTalkingPoints: [
      'Bukan prodi keguruan (FKIP), melainkan ilmuwan pemodel sistem.',
      'Fondasi paling fleksibel untuk beralih ke AI atau Finansial.',
      'Kuota PTN besar dengan keketatan paling rasional (6%–13%).',
    ],
  },
  {
    id: 'aktuaria',
    name: 'Ilmu Aktuaria',
    shortName: 'Aktuaria',
    degreeTitle: 'Sarjana Aktuaria (S.Aktr.)',
    accentColor: 'emerald',
    accentHex: '#10B981',
    tagline: 'Matematika Risiko, Asuransi & Dana Pensiun',
    generalOverview: 'Menghitung harga risiko masa depan, premi asuransi, dan dana pensiun.',
    coreObjectOfStudy: 'Peluang Risiko, Tabel Mortalita & Matematika Finansial',
    keyDifferentiator: 'Jalur lisensi profesi resmi PAI (ASAI / FSAI)',
    idealStudentTraits: [
      'Unggul di materi peluang dan deret hitung',
      'Minat tinggi pada dunia investasi dan keuangan',
      'Mengejar sertifikasi profesi bergaji tinggi yang jelas',
    ],
    specialRequirements: {
      utbkAvgRange: [685, 755],
      minMathReasoning: 715,
      minQuantitative: 700,
      snbpSupportingSubjects: ['Matematika Lanjut', 'Matematika Wajib', 'Ekonomi'],
      physicalAndHealthNotes: 'Bebas syarat buta warna di seluruh PTN',
      certificationOrSpecialTest: 'Penyetaraan otomatis 5–7 modul ujian profesi PAI',
      codingIntensity: 50,
      mathAbstraction: 75,
      businessFinanceFocus: 96,
      dataEngineeringFocus: 55,
    },
    competencyBreakdown: {
      pureMath: 25,
      statisticsProb: 35,
      computationCoding: 15,
      domainBusiness: 25,
    },
    curriculumByYear: [
      {
        year: 1,
        title: 'Tahun 1 · Matematika Finansial & Ekonomi',
        focusSummary: 'Penyetaraan modul ujian PAI A10 (Finansial) dan A30 (Ekonomi).',
        courses: [
          {
            code: 'AKT101',
            name: 'Matematika Finansial (Setara PAI A10)',
            sks: 4,
            category: 'Finansial & Industri',
            description: 'Bunga majemuk, anuitas, obligasi, dan amortisasi.',
          },
          {
            code: 'AKT102',
            name: 'Ekonomi Mikro & Makro (Setara PAI A30)',
            sks: 4,
            category: 'Finansial & Industri',
            description: 'Mekanisme pasar, inflasi, dan kebijakan moneter.',
          },
          {
            code: 'AKT103',
            name: 'Kalkulus & Aljabar Linear Aktuaria',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Integral lipat dan matriks transisi peluang.',
          },
          {
            code: 'AKT104',
            name: 'Akuntansi Kontrak Asuransi (PSAK 117)',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Membaca neraca keuangan dan cadangan asuransi.',
          },
        ],
      },
      {
        year: 2,
        title: 'Tahun 2 · Peluang & Kontingensi Jiwa',
        focusSummary: 'Penyetaraan modul PAI A20 (Peluang) dan A60 (Matematika Aktuaria).',
        courses: [
          {
            code: 'AKT201',
            name: 'Peluang & Statistika (Setara PAI A20)',
            sks: 6,
            category: 'Statistika & Peluang',
            description: 'Distribusi peluang klaim dan inferensi parameter.',
          },
          {
            code: 'AKT202',
            name: 'Kontingensi Jiwa I (Setara PAI A60)',
            sks: 4,
            category: 'Finansial & Industri',
            description: 'Tabel mortalita, peluang hidup, dan premi jiwa.',
          },
          {
            code: 'AKT203',
            name: 'Investasi & Pasar Modal (Setara PAI A40)',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Portofolio saham, derivatif, dan manajemen aset.',
          },
          {
            code: 'AKT204',
            name: 'Komputasi Aktuaria (R, Python & VBA)',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Simulasi Monte Carlo untuk proyeksi klaim.',
          },
        ],
      },
      {
        year: 3,
        title: 'Tahun 3 · Model Risiko & Dana Pensiun',
        focusSummary: 'Penyetaraan modul PAI A50 (Statistika) dan A70 (Teori Risiko).',
        courses: [
          {
            code: 'AKT301',
            name: 'Pemodelan Risiko Aktuaria (Setara PAI A70)',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Frekuensi dan keparahan klaim asuransi umum.',
          },
          {
            code: 'AKT302',
            name: 'Ekonometrika Aktuaria (Setara PAI A50)',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Regresi GLM dan deret waktu finansial.',
          },
          {
            code: 'AKT303',
            name: 'Valuasi Dana Pensiun & Pesangon',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Perhitungan dana pensiun dan imbalan kerja.',
          },
          {
            code: 'AKT304',
            name: 'Proses Stokastik & Rantai Markov',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Pemodelan transisi risiko kesehatan multi-status.',
          },
        ],
      },
      {
        year: 4,
        title: 'Tahun 4 · Manajemen Risiko & Magang',
        focusSummary: 'Solvabilitas korporat, analitik prediktif, dan magang industri.',
        courses: [
          {
            code: 'AKT401',
            name: 'Enterprise Risk Management (ERM)',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Manajemen modal berbasis risiko (RBC) dan stres-tes.',
          },
          {
            code: 'AKT402',
            name: 'Machine Learning dalam Asuransi',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Penentuan tarif premi dinamis berbasis AI.',
          },
          {
            code: 'AKT403',
            name: 'Asuransi Kesehatan & Reasuransi',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Mitigasi risiko klaim medis dan bencana.',
          },
          {
            code: 'AKT404',
            name: 'Magang Industri & Tugas Akhir',
            sks: 6,
            category: 'Finansial & Industri',
            description: 'Praktik kerja di perusahaan asuransi atau OJK.',
          },
        ],
      },
    ],
    careers: [
      {
        role: 'Appointed Actuary (FSAI / ASAI)',
        industry: 'Asuransi Jiwa, Umum & Reasuransi',
        entrySalaryRp: 'Rp 10 – 18 Jt',
        seniorSalaryRp: 'Rp 50 – 120+ Jt',
        demandGrowth2030: '+32%',
        coreSkill: 'Lisensi Profesi PAI & Valuasi Klaim',
      },
      {
        role: 'Enterprise & Credit Risk Manager',
        industry: 'Perbankan Besar & Fintech',
        entrySalaryRp: 'Rp 10 – 16 Jt',
        seniorSalaryRp: 'Rp 35 – 75 Jt',
        demandGrowth2030: '+29%',
        coreSkill: 'Pemodelan Risiko Kredit & Stress Test',
      },
      {
        role: 'Konsultan Aktuaria & Dana Pensiun',
        industry: 'Big 4 Advisory & Konsultan Global',
        entrySalaryRp: 'Rp 11 – 17 Jt',
        seniorSalaryRp: 'Rp 40 – 85 Jt',
        demandGrowth2030: '+26%',
        coreSkill: 'Valuasi Imbalan Kerja & Korporat',
      },
      {
        role: 'Pengawas Risiko Keuangan Negara',
        industry: 'OJK, Bank Indonesia & Kemenkeu',
        entrySalaryRp: 'Rp 12 – 19 Jt',
        seniorSalaryRp: 'Rp 30 – 65 Jt',
        demandGrowth2030: '+22%',
        coreSkill: 'Audit Solvabilitas & Stabilitas Sistem',
      },
    ],
    teacherTalkingPoints: [
      'Mandat OJK mewajibkan setiap asuransi memiliki Aktuaris FSAI.',
      'Lulus mata kuliah PTN langsung setara ujian profesi PAI.',
      'Persaingan UTBK ketat, butuh Penalaran Matematika > 715.',
    ],
  },
  {
    id: 'statistika',
    name: 'Statistika',
    shortName: 'Statistika',
    degreeTitle: 'Sarjana Statistika (S.Stat.)',
    accentColor: 'cyan',
    accentHex: '#06B6D4',
    tagline: 'Inferensi Kausal, Survei & Keputusan Berbasis Bukti',
    generalOverview: 'Merancang eksperimen bebas bias dan menarik kesimpulan populasi yang sahih.',
    coreObjectOfStudy: 'Sampling, Rancangan Percobaan, Ekonometrika & Biostatistika',
    keyDifferentiator: 'Membuktikan hubungan sebab-akibat ilmiah dari sampel data',
    idealStudentTraits: [
      'Kritis membaca grafik survei dan klaim data',
      'Suka menerapkan matematika pada ekonomi dan medis',
      'Senang mengubah angka menjadi rekomendasi kebijakan',
    ],
    specialRequirements: {
      utbkAvgRange: [665, 735],
      minMathReasoning: 690,
      minQuantitative: 680,
      snbpSupportingSubjects: ['Matematika Lanjut', 'Matematika Wajib', 'Ekonomi / Fisika'],
      physicalAndHealthNotes: 'Tidak mensyaratkan bebas buta warna ketat',
      certificationOrSpecialTest: 'Kuat dengan keahlian R, Python, dan analisis survei',
      codingIntensity: 68,
      mathAbstraction: 78,
      businessFinanceFocus: 80,
      dataEngineeringFocus: 72,
    },
    competencyBreakdown: {
      pureMath: 25,
      statisticsProb: 45,
      computationCoding: 20,
      domainBusiness: 10,
    },
    curriculumByYear: [
      {
        year: 1,
        title: 'Tahun 1 · Eksplorasi Data & Peluang',
        focusSummary: 'Membaca distribusi data, teori peluang, dan komputasi R/Python.',
        courses: [
          {
            code: 'STA101',
            name: 'Metode Statistika I & II',
            sks: 6,
            category: 'Statistika & Peluang',
            description: 'Distribusi sampling, selang kepercayaan, uji hipotesis.',
          },
          {
            code: 'STA102',
            name: 'Pengantar Teori Peluang',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Teorema Bayes dan distribusi peluang kontinu.',
          },
          {
            code: 'STA103',
            name: 'Kalkulus & Aljabar Matriks',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Dekomposisi matriks untuk pemodelan regresi linear.',
          },
          {
            code: 'STA104',
            name: 'Komputasi Statistika (R & Python)',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Olah data dan visualisasi grafik statistik.',
          },
        ],
      },
      {
        year: 2,
        title: 'Tahun 2 · Regresi, Sampling & Eksperimen',
        focusSummary: 'Merancang survei nasional dan eksperimen uji produk (A/B test).',
        courses: [
          {
            code: 'STA201',
            name: 'Analisis Regresi Terapan',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Pemodelan hubungan prediktor dan diagnostik galat.',
          },
          {
            code: 'STA202',
            name: 'Teknik Sampling & Survei',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Metode pengambilan sampel survei dan sensus.',
          },
          {
            code: 'STA203',
            name: 'Rancangan Percobaan (A/B Testing)',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Uji ANOVA untuk eksperimen laboratorium/digital.',
          },
          {
            code: 'STA204',
            name: 'Statistika Matematika I & II',
            sks: 6,
            category: 'Teori Matematika',
            description: 'Teori estimasi Maximum Likelihood (MLE).',
          },
        ],
      },
      {
        year: 3,
        title: 'Tahun 3 · Multivariat & Deret Waktu',
        focusSummary: 'Peramalan tren ekonomi/cuaca dan pengendalian mutu industri.',
        courses: [
          {
            code: 'STA301',
            name: 'Analisis Peubah Ganda (Multivariat)',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Reduksi dimensi PCA, klaster, dan faktor.',
          },
          {
            code: 'STA302',
            name: 'Analisis Deret Waktu (Forecasting)',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Peramalan ekonomi dan saham dengan ARIMA/GARCH.',
          },
          {
            code: 'STA303',
            name: 'Pengendalian Kualitas (Six Sigma)',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Peta kendali mutu produksi industri manufaktur.',
          },
          {
            code: 'STA304',
            name: 'Statistika Bayesian & Komputasi',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Pembaruan peluang berbasis bukti baru (MCMC).',
          },
        ],
      },
      {
        year: 4,
        title: 'Tahun 4 · Biostatistika & Konsultasi',
        focusSummary: 'Uji klinis kesehatan, pembelajaran mesin statistik, dan proyek klien.',
        courses: [
          {
            code: 'STA401',
            name: 'Biostatistika & Uji Klinis Medis',
            sks: 3,
            category: 'Statistika & Peluang',
            description: 'Uji efikasi vaksin, obat, dan kesintasan.',
          },
          {
            code: 'STA402',
            name: 'Statistical Machine Learning',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Algoritma Random Forest, SVM, dan regularisasi.',
          },
          {
            code: 'STA403',
            name: 'Ekonometrika Spasial & Makro',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Pemodelan data wilayah dan indikator inflasi.',
          },
          {
            code: 'STA404',
            name: 'Konsultasi Statistika & Tugas Akhir',
            sks: 6,
            category: 'Finansial & Industri',
            description: 'Penyelesaian kasus data nyata bersama industri.',
          },
        ],
      },
    ],
    careers: [
      {
        role: 'Decision Scientist & Market Researcher',
        industry: 'Tech Unicorn, FMCG & E-Commerce',
        entrySalaryRp: 'Rp 9 – 16 Jt',
        seniorSalaryRp: 'Rp 30 – 65 Jt',
        demandGrowth2030: '+27%',
        coreSkill: 'A/B Testing & Inferensi Kausal',
      },
      {
        role: 'Biostatistician & Clinical Analyst',
        industry: 'Farmasi Global & Riset Medis',
        entrySalaryRp: 'Rp 10 – 17 Jt',
        seniorSalaryRp: 'Rp 32 – 70 Jt',
        demandGrowth2030: '+30%',
        coreSkill: 'Desain Uji Klinis & Analisis Survival',
      },
      {
        role: 'Statistisi Ahli & Analis Kebijakan',
        industry: 'BPS, Bank Indonesia & Kementerian',
        entrySalaryRp: 'Rp 9 – 15 Jt',
        seniorSalaryRp: 'Rp 25 – 55 Jt',
        demandGrowth2030: '+22%',
        coreSkill: 'Metodologi Sensus & Ekonometrika Makro',
      },
      {
        role: 'Quality Assurance & Six Sigma Lead',
        industry: 'Otomotif, Energi & Manufaktur',
        entrySalaryRp: 'Rp 9 – 14 Jt',
        seniorSalaryRp: 'Rp 28 – 60 Jt',
        demandGrowth2030: '+20%',
        coreSkill: 'Kontrol Kualitas Statistik & Reliabilitas',
      },
    ],
    teacherTalkingPoints: [
      'Unggul di metodologi survei, uji klinis, dan kausalitas.',
      'IPB dan UGM adalah pelopor Statistika tertua di Indonesia.',
      'Lulusannya fleksibel masuk ke posisi Data Scientist.',
    ],
  },
  {
    id: 'sains-data',
    name: 'Sains Data',
    shortName: 'Sains Data',
    degreeTitle: 'Sarjana Sains Data (S.Si.D.)',
    accentColor: 'amber',
    accentHex: '#F59E0B',
    tagline: 'Rekayasa Big Data, Pipeline & Analitik Prediktif',
    generalOverview: 'Mengolah jutaan baris data menjadi sistem rekomendasi dan prediksi otomatis.',
    coreObjectOfStudy: 'Big Data, Machine Learning, SQL/Cloud & Visualisasi',
    keyDifferentiator: 'Menggabungkan statistika dengan rekayasa software data besar',
    idealStudentTraits: [
      'Suka gabungan analisis matematika dan koding database',
      'Penasaran cara kerja algoritma rekomendasi digital',
      'Senang mengubah data mentah menjadi produk bisnis',
    ],
    specialRequirements: {
      utbkAvgRange: [680, 745],
      minMathReasoning: 700,
      minQuantitative: 695,
      snbpSupportingSubjects: ['Matematika Lanjut', 'Informatika / TIK', 'Matematika Wajib'],
      physicalAndHealthNotes: 'Umumnya tidak mensyaratkan bebas buta warna total',
      certificationOrSpecialTest: 'Portofolio proyek Python, SQL, dan dashboard data',
      codingIntensity: 88,
      mathAbstraction: 70,
      businessFinanceFocus: 82,
      dataEngineeringFocus: 96,
    },
    competencyBreakdown: {
      pureMath: 20,
      statisticsProb: 30,
      computationCoding: 35,
      domainBusiness: 15,
    },
    curriculumByYear: [
      {
        year: 1,
        title: 'Tahun 1 · Pemrograman Python & Aljabar',
        focusSummary: 'Menguasai struktur data koding, matriks, dan probabilitas dasar.',
        courses: [
          {
            code: 'DSD101',
            name: 'Pengantar Sains Data & Etika',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Siklus hidup pengolahan data dan privasi.',
          },
          {
            code: 'DSD102',
            name: 'Algoritma & Struktur Data Python',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Efisiensi algoritma, pohon pencarian, dan graf.',
          },
          {
            code: 'DSD103',
            name: 'Aljabar Linear Komputasional',
            sks: 4,
            category: 'Teori Matematika',
            description: 'Operasi matriks dan vektor berdimensi tinggi.',
          },
          {
            code: 'DSD104',
            name: 'Probabilitas & Statistika Inferensial',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Estimasi parameter dan pengujian hipotesis data.',
          },
        ],
      },
      {
        year: 2,
        title: 'Tahun 2 · Basis Data & Machine Learning',
        focusSummary: 'Mengelola database SQL/NoSQL dan melatih model prediksi.',
        courses: [
          {
            code: 'DSD201',
            name: 'Basis Data Relasional (SQL) & NoSQL',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Arsitektur gudang data dan kueri cepat.',
          },
          {
            code: 'DSD202',
            name: 'Pembelajaran Mesin (Machine Learning)',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Klasifikasi, klastering, dan algoritma XGBoost.',
          },
          {
            code: 'DSD203',
            name: 'Visualisasi Data & Storytelling',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Perancangan dashboard eksekutif yang interaktif.',
          },
          {
            code: 'DSD204',
            name: 'Pemodelan Deret Waktu Prediktif',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Peramalan permintaan ritel dan deteksi anomali.',
          },
        ],
      },
      {
        year: 3,
        title: 'Tahun 3 · Infrastruktur Big Data & Teks',
        focusSummary: 'Komputasi terdistribusi Cloud/Spark dan sistem rekomendasi.',
        courses: [
          {
            code: 'DSD301',
            name: 'Komputasi Big Data (Apache Spark)',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Pemrosesan paralel data bervolume jutaan baris.',
          },
          {
            code: 'DSD302',
            name: 'Penambangan Teks & Analisis Sentimen',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Ekstraksi opini publik dari media sosial.',
          },
          {
            code: 'DSD303',
            name: 'Sistem Rekomendasi Digital',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Algoritma personalisasi e-commerce dan streaming.',
          },
          {
            code: 'DSD304',
            name: 'Business Intelligence & Analitik Produk',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Analisis retensi pengguna dan konversi bisnis.',
          },
        ],
      },
      {
        year: 4,
        title: 'Tahun 4 · MLOps & Capstone Industri',
        focusSummary: 'Deployment model ke server produksi dan proyek mitra industri.',
        courses: [
          {
            code: 'DSD401',
            name: 'Deployment Model & MLOps Cloud',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Integrasi model prediksi ke aplikasi produksi.',
          },
          {
            code: 'DSD402',
            name: 'Deep Learning untuk Sains Data',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Jaringan saraf tiruan untuk data multimodal.',
          },
          {
            code: 'DSD403',
            name: 'Rekayasa Pipeline Data Real-Time',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Arsitektur streaming data transaksi langsung.',
          },
          {
            code: 'DSD404',
            name: 'Capstone Project & Tugas Akhir',
            sks: 6,
            category: 'Finansial & Industri',
            description: 'Solusi sains data bersama korporasi mitra.',
          },
        ],
      },
    ],
    careers: [
      {
        role: 'Data Scientist',
        industry: 'Tech Unicorn, Bank Digital & Telko',
        entrySalaryRp: 'Rp 12 – 22 Jt',
        seniorSalaryRp: 'Rp 40 – 90+ Jt',
        demandGrowth2030: '+38%',
        coreSkill: 'Machine Learning, Python & Eksperimen',
      },
      {
        role: 'Data Engineer & Big Data Architect',
        industry: 'Cloud Provider, Fintech & Korporasi',
        entrySalaryRp: 'Rp 12 – 20 Jt',
        seniorSalaryRp: 'Rp 38 – 85 Jt',
        demandGrowth2030: '+40%',
        coreSkill: 'Apache Spark, Data Warehouse & ETL',
      },
      {
        role: 'Business Intelligence Engineer',
        industry: 'Ritel Modern, FMCG & Logistik',
        entrySalaryRp: 'Rp 9 – 16 Jt',
        seniorSalaryRp: 'Rp 28 – 60 Jt',
        demandGrowth2030: '+31%',
        coreSkill: 'SQL Lanjut, Dashboard & Strategi KPI',
      },
      {
        role: 'Fraud & Risk Data Scientist',
        industry: 'Payment Gateway & Asuransi Digital',
        entrySalaryRp: 'Rp 11 – 19 Jt',
        seniorSalaryRp: 'Rp 35 – 75 Jt',
        demandGrowth2030: '+34%',
        coreSkill: 'Deteksi Anomali Transaksi Real-Time',
      },
    ],
    teacherTalkingPoints: [
      'Jembatan resmi antara Statistika FMIPA dan Ilmu Komputer.',
      'Tersedia sebagai prodi mandiri di ITS, UNAIR, IPB, UB, UNS.',
      'Kuota masih terbatas sehingga rasio keketatan sangat tinggi (<5%).',
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    shortName: 'Kecerdasan Artifisial',
    degreeTitle: 'Sarjana Kecerdasan Artifisial (S.Kom./S.Si.)',
    accentColor: 'rose',
    accentHex: '#F43F5E',
    tagline: 'Deep Learning, Visi Komputer & Sistem Otonom',
    generalOverview: 'Merancang otak algoritma mesin cerdas, model bahasa (LLM), dan robotika.',
    coreObjectOfStudy: 'Jaringan Saraf Tiruan, NLP/LLM, Visi Komputer & Robotika',
    keyDifferentiator: 'Menciptakan arsitektur algoritma cerdas dan agen otonom',
    idealStudentTraits: [
      'Ingin menjadi pencipta algoritma AI, bukan sekadar pengguna',
      'Sangat kuat di matriks, kalkulus, dan koding',
      'Antusias dengan robotika, visi komputer, dan LLM',
    ],
    specialRequirements: {
      utbkAvgRange: [695, 765],
      minMathReasoning: 720,
      minQuantitative: 710,
      snbpSupportingSubjects: ['Matematika Lanjut', 'Informatika / Fisika', 'Matematika Wajib'],
      physicalAndHealthNotes: 'Jalur robotika mensyaratkan bebas buta warna',
      certificationOrSpecialTest: 'Unggul dengan portofolio koding dan olimpiade informatika',
      codingIntensity: 96,
      mathAbstraction: 85,
      businessFinanceFocus: 60,
      dataEngineeringFocus: 88,
    },
    competencyBreakdown: {
      pureMath: 25,
      statisticsProb: 20,
      computationCoding: 45,
      domainBusiness: 10,
    },
    curriculumByYear: [
      {
        year: 1,
        title: 'Tahun 1 · Matematika Tensor & Algoritma',
        focusSummary: 'Menguasai aljabar tensor, logika simbolik, dan algoritma C++/Python.',
        courses: [
          {
            code: 'KAI101',
            name: 'Matematika untuk Kecerdasan Artifisial',
            sks: 4,
            category: 'Teori Matematika',
            description: 'Aljabar tensor, kalkulus matriks, dan teori informasi.',
          },
          {
            code: 'KAI102',
            name: 'Struktur Data & Desain Algoritma',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Pencarian heuristik A*, graf, dan pemrograman dinamis.',
          },
          {
            code: 'KAI103',
            name: 'Logika Komputasional & Sistem Pakar',
            sks: 3,
            category: 'Teori Matematika',
            description: 'Penalaran simbolik dan representasi pengetahuan mesin.',
          },
          {
            code: 'KAI104',
            name: 'Probabilitas & Proses Stokastik AI',
            sks: 4,
            category: 'Statistika & Peluang',
            description: 'Jaringan Bayesian dan proses keputusan Markov.',
          },
        ],
      },
      {
        year: 2,
        title: 'Tahun 2 · Machine Learning & Deep Learning',
        focusSummary: 'Membangun dan mengoptimalkan jaringan saraf tiruan pada GPU.',
        courses: [
          {
            code: 'KAI201',
            name: 'Pembelajaran Mesin Fundamental',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Teori pembelajaran statistik dan metode kernel.',
          },
          {
            code: 'KAI202',
            name: 'Jaringan Saraf Tiruan & Deep Learning',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Arsitektur CNN, RNN, Attention, dan backpropagation.',
          },
          {
            code: 'KAI203',
            name: 'Metode Optimasi Konveks & Non-Konveks',
            sks: 3,
            category: 'Teori Matematika',
            description: 'Optimasi gradien untuk jutaan parameter model.',
          },
          {
            code: 'KAI204',
            name: 'Komputasi Paralel & Akselerasi GPU',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Pemrograman paralel CUDA untuk pelatihan AI cepat.',
          },
        ],
      },
      {
        year: 3,
        title: 'Tahun 3 · Computer Vision, LLM & Robotika',
        focusSummary: 'Persepsi visual komputer, pemrosesan bahasa manusia, dan agen otonom.',
        courses: [
          {
            code: 'KAI301',
            name: 'Visi Komputer (Computer Vision)',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Deteksi objek real-time dan pengenalan citra.',
          },
          {
            code: 'KAI302',
            name: 'NLP & Large Language Models (LLM)',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Arsitektur Transformer, fine-tuning, dan sistem RAG.',
          },
          {
            code: 'KAI303',
            name: 'Reinforcement Learning & Robotika',
            sks: 4,
            category: 'Komputasi & AI',
            description: 'Algoritma agen otonom dan kendali robot.',
          },
          {
            code: 'KAI304',
            name: 'Keamanan & Etika AI (Trustworthy AI)',
            sks: 3,
            category: 'Finansial & Industri',
            description: 'Mitigasi bias algoritma dan keamanan model.',
          },
        ],
      },
      {
        year: 4,
        title: 'Tahun 4 · Generative AI & Riset Inovasi',
        focusSummary: 'Model difusi multimodal, Edge AI, dan tugas akhir riset.',
        courses: [
          {
            code: 'KAI401',
            name: 'Generative AI & Multimodal Models',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Sintesis citra, suara, dan teks cerdas.',
          },
          {
            code: 'KAI402',
            name: 'Edge AI & Internet of Intelligent Things',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Kompresi model AI pada chip perangkat bergerak.',
          },
          {
            code: 'KAI403',
            name: 'Sistem Otonom Industri',
            sks: 3,
            category: 'Komputasi & AI',
            description: 'Integrasi sensor cerdas untuk otomasi manufaktur.',
          },
          {
            code: 'KAI404',
            name: 'Tugas Akhir Riset Kecerdasan Artifisial',
            sks: 6,
            category: 'Komputasi & AI',
            description: 'Pengembangan arsitektur atau aplikasi AI inovatif.',
          },
        ],
      },
    ],
    careers: [
      {
        role: 'AI / Machine Learning Engineer',
        industry: 'Big Tech Global & Unicorn Digital',
        entrySalaryRp: 'Rp 14 – 25 Jt',
        seniorSalaryRp: 'Rp 45 – 110+ Jt',
        demandGrowth2030: '+45%',
        coreSkill: 'PyTorch, Deep Learning & LLM Systems',
      },
      {
        role: 'Computer Vision & Robotics Engineer',
        industry: 'Otomotif Otonom, MedTech & Pertahanan',
        entrySalaryRp: 'Rp 12 – 22 Jt',
        seniorSalaryRp: 'Rp 40 – 90 Jt',
        demandGrowth2030: '+39%',
        coreSkill: 'Deteksi Visual 3D & Kendali Otonom',
      },
      {
        role: 'NLP & Generative AI Architect',
        industry: 'Perbankan, Enterprise SaaS & Telko',
        entrySalaryRp: 'Rp 13 – 24 Jt',
        seniorSalaryRp: 'Rp 42 – 95 Jt',
        demandGrowth2030: '+42%',
        coreSkill: 'Arsitektur Transformer & Agen Cerdas',
      },
      {
        role: 'AI Research Scientist',
        industry: 'Laboratorium R&D Global & Nasional',
        entrySalaryRp: 'Rp 15 – 26 Jt',
        seniorSalaryRp: 'Rp 50 – 120+ Jt',
        demandGrowth2030: '+36%',
        coreSkill: 'Matematika Optimasi & Desain Model Baru',
      },
    ],
    teacherTalkingPoints: [
      'Bukan belajar cara pakai AI, tapi merancang algoritmanya.',
      'Dibuka resmi di UI, UGM, ITS, IPB, dan UNAIR.',
      'Alternatif cerdas: masuk Matematika/Statistika dengan peminatan AI.',
    ],
  },
];

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: 'era-1980',
    period: '1980 – 1995',
    title: 'Era Fondasi Analitik & Komputasi Awal',
    macroContext: 'Semua cabang masih menyatu di Departemen Matematika & Statistika Klasik.',
    keyBreakthrough: 'Metode Numerik FORTRAN & Survei Sensus Manual',
    teacherNarrative: 'Pada 1980-an, Aktuaria, Sains Data, dan AI belum menjadi jurusan terpisah.',
    snapshots: [
      {
        majorId: 'matematika',
        statusInIndonesia: 'Prodi Inti FMIPA',
        curriculumFocus: 'Analisis real, aljabar abstrak, dan diferensial.',
        computingTools: 'FORTRAN 77 & Pascal',
        researchFrontier: 'Teori graf dan persamaan gelombang klasik.',
        industryAdoption: 'Dosen, peneliti, dan perencanaan industri.',
        curriculumWeight: { theory: 75, appliedStats: 10, computation: 10, aiAndData: 5 },
        talentDemandIndex: 45,
      },
      {
        majorId: 'aktuaria',
        statusInIndonesia: 'Peminatan Matematika',
        curriculumFocus: 'Tabel mortalita dan bunga majemuk manual.',
        computingTools: 'Lotus 1-2-3 & Tabel Komutasi',
        researchFrontier: 'Standarisasi tabel mortalita asuransi nasional.',
        industryAdoption: 'Asuransi jiwa BUMN dan dana pensiun.',
        curriculumWeight: { theory: 50, appliedStats: 35, computation: 10, aiAndData: 5 },
        talentDemandIndex: 35,
      },
      {
        majorId: 'statistika',
        statusInIndonesia: 'Prodi Pelopor (IPB/UGM/ITS)',
        curriculumFocus: 'Rancangan percobaan pertanian dan survei sensus.',
        computingTools: 'Minitab DOS & SAS Mainframe',
        researchFrontier: 'Metodologi sensus penduduk dan pertanian.',
        industryAdoption: 'BPS, kementerian, dan kontrol mutu pabrik.',
        curriculumWeight: { theory: 45, appliedStats: 45, computation: 8, aiAndData: 2 },
        talentDemandIndex: 52,
      },
      {
        majorId: 'sains-data',
        statusInIndonesia: 'Embrio: Komputasi Statistik',
        curriculumFocus: 'Pengolahan data elektronik dan basis data.',
        computingTools: 'dBase III & SQL Awal',
        researchFrontier: 'Sistem basis data relasional (RDBMS) awal.',
        industryAdoption: 'Divisi pengolahan data perbankan.',
        curriculumWeight: { theory: 40, appliedStats: 35, computation: 20, aiAndData: 5 },
        talentDemandIndex: 20,
      },
      {
        majorId: 'ai',
        statusInIndonesia: 'Embrio: Logika Simbolik',
        curriculumFocus: 'Logika matematika, otomata, dan sistem pakar.',
        computingTools: 'Prolog, LISP & Bahasa C',
        researchFrontier: 'Algoritma pencarian catur dan logika fuzzy.',
        industryAdoption: 'Riset akademik dan otomasi pabrik dasar.',
        curriculumWeight: { theory: 60, appliedStats: 10, computation: 20, aiAndData: 10 },
        talentDemandIndex: 18,
      },
    ],
  },
  {
    id: 'era-1995',
    period: '1995 – 2010',
    title: 'Era Pemodelan Risiko & Data Warehousing',
    macroContext: 'Digitalisasi perbankan pasca-krisis memicu lonjakan kebutuhan analis risiko.',
    keyBreakthrough: 'Kalkulus Stokastik, Ekonometrika & Data Mining',
    teacherNarrative: 'Tahun 2000-an: bank dan telko menyerap lulusan FMIPA untuk analisis risiko.',
    snapshots: [
      {
        majorId: 'matematika',
        statusInIndonesia: 'Ekspansi Komputasi & Keuangan',
        curriculumFocus: 'Matematika keuangan, optimasi, dan simulasi numerik.',
        computingTools: 'MATLAB, Maple & C++',
        researchFrontier: 'Model epidemiologi wabah dan optimasi jaringan.',
        industryAdoption: 'Analis kuantitatif bank dan konsultan TI.',
        curriculumWeight: { theory: 60, appliedStats: 15, computation: 20, aiAndData: 5 },
        talentDemandIndex: 58,
      },
      {
        majorId: 'aktuaria',
        statusInIndonesia: 'Konsentrasi Khusus FMIPA',
        curriculumFocus: 'Kurikulum ujian PAI dan teori risiko.',
        computingTools: 'Excel VBA, R Awal & Prophet',
        researchFrontier: 'Model modal berbasis risiko (RBC) asuransi.',
        industryAdoption: 'Asuransi multinasional dan konsultan aktuaria.',
        curriculumWeight: { theory: 35, appliedStats: 40, computation: 15, aiAndData: 10 },
        talentDemandIndex: 64,
      },
      {
        majorId: 'statistika',
        statusInIndonesia: 'Hadir di Mayoritas PTN',
        curriculumFocus: 'Ekonometrika deret waktu dan Six Sigma.',
        computingTools: 'R, SPSS, SAS & EViews',
        researchFrontier: 'Volatilitas pasar modal dan biostatistika medis.',
        industryAdoption: 'Riset pasar FMCG dan credit scoring bank.',
        curriculumWeight: { theory: 30, appliedStats: 45, computation: 18, aiAndData: 7 },
        talentDemandIndex: 68,
      },
      {
        majorId: 'sains-data',
        statusInIndonesia: 'Era Data Mining & BI',
        curriculumFocus: 'Gudang data (Data Warehouse) dan pohon keputusan.',
        computingTools: 'SQL Server, Oracle & Weka',
        researchFrontier: 'Segmentasi pelanggan dan pola keranjang belanja.',
        industryAdoption: 'Business Intelligence telekomunikasi dan ritel.',
        curriculumWeight: { theory: 25, appliedStats: 35, computation: 30, aiAndData: 10 },
        talentDemandIndex: 48,
      },
      {
        majorId: 'ai',
        statusInIndonesia: 'Era Statistical Machine Learning',
        curriculumFocus: 'Support Vector Machine dan pengenalan pola.',
        computingTools: 'MATLAB Neural Net & Python Awal',
        researchFrontier: 'Pengenalan karakter optik (OCR) dan robotika.',
        industryAdoption: 'Pengolahan citra satelit dan otomasi.',
        curriculumWeight: { theory: 35, appliedStats: 25, computation: 25, aiAndData: 15 },
        talentDemandIndex: 42,
      },
    ],
  },
  {
    id: 'era-2010',
    period: '2010 – 2020',
    title: 'Era Big Data, S1 Aktuaria Mandiri & Deep Learning',
    macroContext: 'Ledakan startup unicorn dan mandat OJK melahirkan S1 Aktuaria & Sains Data.',
    keyBreakthrough: 'Cloud Big Data, Prodi Aktuaria Mandiri & GPU Deep Learning',
    teacherNarrative: 'Dekade 2010: S1 Aktuaria resmi dibuka di PTN utama; Data Scientist booming.',
    snapshots: [
      {
        majorId: 'matematika',
        statusInIndonesia: 'Penguatan Sains Komputasi',
        curriculumFocus: 'Kriptografi modern, stokastik, dan optimasi skala besar.',
        computingTools: 'Python (NumPy/SciPy), Julia & MATLAB',
        researchFrontier: 'Kriptografi pasca-kuantum dan dinamika fluida.',
        industryAdoption: 'Fintech, keamanan siber, dan e-commerce.',
        curriculumWeight: { theory: 50, appliedStats: 15, computation: 25, aiAndData: 10 },
        talentDemandIndex: 72,
      },
      {
        majorId: 'aktuaria',
        statusInIndonesia: 'Lahirnya S1 Aktuaria Mandiri',
        curriculumFocus: 'Penyetaraan 7 modul PAI (A10–A70) resmi.',
        computingTools: 'R, Python, Prophet & SQL',
        researchFrontier: 'Asuransi mikro, bencana, dan aktuaria syariah.',
        industryAdoption: 'Insurtech, OJK, BPJS, dan reasuransi.',
        curriculumWeight: { theory: 25, appliedStats: 38, computation: 20, aiAndData: 17 },
        talentDemandIndex: 88,
      },
      {
        majorId: 'statistika',
        statusInIndonesia: 'Modernisasi ke Statistical ML',
        curriculumFocus: 'Random Forest, Gradient Boosting, dan Bayesian.',
        computingTools: 'RStudio, Python Scikit-Learn & Tableau',
        researchFrontier: 'Statistika dimensi tinggi dan genomika.',
        industryAdoption: 'Unicorn teknologi, farmasi, dan bank sentral.',
        curriculumWeight: { theory: 25, appliedStats: 42, computation: 20, aiAndData: 13 },
        talentDemandIndex: 84,
      },
      {
        majorId: 'sains-data',
        statusInIndonesia: 'Pembukaan S1 Sains Data PTN',
        curriculumFocus: 'Pipeline Big Data, NLP, dan sistem rekomendasi.',
        computingTools: 'Python Pandas, Apache Spark & PostgreSQL',
        researchFrontier: 'Analitik streaming real-time dan deteksi fraud.',
        industryAdoption: 'Seluruh ekosistem ekonomi digital nasional.',
        curriculumWeight: { theory: 20, appliedStats: 30, computation: 30, aiAndData: 20 },
        talentDemandIndex: 92,
      },
      {
        majorId: 'ai',
        statusInIndonesia: 'Terobosan Deep Learning (CNN)',
        curriculumFocus: 'Visi komputer, pengenalan suara, dan reinforcement learning.',
        computingTools: 'PyTorch, TensorFlow & CUDA GPU',
        researchFrontier: 'Deteksi objek real-time dan terjemahan mesin.',
        industryAdoption: 'Verifikasi biometrik fintech dan otomasi cerdas.',
        curriculumWeight: { theory: 25, appliedStats: 20, computation: 30, aiAndData: 25 },
        talentDemandIndex: 89,
      },
    ],
  },
  {
    id: 'era-2020',
    period: '2020 – 2026+',
    title: 'Era Generative AI & Konvergensi Sains Data FMIPA',
    macroContext: 'PTN utama membuka S1 Kecerdasan Artifisial & Sains Data secara penuh.',
    keyBreakthrough: 'Large Language Models (LLM), MLOps & Aktuaria IFRS 17',
    teacherNarrative: 'Kini ke-5 jurusan bersinergi: Matematika-Statistika jadi fondasi utama ekosistem AI.',
    snapshots: [
      {
        majorId: 'matematika',
        statusInIndonesia: 'Fondasi Teori AI & Kuantum',
        curriculumFocus: 'Topologi data, kriptografi kuantum, dan matematika AI.',
        computingTools: 'Python JAX, Julia & Lean Prover',
        researchFrontier: 'Keamanan protokol AI dan optimasi energi hijau.',
        industryAdoption: 'Quant hedge fund, siber, dan R&D algoritma.',
        curriculumWeight: { theory: 45, appliedStats: 15, computation: 25, aiAndData: 15 },
        talentDemandIndex: 82,
      },
      {
        majorId: 'aktuaria',
        statusInIndonesia: 'Transformasi IFRS 17 & AI',
        curriculumFocus: 'Pemodelan stokastik PSAK 117 dan risiko iklim.',
        computingTools: 'Python, R, Prophet & Cloud Actuarial',
        researchFrontier: 'Asuransi perubahan iklim dan risiko siber.',
        industryAdoption: 'Asuransi global, Big 4 advisory, dan OJK.',
        curriculumWeight: { theory: 22, appliedStats: 35, computation: 23, aiAndData: 20 },
        talentDemandIndex: 94,
      },
      {
        majorId: 'statistika',
        statusInIndonesia: 'Pilar Causal AI & Biostatistika',
        curriculumFocus: 'Inferensi kausal, eksperimen adaptif, dan audit AI.',
        computingTools: 'R Tidymodels, Python PyMC & Cloud',
        researchFrontier: 'Pengobatan presisi genomik dan mitigasi bias AI.',
        industryAdoption: 'Tim eksperimen tech, bioteknologi, dan BI/BPS.',
        curriculumWeight: { theory: 22, appliedStats: 40, computation: 20, aiAndData: 18 },
        talentDemandIndex: 90,
      },
      {
        majorId: 'sains-data',
        statusInIndonesia: 'Arsitektur Data Real-Time',
        curriculumFocus: 'Data Lakehouse, MLOps otomatis, dan analitik multimodal.',
        computingTools: 'Spark, Kafka, Snowflake & Kubernetes',
        researchFrontier: 'Federated learning dan privasi data skala besar.',
        industryAdoption: 'Perbankan digital, e-commerce, dan Satu Data.',
        curriculumWeight: { theory: 18, appliedStats: 27, computation: 30, aiAndData: 25 },
        talentDemandIndex: 96,
      },
      {
        majorId: 'ai',
        statusInIndonesia: 'Prodi S1 Paling Kompetitif',
        curriculumFocus: 'Foundation Models (LLM), Visi 3D, dan Robotika Otonom.',
        computingTools: 'PyTorch, HuggingFace, CUDA & ROS2',
        researchFrontier: 'Agen penalaran otonom dan AI penemuan obat.',
        industryAdoption: 'Big Tech global, MedTech, dan industri pertahanan.',
        curriculumWeight: { theory: 22, appliedStats: 18, computation: 25, aiAndData: 35 },
        talentDemandIndex: 99,
      },
    ],
  },
];

export const UNIVERSITIES_PTN: UniversityPTN[] = [
  {
    id: 'ui',
    code: 'UI',
    name: 'Universitas Indonesia',
    city: 'Depok, Jawa Barat',
    facultyName: 'FMIPA & Fasilkom UI',
    departmentName: 'Departemen Matematika & Prodi Kecerdasan Artifisial',
    establishedYear: 1960,
    campusEnvironmentDesc: 'Kawasan hutan kota Depok tepi Danau Kenanga dengan akses KRL langsung.',
    departmentBuildingHighlight: 'Gedung Departemen Matematika FMIPA UI terintegrasi dengan Lab Aktuaria READI dan AI Center.',
    labFacilities: [
      'Lab Komputasi Matematika & Pemodelan',
      'Lab Aktuaria & Risiko Finansial (Mitra PAI)',
      'Tokopedia-UI AI Center of Excellence',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#1E1B4B',
      accent: '#FACC15',
      secondaryAccent: '#38BDF8',
      uniCode: 'UI',
      buildingName: 'FMIPA & Kompleks Sains Universitas Indonesia',
      city: 'Depok',
      styleType: 'rotunda',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FMIPA UI',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 24,
        peminat2025: 401,
        keketatan2025Percent: 5.99,
        snbpDayaTampung2026: 20,
        snbpPeminat2025: 258,
        passingGradeHistory: { year2022: 678, year2023: 686, year2024: 694, year2025: 702, projected2026: 706 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Ilmu Aktuaria',
        facultyDepartment: 'FMIPA UI',
        accreditation: 'Unggul · 7 Modul PAI',
        dayaTampung2026: 24,
        peminat2025: 685,
        keketatan2025Percent: 3.50,
        snbpDayaTampung2026: 20,
        snbpPeminat2025: 490,
        passingGradeHistory: { year2022: 718, year2023: 726, year2024: 735, year2025: 742, projected2026: 746 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FMIPA UI',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 24,
        peminat2025: 519,
        keketatan2025Percent: 4.62,
        snbpDayaTampung2026: 20,
        snbpPeminat2025: 382,
        passingGradeHistory: { year2022: 702, year2023: 709, year2024: 716, year2025: 724, projected2026: 728 },
      },
      {
        majorId: 'ai',
        programNameOfficial: 'S1 Kecerdasan Artifisial',
        facultyDepartment: 'Fasilkom UI',
        accreditation: 'Unggul · Internasional',
        dayaTampung2026: 18,
        peminat2025: 780,
        keketatan2025Percent: 2.31,
        snbpDayaTampung2026: 12,
        snbpPeminat2025: 510,
        passingGradeHistory: { year2022: 730, year2023: 738, year2024: 748, year2025: 755, projected2026: 760 },
      },
    ],
  },
  {
    id: 'itb',
    code: 'ITB',
    name: 'Institut Teknologi Bandung',
    city: 'Bandung, Jawa Barat',
    facultyName: 'FMIPA-Matematika (FMIPA-M)',
    departmentName: 'Kelompok Keilmuan Matematika, Aktuaria & Statistika',
    establishedYear: 1947,
    campusEnvironmentDesc: 'Kampus ikonik Jl. Ganesha Bandung dengan atmosfer riset sains dan rekayasa.',
    departmentBuildingHighlight: 'Gedung Center for Advanced Sciences (CAS) menjadi pusat riset pemodelan dan aktuaria.',
    labFacilities: [
      'Gedung Center for Advanced Sciences (CAS)',
      'Lab Matematika Industri & Keuangan',
      'Pusat Riset AI & Big Data ITB',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#0F2942',
      accent: '#38BDF8',
      secondaryAccent: '#818CF8',
      uniCode: 'ITB',
      buildingName: 'Center for Advanced Sciences (CAS) FMIPA ITB',
      city: 'Bandung',
      styleType: 'colonial-modern',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika (FMIPA-M)',
        facultyDepartment: 'FMIPA ITB',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 55,
        peminat2025: 742,
        keketatan2025Percent: 7.41,
        snbpDayaTampung2026: 50,
        snbpPeminat2025: 615,
        passingGradeHistory: { year2022: 695, year2023: 704, year2024: 712, year2025: 718, projected2026: 722 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Aktuaria (FMIPA-M)',
        facultyDepartment: 'FMIPA ITB',
        accreditation: 'Unggul · Mitra PAI',
        dayaTampung2026: 35,
        peminat2025: 890,
        keketatan2025Percent: 3.93,
        snbpDayaTampung2026: 30,
        snbpPeminat2025: 670,
        passingGradeHistory: { year2022: 724, year2023: 732, year2024: 740, year2025: 748, projected2026: 752 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'Jalur Statistika & Sains Data',
        facultyDepartment: 'FMIPA ITB',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 30,
        peminat2025: 620,
        keketatan2025Percent: 4.84,
        snbpDayaTampung2026: 25,
        snbpPeminat2025: 480,
        passingGradeHistory: { year2022: 705, year2023: 714, year2024: 721, year2025: 728, projected2026: 732 },
      },
    ],
  },
  {
    id: 'ugm',
    code: 'UGM',
    name: 'Universitas Gadjah Mada',
    city: 'Sleman, DI Yogyakarta',
    facultyName: 'FMIPA UGM',
    departmentName: 'Departemen Matematika & Departemen Ilmu Komputer/AI',
    establishedYear: 1955,
    campusEnvironmentDesc: 'Kawasan akademik Bulaksumur dan Sekip Utara Yogyakarta yang asri dan kolaboratif.',
    departmentBuildingHighlight: 'Satu fakultas FMIPA menaungi langsung Matematika, Statistika, Aktuaria, dan AI.',
    labFacilities: [
      'Lab Analisis, Aljabar & Matematika Terapan',
      'Lab Statistika & Komputasi Aktuaria',
      'Lab Sistem Cerdas & Algoritma FMIPA UGM',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#1E293B',
      accent: '#2DD4BF',
      secondaryAccent: '#F59E0B',
      uniCode: 'UGM',
      buildingName: 'FMIPA Sekip Utara Universitas Gadjah Mada',
      city: 'Yogyakarta',
      styleType: 'classical-columns',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FMIPA UGM',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 24,
        peminat2025: 348,
        keketatan2025Percent: 6.90,
        snbpDayaTampung2026: 24,
        snbpPeminat2025: 312,
        passingGradeHistory: { year2022: 675, year2023: 682, year2024: 690, year2025: 696, projected2026: 700 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Ilmu Aktuaria',
        facultyDepartment: 'FMIPA UGM',
        accreditation: 'Unggul · Mitra PAI',
        dayaTampung2026: 18,
        peminat2025: 590,
        keketatan2025Percent: 3.05,
        snbpDayaTampung2026: 15,
        snbpPeminat2025: 445,
        passingGradeHistory: { year2022: 712, year2023: 720, year2024: 729, year2025: 736, projected2026: 740 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FMIPA UGM',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 24,
        peminat2025: 545,
        keketatan2025Percent: 4.40,
        snbpDayaTampung2026: 18,
        snbpPeminat2025: 460,
        passingGradeHistory: { year2022: 698, year2023: 706, year2024: 715, year2025: 722, projected2026: 726 },
      },
      {
        majorId: 'ai',
        programNameOfficial: 'S1 Kecerdasan Artifisial / Ilkom',
        facultyDepartment: 'FMIPA UGM',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 27,
        peminat2025: 1237,
        keketatan2025Percent: 2.18,
        snbpDayaTampung2026: 24,
        snbpPeminat2025: 890,
        passingGradeHistory: { year2022: 722, year2023: 731, year2024: 740, year2025: 749, projected2026: 754 },
      },
    ],
  },
  {
    id: 'its',
    code: 'ITS',
    name: 'Institut Teknologi Sepuluh Nopember',
    city: 'Surabaya, Jawa Timur',
    facultyName: 'FSAD & FTIRS ITS',
    departmentName: 'Matematika, Statistika, Aktuaria, Sains Data & Rekayasa AI',
    establishedYear: 1965,
    campusEnvironmentDesc: 'Kampus teknologi Sukolilo Surabaya yang lengkap memiliki kelima jurusan secara mandiri.',
    departmentBuildingHighlight: 'Fakultas Sains dan Analitika Data (FSAD) ITS memiliki kuota Matematika terbesar (80 kursi).',
    labFacilities: [
      'Lab Matematika Komputasi & Sains Data FSAD',
      'Lab Pemodelan Aktuaria & Manajemen Risiko',
      'Lab Rekayasa Kecerdasan Artifisial & Robotika',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#0C2D48',
      accent: '#06B6D4',
      secondaryAccent: '#10B981',
      uniCode: 'ITS',
      buildingName: 'Fakultas Sains dan Analitika Data (FSAD) ITS',
      city: 'Surabaya',
      styleType: 'futuristic-tower',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FSAD ITS',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 80,
        peminat2025: 620,
        keketatan2025Percent: 12.90,
        snbpDayaTampung2026: 60,
        snbpPeminat2025: 410,
        passingGradeHistory: { year2022: 652, year2023: 658, year2024: 665, year2025: 672, projected2026: 676 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Sains Aktuaria',
        facultyDepartment: 'FSAD ITS',
        accreditation: 'Unggul · Mitra PAI',
        dayaTampung2026: 36,
        peminat2025: 485,
        keketatan2025Percent: 7.42,
        snbpDayaTampung2026: 24,
        snbpPeminat2025: 365,
        passingGradeHistory: { year2022: 682, year2023: 690, year2024: 698, year2025: 705, projected2026: 710 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FSAD ITS',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 60,
        peminat2025: 695,
        keketatan2025Percent: 8.63,
        snbpDayaTampung2026: 40,
        snbpPeminat2025: 512,
        passingGradeHistory: { year2022: 672, year2023: 679, year2024: 686, year2025: 692, projected2026: 696 },
      },
      {
        majorId: 'sains-data',
        programNameOfficial: 'S1 Sains Data',
        facultyDepartment: 'FSAD ITS',
        accreditation: 'Baik Sekali / Unggul',
        dayaTampung2026: 18,
        peminat2025: 540,
        keketatan2025Percent: 3.33,
        snbpDayaTampung2026: 12,
        snbpPeminat2025: 390,
        passingGradeHistory: { year2022: 688, year2023: 696, year2024: 708, year2025: 716, projected2026: 722 },
      },
      {
        majorId: 'ai',
        programNameOfficial: 'S1 Rekayasa Kecerdasan Artifisial',
        facultyDepartment: 'FTIRS ITS',
        accreditation: 'Unggul · IABEE',
        dayaTampung2026: 18,
        peminat2025: 630,
        keketatan2025Percent: 2.86,
        snbpDayaTampung2026: 12,
        snbpPeminat2025: 440,
        passingGradeHistory: { year2022: 694, year2023: 705, year2024: 718, year2025: 727, projected2026: 734 },
      },
    ],
  },
  {
    id: 'ipb',
    code: 'IPB',
    name: 'IPB University',
    city: 'Bogor, Jawa Barat',
    facultyName: 'Sekolah Sains Data, Matematika & Informatika (SSMI)',
    departmentName: 'Statistika, Matematika, Aktuaria & Kecerdasan Buatan',
    establishedYear: 1963,
    campusEnvironmentDesc: 'Kampus hijau Dramaga Bogor yang bertransformasi menjadi Sekolah Sains Data (SSMI).',
    departmentBuildingHighlight: 'Pelopor prodi Statistika pertama di Indonesia, kini lengkap dengan Sains Data & AI.',
    labFacilities: [
      'Lab Statistika & Sains Data SSMI IPB',
      'Lab Aktuaria & Pemodelan Risiko',
      'Lab Kecerdasan Buatan & Bioinformatika',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#064E3B',
      accent: '#10B981',
      secondaryAccent: '#38BDF8',
      uniCode: 'IPB',
      buildingName: 'Sekolah Sains Data, Matematika & Informatika (SSMI)',
      city: 'Bogor',
      styleType: 'botanical-atrium',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'SSMI IPB',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 45,
        peminat2025: 460,
        keketatan2025Percent: 9.78,
        snbpDayaTampung2026: 45,
        snbpPeminat2025: 395,
        passingGradeHistory: { year2022: 650, year2023: 658, year2024: 664, year2025: 670, projected2026: 674 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Aktuaria',
        facultyDepartment: 'SSMI IPB',
        accreditation: 'Unggul · Mitra PAI',
        dayaTampung2026: 39,
        peminat2025: 640,
        keketatan2025Percent: 6.09,
        snbpDayaTampung2026: 32,
        snbpPeminat2025: 520,
        passingGradeHistory: { year2022: 685, year2023: 693, year2024: 701, year2025: 708, projected2026: 713 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika dan Sains Data',
        facultyDepartment: 'SSMI IPB',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 48,
        peminat2025: 845,
        keketatan2025Percent: 5.68,
        snbpDayaTampung2026: 48,
        snbpPeminat2025: 792,
        passingGradeHistory: { year2022: 688, year2023: 695, year2024: 704, year2025: 712, projected2026: 716 },
      },
      {
        majorId: 'sains-data',
        programNameOfficial: 'Jalur Sains Data (SSMI)',
        facultyDepartment: 'SSMI IPB',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 29,
        peminat2025: 610,
        keketatan2025Percent: 4.75,
        snbpDayaTampung2026: 28,
        snbpPeminat2025: 540,
        passingGradeHistory: { year2022: 686, year2023: 694, year2024: 702, year2025: 710, projected2026: 715 },
      },
      {
        majorId: 'ai',
        programNameOfficial: 'S1 Kecerdasan Buatan',
        facultyDepartment: 'SSMI IPB',
        accreditation: 'Baik Sekali / Unggul',
        dayaTampung2026: 44,
        peminat2025: 790,
        keketatan2025Percent: 5.57,
        snbpDayaTampung2026: 28,
        snbpPeminat2025: 615,
        passingGradeHistory: { year2022: 684, year2023: 692, year2024: 701, year2025: 709, projected2026: 714 },
      },
    ],
  },
  {
    id: 'unair',
    code: 'UNAIR',
    name: 'Universitas Airlangga',
    city: 'Surabaya, Jawa Timur',
    facultyName: 'FST & FTMM UNAIR',
    departmentName: 'Matematika, Statistika, Teknologi Sains Data & Robotika AI',
    establishedYear: 1982,
    campusEnvironmentDesc: 'Kampus C Mulyorejo Surabaya dengan Gedung Nano FTMM yang berfokus pada teknologi masa depan.',
    departmentBuildingHighlight: 'Pelopor prodi S1 Teknologi Sains Data dan S1 Teknik Robotika & Kecerdasan Buatan.',
    labFacilities: [
      'Gedung Nano FTMM Kampus C UNAIR',
      'Lab Matematika & Biostatistika FST',
      'Lab Big Data & Robotika Kecerdasan Buatan',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#1E293B',
      accent: '#F59E0B',
      secondaryAccent: '#06B6D4',
      uniCode: 'UNAIR',
      buildingName: 'Kampus C Mulyorejo — FST & Gedung Nano FTMM UNAIR',
      city: 'Surabaya',
      styleType: 'futuristic-tower',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FST UNAIR',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 30,
        peminat2025: 340,
        keketatan2025Percent: 8.82,
        snbpDayaTampung2026: 30,
        snbpPeminat2025: 295,
        passingGradeHistory: { year2022: 642, year2023: 648, year2024: 655, year2025: 662, projected2026: 666 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FST UNAIR',
        accreditation: 'Unggul',
        dayaTampung2026: 36,
        peminat2025: 590,
        keketatan2025Percent: 6.10,
        snbpDayaTampung2026: 24,
        snbpPeminat2025: 475,
        passingGradeHistory: { year2022: 662, year2023: 670, year2024: 678, year2025: 685, projected2026: 690 },
      },
      {
        majorId: 'sains-data',
        programNameOfficial: 'S1 Teknologi Sains Data',
        facultyDepartment: 'FTMM UNAIR',
        accreditation: 'Baik Sekali / Unggul',
        dayaTampung2026: 36,
        peminat2025: 765,
        keketatan2025Percent: 4.71,
        snbpDayaTampung2026: 24,
        snbpPeminat2025: 580,
        passingGradeHistory: { year2022: 670, year2023: 680, year2024: 690, year2025: 698, projected2026: 704 },
      },
      {
        majorId: 'ai',
        programNameOfficial: 'S1 Teknik Robotika & AI',
        facultyDepartment: 'FTMM UNAIR',
        accreditation: 'Baik Sekali / Unggul',
        dayaTampung2026: 30,
        peminat2025: 640,
        keketatan2025Percent: 4.69,
        snbpDayaTampung2026: 20,
        snbpPeminat2025: 430,
        passingGradeHistory: { year2022: 668, year2023: 676, year2024: 686, year2025: 694, projected2026: 700 },
      },
    ],
  },
  {
    id: 'unpad',
    code: 'UNPAD',
    name: 'Universitas Padjadjaran',
    city: 'Jatinangor, Jawa Barat',
    facultyName: 'FMIPA UNPAD',
    departmentName: 'Departemen Matematika, Statistika & Ilmu Aktuaria',
    establishedYear: 1958,
    campusEnvironmentDesc: 'Kampus Jatinangor di kaki Gunung Manglayang dengan klaster gedung sains terpadu.',
    departmentBuildingHighlight: 'Departemen Statistika dan Aktuaria UNPAD memiliki jaringan alumni kuat di industri keuangan.',
    labFacilities: [
      'Lab Matematika Terapan & Komputasi',
      'Lab Ilmu Aktuaria & Pemodelan Risiko',
      'Lab Statistika Terapan & Ekonometrika',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#1E1B4B',
      accent: '#FBBF24',
      secondaryAccent: '#6366F1',
      uniCode: 'UNPAD',
      buildingName: 'Kompleks Sains FMIPA Jatinangor Universitas Padjadjaran',
      city: 'Jatinangor',
      styleType: 'botanical-atrium',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FMIPA UNPAD',
        accreditation: 'Unggul',
        dayaTampung2026: 36,
        peminat2025: 445,
        keketatan2025Percent: 8.09,
        snbpDayaTampung2026: 28,
        snbpPeminat2025: 380,
        passingGradeHistory: { year2022: 645, year2023: 652, year2024: 660, year2025: 666, projected2026: 670 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Ilmu Aktuaria',
        facultyDepartment: 'FMIPA UNPAD',
        accreditation: 'Unggul · Mitra PAI',
        dayaTampung2026: 20,
        peminat2025: 560,
        keketatan2025Percent: 3.57,
        snbpDayaTampung2026: 15,
        snbpPeminat2025: 440,
        passingGradeHistory: { year2022: 682, year2023: 690, year2024: 699, year2025: 707, projected2026: 712 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FMIPA UNPAD',
        accreditation: 'Unggul',
        dayaTampung2026: 36,
        peminat2025: 710,
        keketatan2025Percent: 5.07,
        snbpDayaTampung2026: 30,
        snbpPeminat2025: 620,
        passingGradeHistory: { year2022: 672, year2023: 680, year2024: 688, year2025: 695, projected2026: 700 },
      },
    ],
  },
  {
    id: 'ub',
    code: 'UB',
    name: 'Universitas Brawijaya',
    city: 'Malang, Jawa Timur',
    facultyName: 'FMIPA UB',
    departmentName: 'Matematika, Ilmu Aktuaria, Statistika & Sains Data',
    establishedYear: 1987,
    campusEnvironmentDesc: 'Kampus sejuk di pusat Kota Malang dengan Gedung MIPA Center berlantai 9.',
    departmentBuildingHighlight: 'FMIPA UB menaungi langsung 4 prodi: Matematika, Aktuaria, Statistika, dan Sains Data.',
    labFacilities: [
      'Gedung MIPA Center Universitas Brawijaya',
      'Lab Aktuaria & Analisis Finansial',
      'Lab Sains Data & Statistika Industri',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#172554',
      accent: '#60A5FA',
      secondaryAccent: '#F59E0B',
      uniCode: 'UB',
      buildingName: 'Gedung MIPA Center FMIPA Universitas Brawijaya',
      city: 'Malang',
      styleType: 'classical-columns',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FMIPA UB',
        accreditation: 'Unggul',
        dayaTampung2026: 60,
        peminat2025: 495,
        keketatan2025Percent: 12.12,
        snbpDayaTampung2026: 60,
        snbpPeminat2025: 420,
        passingGradeHistory: { year2022: 638, year2023: 645, year2024: 652, year2025: 658, projected2026: 662 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Ilmu Aktuaria',
        facultyDepartment: 'FMIPA UB',
        accreditation: 'Unggul · Mitra PAI',
        dayaTampung2026: 30,
        peminat2025: 520,
        keketatan2025Percent: 5.77,
        snbpDayaTampung2026: 30,
        snbpPeminat2025: 465,
        passingGradeHistory: { year2022: 668, year2023: 676, year2024: 684, year2025: 691, projected2026: 696 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FMIPA UB',
        accreditation: 'Unggul',
        dayaTampung2026: 66,
        peminat2025: 680,
        keketatan2025Percent: 9.71,
        snbpDayaTampung2026: 66,
        snbpPeminat2025: 590,
        passingGradeHistory: { year2022: 658, year2023: 665, year2024: 672, year2025: 679, projected2026: 684 },
      },
      {
        majorId: 'sains-data',
        programNameOfficial: 'S1 Sains Data',
        facultyDepartment: 'FMIPA UB',
        accreditation: 'Baik Sekali / Unggul',
        dayaTampung2026: 24,
        peminat2025: 490,
        keketatan2025Percent: 4.90,
        snbpDayaTampung2026: 20,
        snbpPeminat2025: 385,
        passingGradeHistory: { year2022: 664, year2023: 672, year2024: 682, year2025: 690, projected2026: 695 },
      },
    ],
  },
  {
    id: 'undip',
    code: 'UNDIP',
    name: 'Universitas Diponegoro',
    city: 'Semarang, Jawa Tengah',
    facultyName: 'Fakultas Sains dan Matematika (FSM)',
    departmentName: 'Departemen Matematika & Departemen Statistika',
    establishedYear: 1969,
    campusEnvironmentDesc: 'Kampus perbukitan Tembalang Semarang dengan Gedung Acintya Prasada yang modern.',
    departmentBuildingHighlight: 'Kuota penerimaan SNBT besar (69 Matematika, 63 Statistika) dengan serapan kerja cepat.',
    labFacilities: [
      'Gedung Acintya Prasada FSM UNDIP',
      'Lab Matematika Terapan & Kriptografi',
      'Lab Statistika Komputasi & Sains Data',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#1E293B',
      accent: '#38BDF8',
      secondaryAccent: '#10B981',
      uniCode: 'UNDIP',
      buildingName: 'Gedung Acintya Prasada FSM Universitas Diponegoro',
      city: 'Semarang',
      styleType: 'rotunda',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FSM UNDIP',
        accreditation: 'Unggul · ASIIN',
        dayaTampung2026: 69,
        peminat2025: 510,
        keketatan2025Percent: 13.53,
        snbpDayaTampung2026: 46,
        snbpPeminat2025: 415,
        passingGradeHistory: { year2022: 636, year2023: 642, year2024: 649, year2025: 655, projected2026: 660 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FSM UNDIP',
        accreditation: 'Unggul',
        dayaTampung2026: 63,
        peminat2025: 720,
        keketatan2025Percent: 8.75,
        snbpDayaTampung2026: 42,
        snbpPeminat2025: 610,
        passingGradeHistory: { year2022: 656, year2023: 664, year2024: 671, year2025: 678, projected2026: 682 },
      },
    ],
  },
  {
    id: 'uns',
    code: 'UNS',
    name: 'Universitas Sebelas Maret',
    city: 'Surakarta, Jawa Tengah',
    facultyName: 'FMIPA & FATISDA UNS',
    departmentName: 'Matematika, Aktuaria, Statistika & Sains Data',
    establishedYear: 1996,
    campusEnvironmentDesc: 'Kampus hijau Kentingan Solo yang nyaman dengan Fakultas Sains Data (FATISDA) mandiri.',
    departmentBuildingHighlight: 'Sinergi FMIPA dan FATISDA membuka peluang besar di Jawa Tengah.',
    labFacilities: [
      'Lab Komputasi & Pemodelan FMIPA UNS',
      'Lab Statistika Terapan & Aktuaria',
      'Lab Big Data & AI FATISDA UNS',
    ],
    campusImageSvgUri: createCampusArchitectureSvg({
      bgStart: '#0B1120',
      bgEnd: '#0F2942',
      accent: '#2DD4BF',
      secondaryAccent: '#818CF8',
      uniCode: 'UNS',
      buildingName: 'Kompleks Sains FMIPA & FATISDA Kentingan UNS',
      city: 'Surakarta',
      styleType: 'colonial-modern',
    }),
    programs: [
      {
        majorId: 'matematika',
        programNameOfficial: 'S1 Matematika',
        facultyDepartment: 'FMIPA UNS',
        accreditation: 'Unggul',
        dayaTampung2026: 42,
        peminat2025: 380,
        keketatan2025Percent: 11.05,
        snbpDayaTampung2026: 28,
        snbpPeminat2025: 310,
        passingGradeHistory: { year2022: 632, year2023: 638, year2024: 644, year2025: 650, projected2026: 654 },
      },
      {
        majorId: 'aktuaria',
        programNameOfficial: 'S1 Ilmu Aktuaria',
        facultyDepartment: 'FMIPA UNS',
        accreditation: 'Baik Sekali · Mitra PAI',
        dayaTampung2026: 24,
        peminat2025: 395,
        keketatan2025Percent: 6.08,
        snbpDayaTampung2026: 16,
        snbpPeminat2025: 290,
        passingGradeHistory: { year2022: 658, year2023: 666, year2024: 674, year2025: 681, projected2026: 686 },
      },
      {
        majorId: 'statistika',
        programNameOfficial: 'S1 Statistika',
        facultyDepartment: 'FMIPA UNS',
        accreditation: 'Unggul',
        dayaTampung2026: 40,
        peminat2025: 560,
        keketatan2025Percent: 7.14,
        snbpDayaTampung2026: 26,
        snbpPeminat2025: 440,
        passingGradeHistory: { year2022: 650, year2023: 657, year2024: 664, year2025: 671, projected2026: 676 },
      },
      {
        majorId: 'sains-data',
        programNameOfficial: 'S1 Sains Data',
        facultyDepartment: 'FATISDA UNS',
        accreditation: 'Baik Sekali',
        dayaTampung2026: 28,
        peminat2025: 515,
        keketatan2025Percent: 5.44,
        snbpDayaTampung2026: 20,
        snbpPeminat2025: 390,
        passingGradeHistory: { year2022: 655, year2023: 664, year2024: 673, year2025: 682, projected2026: 688 },
      },
    ],
  },
];

export const STUDENT_TRAIT_OPTIONS: StudentTraitOption[] = [
  // Category 1: Math Style (Short 3-5 word labels)
  {
    id: 'math_proof',
    category: 'math_style',
    label: 'Pembuktian Rumus & Logika Abstrak',
    description: 'Menyukai asal-usul teorema dan aljabar.',
    weights: { matematika: 35, aktuaria: 10, statistika: 10, 'sains-data': 5, ai: 18 },
  },
  {
    id: 'math_prob_finance',
    category: 'math_style',
    label: 'Hitung Peluang & Matematika Keuangan',
    description: 'Tertarik bunga majemuk dan risiko.',
    weights: { matematika: 12, aktuaria: 38, statistika: 20, 'sains-data': 10, ai: 5 },
  },
  {
    id: 'math_data_infer',
    category: 'math_style',
    label: 'Analisis Sampel & Uji Hipotesis',
    description: 'Senang membaca pola survei data.',
    weights: { matematika: 10, aktuaria: 18, statistika: 38, 'sains-data': 24, ai: 10 },
  },
  {
    id: 'math_matrix_algo',
    category: 'math_style',
    label: 'Aljabar Matriks & Kalkulus Optimasi',
    description: 'Kuat di vektor dan ruang dimensi.',
    weights: { matematika: 22, aktuaria: 8, statistika: 12, 'sains-data': 28, ai: 38 },
  },

  // Category 2: Problem Solving Style
  {
    id: 'solve_theoretical',
    category: 'problem_solving',
    label: 'Memodelkan Persamaan Sistem Kompleks',
    description: 'Merumuskan fenomena ke model matematika.',
    weights: { matematika: 36, aktuaria: 12, statistika: 14, 'sains-data': 10, ai: 20 },
  },
  {
    id: 'solve_risk_valuation',
    category: 'problem_solving',
    label: 'Mengukur Risiko & Cadangan Finansial',
    description: 'Menghitung premi asuransi dan dana pensiun.',
    weights: { matematika: 10, aktuaria: 38, statistika: 22, 'sains-data': 12, ai: 5 },
  },
  {
    id: 'solve_experiment',
    category: 'problem_solving',
    label: 'Merancang Eksperimen & Sebab-Akibat',
    description: 'Membuktikan efektivitas obat atau kebijakan.',
    weights: { matematika: 10, aktuaria: 15, statistika: 36, 'sains-data': 26, ai: 12 },
  },
  {
    id: 'solve_pipeline_automation',
    category: 'problem_solving',
    label: 'Otomasi Prediksi Data Skala Besar',
    description: 'Membangun mesin rekomendasi cerdas otomatis.',
    weights: { matematika: 10, aktuaria: 8, statistika: 15, 'sains-data': 36, ai: 36 },
  },

  // Category 3: Coding Affinity
  {
    id: 'code_scientific',
    category: 'coding_affinity',
    label: 'Simulasi Rumus Ilmiah (MATLAB/Python)',
    description: 'Koding untuk simulasi persamaan matematika.',
    weights: { matematika: 34, aktuaria: 18, statistika: 20, 'sains-data': 12, ai: 15 },
  },
  {
    id: 'code_financial_r',
    category: 'coding_affinity',
    label: 'Pemodelan Tabel & R / Excel VBA',
    description: 'Olah tabel finansial dan statistik.',
    weights: { matematika: 12, aktuaria: 36, statistika: 34, 'sains-data': 15, ai: 5 },
  },
  {
    id: 'code_bigdata_sql',
    category: 'coding_affinity',
    label: 'Rekayasa Database SQL & Cloud Spark',
    description: 'Mengelola gudang data jutaan baris.',
    weights: { matematika: 8, aktuaria: 12, statistika: 22, 'sains-data': 38, ai: 24 },
  },
  {
    id: 'code_deeplearning',
    category: 'coding_affinity',
    label: 'Koding Deep Learning & Robotika (PyTorch)',
    description: 'Menulis algoritma jaringan saraf tiruan.',
    weights: { matematika: 14, aktuaria: 4, statistika: 8, 'sains-data': 25, ai: 40 },
  },

  // Category 4: Industry & Career Goal
  {
    id: 'goal_quant_crypto',
    category: 'industry_goal',
    label: 'Quant Finance, Kriptografi & Riset',
    description: 'Riset algoritma pasar dan keamanan siber.',
    weights: { matematika: 38, aktuaria: 14, statistika: 14, 'sains-data': 12, ai: 18 },
  },
  {
    id: 'goal_actuary_ojk',
    category: 'industry_goal',
    label: 'Aktuaris Bersertifikat (FSAI) & Bank',
    description: 'Profesi resmi asuransi, pensiun, dan OJK.',
    weights: { matematika: 10, aktuaria: 40, statistika: 18, 'sains-data': 10, ai: 4 },
  },
  {
    id: 'goal_biostat_policy',
    category: 'industry_goal',
    label: 'Kebijakan Publik (BPS/BI) & Medis',
    description: 'Statistisi negara, riset pasar, dan klinis.',
    weights: { matematika: 10, aktuaria: 14, statistika: 38, 'sains-data': 22, ai: 8 },
  },
  {
    id: 'goal_tech_ai',
    category: 'industry_goal',
    label: 'Data Scientist & AI Engineer Tech',
    description: 'Berkarier di perusahaan teknologi global.',
    weights: { matematika: 12, aktuaria: 8, statistika: 16, 'sains-data': 36, ai: 38 },
  },
];

export const IF_THEN_DECISION_RULES: IfThenRule[] = [
  {
    id: 'rule-math-1',
    ruleCode: 'RULE-MAT-01',
    ifConditions: ['math_proof', 'solve_theoretical'],
    thenMajorId: 'matematika',
    confidenceWeight: 96,
    explanation: 'Kuat di pembuktian deduktif + pemodelan sistem abstrak.',
    characteristicQuote: '"Suka membuktikan asal rumus = Jiwa Matematika FMIPA."',
  },
  {
    id: 'rule-math-2',
    ruleCode: 'RULE-MAT-02',
    ifConditions: ['code_scientific', 'goal_quant_crypto'],
    thenMajorId: 'matematika',
    confidenceWeight: 92,
    explanation: 'Fondasi utama kriptografi siber, riset operasi, dan quant.',
    characteristicQuote: '"Kriptografi dan optimasi dibangun di atas Teori Bilangan."',
  },
  {
    id: 'rule-akt-1',
    ruleCode: 'RULE-AKT-01',
    ifConditions: ['math_prob_finance', 'solve_risk_valuation'],
    thenMajorId: 'aktuaria',
    confidenceWeight: 98,
    explanation: 'Perpaduan tepat antara teori peluang dan valuasi risiko keuangan.',
    characteristicQuote: '"Suka peluang + minat investasi = Jalur emas Aktuaria."',
  },
  {
    id: 'rule-akt-2',
    ruleCode: 'RULE-AKT-02',
    ifConditions: ['code_financial_r', 'goal_actuary_ojk'],
    thenMajorId: 'aktuaria',
    confidenceWeight: 95,
    explanation: 'Kuliah sekaligus mengantongi penyetaraan lisensi profesi PAI.',
    characteristicQuote: '"Lulus kuliah langsung setara ujian profesi aktuaris PAI."',
  },
  {
    id: 'rule-stat-1',
    ruleCode: 'RULE-STA-01',
    ifConditions: ['math_data_infer', 'solve_experiment'],
    thenMajorId: 'statistika',
    confidenceWeight: 96,
    explanation: 'Ahli membuktikan hubungan sebab-akibat melalui eksperimen data.',
    characteristicQuote: '"Kritis membaca survei & uji hipotesis = Pilih Statistika."',
  },
  {
    id: 'rule-stat-2',
    ruleCode: 'RULE-STA-02',
    ifConditions: ['code_financial_r', 'goal_biostat_policy'],
    thenMajorId: 'statistika',
    confidenceWeight: 93,
    explanation: 'Pilar utama ekonometrika negara (BPS/BI) dan uji klinis medis.',
    characteristicQuote: '"Dari uji vaksin hingga inflasi, semua bertumpu pada Statistika."',
  },
  {
    id: 'rule-ds-1',
    ruleCode: 'RULE-DSD-01',
    ifConditions: ['math_data_infer', 'code_bigdata_sql'],
    thenMajorId: 'sains-data',
    confidenceWeight: 97,
    explanation: 'Kombinasi analisis statistik dengan rekayasa database skala besar.',
    characteristicQuote: '"Suka statistika + jago koding database = Sains Data."',
  },
  {
    id: 'rule-ds-2',
    ruleCode: 'RULE-DSD-02',
    ifConditions: ['solve_pipeline_automation', 'goal_tech_ai'],
    thenMajorId: 'sains-data',
    confidenceWeight: 94,
    explanation: 'Mengubah jutaan data transaksi menjadi produk prediksi bisnis.',
    characteristicQuote: '"Sains Data menjembatani matematika dengan rekayasa Big Data."',
  },
  {
    id: 'rule-ai-1',
    ruleCode: 'RULE-KAI-01',
    ifConditions: ['math_matrix_algo', 'code_deeplearning'],
    thenMajorId: 'ai',
    confidenceWeight: 98,
    explanation: 'Aljabar matriks dan kalkulus adalah inti dari arsitektur Deep Learning.',
    characteristicQuote: '"Membuat komputer melihat, bicara & bernalar = Masuk AI."',
  },
  {
    id: 'rule-ai-2',
    ruleCode: 'RULE-KAI-02',
    ifConditions: ['solve_pipeline_automation', 'code_deeplearning'],
    thenMajorId: 'ai',
    confidenceWeight: 95,
    explanation: 'Fokus penuh pada perancangan jaringan saraf tiruan dan robotika.',
    characteristicQuote: '"Merancang otak algoritma cerdas dari baris kode pertama."',
  },
];
