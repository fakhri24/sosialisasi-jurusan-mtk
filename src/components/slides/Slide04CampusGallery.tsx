import React, { useState } from 'react';
import { MajorId, MajorProfile, UniversityPTN } from '../../data/mathFmipaData';
import { ArrowUpRight, Building2, CheckCircle, MapPin } from 'lucide-react';

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
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const activeUni =
    universities.find((u) => u.id === selectedPtnId) || universities[0];

  return (
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Header & 10 PTN Quick-Click Selector Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 06 · DIREKTORI 10 PTN UNGGULAN &amp; LINGKUNGAN DEPARTEMEN KAMPUS
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
      </div>

      {/* Main Split: Left (6 cols) = Campus Architectural Photo & Labs, Right (6 cols) = Available Programs */}
      <div className="flex-1 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (6 cols) */}
        <div className="col-span-6 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden">
          {/* Campus Visual Banner */}
          <div className="relative h-60 xl:h-68 w-full bg-slate-950 border-b border-slate-800 overflow-hidden shrink-0">
            {!imageError[activeUni.id] ? (
              <img
                src={activeUni.campusImageSvgUri}
                alt={`Gedung Departemen Matematika dan Lingkungan Kampus ${activeUni.name}`}
                referrerPolicy="no-referrer"
                onError={() =>
                  setImageError((prev) => ({ ...prev, [activeUni.id]: true }))
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-6 text-center">
                <Building2 className="w-10 h-10 text-cyan-400 mb-2" />
                <div className="text-xl font-bold text-white">{activeUni.name}</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
              <div className="flex items-center gap-2 text-xs xl:text-sm font-mono text-cyan-300">
                <MapPin className="w-4 h-4" />
                <span>{activeUni.city}</span>
                <span aria-hidden="true">·</span>
                <span>Berdiri {activeUni.establishedYear}</span>
              </div>
              <span className="text-xs font-mono text-slate-200 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded">
                {activeUni.facultyName}
              </span>
            </div>
          </div>

          {/* Concise Campus Environment & Lab Highlights */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-base xl:text-lg font-bold text-white mb-1">
                {activeUni.campusEnvironmentDesc}
              </h2>
              <p className="text-sm xl:text-base text-slate-300">
                {activeUni.departmentBuildingHighlight}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs font-mono text-emerald-400 uppercase mb-2">
                Fasilitas Laboratorium Utama:
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {activeUni.labFacilities.slice(0, 3).map((lab, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm xl:text-base font-medium text-slate-100"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{lab}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone (6 cols): Available Programs Cards */}
        <div className="col-span-6 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
            <h2 className="text-lg xl:text-xl font-extrabold text-white">
              Program Studi Tersedia di {activeUni.code} ({activeUni.programs.length} Prodi)
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Klik kartu untuk uji peluang UTBK
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
            {activeUni.programs.map((prog) => {
              const m = majors.find((mj) => mj.id === prog.majorId);
              return (
                <div
                  key={prog.majorId}
                  onClick={() => onJumpToPredictor(activeUni.id, prog.majorId)}
                  className="px-4 py-3 rounded-xl bg-slate-900/85 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ backgroundColor: m?.accentHex }}
                      />
                      <span className="text-base xl:text-lg font-extrabold text-white truncate">
                        {prog.programNameOfficial}
                      </span>
                    </div>
                    <div className="text-xs xl:text-sm text-slate-400 font-mono mt-0.5">
                      {prog.facultyDepartment} · {prog.accreditation}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 shrink-0 font-mono tabular-nums">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Kuota</div>
                      <div className="text-base xl:text-lg font-bold text-slate-100">
                        {prog.dayaTampung2026}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Keketatan</div>
                      <div className="text-base xl:text-lg font-bold text-cyan-400">
                        {prog.keketatan2025Percent.toFixed(2)}%
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Skor UTBK</div>
                      <div className="text-base xl:text-lg font-extrabold text-emerald-400">
                        {prog.passingGradeHistory.projected2026}
                      </div>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ITS &amp; IPB membuka hampir seluruh 5 cabang secara mandiri</span>
            <span>Data Resmi SNPMB 2025/2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
