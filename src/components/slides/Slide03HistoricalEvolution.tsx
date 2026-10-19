import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HistoricalEra, MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ChevronLeft, ChevronRight, Code2, Cpu, FlaskConical, TrendingUp } from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';

interface Slide03HistoricalEvolutionProps {
  eras: HistoricalEra[];
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
}

export const Slide03HistoricalEvolution: React.FC<Slide03HistoricalEvolutionProps> = ({
  eras,
  majors,
  selectedMajorId,
  onSelectMajor,
}) => {
  const [activeEraIndex, setActiveEraIndex] = useState<number>(3);
  const [comparisonDimension, setComparisonDimension] = useState<
    'curriculum' | 'research' | 'computing'
  >('curriculum');

  const currentEra = eras[activeEraIndex] || eras[0];
  const focusedMajor = majors.find((m) => m.id === selectedMajorId) || majors[0];

  const chartWidth = 580;
  const chartHeight = 230;
  const padLeft = 42;
  const padRight = 26;
  const padTop = 22;
  const padBottom = 34;
  const plotW = chartWidth - padLeft - padRight;
  const plotH = chartHeight - padTop - padBottom;

  const getX = (eraIdx: number) => padLeft + (eraIdx / (eras.length - 1)) * plotW;
  const getY = (val: number) => padTop + plotH - ((val - 10) / 90) * plotH;

  // Area path for the currently selected major
  const focusedPoints = eras.map((era, idx) => {
    const snap = era.snapshots.find((s) => s.majorId === focusedMajor.id);
    const val = snap ? snap.talentDemandIndex : 50;
    return { x: getX(idx), y: getY(val), val, idx };
  });
  const focusedLinePath = focusedPoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`)
    .join(' ');
  const focusedAreaPath = `${focusedLinePath} L ${getX(eras.length - 1)} ${chartHeight - padBottom} L ${getX(0)} ${chartHeight - padBottom} Z`;

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Header & Era Stepper */}
      <motion.div
        variants={staggerCardVariants}
        className="flex items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 05 · PERBANDINGAN PERKEMBANGAN JURUSAN DARI MASA KE MASA (1980 – 2026+)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            {currentEra.period}: {currentEra.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveEraIndex((p) => Math.max(0, p - 1))}
            disabled={activeEraIndex === 0}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {eras.map((era, idx) => (
              <button
                key={era.id}
                onClick={() => setActiveEraIndex(idx)}
                className={`px-3.5 py-2 text-sm font-mono font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  idx === activeEraIndex
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {era.period}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveEraIndex((p) => Math.min(eras.length - 1, p + 1))}
            disabled={activeEraIndex === eras.length - 1}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Main Split: Left (5 cols) = Expanded Trend Graph & Curriculum Shift, Right (7 cols) = 3-Column Balanced Matrix */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (5 cols): Flex-1 Expanded Graph + Bottom Stacked Curriculum Bars */}
        <motion.div
          variants={staggerCardVariants}
          className="col-span-5 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          {/* Top Section: Header + Interactive Legend + Flex-1 Full-Height SVG Graph */}
          <div className="flex-1 min-h-0 flex flex-col mb-3">
            <div className="flex items-center justify-between mb-2 shrink-0">
              <div className="flex items-center gap-2 text-sm xl:text-base font-bold text-slate-100">
                <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Grafik Tren Serapan Industri (1980–2026+)</span>
              </div>
              <span className="text-xs font-mono text-amber-400 truncate ml-2">
                {currentEra.keyBreakthrough}
              </span>
            </div>

            {/* Interactive SVG Multi-Line Chart with 5-Major Legend */}
            <div className="flex-1 min-h-0 flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-3">
              {/* Interactive 5-Major Legend Bar */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-1 border-b border-slate-800/80 shrink-0">
                {majors.map((m) => {
                  const isFocused = m.id === selectedMajorId;
                  return (
                    <button
                      key={m.id}
                      onClick={() => onSelectMajor(m.id)}
                      className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                        isFocused
                          ? 'bg-slate-800 text-white border border-slate-600'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: m.accentHex }}
                      />
                      <span>{m.shortName}</span>
                    </button>
                  );
                })}
              </div>

              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full flex-1 min-h-0 overflow-visible"
              >
                <defs>
                  <linearGradient id="era-focus-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={focusedMajor.accentHex} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={focusedMajor.accentHex} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[25, 50, 75, 100].map((tick) => {
                  const y = getY(tick);
                  return (
                    <g key={tick}>
                      <line
                        x1={padLeft}
                        y1={y}
                        x2={chartWidth - padRight}
                        y2={y}
                        stroke="#1E293B"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={padLeft - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-slate-400 text-[11px] font-mono"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Highlighted Major Area Fill */}
                <path d={focusedAreaPath} fill="url(#era-focus-grad)" />

                {/* Active Era Vertical Guide Line */}
                <line
                  x1={getX(activeEraIndex)}
                  y1={padTop}
                  x2={getX(activeEraIndex)}
                  y2={chartHeight - padBottom}
                  stroke="#06B6D4"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {eras.map((era, idx) => (
                  <text
                    key={era.id}
                    x={getX(idx)}
                    y={chartHeight - 6}
                    textAnchor="middle"
                    onClick={() => setActiveEraIndex(idx)}
                    className={`text-xs font-mono cursor-pointer ${
                      idx === activeEraIndex ? 'fill-cyan-400 font-bold' : 'fill-slate-400'
                    }`}
                  >
                    {era.period}
                  </text>
                ))}

                {majors.map((major) => {
                  const isFocused = major.id === selectedMajorId;
                  const points = eras.map((era, idx) => {
                    const snap = era.snapshots.find((s) => s.majorId === major.id);
                    const val = snap ? snap.talentDemandIndex : 50;
                    return { x: getX(idx), y: getY(val), val, idx };
                  });

                  const pathData = points
                    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`)
                    .join(' ');

                  return (
                    <g
                      key={major.id}
                      className="cursor-pointer"
                      onClick={() => onSelectMajor(major.id)}
                    >
                      <path
                        d={pathData}
                        fill="none"
                        stroke={major.accentHex}
                        strokeWidth={isFocused ? 3.5 : 2}
                        strokeOpacity={isFocused ? 1 : 0.5}
                      />
                      {points.map((pt) => (
                        <g key={pt.idx}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={pt.idx === activeEraIndex ? (isFocused ? 7 : 5) : 4}
                            fill={pt.idx === activeEraIndex ? major.accentHex : '#0F172A'}
                            stroke={major.accentHex}
                            strokeWidth="2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveEraIndex(pt.idx);
                              onSelectMajor(major.id);
                            }}
                          />
                          {isFocused && pt.idx === activeEraIndex && (
                            <text
                              x={pt.x}
                              y={pt.y - 11}
                              textAnchor="middle"
                              className="fill-white text-[11px] font-mono font-extrabold"
                            >
                              {pt.val}
                            </text>
                          )}
                        </g>
                      ))}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Bottom Section: Stacked Curriculum Shift Bars */}
          <div className="space-y-1.5 shrink-0 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold">
                PORSI KURIKULUM ({currentEra.period})
              </span>
              <div className="flex items-center gap-2.5 text-[11px]">
                <span className="text-indigo-400 font-bold">■ Teori</span>
                <span className="text-cyan-400 font-bold">■ Stat</span>
                <span className="text-emerald-400 font-bold">■ Komp</span>
                <span className="text-rose-400 font-bold">■ AI</span>
              </div>
            </div>
            {majors.map((major) => {
              const snap = currentEra.snapshots.find((s) => s.majorId === major.id);
              if (!snap) return null;
              const { theory, appliedStats, computation, aiAndData } = snap.curriculumWeight;
              return (
                <div key={major.id} className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-100">{major.shortName}</span>
                    <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                      Teori {theory}% · Stat {appliedStats}% · Komp+AI {computation + aiAndData}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden flex">
                    <div style={{ width: `${theory}%`, backgroundColor: '#6366F1' }} />
                    <div style={{ width: `${appliedStats}%`, backgroundColor: '#06B6D4' }} />
                    <div style={{ width: `${computation}%`, backgroundColor: '#10B981' }} />
                    <div style={{ width: `${aiAndData}%`, backgroundColor: '#F43F5E' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Zone (7 cols): 5-Row 3-Column Balanced Comparison Matrix (Zero Dead Space) */}
        <motion.div
          variants={staggerCardVariants}
          key={`${currentEra.id}-${comparisonDimension}`}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="col-span-7 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
            <span className="text-sm xl:text-base font-bold text-white truncate">
              {currentEra.macroContext}
            </span>

            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setComparisonDimension('curriculum')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  comparisonDimension === 'curriculum'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Kurikulum</span>
              </button>
              <button
                onClick={() => setComparisonDimension('research')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  comparisonDimension === 'research'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Fokus Riset</span>
              </button>
              <button
                onClick={() => setComparisonDimension('computing')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  comparisonDimension === 'computing'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Alat Komputasi</span>
              </button>
            </div>
          </div>

          {/* 5 Equal-Height Flex-1 Rows with 12-Column Internal Balance */}
          <div className="flex-1 min-h-0 flex flex-col gap-2.5 my-2.5">
            {currentEra.snapshots.map((snap) => {
              const major = majors.find((m) => m.id === snap.majorId)!;
              const isSelected = major.id === selectedMajorId;

              return (
                <div
                  key={snap.majorId}
                  onClick={() => onSelectMajor(major.id)}
                  className={`flex-1 min-h-0 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors grid grid-cols-12 gap-4 items-center ${
                    isSelected
                      ? 'bg-slate-800/95 border-cyan-400 shadow-sm'
                      : 'bg-slate-900/75 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Col 1–5: Major Identity + Primary Dimension Focus */}
                  <div className="col-span-5 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-base xl:text-lg font-extrabold shrink-0"
                        style={{ color: major.accentHex }}
                      >
                        {major.shortName}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-xs font-mono text-slate-300 truncate">
                        {snap.statusInIndonesia}
                      </span>
                    </div>

                    {comparisonDimension === 'curriculum' && (
                      <div className="text-xs xl:text-sm font-semibold text-white truncate">
                        {snap.curriculumFocus}
                      </div>
                    )}
                    {comparisonDimension === 'research' && (
                      <div className="text-xs xl:text-sm font-semibold text-white truncate">
                        {snap.researchFrontier}
                      </div>
                    )}
                    {comparisonDimension === 'computing' && (
                      <div className="text-xs xl:text-sm font-mono font-semibold text-amber-300 truncate">
                        {snap.computingTools}
                      </div>
                    )}
                  </div>

                  {/* Col 6–9: Secondary Contextual Pillar (Eliminates Empty Middle-Right Gap) */}
                  <div className="col-span-4 min-w-0 pl-3.5 border-l border-slate-800/90">
                    {comparisonDimension === 'curriculum' && (
                      <>
                        <div className="text-[11px] font-mono text-slate-400 uppercase truncate">
                          Komputasi: <span className="text-amber-300">{snap.computingTools}</span>
                        </div>
                        <div className="text-xs font-medium text-cyan-300 truncate mt-0.5">
                          Sektor: {snap.industryAdoption}
                        </div>
                      </>
                    )}
                    {comparisonDimension === 'research' && (
                      <>
                        <div className="text-[11px] font-mono text-slate-400 uppercase truncate">
                          Adopsi Industri Utama
                        </div>
                        <div className="text-xs font-semibold text-cyan-300 truncate mt-0.5">
                          {snap.industryAdoption}
                        </div>
                      </>
                    )}
                    {comparisonDimension === 'computing' && (
                      <>
                        <div className="text-[11px] font-mono text-slate-400 uppercase truncate">
                          Riset &amp; Aplikasi Industri
                        </div>
                        <div className="text-xs font-semibold text-cyan-300 truncate mt-0.5">
                          {snap.industryAdoption}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Col 10–12: Serapan Industri Score + Progress Bar */}
                  <div className="col-span-3 text-right font-mono tabular-nums pl-3 border-l border-slate-800/90">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Serapan</span>
                      <span className="text-sm xl:text-base font-extrabold text-cyan-400">
                        {snap.talentDemandIndex}/100
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-sm overflow-hidden mt-1">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${snap.talentDemandIndex}%`,
                          backgroundColor: major.accentHex,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2.5 border-t border-slate-800 text-xs xl:text-sm text-slate-300 font-medium truncate shrink-0">
            <strong className="text-cyan-400 font-mono">Kesimpulan Era:</strong> {currentEra.teacherNarrative}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
