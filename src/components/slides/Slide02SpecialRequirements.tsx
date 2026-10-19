import React from 'react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { Award, CheckCircle2, GraduationCap, ShieldAlert, ArrowRight } from 'lucide-react';

interface Slide02SpecialRequirementsProps {
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
  onJumpToSlide: (slideIndex: number) => void;
}

export const Slide02SpecialRequirements: React.FC<Slide02SpecialRequirementsProps> = ({
  majors,
  selectedMajorId,
  onSelectMajor,
  onJumpToSlide,
}) => {
  const activeMajor = majors.find((m) => m.id === selectedMajorId) || majors[0];

  return (
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Slide Header & Major Quick Tabs */}
      <div className="flex items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-4 shrink-0">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 02 · PERSYARATAN KHUSUS SELEKSI MASUK (SNBP &amp; UTBK-SNBT)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Standar Skor &amp; Prasyarat: {activeMajor.name}
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

      {/* Row 1: 3 Giant UTBK Score Cards */}
      <div className="grid grid-cols-3 gap-5 shrink-0">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 uppercase">
            Rentang Skor Aman UTBK (Top 10 PTN)
          </div>
          <div
            className="text-4xl xl:text-5xl font-extrabold font-mono tabular-nums my-2"
            style={{ color: activeMajor.accentHex }}
          >
            {activeMajor.specialRequirements.utbkAvgRange[0]}–{activeMajor.specialRequirements.utbkAvgRange[1]}
          </div>
          <div className="text-sm text-slate-300">
            Skor komposit tertimbang skala 1000
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 uppercase">
            Target Minimum Penalaran Matematika
          </div>
          <div className="text-4xl xl:text-5xl font-extrabold font-mono text-cyan-400 tabular-nums my-2">
            &ge; {activeMajor.specialRequirements.minMathReasoning}
          </div>
          <div className="text-sm text-slate-300">
            Subtes bobot tertinggi di FMIPA (38%)
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 uppercase">
            Target Minimum Pengetahuan Kuantitatif
          </div>
          <div className="text-4xl xl:text-5xl font-extrabold font-mono text-emerald-400 tabular-nums my-2">
            &ge; {activeMajor.specialRequirements.minQuantitative}
          </div>
          <div className="text-sm text-slate-300">
            Subtes bobot kedua tertinggi (32%)
          </div>
        </div>
      </div>

      {/* Row 2: 3 Concise Requirement Cards + Teacher Key Points */}
      <div className="flex-1 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        <div className="col-span-7 grid grid-cols-3 gap-4 items-stretch">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <GraduationCap className="w-7 h-7 text-cyan-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                Mapel Pendukung SNBP
              </h3>
              <div className="space-y-1.5">
                {activeMajor.specialRequirements.snbpSupportingSubjects.map((sub, i) => (
                  <div
                    key={i}
                    className="text-sm xl:text-base font-mono text-cyan-300 font-semibold"
                  >
                    0{i + 1}. {sub}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Sesuai Kepmendikbudristek
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <ShieldAlert className="w-7 h-7 text-emerald-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                Ketentuan Fisik &amp; Kesehatan
              </h3>
              <p className="text-base xl:text-lg font-medium text-slate-200 leading-snug">
                {activeMajor.specialRequirements.physicalAndHealthNotes}
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Tanpa tes kesamaptaan fisik
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <Award className="w-7 h-7 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                Sertifikasi &amp; Portofolio
              </h3>
              <p className="text-base xl:text-lg font-medium text-slate-200 leading-snug">
                {activeMajor.specialRequirements.certificationOrSpecialTest}
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Keunggulan karier lulusan
            </div>
          </div>
        </div>

        {/* Teacher Key Points Box (5 cols) */}
        <div className="col-span-5 bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              POIN KUNCI SOSIALISASI GURU
            </div>
            <div className="space-y-3">
              {activeMajor.teacherTalkingPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-base xl:text-lg font-medium text-slate-100 leading-snug">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <span className="text-xs font-mono text-slate-400">
              Lanjut ke mata kuliah per tahun
            </span>
            <button
              onClick={() => onJumpToSlide(2)}
              className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Buka Peta Kurikulum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
