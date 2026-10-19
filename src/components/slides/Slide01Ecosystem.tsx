import React from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile } from '../../data/mathFmipaData';
import { MAJOR_WEB_LINKS } from '../../data/ptnRealMediaData';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';
import { MajorDomainIllustration, MajorRadarSvg } from '../ui/MajorVisualSvg';

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
  const majorLinks = MAJOR_WEB_LINKS[activeMajor.id];

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full grid grid-cols-12 gap-5 items-stretch overflow-hidden"
    >
      {/* Left Column (5 cols): 5 Equal-Height Flex-1 Major Cards (Zero Dead Vertical Space) */}
      <motion.div
        variants={staggerCardVariants}
        className="col-span-5 flex flex-col bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
      >
        <div className="shrink-0 mb-3">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-0.5">
            SLIDE 01 · EKOSISTEM DEPARTEMEN MATEMATIKA FMIPA
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight">
            5 Cabang Keilmuan Utama
          </h1>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-2.5">
          {majors.map((major, idx) => {
            const isSelected = major.id === selectedMajorId;
            const utbkMid =
              (major.specialRequirements.utbkAvgRange[0] +
                major.specialRequirements.utbkAvgRange[1]) /
              2;
            const barPct = Math.min(100, Math.max(25, ((utbkMid - 580) / 200) * 100));
            const degreeCode =
              major.degreeTitle.match(/\(([^)]+)\)/)?.[1] || 'S.Si.';

            return (
              <button
                key={major.id}
                onClick={() => onSelectMajor(major.id)}
                className={`relative flex-1 min-h-0 w-full text-left px-4 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-4 overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/95 border-cyan-400 shadow-md'
                    : 'bg-slate-900/75 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                {/* Left Accent Bar */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{
                    backgroundColor: isSelected ? major.accentHex : major.accentHex + '55',
                  }}
                />

                <div className="min-w-0 flex-1 pl-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-mono font-extrabold"
                      style={{ color: major.accentHex }}
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-lg xl:text-xl font-extrabold text-white truncate">
                      {major.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      · {degreeCode}
                    </span>
                  </div>
                  <div className="text-xs xl:text-sm text-slate-300 truncate mt-0.5">
                    {major.tagline}
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono tabular-nums w-32 pl-3 border-l border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Skor UTBK Aman</div>
                  <div className="text-sm xl:text-base font-extrabold text-cyan-300">
                    {major.specialRequirements.utbkAvgRange[0]}–{major.specialRequirements.utbkAvgRange[1]}
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-sm overflow-hidden mt-1">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${barPct}%`, backgroundColor: major.accentHex }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Right Column (7 cols): Balanced Proportional Spotlight with Pure Vector SVG & Official Web Links */}
      <motion.div
        variants={staggerCardVariants}
        key={activeMajor.id}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-7 flex flex-col justify-between gap-3.5 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 overflow-hidden"
      >
        {/* Top Hero Row: Single-Line Kicker + Title + Pure Vector Domain SVG + Official Web Links */}
        <div className="grid grid-cols-12 gap-5 items-center shrink-0">
          <div className="col-span-7">
            <div className="flex items-center gap-2 mb-1 whitespace-nowrap overflow-hidden">
              <span
                className="text-xs xl:text-sm font-mono font-extrabold truncate"
                style={{ color: activeMajor.accentHex }}
              >
                SOROTAN UTAMA · {activeMajor.degreeTitle.toUpperCase()}
              </span>
              <span className="text-slate-600 shrink-0">·</span>
              <span className="text-xs font-mono text-slate-400 tabular-nums shrink-0">
                144 SKS (8 Sem)
              </span>
            </div>

            <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-1.5 tracking-tight">
              {activeMajor.name}
            </h2>
            <p className="text-sm xl:text-base text-slate-200 font-medium leading-snug mb-2.5">
              {activeMajor.generalOverview}
            </p>

            {/* Official Association & Department Reference Web Links (No Photos) */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={majorLinks.associationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{majorLinks.associationName}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={majorLinks.snpmbCurriculumRef}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Web Referensi Departemen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Showcase Box (5 cols): Pure Animated Domain Vector SVG */}
          <div className="col-span-5 h-36 xl:h-40 rounded-xl bg-slate-950/90 border border-slate-800/90 p-2.5 flex items-center justify-center relative overflow-hidden">
            <MajorDomainIllustration
              majorId={activeMajor.id}
              accentHex={activeMajor.accentHex}
            />
          </div>
        </div>

        {/* 3 Pillar Highlight Cards (Fills Full Horizontal Width Cleanly) */}
        <div className="grid grid-cols-3 gap-3.5 shrink-0">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase mb-1">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Objek Kajian Inti</span>
            </div>
            <div className="text-sm xl:text-base font-bold text-white leading-snug">
              {activeMajor.coreObjectOfStudy}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase mb-1">
              <Layers className="w-4 h-4 shrink-0" />
              <span>Ciri Pembeda Utama</span>
            </div>
            <div className="text-sm xl:text-base font-bold text-white leading-snug">
              {activeMajor.keyDifferentiator}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase mb-1">
              <Award className="w-4 h-4 shrink-0" />
              <span>Keunggulan Seleksi &amp; Karier</span>
            </div>
            <div className="text-sm xl:text-base font-bold text-white leading-snug">
              {activeMajor.specialRequirements.certificationOrSpecialTest}
            </div>
          </div>
        </div>

        {/* Flex-1 DNA Radar Chart + 4 Detailed Progress Cards */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-4 items-center bg-slate-950/75 border border-slate-800/90 rounded-2xl p-4">
          <div className="col-span-4 h-full max-h-40 flex items-center justify-center border-r border-slate-800/80 pr-3">
            <MajorRadarSvg
              mathAbstraction={activeMajor.specialRequirements.mathAbstraction}
              codingIntensity={activeMajor.specialRequirements.codingIntensity}
              businessFinanceFocus={activeMajor.specialRequirements.businessFinanceFocus}
              dataEngineeringFocus={activeMajor.specialRequirements.dataEngineeringFocus}
              accentHex={activeMajor.accentHex}
            />
          </div>

          <div className="col-span-8 h-full grid grid-cols-2 gap-3 items-stretch">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs xl:text-sm font-bold text-white">Abstraksi Rumus</div>
                  <div className="text-[11px] text-slate-400">Pembuktian &amp; Teorema</div>
                </div>
                <span className="font-mono font-extrabold text-lg xl:text-xl text-indigo-400 tabular-nums">
                  {activeMajor.specialRequirements.mathAbstraction}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeMajor.specialRequirements.mathAbstraction}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-indigo-400"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs xl:text-sm font-bold text-white">Porsi Koding</div>
                  <div className="text-[11px] text-slate-400">Python, R &amp; Algoritma</div>
                </div>
                <span className="font-mono font-extrabold text-lg xl:text-xl text-rose-400 tabular-nums">
                  {activeMajor.specialRequirements.codingIntensity}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeMajor.specialRequirements.codingIntensity}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-rose-400"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs xl:text-sm font-bold text-white">Finansial &amp; Bisnis</div>
                  <div className="text-[11px] text-slate-400">Valuasi Risiko &amp; Ekonomi</div>
                </div>
                <span className="font-mono font-extrabold text-lg xl:text-xl text-emerald-400 tabular-nums">
                  {activeMajor.specialRequirements.businessFinanceFocus}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeMajor.specialRequirements.businessFinanceFocus}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-emerald-400"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs xl:text-sm font-bold text-white">Rekayasa Data</div>
                  <div className="text-[11px] text-slate-400">Database SQL &amp; Big Data</div>
                </div>
                <span className="font-mono font-extrabold text-lg xl:text-xl text-amber-400 tabular-nums">
                  {activeMajor.specialRequirements.dataEngineeringFocus}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeMajor.specialRequirements.dataEngineeringFocus}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ideal Student Bullets (2-Column Balanced Grid) & CTA */}
        <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-slate-800 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider mb-1">
              PROFIL &amp; KARAKTERISTIK SISWA IDEAL:
            </div>
            <div className="grid grid-cols-2 gap-3">
              {activeMajor.idealStudentTraits.map((trait, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs xl:text-sm font-medium text-slate-100 min-w-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onJumpToSlide(1)}
            className="px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Lihat Syarat Seleksi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
