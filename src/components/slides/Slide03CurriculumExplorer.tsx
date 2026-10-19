import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ArrowRight, BookOpen } from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';

interface Slide03CurriculumExplorerProps {
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
  onJumpToSlide: (slideIndex: number) => void;
}

const CategoryVectorBadge: React.FC<{ category: string; accentHex: string }> = ({
  category,
  accentHex,
}) => {
  if (category.includes('Komputasi') || category.includes('AI')) {
    return (
      <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0 opacity-85" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="10" fill="#0B1120" stroke="#F43F5E" strokeWidth="1.5" />
        <circle cx="16" cy="18" r="3" fill="#F43F5E" />
        <circle cx="16" cy="30" r="3" fill="#F43F5E" />
        <circle cx="32" cy="24" r="4" fill="#38BDF8" />
        <line x1="19" y1="18" x2="28" y2="23" stroke="#F43F5E" strokeWidth="1.5" />
        <line x1="19" y1="30" x2="28" y2="25" stroke="#F43F5E" strokeWidth="1.5" />
      </svg>
    );
  }
  if (category.includes('Statistika') || category.includes('Data')) {
    return (
      <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0 opacity-85" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="10" fill="#0B1120" stroke="#06B6D4" strokeWidth="1.5" />
        <path d="M 11 34 C 17 34, 20 15, 24 15 C 28 15, 31 34, 37 34" stroke="#06B6D4" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="24" y1="15" x2="24" y2="35" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    );
  }
  if (category.includes('Finansial') || category.includes('Aktuaria')) {
    return (
      <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0 opacity-85" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="10" fill="#0B1120" stroke="#10B981" strokeWidth="1.5" />
        <path d="M 12 32 L 20 25 L 27 28 L 36 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="36" cy="16" r="3" fill="#10B981" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0 opacity-85" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="10" fill="#0B1120" stroke={accentHex} strokeWidth="1.5" />
      <polygon points="24,12 35,20 31,34 17,34 13,20" stroke={accentHex} strokeWidth="1.8" fill={accentHex} fillOpacity="0.15" />
      <circle cx="24" cy="24" r="2.5" fill="#38BDF8" />
    </svg>
  );
};

export const Slide03CurriculumExplorer: React.FC<Slide03CurriculumExplorerProps> = ({
  majors,
  selectedMajorId,
  onSelectMajor,
  onJumpToSlide,
}) => {
  const activeMajor = majors.find((m) => m.id === selectedMajorId) || majors[0];
  const [selectedYear, setSelectedYear] = useState<number>(1);

  // Automatically reset to Tahun 1 whenever the major changes
  useEffect(() => {
    setSelectedYear(1);
  }, [selectedMajorId]);

  const currentYearCurriculum =
    activeMajor.curriculumByYear.find((y) => y.year === selectedYear) ||
    activeMajor.curriculumByYear[0];

  const totalSks = currentYearCurriculum.courses.reduce((acc, c) => acc + c.sks, 0);

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Header with Major & Academic Year Quick Tabs */}
      <motion.div
        variants={staggerCardVariants}
        className="flex flex-col gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs font-mono text-cyan-400 mb-0.5">
              SLIDE 03 · STRUKTUR KURIKULUM &amp; MATA KULIAH INTI (144 SKS)
            </div>
            <h1 className="text-xl xl:text-2xl font-extrabold text-white truncate">
              Kurikulum {activeMajor.name} · {currentYearCurriculum.title}
            </h1>
          </div>

          {/* Year Switcher (Tahun 1 - 4) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
            {[1, 2, 3, 4].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3.5 py-1.5 text-xs xl:text-sm font-mono font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedYear === yr
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Tahun {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Major Switcher */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {majors.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onSelectMajor(m.id);
                  setSelectedYear(1);
                }}
                className={`px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  m.id === selectedMajorId
                    ? 'bg-slate-800 text-white border border-cyan-400/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs xl:text-sm text-slate-300 min-w-0">
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">
              Fokus: <strong className="text-white">{currentYearCurriculum.focusSummary}</strong>
            </span>
            <span className="font-mono text-cyan-400 font-bold tabular-nums shrink-0 ml-2">
              ({totalSks} SKS Inti)
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2x2 Big Course Grid (Zero Scroll) with SVG Category Emblems & SKS Meter */}
      <motion.div
        key={`${activeMajor.id}-yr-${selectedYear}`}
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-5 items-stretch overflow-hidden"
      >
        {currentYearCurriculum.courses.slice(0, 4).map((course, idx) => (
          <motion.div
            key={course.code}
            variants={staggerCardVariants}
            className="relative bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 xl:p-6 flex flex-col justify-between transition-colors overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 font-mono text-xs xl:text-sm font-bold mb-1">
                    <span style={{ color: activeMajor.accentHex }}>
                      0{idx + 1} · {course.code}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs">
                      {course.category}
                    </span>
                  </div>
                  <h2 className="text-xl xl:text-2xl font-extrabold text-white leading-tight">
                    {course.name}
                  </h2>
                </div>

                <CategoryVectorBadge
                  category={course.category}
                  accentHex={activeMajor.accentHex}
                />
              </div>

              <p className="text-sm xl:text-base text-slate-200 font-medium leading-relaxed mt-2">
                {course.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-bold">
                  Semester {selectedYear * 2 - 1} / {selectedYear * 2}
                </span>
                <span className="text-slate-400">Mata Kuliah Inti Wajib</span>
              </div>

              {/* Visual SKS Credit Blocks */}
              <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((block) => (
                    <span
                      key={block}
                      className={`w-3.5 h-2 rounded-xs ${
                        block <= course.sks ? 'bg-cyan-400' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-cyan-300 tabular-nums">
                  {course.sks} SKS
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Visual Stacked Competency Bar & Next Slide CTA */}
      <motion.div
        variants={staggerCardVariants}
        className="bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between gap-6 shrink-0"
      >
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 uppercase">
              Peta Bobot Kompetensi {activeMajor.shortName}:
            </span>
            <div className="flex items-center gap-5">
              <span className="text-indigo-400 font-bold tabular-nums">
                ■ Teori {activeMajor.competencyBreakdown.pureMath}%
              </span>
              <span className="text-cyan-400 font-bold tabular-nums">
                ■ Statistika {activeMajor.competencyBreakdown.statisticsProb}%
              </span>
              <span className="text-rose-400 font-bold tabular-nums">
                ■ Komputasi/AI {activeMajor.competencyBreakdown.computationCoding}%
              </span>
              <span className="text-emerald-400 font-bold tabular-nums">
                ■ Industri {activeMajor.competencyBreakdown.domainBusiness}%
              </span>
            </div>
          </div>

          {/* Animated Multi-Segment Competency Bar */}
          <div className="w-full h-2.5 bg-slate-950 rounded-sm overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${activeMajor.competencyBreakdown.pureMath}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-indigo-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${activeMajor.competencyBreakdown.statisticsProb}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-cyan-400"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${activeMajor.competencyBreakdown.computationCoding}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-rose-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${activeMajor.competencyBreakdown.domainBusiness}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-emerald-400"
            />
          </div>
        </div>

        <button
          onClick={() => onJumpToSlide(3)}
          className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs xl:text-sm rounded-xl transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Lihat Prospek Karier</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
};
