import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile, UniversityPTN } from '../../data/mathFmipaData';
import {
  UTBK_7_SUBTESTS_META,
  UTBK_MAJOR_SUBTEST_WEIGHTS,
  UtbkSubtestId,
} from '../../data/ptnRealMediaData';
import { AlertTriangle, Award, Calculator, CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';
import { SemiCircleGaugeSvg } from '../ui/MajorVisualSvg';

interface Slide07PassingGradePredictorProps {
  universities: UniversityPTN[];
  majors: MajorProfile[];
  initialPtnId: string;
  initialMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
}

export const Slide07PassingGradePredictor: React.FC<Slide07PassingGradePredictorProps> = ({
  universities,
  majors,
  initialPtnId,
  initialMajorId,
  onSelectMajor,
}) => {
  const [selectedPtnId, setSelectedPtnId] = useState<string>(initialPtnId || 'ui');
  const [selectedMajorId, setSelectedMajorId] = useState<MajorId>(initialMajorId || 'aktuaria');
  const [scoringMode, setScoringMode] = useState<'major-weighted' | 'pure-average'>(
    'major-weighted'
  );

  // All 7 Official UTBK-SNBT Subtests (160 Questions · 195 Minutes)
  const [scores, setScores] = useState<Record<UtbkSubtestId, number>>({
    pm: 730, // Penalaran Matematika (20 soal)
    pk: 715, // Pengetahuan Kuantitatif (20 soal)
    pu: 700, // Penalaran Umum (30 soal)
    lbe: 690, // Literasi B. Inggris (20 soal)
    lbi: 685, // Literasi B. Indonesia (30 soal)
    ppu: 675, // Pengetahuan & Pemahaman Umum (20 soal)
    pbm: 670, // Pemahaman Bacaan & Menulis (20 soal)
  });
  const [hasNationalAchievement, setHasNationalAchievement] = useState<boolean>(false);

  useEffect(() => {
    if (initialPtnId) setSelectedPtnId(initialPtnId);
    if (initialMajorId) setSelectedMajorId(initialMajorId);
  }, [initialPtnId, initialMajorId]);

  const activeUni =
    universities.find((u) => u.id === selectedPtnId) || universities[0];

  const activeProgram = useMemo(() => {
    const exact = activeUni.programs.find((p) => p.majorId === selectedMajorId);
    return exact || activeUni.programs[0];
  }, [activeUni, selectedMajorId]);

  const activeMajorObj =
    majors.find((m) => m.id === activeProgram.majorId) || majors[0];

  const majorWeightProfile =
    UTBK_MAJOR_SUBTEST_WEIGHTS[activeProgram.majorId] ||
    UTBK_MAJOR_SUBTEST_WEIGHTS.matematika;

  const analysis = useMemo(() => {
    const bonusPoints = hasNationalAchievement ? 8 : 0;

    // 1. Dynamic Major-Specific Weighted Score across 7 Subtests
    const rawMajorWeighted = UTBK_7_SUBTESTS_META.reduce((acc, sub) => {
      const w = majorWeightProfile.weights[sub.id] || 0;
      return acc + scores[sub.id] * w;
    }, 0);
    const majorWeightedScore = Math.round(rawMajorWeighted + bonusPoints);

    // 2. Pure 7-Subtest Certificate Arithmetic Average (1/7 each)
    const rawPureAvg =
      UTBK_7_SUBTESTS_META.reduce((acc, sub) => acc + scores[sub.id], 0) /
      UTBK_7_SUBTESTS_META.length;
    const pureAverageScore = Math.round(rawPureAvg + bonusPoints);

    const activeScore =
      scoringMode === 'major-weighted' ? majorWeightedScore : pureAverageScore;

    const { year2022, year2023, year2024, year2025, projected2026 } =
      activeProgram.passingGradeHistory;

    const annualSlope = Number(((year2025 - year2022) / 3).toFixed(1));
    const deltaFromProjected = activeScore - projected2026;
    const rawProb = 1 / (1 + Math.exp(-deltaFromProjected / 14));
    const probabilityPercent = Math.min(96, Math.max(8, Math.round(rawProb * 100)));

    // Find lowest-scoring priority subtest to give targeted advice
    const topPrioritySubtests = [...UTBK_7_SUBTESTS_META].sort(
      (a, b) =>
        (majorWeightProfile.weights[b.id] || 0) -
        (majorWeightProfile.weights[a.id] || 0)
    );
    const weakestTopSubtest =
      topPrioritySubtests.slice(0, 3).sort((a, b) => scores[a.id] - scores[b.id])[0] ||
      topPrioritySubtests[0];

    let statusCategory: 'Sangat Aman' | 'Kompetitif Optimis' | 'Perlu Strategi Cadangan' =
      'Kompetitif Optimis';
    let recommendationNote = '';
    let gaugeHex = '#F59E0B';

    if (deltaFromProjected >= 12) {
      statusCategory = 'Sangat Aman';
      gaugeHex = '#10B981';
      recommendationNote = `Skor +${deltaFromProjected} poin di atas proyeksi 2026 (${projected2026}). Aman untuk Pilihan 1 (${majorWeightProfile.topPrioritySummary}).`;
    } else if (deltaFromProjected >= -12) {
      statusCategory = 'Kompetitif Optimis';
      gaugeHex = '#F59E0B';
      recommendationNote = `Zona persaingan ketat (${deltaFromProjected >= 0 ? '+' : ''}${deltaFromProjected} poin). Tingkatkan subtes prioritas ${weakestTopSubtest.code} (+15 poin).`;
    } else {
      statusCategory = 'Perlu Strategi Cadangan';
      gaugeHex = '#F43F5E';
      recommendationNote = `Terpaut ${Math.abs(deltaFromProjected)} poin di bawah ambang ${activeUni.code}. Tingkatkan ${weakestTopSubtest.code} atau pilih PTN alternatif di bawah.`;
    }

    const alternatives = universities
      .flatMap((u) =>
        u.programs
          .filter((p) => p.majorId === activeProgram.majorId && u.id !== activeUni.id)
          .map((p) => ({
            ptnId: u.id,
            ptnCode: u.code,
            ptnName: u.name,
            programName: p.programNameOfficial,
            projected2026: p.passingGradeHistory.projected2026,
            dayaTampung2026: p.dayaTampung2026,
            margin: activeScore - p.passingGradeHistory.projected2026,
          }))
      )
      .sort((a, b) => Math.abs(a.margin - 15) - Math.abs(b.margin - 15))
      .slice(0, 3);

    return {
      activeScore,
      majorWeightedScore,
      pureAverageScore,
      annualSlope,
      deltaFromProjected,
      probabilityPercent,
      statusCategory,
      gaugeHex,
      recommendationNote,
      alternatives,
      trendPoints: [
        { year: '2022', score: year2022 },
        { year: '2023', score: year2023 },
        { year: '2024', score: year2024 },
        { year: '2025', score: year2025 },
        { year: 'Proyeksi 2026', score: projected2026 },
      ],
    };
  }, [
    scores,
    hasNationalAchievement,
    scoringMode,
    majorWeightProfile,
    activeProgram,
    activeUni,
    universities,
  ]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ptnId: activeUni.id,
        majorId: activeProgram.majorId,
        scores,
        scoringMode,
        hasNationalAchievement,
      }),
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [activeUni.id, activeProgram.majorId, scores, scoringMode, hasNationalAchievement]);

  const chartW = 580;
  const chartH = 185;
  const padL = 44;
  const padR = 24;
  const padT = 22;
  const padB = 30;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const minChartScore = Math.min(
    600,
    analysis.activeScore - 25,
    ...analysis.trendPoints.map((p) => p.score - 20)
  );
  const maxChartScore = Math.max(
    785,
    analysis.activeScore + 20,
    ...analysis.trendPoints.map((p) => p.score + 20)
  );

  const getX = (i: number) => padL + (i / (analysis.trendPoints.length - 1)) * plotW;
  const getY = (val: number) =>
    padT +
    plotH -
    ((val - minChartScore) / Math.max(1, maxChartScore - minChartScore)) * plotH;

  const trendPath = analysis.trendPoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.score)}`)
    .join(' ');

  const areaPath = `${trendPath} L ${getX(analysis.trendPoints.length - 1)} ${chartH - padB} L ${getX(0)} ${chartH - padB} Z`;

  const studentLineY = getY(analysis.activeScore);

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Header & Target PTN / Major Selector */}
      <motion.div
        variants={staggerCardVariants}
        className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 09 · SIMULATOR 7 SUBTES UTBK-SNBT &amp; BOBOT PRIORITAS JURUSAN (2022–2026)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Kalkulator Peluang Masuk {activeUni.code} · {activeProgram.programNameOfficial}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2">
            <span className="text-xs font-mono text-slate-400">PTN:</span>
            <select
              value={activeUni.id}
              onChange={(e) => setSelectedPtnId(e.target.value)}
              aria-label="Pilih PTN"
              className="bg-transparent text-sm font-mono font-bold text-cyan-400 focus:outline-none"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id} className="bg-slate-900 text-slate-100">
                  {u.code} — {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2">
            <span className="text-xs font-mono text-slate-400">Prodi:</span>
            <select
              value={activeProgram.majorId}
              onChange={(e) => {
                const mId = e.target.value as MajorId;
                setSelectedMajorId(mId);
                onSelectMajor(mId);
              }}
              aria-label="Pilih Program Studi"
              className="bg-transparent text-sm font-mono font-bold text-emerald-400 focus:outline-none"
            >
              {activeUni.programs.map((p) => (
                <option key={p.majorId} value={p.majorId} className="bg-slate-900 text-slate-100">
                  {p.programNameOfficial}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Main Split: Left (5 cols) = 7 Official Subtest Sliders + Dynamic Prodi Weight, Right (7 cols) = Verdict + Trend Graph + 3 Alt PTNs */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (5 cols): 7 Subtests in Balanced 2x4 Grid */}
        <motion.div
          variants={staggerCardVariants}
          className="col-span-5 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          {/* Top Bar: Title + Scoring Method Toggle (Bobot Prodi vs Rerata Murni) */}
          <div className="flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-sm xl:text-base font-extrabold text-white">
              <Calculator className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>7 Subtes Resmi UTBK (160 Soal)</span>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
              <button
                onClick={() => setScoringMode('major-weighted')}
                className={`px-2 py-0.5 rounded font-bold transition-colors ${
                  scoringMode === 'major-weighted'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Estimasi skor berdasarkan bobot subtes prioritas jurusan"
              >
                Bobot Prodi
              </button>
              <button
                onClick={() => setScoringMode('pure-average')}
                className={`px-2 py-0.5 rounded font-bold transition-colors ${
                  scoringMode === 'pure-average'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Rerata murni 7 subtes sebagaimana sertifikat UTBK"
              >
                Rerata Murni
              </button>
            </div>
          </div>

          {/* 4x2 Balanced Grid: 7 Official Subtest Sliders + 1 Achievement Bonus Card */}
          <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-4 gap-2.5 my-2.5">
            {UTBK_7_SUBTESTS_META.map((sub) => {
              const weightPct = Math.round(
                (majorWeightProfile.weights[sub.id] || 0) * 100
              );
              const isHighPriority = weightPct >= 16;

              return (
                <div
                  key={sub.id}
                  className={`px-3 py-2 rounded-xl border flex flex-col justify-between ${
                    isHighPriority
                      ? 'bg-slate-900/95 border-slate-700'
                      : 'bg-slate-900/65 border-slate-800/90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-xs font-mono font-extrabold"
                          style={{ color: sub.accentHex }}
                        >
                          {sub.code}
                        </span>
                        <label
                          htmlFor={`sub-${sub.id}`}
                          className="text-xs font-bold text-slate-100 truncate cursor-pointer"
                        >
                          {sub.shortName}
                        </label>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        {sub.questionCount} Soal ·{' '}
                        <span
                          className={
                            isHighPriority ? 'text-cyan-300 font-bold' : 'text-slate-400'
                          }
                        >
                          Bobot {weightPct}%
                        </span>
                      </div>
                    </div>

                    <span
                      className="font-mono text-base xl:text-lg font-extrabold tabular-nums shrink-0"
                      style={{ color: sub.accentHex }}
                    >
                      {scores[sub.id]}
                    </span>
                  </div>

                  <input
                    id={`sub-${sub.id}`}
                    type="range"
                    min={450}
                    max={850}
                    step={5}
                    value={scores[sub.id]}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [sub.id]: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-cyan-400 cursor-pointer h-1.5"
                  />
                </div>
              );
            })}

            {/* 8th Grid Cell: National Achievement Bonus Toggle */}
            <label className="px-3 py-2 rounded-xl bg-slate-900/85 border border-slate-800 hover:border-cyan-500/50 cursor-pointer flex flex-col justify-between transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>PRESTASI OSN/NASIONAL</span>
                </span>
                <input
                  type="checkbox"
                  checked={hasNationalAchievement}
                  onChange={(e) => setHasNationalAchievement(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 rounded"
                />
              </div>
              <div className="text-[11px] font-semibold text-slate-200 leading-tight">
                Tambahan +8 Poin Indeks Seleksi
              </div>
            </label>
          </div>

          {/* Dual Score Footer: Indeks Bobot Prodi vs Rerata Sertifikat 7 Subtes */}
          <div className="pt-2.5 border-t border-slate-800 grid grid-cols-2 gap-3 shrink-0">
            <div
              onClick={() => setScoringMode('major-weighted')}
              className={`px-3 py-1.5 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                scoringMode === 'major-weighted'
                  ? 'bg-cyan-950/40 border-cyan-400'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-cyan-300 uppercase">
                  Indeks Prioritas {activeMajorObj.shortName}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  Sesuai Bobot Prodi
                </div>
              </div>
              <span className="text-xl xl:text-2xl font-extrabold font-mono text-white tabular-nums">
                {analysis.majorWeightedScore}
              </span>
            </div>

            <div
              onClick={() => setScoringMode('pure-average')}
              className={`px-3 py-1.5 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                scoringMode === 'pure-average'
                  ? 'bg-cyan-950/40 border-cyan-400'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-slate-300 uppercase">
                  Rerata Murni 7 Subtes
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  Standar Sertifikat BPPP
                </div>
              </div>
              <span className="text-xl xl:text-2xl font-extrabold font-mono text-slate-200 tabular-nums">
                {analysis.pureAverageScore}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Zone (7 cols): Verdict with Radial Speedometer + Flex-1 Trend Chart + 3 Alt PTNs */}
        <motion.div
          variants={staggerCardVariants}
          key={`pred-${activeUni.id}-${activeProgram.majorId}`}
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="col-span-7 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          {/* Top Verdict Banner with SemiCircle Probability Speedometer */}
          <div className="p-3.5 xl:p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between gap-4 shrink-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                {analysis.statusCategory === 'Sangat Aman' && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {analysis.statusCategory === 'Kompetitif Optimis' && (
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                {analysis.statusCategory === 'Perlu Strategi Cadangan' && (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span className="text-sm font-mono font-extrabold text-white uppercase">
                  STATUS: {analysis.statusCategory} ({analysis.deltaFromProjected >= 0 ? '+' : ''}
                  {analysis.deltaFromProjected} POIN)
                </span>
              </div>
              <p className="text-sm xl:text-base font-medium text-slate-200 leading-snug">
                {analysis.recommendationNote}
              </p>
            </div>

            <div className="pl-3 border-l border-slate-800 shrink-0 flex items-center">
              <SemiCircleGaugeSvg
                value={analysis.probabilityPercent}
                min={0}
                max={100}
                colorHex={analysis.gaugeHex}
                displayText={`${analysis.probabilityPercent}%`}
                label="Peluang Lulus"
              />
            </div>
          </div>

          {/* Flex-1 Trend Line Chart with Gradient Fill */}
          <div className="flex-1 min-h-0 flex flex-col my-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5 shrink-0">
              <span className="flex items-center gap-1.5 text-slate-200 font-bold">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                KURVA TREN PASSING GRADE ({activeUni.code} · {activeMajorObj.shortName})
              </span>
              <span>
                Prioritas {activeMajorObj.shortName}: {majorWeightProfile.topPrioritySummary}
              </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-3">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full flex-1 min-h-0 overflow-visible"
              >
                <defs>
                  <linearGradient id="pg-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[0, 0.5, 1].map((ratio, idx) => {
                  const scoreTick = Math.round(
                    minChartScore + ratio * (maxChartScore - minChartScore)
                  );
                  const y = getY(scoreTick);
                  return (
                    <g key={idx}>
                      <line
                        x1={padL}
                        y1={y}
                        x2={chartW - padR}
                        y2={y}
                        stroke="#1E293B"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={padL - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-slate-500 text-[11px] font-mono"
                      >
                        {scoreTick}
                      </text>
                    </g>
                  );
                })}

                <path d={areaPath} fill="url(#pg-area-grad)" />

                <line
                  x1={padL}
                  y1={studentLineY}
                  x2={chartW - padR}
                  y2={studentLineY}
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <text
                  x={padL + 8}
                  y={studentLineY - 6}
                  className="fill-emerald-400 text-xs font-mono font-extrabold"
                >
                  Skor {scoringMode === 'major-weighted' ? 'Indeks Prodi' : 'Rerata Murni'} Anda:{' '}
                  {analysis.activeScore}
                </text>

                <path d={trendPath} fill="none" stroke="#06B6D4" strokeWidth="3" />

                {analysis.trendPoints.map((pt, i) => {
                  const x = getX(i);
                  const y = getY(pt.score);
                  return (
                    <g key={pt.year}>
                      <circle
                        cx={x}
                        cy={y}
                        r={i === analysis.trendPoints.length - 1 ? 6 : 4.5}
                        fill={i === analysis.trendPoints.length - 1 ? '#F59E0B' : '#06B6D4'}
                        stroke="#0F172A"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        className="fill-white text-xs font-mono font-bold"
                      >
                        {pt.score}
                      </text>
                      <text
                        x={x}
                        y={chartH - 6}
                        textAnchor="middle"
                        className="fill-slate-300 text-[11px] font-mono font-semibold"
                      >
                        {pt.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 3 Alternative PTNs */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase mb-2">
              Rekomendasi Kampus Alternatif ({activeMajorObj.shortName}) Sesuai Skor Anda:
            </div>
            <div className="grid grid-cols-3 gap-3">
              {analysis.alternatives.map((alt) => (
                <button
                  key={alt.ptnId}
                  onClick={() => setSelectedPtnId(alt.ptnId)}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-left transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-sm mb-0.5">
                    <span className="font-extrabold text-cyan-400">{alt.ptnCode}</span>
                    <span
                      className={`font-bold tabular-nums ${
                        alt.margin >= 0 ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {alt.margin >= 0 ? `+${alt.margin}` : alt.margin} Poin
                    </span>
                  </div>
                  <div className="text-xs xl:text-sm font-bold text-white truncate">
                    Ambang: {alt.projected2026}
                  </div>
                  <div className="text-xs font-mono text-slate-400 tabular-nums">
                    Kuota SNBT: {alt.dayaTampung2026} kursi
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
