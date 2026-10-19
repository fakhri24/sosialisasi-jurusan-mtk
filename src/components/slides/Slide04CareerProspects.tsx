import React from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';

interface Slide04CareerProspectsProps {
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
  onJumpToSlide: (slideIndex: number) => void;
}

export const Slide04CareerProspects: React.FC<Slide04CareerProspectsProps> = ({
  majors,
  selectedMajorId,
  onSelectMajor,
  onJumpToSlide,
}) => {
  const activeMajor = majors.find((m) => m.id === selectedMajorId) || majors[0];

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Header & Major Selector */}
      <motion.div
        variants={staggerCardVariants}
        className="flex items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 04 · PROSPEK KARIER, SEKTOR INDUSTRI &amp; RENTANG GAJI (2026–2030)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Peta Karier Lulusan {activeMajor.name} ({activeMajor.degreeTitle})
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
          {majors.map((m) => {
            const active = m.id === selectedMajorId;
            return (
              <button
                key={m.id}
                onClick={() => onSelectMajor(m.id)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {m.shortName}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 2x2 Big Career Cards Grid with Animated SVG Growth Sparklines & Salary Bars */}
      <motion.div
        key={`careers-${activeMajor.id}`}
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 grid grid-cols-2 grid-rows-2 gap-5 items-stretch overflow-hidden"
      >
        {activeMajor.careers.slice(0, 4).map((career, idx) => {
          const entryWidth = 34 + idx * 4;
          const seniorWidth = 88 - idx * 3;

          return (
            <motion.div
              key={idx}
              variants={staggerCardVariants}
              className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 xl:p-6 flex flex-col justify-between transition-colors overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs xl:text-sm font-mono text-slate-400 mb-1.5">
                    <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">0{idx + 1} · {career.industry}</span>
                  </div>

                  <h2 className="text-2xl xl:text-3xl font-extrabold text-white mb-1.5 leading-tight">
                    {career.role}
                  </h2>

                  <div className="text-sm xl:text-base text-slate-300 font-medium">
                    Keahlian Kunci:{' '}
                    <span className="text-cyan-300 font-semibold">{career.coreSkill}</span>
                  </div>
                </div>

                {/* Animated Growth Sparkline Box */}
                <div className="shrink-0 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xs xl:text-sm font-mono font-extrabold text-emerald-400 tabular-nums">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{career.demandGrowth2030}</span>
                  </div>
                  <svg viewBox="0 0 84 28" className="w-20 h-6 mt-1 overflow-visible" fill="none">
                    <path
                      d="M 4 24 Q 26 22, 44 14 T 80 4"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="80" cy="4" r="3.5" fill="#10B981" />
                  </svg>
                  <span className="text-[10px] font-mono text-slate-400">Proyeksi 2030</span>
                </div>
              </div>

              {/* Visual Salary Progression Strip */}
              <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-slate-800/90 mt-2">
                <div className="bg-slate-900/75 border border-slate-800/90 rounded-xl p-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase mb-1">
                    <span>Fresh Graduate</span>
                    <span className="text-cyan-400">Tahun 1–2</span>
                  </div>
                  <div className="text-lg xl:text-xl font-extrabold font-mono text-slate-100 tabular-nums mb-1.5">
                    {career.entrySalaryRp}/bln
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-sm overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${entryWidth}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-cyan-400"
                    />
                  </div>
                </div>

                <div className="bg-slate-900/75 border border-slate-800/90 rounded-xl p-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase mb-1">
                    <span>Senior / Lead</span>
                    <span className="text-emerald-400">3.5x Lonjakan</span>
                  </div>
                  <div className="text-lg xl:text-xl font-extrabold font-mono text-emerald-400 tabular-nums mb-1.5">
                    {career.seniorSalaryRp}/bln
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-sm overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${seniorWidth}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Summary with Visual Absorption Gauge & Official Sources CTA */}
      <motion.div
        variants={staggerCardVariants}
        className="bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between gap-6 shrink-0"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="text-xs xl:text-sm text-slate-300 font-medium truncate flex items-center gap-2">
            <span>
              Tracer Study PTN:{' '}
              <strong className="text-emerald-400 font-mono tabular-nums">
                &gt;88% Kerja &lt; 6 Bln
              </strong>
            </span>
            <span className="text-slate-600">·</span>
            <a
              href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyan-400 hover:underline"
            >
              WEF Future of Jobs 2025 ↗
            </a>
            <span className="text-slate-600">·</span>
            <a
              href="https://www.aktuaris.or.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyan-400 hover:underline"
            >
              PAI (532 FSAI) ↗
            </a>
          </div>
          <div className="w-32 h-2 bg-slate-950 rounded-sm overflow-hidden border border-slate-800 hidden xl:block shrink-0">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '88%' }}
              transition={{ duration: 0.6 }}
              className="h-full bg-emerald-400"
            />
          </div>
        </div>

        <button
          onClick={() => onJumpToSlide(4)}
          className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Lihat Evolusi Lintas Zaman</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
};
