import React from 'react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ArrowRight, CheckCircle2, Compass, Layers } from 'lucide-react';

interface Slide01EcosystemProps {
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
  onJumpToSlide: (slideIndex: number) => void;
}

export const Slide01Ecosystem: React.FC<Slide01EcosystemProps> = ({
  majors,
  selectedMajorId,
  onSelectMajor,
  onJumpToSlide,
}) => {
  const activeMajor = majors.find((m) => m.id === selectedMajorId) || majors[0];

  return (
    <div className="h-full grid grid-cols-12 gap-5 items-stretch overflow-hidden">
      {/* Left Column (5 cols): 5 Big Clickable Major Cards */}
      <div className="col-span-5 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-1">
            SLIDE 01 · EKOSISTEM DEPARTEMEN MATEMATIKA FMIPA
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight">
            5 Cabang Keilmuan Utama
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2.5 my-3">
          {majors.map((major, idx) => {
            const isSelected = major.id === selectedMajorId;
            return (
              <button
                key={major.id}
                onClick={() => onSelectMajor(major.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: major.accentHex }}
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-lg xl:text-xl font-bold text-white truncate">
                      {major.name}
                    </span>
                  </div>
                  <div className="text-xs xl:text-sm text-slate-300 truncate mt-0.5">
                    {major.tagline}
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono tabular-nums">
                  <div className="text-xs text-slate-400">UTBK Aman</div>
                  <div className="text-sm xl:text-base font-bold text-cyan-300">
                    {major.specialRequirements.utbkAvgRange[0]}–{major.specialRequirements.utbkAvgRange[1]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Klik jurusan untuk bedah detail</span>
          <span>Gunakan panah &larr; &rarr; untuk pindah slide</span>
        </div>
      </div>

      {/* Right Column (7 cols): Oversized Classroom Spotlight of Selected Major */}
      <div className="col-span-7 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-6 overflow-hidden">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className="text-sm font-mono font-bold"
              style={{ color: activeMajor.accentHex }}
            >
              SOROTAN UTAMA · {activeMajor.degreeTitle.toUpperCase()}
            </span>
            <span className="text-sm font-mono text-slate-400 tabular-nums">
              144 SKS · 8 Semester
            </span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-2">
            {activeMajor.name}
          </h2>
          <p className="text-lg xl:text-xl text-slate-200 font-medium leading-snug">
            {activeMajor.generalOverview}
          </p>
        </div>

        {/* 2 Key Highlight Boxes */}
        <div className="grid grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 mb-1.5">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Objek Kajian Inti</span>
            </div>
            <div className="text-base xl:text-lg font-semibold text-white leading-snug">
              {activeMajor.coreObjectOfStudy}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-1.5">
              <Layers className="w-4 h-4 shrink-0" />
              <span>Ciri Pembeda Utama</span>
            </div>
            <div className="text-base xl:text-lg font-semibold text-white leading-snug">
              {activeMajor.keyDifferentiator}
            </div>
          </div>
        </div>

        {/* 4 Big Percentage DNA Metrics */}
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Komposisi Karakteristik Perkuliahan
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Abstraksi Rumus</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-indigo-400 tabular-nums">
                {activeMajor.specialRequirements.mathAbstraction}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Porsi Koding</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-rose-400 tabular-nums">
                {activeMajor.specialRequirements.codingIntensity}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Finansial &amp; Bisnis</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                {activeMajor.specialRequirements.businessFinanceFocus}%
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Rekayasa Data</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
                {activeMajor.specialRequirements.dataEngineeringFocus}%
              </div>
            </div>
          </div>
        </div>

        {/* 3 Concise Ideal Student Bullets & CTA */}
        <div className="flex items-end justify-between gap-4 pt-3 border-t border-slate-800">
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-slate-400">COCOK UNTUK SISWA YANG:</div>
            {activeMajor.idealStudentTraits.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm xl:text-base font-medium text-slate-100"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{trait}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onJumpToSlide(1)}
            className="px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Lihat Syarat Seleksi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
