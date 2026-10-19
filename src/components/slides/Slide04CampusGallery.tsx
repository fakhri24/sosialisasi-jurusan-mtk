import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile, UniversityPTN } from '../../data/mathFmipaData';
import { PTN_WEB_DIRECTORY } from '../../data/ptnRealMediaData';
import {
  ArrowUpRight,
  ExternalLink,
  Globe,
  Sparkles,
} from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';
import { HoverReveal } from '../ui/HoverReveal';
import { LabVectorIconSvg, PtnCampusBannerSvg } from '../ui/MajorVisualSvg';

interface Slide04CampusGalleryProps {
  universities: UniversityPTN[];
  majors: MajorProfile[];
  selectedMajorId: MajorId;
  onSelectMajor: (id: MajorId) => void;
  onJumpToPredictor: (ptnId: string, majorId: MajorId) => void;
}

export const Slide04CampusGallery: React.FC<Slide04CampusGalleryProps> = ({
  universities,
  majors,
  onJumpToPredictor,
}) => {
  const [selectedPtnId, setSelectedPtnId] = useState<string>('ui');

  const activeUni =
    universities.find((u) => u.id === selectedPtnId) || universities[0];
  const webInfo = PTN_WEB_DIRECTORY[activeUni.id] || PTN_WEB_DIRECTORY.ui;

  const totalPtnQuota = activeUni.programs.reduce((acc, p) => acc + p.dayaTampung2026, 0);
  const totalPtnApplicants = activeUni.programs.reduce((acc, p) => acc + p.peminat2025, 0);
  const avgPtnScore = Math.round(
    activeUni.programs.reduce((acc, p) => acc + p.passingGradeHistory.projected2026, 0) /
      Math.max(1, activeUni.programs.length)
  );

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Header & 10 PTN Quick-Click Selector Buttons */}
      <motion.div
        variants={staggerCardVariants}
        className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 06 · DIREKTORI 10 PTN UNGGULAN, ARSITEKTUR KAMPUS &amp; TAUTAN RESMI FASILITAS
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            {activeUni.code} · {activeUni.name}
          </h1>
        </div>

        {/* 10 PTN Instant Selector Bar (No Vertical Scroll Needed) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
          {universities.map((uni) => {
            const active = uni.id === activeUni.id;
            return (
              <button
                key={uni.id}
                onClick={() => setSelectedPtnId(uni.id)}
                className={`px-3 py-1.5 text-sm font-mono font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {uni.code}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Split: Left (6 cols) = Pure SVG Campus Vector + Official Web Links, Right (6 cols) = Programs */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (6 cols) */}
        <motion.div
          variants={staggerCardVariants}
          key={`campus-left-${activeUni.id}`}
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="col-span-6 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden"
        >
          {/* Pure Vector Architectural SVG Banner for All 10 PTNs (Zero Mismatched Photos) */}
          <div className="relative h-48 xl:h-52 w-full bg-slate-950 border-b border-slate-800 overflow-hidden shrink-0">
            <PtnCampusBannerSvg
              ptnId={activeUni.id}
              ptnCode={activeUni.code}
              city={activeUni.city}
              establishedYear={activeUni.establishedYear}
              facultyName={activeUni.facultyName}
              landmarkLabel={webInfo.architecturalLandmarkLabel}
            />
          </div>

          {/* Campus Environment + Official Exploration Links + Lab Facilities with Vector SVG & Web Links */}
          <div className="p-4 xl:p-5 flex-1 min-h-0 flex flex-col justify-between gap-2.5">
            {/* Environment Description + 3 Official Exploration Web Links */}
            <div className="shrink-0">
              <h2 className="text-sm xl:text-base font-extrabold text-white truncate mb-1">
                {activeUni.campusEnvironmentDesc}
              </h2>
              <p className="text-xs xl:text-sm text-slate-300 leading-snug mb-2.5">
                {activeUni.departmentBuildingHighlight}
              </p>

              {/* Official Exploration Links Strip (Links Only, No Photos) */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={webInfo.officialUniversityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Web {activeUni.code}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={webInfo.officialFacultyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Portal {activeUni.facultyName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={webInfo.officialDepartmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Web Departemen &amp; Lab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 3 Laboratory Facility Rows with General Vector SVG Emblem & Official Exploration Link */}
            <div className="flex-1 min-h-0 flex flex-col justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5 shrink-0">
                <span className="text-emerald-400 font-bold uppercase">
                  FASILITAS LABORATORIUM &amp; PUSAT RISET UTAMA:
                </span>
                <span className="text-slate-400">Ikon Vektor + Tautan Resmi</span>
              </div>

              <div className="flex-1 min-h-0 flex flex-col gap-1.5">
                {webInfo.facilities.map((fac, idx) => (
                  <div
                    key={idx}
                    className="flex-1 min-h-0 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-slate-800/90 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <LabVectorIconSvg svgType={fac.svgType} />
                      <div className="min-w-0 flex-1">
                        <HoverReveal
                          text={fac.name}
                          className="text-xs xl:text-sm font-bold text-white truncate"
                        />
                        <div className="text-[11px] font-mono text-slate-400 truncate">
                          Fokus Riset: <span className="text-cyan-300">{fac.focusTag}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={fac.exploreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 transition-colors shrink-0"
                      title={`Eksplorasi halaman resmi ${fac.name}`}
                    >
                      <span>Web Lab</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Zone (6 cols): Campus KPI Summary + Flex-1 Available Programs Cards with Direct Links */}
        <motion.div
          variants={staggerCardVariants}
          key={`campus-right-${activeUni.id}`}
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04 }}
          className="col-span-6 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          <div className="shrink-0">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <h2 className="text-lg xl:text-xl font-extrabold text-white">
                Program Studi di {activeUni.code} ({activeUni.programs.length} Cabang)
              </h2>
              <a
                href={webInfo.officialAdmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5 transition-colors"
              >
                <span>Portal Admisi {activeUni.code}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3 Campus-Wide KPI Summary Boxes */}
            <div className="grid grid-cols-3 gap-3 mt-2.5">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Kuota SNBT</span>
                <span className="text-base xl:text-lg font-mono font-extrabold text-white tabular-nums">
                  {totalPtnQuota} Kursi
                </span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Total Peminat</span>
                <span className="text-base xl:text-lg font-mono font-extrabold text-cyan-400 tabular-nums">
                  {totalPtnApplicants.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Rerata UTBK</span>
                <span className="text-base xl:text-lg font-mono font-extrabold text-emerald-400 tabular-nums">
                  {avgPtnScore}
                </span>
              </div>
            </div>
          </div>

          {/* Flex-1 Program Rows with 12-Column Internal Balance + Direct Program Website Link */}
          <div className="flex-1 min-h-0 flex flex-col gap-2.5 my-2.5">
            {activeUni.programs.map((prog) => {
              const m = majors.find((mj) => mj.id === prog.majorId);
              const ratioOneTo = Math.round(
                prog.peminat2025 / Math.max(1, prog.dayaTampung2026)
              );
              const scorePct = Math.min(
                100,
                Math.max(25, ((prog.passingGradeHistory.projected2026 - 600) / 170) * 100)
              );
              const progUrl =
                webInfo.programExploreUrls[prog.majorId] ||
                webInfo.officialDepartmentUrl;

              return (
                <div
                  key={prog.majorId}
                  onClick={() => onJumpToPredictor(activeUni.id, prog.majorId)}
                  className="flex-1 min-h-0 px-4 py-2.5 rounded-xl bg-slate-900/85 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-5 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ backgroundColor: m?.accentHex }}
                      />
                      <HoverReveal
                        text={prog.programNameOfficial}
                        className="text-base xl:text-lg font-extrabold text-white truncate"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <HoverReveal
                        text={`${prog.facultyDepartment} · ${prog.accreditation}`}
                        className="text-xs text-slate-400 font-mono truncate"
                      />
                      <a
                        href={progUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 shrink-0 underline underline-offset-2"
                        title={`Buka website resmi ${prog.programNameOfficial} ${activeUni.code}`}
                      >
                        <span>Web Prodi</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  <div className="col-span-7 flex items-center justify-end gap-4 font-mono tabular-nums pl-3 border-l border-slate-800/90">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Kuota / Peminat</div>
                      <div className="text-sm xl:text-base font-bold text-slate-100">
                        {prog.dayaTampung2026}{' '}
                        <span className="text-xs text-slate-400">
                          / {prog.peminat2025.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Keketatan</div>
                      <div className="text-sm xl:text-base font-bold text-cyan-400">
                        {prog.keketatan2025Percent.toFixed(2)}%{' '}
                        <span className="text-[11px] text-slate-400">(1:{ratioOneTo})</span>
                      </div>
                    </div>

                    <div className="text-right w-24">
                      <div className="text-[11px] text-slate-400">Skor UTBK</div>
                      <div className="text-sm xl:text-base font-extrabold text-emerald-400">
                        {prog.passingGradeHistory.projected2026}
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-sm overflow-hidden mt-0.5">
                        <div
                          className="h-full"
                          style={{
                            width: `${scorePct}%`,
                            backgroundColor: m?.accentHex || '#10B981',
                          }}
                        />
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-cyan-400 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Klik baris prodi untuk uji 7 subtes UTBK atau klik &ldquo;Web Prodi / Web Lab&rdquo; untuk eksplorasi mandiri</span>
            </span>
            <span>SNPMB 2025/2026</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
