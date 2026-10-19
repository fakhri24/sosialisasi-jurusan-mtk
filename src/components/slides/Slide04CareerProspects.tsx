import React from 'react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { ArrowRight, Briefcase, TrendingUp } from 'lucide-react';

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
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Header & Major Selector */}
      <div className="flex items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-4 shrink-0">
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
      </div>

      {/* 2x2 Big Career Cards Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-5 items-stretch overflow-hidden">
        {activeMajor.careers.slice(0, 4).map((career, idx) => (
          <div
            key={idx}
            className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>0{idx + 1} · {career.industry}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-mono font-bold text-emerald-400 tabular-nums">
                  <TrendingUp className="w-4 h-4" />
                  <span>Tumbuh {career.demandGrowth2030}</span>
                </div>
              </div>

              <h2 className="text-2xl xl:text-3xl font-extrabold text-white mb-2">
                {career.role}
              </h2>

              <div className="text-base xl:text-lg text-slate-300 font-medium">
                Keahlian Kunci: <span className="text-cyan-300 font-semibold">{career.coreSkill}</span>
              </div>
            </div>

            {/* Salary Comparison Strip */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/90 mt-3">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Estimasi Fresh Graduate
                </div>
                <div className="text-xl xl:text-2xl font-extrabold font-mono text-slate-100 tabular-nums mt-0.5">
                  {career.entrySalaryRp}/bln
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Level Senior / Lead
                </div>
                <div className="text-xl xl:text-2xl font-extrabold font-mono text-emerald-400 tabular-nums mt-0.5">
                  {career.seniorSalaryRp}/bln
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary & CTA */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
        <div className="text-sm xl:text-base text-slate-300 font-medium">
          Daya Serap Lulusan FMIPA Departemen Matematika: <strong className="text-emerald-400 font-mono tabular-nums">&gt;88% Bekerja &lt; 6 Bulan Lulus</strong>
        </div>

        <button
          onClick={() => onJumpToSlide(4)}
          className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Lihat Evolusi Lintas Zaman</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
