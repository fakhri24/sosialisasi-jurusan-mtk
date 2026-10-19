import React, { useState } from 'react';
import { HistoricalEra, MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ChevronLeft, ChevronRight, Code2, Cpu, FlaskConical, TrendingUp } from 'lucide-react';

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

  const chartWidth = 560;
  const chartHeight = 210;
  const padLeft = 40;
  const padRight = 24;
  const padTop = 20;
  const padBottom = 32;
  const plotW = chartWidth - padLeft - padRight;
  const plotH = chartHeight - padTop - padBottom;

  const getX = (eraIdx: number) => padLeft + (eraIdx / (eras.length - 1)) * plotW;
  const getY = (val: number) => padTop + plotH - ((val - 10) / 90) * plotH;

  return (
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Header & Era Stepper */}
      <div className="flex items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0">
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
      </div>

      {/* Main Split: Left (5 cols) = Trend Graph & Curriculum Shift, Right (7 cols) = 5-Major Concise Matrix */}
      <div className="flex-1 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Grafik Tren Adopsi Industri (1980–2026+)</span>
              </div>
              <span className="text-xs font-mono text-amber-400">
                {currentEra.keyBreakthrough}
              </span>
            </div>

            {/* Interactive SVG Multi-Line Chart */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-4">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 overflow-visible"
              >
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
                    return { x: getX(idx), y: getY(val), idx };
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
                        strokeOpacity={isFocused ? 1 : 0.55}
                      />
                      {points.map((pt) => (
                        <circle
                          key={pt.idx}
                          cx={pt.x}
                          cy={pt.y}
                          r={pt.idx === activeEraIndex ? (isFocused ? 6.5 : 5) : 4}
                          fill={pt.idx === activeEraIndex ? major.accentHex : '#0F172A'}
                          stroke={major.accentHex}
                          strokeWidth="2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveEraIndex(pt.idx);
                            onSelectMajor(major.id);
                          }}
                        />
                      ))}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Stacked Curriculum Shift Bars */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>PERGESERAN PORSI KURIKULUM ({currentEra.period})</span>
              <span>Teori · Stat · Komp · AI</span>
            </div>
            {majors.map((major) => {
              const snap = currentEra.snapshots.find((s) => s.majorId === major.id);
              if (!snap) return null;
              const { theory, appliedStats, computation, aiAndData } = snap.curriculumWeight;
              return (
                <div key={major.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs xl:text-sm">
                    <span className="font-bold text-slate-100">{major.shortName}</span>
                    <span className="font-mono text-xs text-slate-300 tabular-nums">
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
        </div>

        {/* Right Zone (7 cols): 5-Row High-Contrast Comparison Matrix */}
        <div className="col-span-7 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
            <span className="text-sm xl:text-base font-bold text-white">
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

          {/* 5 Concise Rows */}
          <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
            {currentEra.snapshots.map((snap) => {
              const major = majors.find((m) => m.id === snap.majorId)!;
              const isSelected = major.id === selectedMajorId;

              return (
                <div
                  key={snap.majorId}
                  onClick={() => onSelectMajor(major.id)}
                  className={`px-4 py-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-400'
                      : 'bg-slate-900/75 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-base xl:text-lg font-extrabold"
                        style={{ color: major.accentHex }}
                      >
                        {major.shortName}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-xs xl:text-sm font-mono text-slate-300">
                        {snap.statusInIndonesia}
                      </span>
                    </div>

                    {comparisonDimension === 'curriculum' && (
                      <div className="text-sm xl:text-base font-medium text-white truncate">
                        {snap.curriculumFocus}
                      </div>
                    )}
                    {comparisonDimension === 'research' && (
                      <div className="text-sm xl:text-base font-medium text-white truncate">
                        {snap.researchFrontier} <span className="text-cyan-300">({snap.industryAdoption})</span>
                      </div>
                    )}
                    {comparisonDimension === 'computing' && (
                      <div className="text-sm xl:text-base font-mono font-semibold text-amber-300 truncate">
                        Alat: {snap.computingTools}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0 font-mono tabular-nums">
                    <div className="text-[11px] text-slate-400">Indeks Era</div>
                    <div className="text-lg xl:text-xl font-extrabold text-cyan-400">
                      {snap.talentDemandIndex}/100
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs xl:text-sm text-slate-300 font-medium truncate">
            <strong className="text-cyan-400 font-mono">Intisari Guru:</strong> {currentEra.teacherNarrative}
          </div>
        </div>
      </div>
    </div>
  );
};
