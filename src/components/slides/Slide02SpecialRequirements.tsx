import React from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import {
  UTBK_7_SUBTESTS_META,
  UTBK_MAJOR_SUBTEST_WEIGHTS,
} from '../../data/ptnRealMediaData';
import { Award, CheckCircle2, GraduationCap, ShieldAlert, ArrowRight } from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';
import { SemiCircleGaugeSvg } from '../ui/MajorVisualSvg';

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
  const avgUtbkMid = Math.round(
    (activeMajor.specialRequirements.utbkAvgRange[0] +
      activeMajor.specialRequirements.utbkAvgRange[1]) /
      2
  );
  const weightProfile =
    UTBK_MAJOR_SUBTEST_WEIGHTS[activeMajor.id] || UTBK_MAJOR_SUBTEST_WEIGHTS.matematika;

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Slide Header & Major Quick Tabs */}
      <motion.div
        variants={staggerCardVariants}
        className="flex items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 02 · PERSYARATAN KHUSUS SELEKSI MASUK (SNBP &amp; 7 SUBTES UTBK-SNBT)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Standar Skor &amp; Bobot Subtes: {activeMajor.name}
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

      {/* Row 1: 3 Giant UTBK Score Cards with Semi-Circular SVG Gauges */}
      <motion.div
        variants={staggerCardVariants}
        key={`kpi-${activeMajor.id}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-3 gap-5 shrink-0"
      >
        {/* Card 1: Composite Safe Range */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 xl:p-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-mono text-slate-400 uppercase">
              Rentang Skor Aman UTBK
            </div>
            <div
              className="text-3xl xl:text-4xl font-extrabold font-mono tabular-nums my-1.5"
              style={{ color: activeMajor.accentHex }}
            >
              {activeMajor.specialRequirements.utbkAvgRange[0]}–{activeMajor.specialRequirements.utbkAvgRange[1]}
            </div>
            <div className="text-xs xl:text-sm text-slate-300">
              Estimasi Indeks &amp; Rerata Top 10 PTN
            </div>
          </div>

          <SemiCircleGaugeSvg
            value={avgUtbkMid}
            min={450}
            max={850}
            colorHex={activeMajor.accentHex}
            displayText={`${avgUtbkMid}`}
            label="Rerata Aman"
          />
        </div>

        {/* Card 2: Penalaran Matematika */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 xl:p-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-mono text-slate-400 uppercase">
              Target Penalaran Matematika (PM)
            </div>
            <div className="text-3xl xl:text-4xl font-extrabold font-mono text-cyan-400 tabular-nums my-1.5">
              &ge; {activeMajor.specialRequirements.minMathReasoning}
            </div>
            <div className="text-xs xl:text-sm text-slate-300">
              20 Soal · Bobot Prodi {Math.round(weightProfile.weights.pm * 100)}%
            </div>
          </div>

          <SemiCircleGaugeSvg
            value={activeMajor.specialRequirements.minMathReasoning}
            min={450}
            max={850}
            colorHex="#22D3EE"
            displayText={`${activeMajor.specialRequirements.minMathReasoning}+`}
            label="20 Soal PM"
          />
        </div>

        {/* Card 3: Pengetahuan Kuantitatif */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 xl:p-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-mono text-slate-400 uppercase">
              Target Pengetahuan Kuantitatif (PK)
            </div>
            <div className="text-3xl xl:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums my-1.5">
              &ge; {activeMajor.specialRequirements.minQuantitative}
            </div>
            <div className="text-xs xl:text-sm text-slate-300">
              20 Soal · Bobot Prodi {Math.round(weightProfile.weights.pk * 100)}%
            </div>
          </div>

          <SemiCircleGaugeSvg
            value={activeMajor.specialRequirements.minQuantitative}
            min={450}
            max={850}
            colorHex="#34D399"
            displayText={`${activeMajor.specialRequirements.minQuantitative}+`}
            label="20 Soal PK"
          />
        </div>
      </motion.div>

      {/* Row 2: 3 Concise Requirement Cards + Official 7-Subtest Priority Breakdown & Key Points */}
      <motion.div
        variants={staggerCardVariants}
        className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch overflow-hidden"
      >
        <div className="col-span-7 grid grid-cols-3 gap-4 items-stretch">
          {/* SNBP Supporting Subjects with Visual Weight Bars */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <GraduationCap className="w-7 h-7 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 font-bold">JALUR SNBP</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">
                Mapel Pendukung SNBP
              </h3>
              <div className="space-y-3">
                {activeMajor.specialRequirements.snbpSupportingSubjects.map((sub, i) => {
                  const weightPct = i === 0 ? 100 : i === 1 ? 82 : 68;
                  const roleLabel = i === 0 ? 'Utama #1' : i === 1 ? 'Pendukung #2' : 'Pendukung #3';
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs xl:text-sm font-mono">
                        <span className="text-cyan-300 font-semibold truncate">
                          0{i + 1}. {sub}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">{roleLabel}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${weightPct}%` }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="h-full bg-cyan-400"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 my-2">
              <div className="text-[11px] font-mono text-slate-400">KOMPONEN PENILAIAN RAPOR</div>
              <div className="text-xs xl:text-sm font-bold text-slate-100 mt-0.5">
                Min. 50% Rerata Seluruh Mapel + Maks. 50% Mapel Pendukung
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/80">
              Kepmendikdasmen No. 102/M/2025
            </div>
          </div>

          {/* Physical & Health Requirements with SVG Medical/Vision Graphic */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <ShieldAlert className="w-7 h-7 text-emerald-400" />
                <svg viewBox="0 0 64 24" className="w-16 h-6">
                  <circle cx="12" cy="12" r="8" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="1.5" />
                  <circle cx="32" cy="12" r="8" fill="#06B6D4" fillOpacity="0.25" stroke="#06B6D4" strokeWidth="1.5" />
                  <circle cx="52" cy="12" r="8" fill="#6366F1" fillOpacity="0.25" stroke="#6366F1" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Ketentuan Fisik &amp; Kesehatan
              </h3>
              <p className="text-sm xl:text-base font-medium text-slate-200 leading-snug">
                {activeMajor.specialRequirements.physicalAndHealthNotes}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 my-2">
              <div className="text-[11px] font-mono text-emerald-400">VERIFIKASI TES KESEHATAN PTN</div>
              <div className="text-xs xl:text-sm font-bold text-slate-100 mt-0.5">
                Buta Warna Parsial &amp; Total Diperbolehkan di 10 PTN
              </div>
            </div>

            <div className="text-xs text-emerald-400 font-mono pt-2 border-t border-slate-800/80">
              ✓ Bebas Syarat Buta Warna
            </div>
          </div>

          {/* Certification & Portfolio with Visual Badge */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Award className="w-7 h-7 text-amber-400" />
                <span className="text-xs font-mono text-amber-400 font-bold">PAI / OSN</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Sertifikasi &amp; Portofolio
              </h3>
              <p className="text-sm xl:text-base font-medium text-slate-200 leading-snug">
                {activeMajor.specialRequirements.certificationOrSpecialTest}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 my-2">
              <div className="text-[11px] font-mono text-amber-400">PRESTASI PENDUKUNG SNBP</div>
              <div className="text-xs xl:text-sm font-bold text-slate-100 mt-0.5">
                Piagam OSN/KSN, Kompetisi Statistika/Coding &amp; Karya Ilmiah
              </div>
            </div>

            <div className="text-xs text-amber-300 font-mono pt-2 border-t border-slate-800/80">
              ★ Keunggulan Karier Lulusan
            </div>
          </div>
        </div>

        {/* Key Highlights Box + Dynamic 7-Subtest Priority Breakdown (5 cols) */}
        <div className="col-span-5 bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          {/* Dynamic 7-Subtest UTBK Weight Bar per Selected Major */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>ESTIMASI BOBOT 7 SUBTES UTBK ({activeMajor.shortName.toUpperCase()})</span>
              <span className="text-cyan-400 font-bold">160 Soal · IRT</span>
            </div>

            {/* 7-Segment Proportional Stacked Bar */}
            <div className="w-full h-3 rounded-sm overflow-hidden flex gap-0.5 bg-slate-900">
              {UTBK_7_SUBTESTS_META.map((sub) => {
                const wPct = Math.round((weightProfile.weights[sub.id] || 0) * 100);
                return (
                  <div
                    key={sub.id}
                    className="h-full transition-all duration-300"
                    style={{ width: `${wPct}%`, backgroundColor: sub.accentHex }}
                    title={`${sub.name}: ${wPct}%`}
                  />
                );
              })}
            </div>

            {/* 7 Subtest Badges with Major-Specific Weight % */}
            <div className="grid grid-cols-7 gap-1 mt-2 text-center font-mono">
              {UTBK_7_SUBTESTS_META.map((sub) => {
                const wPct = Math.round((weightProfile.weights[sub.id] || 0) * 100);
                return (
                  <div
                    key={sub.id}
                    className="px-1 py-1 rounded bg-slate-900 border border-slate-800/90"
                  >
                    <div
                      className="text-[10px] font-extrabold"
                      style={{ color: sub.accentHex }}
                    >
                      {sub.code}
                    </div>
                    <div className="text-[10px] text-slate-200 font-bold tabular-nums">
                      {wPct}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-center my-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
              RINGKASAN FAKTA &amp; PRIORITAS SELEKSI PRODI
            </div>
            <div className="flex-1 min-h-0 flex flex-col justify-between gap-2">
              {activeMajor.teacherTalkingPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-100 leading-snug">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 shrink-0">
            <a
              href="https://snpmb.bppp.kemdikbud.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Sumber Resmi: BPPP Kemendikbudristek &amp; Portal SNPMB ↗</span>
            </a>
            <button
              onClick={() => onJumpToSlide(2)}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Buka Peta Kurikulum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
