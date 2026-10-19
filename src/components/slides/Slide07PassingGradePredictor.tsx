import React, { useEffect, useMemo, useState } from 'react';
import { MajorId, MajorProfile, UniversityPTN } from '../../data/mathFmipaData';
import { AlertTriangle, Calculator, CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';

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

  const [scores, setScores] = useState({
    penalaranMatematika: 720,
    pengetahuanKuantitatif: 705,
    penalaranUmum: 690,
    literasiIndonesiaInggris: 680,
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

  const analysis = useMemo(() => {
    const weightedScore = Math.round(
      scores.penalaranMatematika * 0.38 +
        scores.pengetahuanKuantitatif * 0.32 +
        scores.penalaranUmum * 0.18 +
        scores.literasiIndonesiaInggris * 0.12 +
        (hasNationalAchievement ? 8 : 0)
    );

    const { year2022, year2023, year2024, year2025, projected2026 } =
      activeProgram.passingGradeHistory;

    const annualSlope = Number(((year2025 - year2022) / 3).toFixed(1));
    const deltaFromProjected = weightedScore - projected2026;
    const rawProb = 1 / (1 + Math.exp(-deltaFromProjected / 14));
    const probabilityPercent = Math.min(96, Math.max(8, Math.round(rawProb * 100)));

    let statusCategory: 'Sangat Aman' | 'Kompetitif Optimis' | 'Perlu Strategi Cadangan' =
      'Kompetitif Optimis';
    let recommendationNote = '';

    if (deltaFromProjected >= 12) {
      statusCategory = 'Sangat Aman';
      recommendationNote = `Skor +${deltaFromProjected} poin di atas ambang 2026 (${projected2026}). Aman untuk Pilihan 1.`;
    } else if (deltaFromProjected >= -12) {
      statusCategory = 'Kompetitif Optimis';
      recommendationNote = `Zona persaingan ketat (${deltaFromProjected >= 0 ? '+' : ''}${deltaFromProjected} poin). Tingkatkan Penalaran Matematika +15 poin.`;
    } else {
      statusCategory = 'Perlu Strategi Cadangan';
      recommendationNote = `Terpaut ${Math.abs(deltaFromProjected)} poin di bawah ambang ${activeUni.code}. Gunakan PTN alternatif di bawah.`;
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
            margin: weightedScore - p.passingGradeHistory.projected2026,
          }))
      )
      .sort((a, b) => Math.abs(a.margin - 15) - Math.abs(b.margin - 15))
      .slice(0, 3);

    return {
      weightedScore,
      annualSlope,
      deltaFromProjected,
      probabilityPercent,
      statusCategory,
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
  }, [scores, hasNationalAchievement, activeProgram, activeUni, universities]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ptnId: activeUni.id,
        majorId: activeProgram.majorId,
        scores,
        hasNationalAchievement,
      }),
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [activeUni.id, activeProgram.majorId, scores, hasNationalAchievement]);

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
    analysis.weightedScore - 25,
    ...analysis.trendPoints.map((p) => p.score - 20)
  );
  const maxChartScore = Math.max(
    785,
    analysis.weightedScore + 20,
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

  const studentLineY = getY(analysis.weightedScore);

  return (
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Header & Target PTN / Major Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 09 · SIMULATOR PREDIKSI KELULUSAN &amp; TREN AMBANG BATAS UTBK (2022–2026)
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
      </div>

      {/* Main Split: Left (5 cols) = 4 Oversized UTBK Sliders, Right (7 cols) = Verdict + Trend Graph + 3 Alt PTNs */}
      <div className="flex-1 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-extrabold text-white">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Geser Skor Tryout UTBK</span>
            </div>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              Rentang 450–850
            </span>
          </div>

          <div className="space-y-3 my-2">
            {/* Slider 1 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="s-pm" className="text-sm font-bold text-slate-100">
                  Penalaran Matematika (38%)
                </label>
                <span className="font-mono text-lg font-extrabold text-cyan-400 tabular-nums">
                  {scores.penalaranMatematika}
                </span>
              </div>
              <input
                id="s-pm"
                type="range"
                min={450}
                max={850}
                step={5}
                value={scores.penalaranMatematika}
                onChange={(e) =>
                  setScores((p) => ({ ...p, penalaranMatematika: Number(e.target.value) }))
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 2 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="s-pk" className="text-sm font-bold text-slate-100">
                  Pengetahuan Kuantitatif (32%)
                </label>
                <span className="font-mono text-lg font-extrabold text-emerald-400 tabular-nums">
                  {scores.pengetahuanKuantitatif}
                </span>
              </div>
              <input
                id="s-pk"
                type="range"
                min={450}
                max={850}
                step={5}
                value={scores.pengetahuanKuantitatif}
                onChange={(e) =>
                  setScores((p) => ({ ...p, pengetahuanKuantitatif: Number(e.target.value) }))
                }
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Slider 3 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="s-pu" className="text-sm font-bold text-slate-100">
                  Penalaran Umum (18%)
                </label>
                <span className="font-mono text-lg font-extrabold text-indigo-400 tabular-nums">
                  {scores.penalaranUmum}
                </span>
              </div>
              <input
                id="s-pu"
                type="range"
                min={450}
                max={850}
                step={5}
                value={scores.penalaranUmum}
                onChange={(e) =>
                  setScores((p) => ({ ...p, penalaranUmum: Number(e.target.value) }))
                }
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

            {/* Slider 4 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="s-lit" className="text-sm font-bold text-slate-100">
                  Literasi Indonesia &amp; Inggris (12%)
                </label>
                <span className="font-mono text-lg font-extrabold text-amber-400 tabular-nums">
                  {scores.literasiIndonesiaInggris}
                </span>
              </div>
              <input
                id="s-lit"
                type="range"
                min={450}
                max={850}
                step={5}
                value={scores.literasiIndonesiaInggris}
                onChange={(e) =>
                  setScores((p) => ({ ...p, literasiIndonesiaInggris: Number(e.target.value) }))
                }
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <label className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 cursor-pointer">
              <span className="text-xs xl:text-sm font-semibold text-slate-200">
                Piagam Olimpiade / Kompetisi Nasional (+8 Poin)
              </span>
              <input
                type="checkbox"
                checked={hasNationalAchievement}
                onChange={(e) => setHasNationalAchievement(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
            </label>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">Skor Komposit Anda:</span>
            <span className="text-2xl xl:text-3xl font-extrabold font-mono text-white tabular-nums">
              {analysis.weightedScore}
            </span>
          </div>
        </div>

        {/* Right Zone (7 cols): Verdict + Trend Chart + 3 Alt PTNs */}
        <div className="col-span-7 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
          {/* Top Verdict Banner */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between gap-4 shrink-0">
            <div>
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
                  STATUS: {analysis.statusCategory} ({analysis.deltaFromProjected >= 0 ? '+' : ''}{analysis.deltaFromProjected} POIN)
                </span>
              </div>
              <p className="text-sm xl:text-base font-medium text-slate-200">
                {analysis.recommendationNote}
              </p>
            </div>

            <div className="text-right shrink-0 font-mono tabular-nums pl-4 border-l border-slate-800">
              <div className="text-xs text-slate-400">Peluang Lulus</div>
              <div className="text-3xl xl:text-4xl font-extrabold text-cyan-400">
                {analysis.probabilityPercent}%
              </div>
            </div>
          </div>

          {/* Trend Line Chart */}
          <div className="my-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-200 font-bold">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                KURVA TREN PASSING GRADE ({activeUni.code} · {activeMajorObj.shortName})
              </span>
              <span>Tren Kenaikan: +{analysis.annualSlope} poin/tahun</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-40 overflow-visible">
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
                  Skor Anda: {analysis.weightedScore}
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
        </div>
      </div>
    </div>
  );
};
