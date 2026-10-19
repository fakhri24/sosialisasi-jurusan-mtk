import React, { useState } from 'react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ArrowRight, BookOpen } from 'lucide-react';

interface Slide03CurriculumExplorerProps {
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
  onJumpToSlide: (slideIndex: number) => void;
}

export const Slide03CurriculumExplorer: React.FC<Slide03CurriculumExplorerProps> = ({
  majors,
  selectedMajorId,
  onSelectMajor,
  onJumpToSlide,
}) => {
  const activeMajor = majors.find((m) => m.id === selectedMajorId) || majors[0];
  const [selectedYear, setSelectedYear] = useState<number>(1);

  const currentYearCurriculum =
    activeMajor.curriculumByYear.find((y) => y.year === selectedYear) ||
    activeMajor.curriculumByYear[0];

  const totalSks = currentYearCurriculum.courses.reduce((acc, c) => acc + c.sks, 0);

  return (
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Header with Major & Academic Year Quick Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-4 shrink-0">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 03 · STRUKTUR KURIKULUM &amp; MATA KULIAH INTI (144 SKS)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Kurikulum {activeMajor.name} · {currentYearCurriculum.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Major Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {majors.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectMajor(m.id)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  m.id === selectedMajorId
                    ? 'bg-slate-800 text-white border border-cyan-400/60'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>

          {/* Year Switcher (Tahun 1 - 4) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {[1, 2, 3, 4].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3.5 py-1.5 text-sm font-mono font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
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
      </div>

      {/* Year Focus Summary Strip */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-base xl:text-lg font-medium text-slate-200">
            Fokus Pembelajaran: <strong className="text-white">{currentYearCurriculum.focusSummary}</strong>
          </span>
        </div>
        <span className="text-sm font-mono text-cyan-400 font-bold tabular-nums shrink-0">
          Mata Kuliah Inti: {totalSks} SKS
        </span>
      </div>

      {/* 2x2 Big Course Grid (Zero Scroll) */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-5 items-stretch overflow-hidden">
        {currentYearCurriculum.courses.slice(0, 4).map((course, idx) => (
          <div
            key={course.code}
            className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                <span
                  className="text-sm font-bold"
                  style={{ color: activeMajor.accentHex }}
                >
                  0{idx + 1} · {course.code} · {course.category.toUpperCase()}
                </span>
                <span className="text-base font-extrabold text-cyan-300 tabular-nums">
                  {course.sks} SKS
                </span>
              </div>

              <h2 className="text-xl xl:text-2xl font-extrabold text-white mb-2">
                {course.name}
              </h2>

              <p className="text-base xl:text-lg text-slate-300 font-medium leading-snug">
                {course.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Semester {selectedYear * 2 - 1} / {selectedYear * 2}</span>
              <span>Wajib Departemen</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Competency Bar & Next Slide CTA */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-6 text-sm font-mono">
          <span className="text-slate-400">Komposisi Kurikulum {activeMajor.shortName}:</span>
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
            ■ Finansial/Industri {activeMajor.competencyBreakdown.domainBusiness}%
          </span>
        </div>

        <button
          onClick={() => onJumpToSlide(3)}
          className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs xl:text-sm rounded-xl transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Lihat Prospek Karier</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
