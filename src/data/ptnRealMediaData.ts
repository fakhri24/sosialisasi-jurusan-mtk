import { MajorId } from './mathFmipaData';

export type UtbkSubtestId = 'pm' | 'pk' | 'pu' | 'lbe' | 'lbi' | 'ppu' | 'pbm';

export interface UtbkSubtestMeta {
  id: UtbkSubtestId;
  code: string;
  name: string;
  shortName: string;
  category: 'TPS' | 'Literasi';
  questionCount: number;
  durationMinutes: number;
  accentHex: string;
}

/**
 * 7 Subtes Resmi UTBK-SNBT BPPP Kemendikbudristek (Total 160 Soal · 195 Menit)
 */
export const UTBK_7_SUBTESTS_META: UtbkSubtestMeta[] = [
  {
    id: 'pm',
    code: 'PM',
    name: 'Penalaran Matematika',
    shortName: 'Penalaran Matematika',
    category: 'Literasi',
    questionCount: 20,
    durationMinutes: 42.5,
    accentHex: '#22D3EE',
  },
  {
    id: 'pk',
    code: 'PK',
    name: 'Pengetahuan Kuantitatif',
    shortName: 'Pengetahuan Kuantitatif',
    category: 'TPS',
    questionCount: 20,
    durationMinutes: 20,
    accentHex: '#34D399',
  },
  {
    id: 'pu',
    code: 'PU',
    name: 'Penalaran Umum (Induktif/Deduktif/Kuant)',
    shortName: 'Penalaran Umum (PU)',
    category: 'TPS',
    questionCount: 30,
    durationMinutes: 30,
    accentHex: '#818CF8',
  },
  {
    id: 'lbe',
    code: 'LBE',
    name: 'Literasi dalam Bahasa Inggris',
    shortName: 'Literasi B. Inggris',
    category: 'Literasi',
    questionCount: 20,
    durationMinutes: 20,
    accentHex: '#F59E0B',
  },
  {
    id: 'lbi',
    code: 'LBI',
    name: 'Literasi dalam Bahasa Indonesia',
    shortName: 'Literasi B. Indonesia',
    category: 'Literasi',
    questionCount: 30,
    durationMinutes: 42.5,
    accentHex: '#FB7185',
  },
  {
    id: 'ppu',
    code: 'PPU',
    name: 'Pengetahuan & Pemahaman Umum',
    shortName: 'Pemahaman Umum (PPU)',
    category: 'TPS',
    questionCount: 20,
    durationMinutes: 15,
    accentHex: '#38BDF8',
  },
  {
    id: 'pbm',
    code: 'PBM',
    name: 'Pemahaman Bacaan & Menulis',
    shortName: 'Bacaan & Menulis (PBM)',
    category: 'TPS',
    questionCount: 20,
    durationMinutes: 25,
    accentHex: '#A78BFA',
  },
];

/**
 * Matriks Estimasi Bobot Prioritas 7 Subtes UTBK per Cabang Keilmuan FMIPA
 * Berdasarkan relevansi rumpun keilmuan prodi (total tiap jurusan = 1.00 / 100%).
 * Rumus internal eksak tiap PTN bersifat tertutup (rahasia panitia seleksi PTN),
 * namun urutan subtes prioritas dapat diestimasi secara objektif dari struktur kurikulum prodi.
 */
export const UTBK_MAJOR_SUBTEST_WEIGHTS: Record<
  MajorId,
  {
    weights: Record<UtbkSubtestId, number>;
    topPrioritySummary: string;
    rationale: string;
  }
> = {
  matematika: {
    weights: {
      pm: 0.28,
      pk: 0.26,
      pu: 0.18,
      lbe: 0.08,
      lbi: 0.07,
      ppu: 0.07,
      pbm: 0.06,
    },
    topPrioritySummary: 'PM (28%) · PK (26%) · PU Deduktif (18%)',
    rationale:
      'Menekankan pembuktian deduktif, abstraksi aljabar-kalkulus, dan pemodelan matematis.',
  },
  aktuaria: {
    weights: {
      pm: 0.30,
      pk: 0.26,
      pu: 0.16,
      lbe: 0.11,
      lbi: 0.07,
      ppu: 0.05,
      pbm: 0.05,
    },
    topPrioritySummary: 'PM (30%) · PK (26%) · PU (16%) · LBE (11%)',
    rationale:
      'Memprioritaskan kalkulus probabilitas (PM/PK) dan Literasi Inggris untuk ujian profesi PAI/SOA.',
  },
  statistika: {
    weights: {
      pm: 0.27,
      pk: 0.25,
      pu: 0.18,
      lbi: 0.10,
      lbe: 0.09,
      ppu: 0.06,
      pbm: 0.05,
    },
    topPrioritySummary: 'PM (27%) · PK (25%) · PU Induktif (18%) · LBI (10%)',
    rationale:
      'Menitikberatkan inferensi data, penalaran induktif sampel, dan interpretasi laporan survei.',
  },
  'sains-data': {
    weights: {
      pk: 0.26,
      pm: 0.25,
      pu: 0.20,
      lbe: 0.11,
      lbi: 0.07,
      ppu: 0.06,
      pbm: 0.05,
    },
    topPrioritySummary: 'PK (26%) · PM (25%) · PU Algoritmik (20%) · LBE (11%)',
    rationale:
      'Kombinasi matematika diskrit/matriks (PK), optimasi model (PM), dan logika pemrograman (PU).',
  },
  ai: {
    weights: {
      pk: 0.25,
      pm: 0.24,
      pu: 0.22,
      lbe: 0.12,
      lbi: 0.06,
      ppu: 0.06,
      pbm: 0.05,
    },
    topPrioritySummary: 'PK (25%) · PM (24%) · PU Logika Sistem (22%) · LBE (12%)',
    rationale:
      'Porsi Penalaran Umum (22%) & Literasi Inggris (12%) tertinggi untuk algoritma AI & paper riset.',
  },
};

export interface LabFacilityLinkInfo {
  name: string;
  focusTag: string;
  svgType: 'compute' | 'actuary' | 'ai' | 'math' | 'data';
  exploreUrl: string;
}

export interface PtnWebDirectoryInfo {
  ptnId: string;
  architecturalLandmarkLabel: string;
  officialUniversityUrl: string;
  officialFacultyUrl: string;
  officialDepartmentUrl: string;
  officialAdmissionUrl: string;
  programExploreUrls: Partial<Record<MajorId, string>>;
  facilities: LabFacilityLinkInfo[];
}

export interface MajorWebLinkInfo {
  majorId: MajorId;
  associationName: string;
  associationUrl: string;
  snpmbCurriculumRef: string;
}

export const MAJOR_WEB_LINKS: Record<MajorId, MajorWebLinkInfo> = {
  matematika: {
    majorId: 'matematika',
    associationName: 'IndoMS (Indonesian Mathematical Society)',
    associationUrl: 'https://indoms.id/',
    snpmbCurriculumRef: 'https://math.ui.ac.id/',
  },
  aktuaria: {
    majorId: 'aktuaria',
    associationName: 'PAI (Persatuan Aktuaris Indonesia)',
    associationUrl: 'https://www.aktuaris.or.id/',
    snpmbCurriculumRef: 'https://www.its.ac.id/aktuaria/',
  },
  statistika: {
    majorId: 'statistika',
    associationName: 'ISI (Ikatan Statistisi Indonesia) & BPS',
    associationUrl: 'https://www.bps.go.id/',
    snpmbCurriculumRef: 'https://statistics.unpad.ac.id/',
  },
  'sains-data': {
    majorId: 'sains-data',
    associationName: 'Sekolah Sains Data, Matematika & Informatika',
    associationUrl: 'https://ssmi.ipb.ac.id/',
    snpmbCurriculumRef: 'https://ftmm.unair.ac.id/',
  },
  ai: {
    majorId: 'ai',
    associationName: 'Pusat Riset AI & Ilmu Komputer PTN',
    associationUrl: 'https://cs.ui.ac.id/',
    snpmbCurriculumRef: 'https://www.its.ac.id/it/',
  },
};

export const PTN_WEB_DIRECTORY: Record<string, PtnWebDirectoryInfo> = {
  ui: {
    ptnId: 'ui',
    architecturalLandmarkLabel: 'Vektor Arsitektur Rektorat & Gedung Departemen Matematika FMIPA UI Depok',
    officialUniversityUrl: 'https://www.ui.ac.id/',
    officialFacultyUrl: 'https://sci.ui.ac.id/',
    officialDepartmentUrl: 'https://math.ui.ac.id/',
    officialAdmissionUrl: 'https://penerimaan.ui.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.ui.ac.id/sarjana-matematika/',
      aktuaria: 'https://math.ui.ac.id/sarjana-ilmu-aktuaria/',
      statistika: 'https://math.ui.ac.id/sarjana-statistika/',
      ai: 'https://cs.ui.ac.id/',
    },
    facilities: [
      {
        name: 'Lab Komputasi Matematika & Pemodelan FMIPA UI',
        focusTag: 'Komputasi Ilmiah & Simulasi',
        svgType: 'compute',
        exploreUrl: 'https://math.ui.ac.id/fasilitas/',
      },
      {
        name: 'Lab Aktuaria & Risiko Finansial (Mitra Resmi PAI)',
        focusTag: 'Valuasi Asuransi & R/Python',
        svgType: 'actuary',
        exploreUrl: 'https://math.ui.ac.id/sarjana-ilmu-aktuaria/',
      },
      {
        name: 'Tokopedia-UI AI Center of Excellence (HPC GPU DGX)',
        focusTag: 'Deep Learning & Supercomputing',
        svgType: 'ai',
        exploreUrl: 'https://cs.ui.ac.id/research/',
      },
    ],
  },
  itb: {
    ptnId: 'itb',
    architecturalLandmarkLabel: 'Vektor Arsitektur Kampus Ganesha & Gedung CAS FMIPA ITB Bandung',
    officialUniversityUrl: 'https://www.itb.ac.id/',
    officialFacultyUrl: 'https://fmipa.itb.ac.id/',
    officialDepartmentUrl: 'https://math.itb.ac.id/',
    officialAdmissionUrl: 'https://admission.itb.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.itb.ac.id/sarjana-matematika/',
      aktuaria: 'https://math.itb.ac.id/sarjana-aktuaria/',
      statistika: 'https://math.itb.ac.id/kelompok-keilmuan-statistika/',
    },
    facilities: [
      {
        name: 'Gedung Center for Advanced Sciences (CAS) ITB',
        focusTag: 'Riset Sains Lanjut & Pemodelan',
        svgType: 'math',
        exploreUrl: 'https://fmipa.itb.ac.id/',
      },
      {
        name: 'Lab Matematika Industri & Keuangan FMIPA ITB',
        focusTag: 'Kuantitatif Finansial & Aktuaria',
        svgType: 'actuary',
        exploreUrl: 'https://math.itb.ac.id/',
      },
      {
        name: 'Pusat Riset Kecerdasan Artifisial & Big Data ITB',
        focusTag: 'Klaster HPC & Machine Learning',
        svgType: 'ai',
        exploreUrl: 'https://stei.itb.ac.id/',
      },
    ],
  },
  ugm: {
    ptnId: 'ugm',
    architecturalLandmarkLabel: 'Vektor Arsitektur Balairung & Kampus Sekip Utara FMIPA UGM Yogyakarta',
    officialUniversityUrl: 'https://ugm.ac.id/',
    officialFacultyUrl: 'https://mipa.ugm.ac.id/',
    officialDepartmentUrl: 'https://math.ugm.ac.id/',
    officialAdmissionUrl: 'https://um.ugm.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.ugm.ac.id/',
      aktuaria: 'https://aktuaria.ugm.ac.id/',
      statistika: 'https://statistika.ugm.ac.id/',
      ai: 'https://dcse.fmipa.ugm.ac.id/',
    },
    facilities: [
      {
        name: 'Lab Analisis, Aljabar & Matematika Terapan FMIPA UGM',
        focusTag: 'Riset Teorema & Pemodelan',
        svgType: 'math',
        exploreUrl: 'https://math.ugm.ac.id/',
      },
      {
        name: 'Lab Statistika & Komputasi Aktuaria Sekip Utara',
        focusTag: 'Ekonometrika & Risiko Asuransi',
        svgType: 'actuary',
        exploreUrl: 'https://statistika.ugm.ac.id/',
      },
      {
        name: 'Lab Sistem Cerdas & Algoritma DIKE FMIPA UGM',
        focusTag: 'Kecerdasan Artifisial & Robotika',
        svgType: 'ai',
        exploreUrl: 'https://dcse.fmipa.ugm.ac.id/',
      },
    ],
  },
  its: {
    ptnId: 'its',
    architecturalLandmarkLabel: 'Vektor Arsitektur MIPA Tower & Research Center FSAD ITS Surabaya',
    officialUniversityUrl: 'https://www.its.ac.id/',
    officialFacultyUrl: 'https://www.its.ac.id/fsad/',
    officialDepartmentUrl: 'https://www.its.ac.id/matematika/',
    officialAdmissionUrl: 'https://www.its.ac.id/admission/',
    programExploreUrls: {
      matematika: 'https://www.its.ac.id/matematika/',
      aktuaria: 'https://www.its.ac.id/aktuaria/',
      statistika: 'https://www.its.ac.id/statistika/',
      'sains-data': 'https://www.its.ac.id/sainsdata/',
      ai: 'https://www.its.ac.id/it/',
    },
    facilities: [
      {
        name: 'Gedung Research Center & Lab Sains Data FSAD ITS',
        focusTag: 'Big Data & Komputasi Matematika',
        svgType: 'data',
        exploreUrl: 'https://www.its.ac.id/fsad/',
      },
      {
        name: 'Lab Pemodelan Aktuaria & Manajemen Risiko ITS',
        focusTag: 'Valuasi Asuransi & Keuangan',
        svgType: 'actuary',
        exploreUrl: 'https://www.its.ac.id/aktuaria/',
      },
      {
        name: 'Gedung Pusat Robotika & Rekayasa AI ITS',
        focusTag: 'Computer Vision & Robotika Otonom',
        svgType: 'ai',
        exploreUrl: 'https://www.its.ac.id/it/',
      },
    ],
  },
  ipb: {
    ptnId: 'ipb',
    architecturalLandmarkLabel: 'Vektor Arsitektur Kampus Dramaga & Sekolah SSMI IPB University Bogor',
    officialUniversityUrl: 'https://ipb.ac.id/',
    officialFacultyUrl: 'https://ssmi.ipb.ac.id/',
    officialDepartmentUrl: 'https://stat.ipb.ac.id/',
    officialAdmissionUrl: 'https://admisi.ipb.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.ipb.ac.id/',
      aktuaria: 'https://aktuaria.ipb.ac.id/',
      statistika: 'https://stat.ipb.ac.id/',
      'sains-data': 'https://stat.ipb.ac.id/',
      ai: 'https://cs.ipb.ac.id/',
    },
    facilities: [
      {
        name: 'Lab Statistika & Sains Data SSMI IPB (Pelopor 1968)',
        focusTag: 'Biostatistika & Sains Data',
        svgType: 'data',
        exploreUrl: 'https://stat.ipb.ac.id/',
      },
      {
        name: 'Lab Ilmu Aktuaria & Pemodelan Risiko IPB',
        focusTag: 'Asuransi Jiwa, Umum & Mikro',
        svgType: 'actuary',
        exploreUrl: 'https://aktuaria.ipb.ac.id/',
      },
      {
        name: 'Lab Kecerdasan Buatan & Bioinformatika SSMI IPB',
        focusTag: 'AI Pertanian Presisi & Genomika',
        svgType: 'ai',
        exploreUrl: 'https://cs.ipb.ac.id/',
      },
    ],
  },
  unair: {
    ptnId: 'unair',
    architecturalLandmarkLabel: 'Vektor Arsitektur Gedung Nano FTMM & FST Kampus C UNAIR Surabaya',
    officialUniversityUrl: 'https://unair.ac.id/',
    officialFacultyUrl: 'https://fst.unair.ac.id/',
    officialDepartmentUrl: 'https://ftmm.unair.ac.id/',
    officialAdmissionUrl: 'https://ppmb.unair.ac.id/',
    programExploreUrls: {
      matematika: 'https://s1.matematika.fst.unair.ac.id/',
      statistika: 'https://statistika.fst.unair.ac.id/',
      'sains-data': 'https://tsd.ftmm.unair.ac.id/',
      ai: 'https://trkb.ftmm.unair.ac.id/',
    },
    facilities: [
      {
        name: 'Gedung Nano FTMM Kampus C Universitas Airlangga',
        focusTag: 'Teknologi Sains Data & AI',
        svgType: 'data',
        exploreUrl: 'https://ftmm.unair.ac.id/',
      },
      {
        name: 'Lab Matematika & Biostatistika Medis FST UNAIR',
        focusTag: 'Epidemiologi & Riset Klinis',
        svgType: 'compute',
        exploreUrl: 'https://fst.unair.ac.id/',
      },
      {
        name: 'Lab Robotika & Kecerdasan Buatan FTMM UNAIR',
        focusTag: 'Sistem Otonom & Machine Learning',
        svgType: 'ai',
        exploreUrl: 'https://trkb.ftmm.unair.ac.id/',
      },
    ],
  },
  unpad: {
    ptnId: 'unpad',
    architecturalLandmarkLabel: 'Vektor Arsitektur Rektorat & Kampus FMIPA UNPAD Jatinangor',
    officialUniversityUrl: 'https://www.unpad.ac.id/',
    officialFacultyUrl: 'https://fmipa.unpad.ac.id/',
    officialDepartmentUrl: 'https://statistics.unpad.ac.id/',
    officialAdmissionUrl: 'https://smup.unpad.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.fmipa.unpad.ac.id/',
      aktuaria: 'https://actuary.statistics.unpad.ac.id/',
      statistika: 'https://statistics.unpad.ac.id/',
    },
    facilities: [
      {
        name: 'Lab Matematika Terapan & Komputasi FMIPA UNPAD',
        focusTag: 'Pemodelan & Optimasi Industri',
        svgType: 'math',
        exploreUrl: 'https://math.fmipa.unpad.ac.id/',
      },
      {
        name: 'Lab Ilmu Aktuaria & Pemodelan Risiko UNPAD',
        focusTag: 'Mitra PAI & Keuangan',
        svgType: 'actuary',
        exploreUrl: 'https://actuary.statistics.unpad.ac.id/',
      },
      {
        name: 'Lab Statistika Terapan & Ekonometrika Jatinangor',
        focusTag: 'Sains Data & Survei Sosial-Ekonomi',
        svgType: 'data',
        exploreUrl: 'https://statistics.unpad.ac.id/',
      },
    ],
  },
  ub: {
    ptnId: 'ub',
    architecturalLandmarkLabel: 'Vektor Arsitektur Gedung MIPA Center (9 Lantai) FMIPA UB Malang',
    officialUniversityUrl: 'https://ub.ac.id/',
    officialFacultyUrl: 'https://mipa.ub.ac.id/',
    officialDepartmentUrl: 'https://math.ub.ac.id/',
    officialAdmissionUrl: 'https://selma.ub.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.ub.ac.id/',
      aktuaria: 'https://math.ub.ac.id/',
      statistika: 'https://statistika.ub.ac.id/',
      'sains-data': 'https://statistika.ub.ac.id/',
    },
    facilities: [
      {
        name: 'Gedung MIPA Center (9 Lantai) FMIPA UB Malang',
        focusTag: 'Pusat Perkuliahan & Riset Terpadu',
        svgType: 'compute',
        exploreUrl: 'https://mipa.ub.ac.id/',
      },
      {
        name: 'Lab Aktuaria & Analisis Finansial FMIPA UB',
        focusTag: 'Simulasi Risiko & Asuransi',
        svgType: 'actuary',
        exploreUrl: 'https://math.ub.ac.id/',
      },
      {
        name: 'Lab Sains Data & Statistika Industri UB',
        focusTag: 'Komputasi Big Data & Analitik',
        svgType: 'data',
        exploreUrl: 'https://statistika.ub.ac.id/',
      },
    ],
  },
  undip: {
    ptnId: 'undip',
    architecturalLandmarkLabel: 'Vektor Arsitektur Gedung Acintya Prasada FSM UNDIP Tembalang',
    officialUniversityUrl: 'https://www.undip.ac.id/',
    officialFacultyUrl: 'https://fsm.undip.ac.id/',
    officialDepartmentUrl: 'https://math.fsm.undip.ac.id/',
    officialAdmissionUrl: 'https://pmb.undip.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.fsm.undip.ac.id/',
      statistika: 'https://stat.fsm.undip.ac.id/',
    },
    facilities: [
      {
        name: 'Gedung Acintya Prasada FSM UNDIP Tembalang',
        focusTag: 'Pusat Sains & Matematika',
        svgType: 'compute',
        exploreUrl: 'https://fsm.undip.ac.id/',
      },
      {
        name: 'Lab Matematika Terapan & Kriptografi FSM UNDIP',
        focusTag: 'Pemodelan & Keamanan Informasi',
        svgType: 'math',
        exploreUrl: 'https://math.fsm.undip.ac.id/',
      },
      {
        name: 'Lab Statistika Komputasi & Sains Data UNDIP',
        focusTag: 'Analisis Multivariat & Machine Learning',
        svgType: 'data',
        exploreUrl: 'https://stat.fsm.undip.ac.id/',
      },
    ],
  },
  uns: {
    ptnId: 'uns',
    architecturalLandmarkLabel: 'Vektor Arsitektur Gedung FMIPA & FATISDA Kampus Kentingan UNS Solo',
    officialUniversityUrl: 'https://uns.ac.id/',
    officialFacultyUrl: 'https://mipa.uns.ac.id/',
    officialDepartmentUrl: 'https://math.mipa.uns.ac.id/',
    officialAdmissionUrl: 'https://spmb.uns.ac.id/',
    programExploreUrls: {
      matematika: 'https://math.mipa.uns.ac.id/',
      aktuaria: 'https://mipa.uns.ac.id/',
      statistika: 'https://statistika.mipa.uns.ac.id/',
      'sains-data': 'https://fatisda.uns.ac.id/',
    },
    facilities: [
      {
        name: 'Lab Komputasi & Pemodelan FMIPA UNS Kentingan',
        focusTag: 'Komputasi Ilmiah & Simulasi',
        svgType: 'compute',
        exploreUrl: 'https://math.mipa.uns.ac.id/',
      },
      {
        name: 'Lab Statistika Terapan & Aktuaria FMIPA UNS',
        focusTag: 'Ekonometrika & Pemodelan Risiko',
        svgType: 'actuary',
        exploreUrl: 'https://statistika.mipa.uns.ac.id/',
      },
      {
        name: 'Lab Big Data & Kecerdasan Artifisial FATISDA UNS',
        focusTag: 'Data Engineering & AI Terapan',
        svgType: 'ai',
        exploreUrl: 'https://fatisda.uns.ac.id/',
      },
    ],
  },
};
