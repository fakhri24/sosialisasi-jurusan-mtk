import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MajorId, MajorProfile, UniversityPTN } from '../../data/mathFmipaData';
import { ChevronLeft, ChevronRight, Database, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { staggerCardVariants, staggerContainerVariants } from './motionVariants';
import { HoverReveal } from '../ui/HoverReveal';

interface Slide05TightnessAnalyticsProps {
  universities: UniversityPTN[];
  majors: MajorProfile[];
  lastSyncedAt: string;
  syncCount: number;
  isSyncing: boolean;
  onRefreshData: () => void;
  onJumpToPredictor: (ptnId: string, majorId: MajorId) => void;
}

const ROWS_PER_PAGE = 5;

export const Slide05TightnessAnalytics: React.FC<Slide05TightnessAnalyticsProps> = ({
  universities,
  majors,
  lastSyncedAt,
  syncCount,
  isSyncing,
  onRefreshData,
  onJumpToPredictor,
}) => {
  const [majorFilter, setMajorFilter] = useState<MajorId | 'all'>('all');
  const [pathway, setPathway] = useState<'snbt' | 'snbp'>('snbt');
  const [sortBy, setSortBy] = useState<
    'tightest' | 'most_applicants' | 'largest_quota' | 'highest_score'
  >('tightest');
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      onRefreshData();
    }, 45000);
    return () => clearInterval(timer);
  }, [onRefreshData]);

  const flattenedPrograms = useMemo(() => {
    const list = universities.flatMap((uni) =>
      uni.programs.map((prog) => {
        const majorObj = majors.find((m) => m.id === prog.majorId)!;
        const quota = pathway === 'snbt' ? prog.dayaTampung2026 : prog.snbpDayaTampung2026;
        const applicants = pathway === 'snbt' ? prog.peminat2025 : prog.snbpPeminat2025;
        const tightness = Number(((quota / Math.max(1, applicants)) * 100).toFixed(2));
        const ratioOneTo = Math.round(applicants / Math.max(1, quota));

        return {
          ptnId: uni.id,
          ptnCode: uni.code,
          ptnName: uni.name,
          majorId: prog.majorId,
          majorShort: majorObj.shortName,
          accentHex: majorObj.accentHex,
          programNameOfficial: prog.programNameOfficial,
          quota,
          applicants,
          tightness,
          ratioOneTo,
          projectedScore: prog.passingGradeHistory.projected2026,
        };
      })
    );

    return list
      .filter((item) => majorFilter === 'all' || item.majorId === majorFilter)
      .sort((a, b) => {
        if (sortBy === 'tightest') return a.tightness - b.tightness;
        if (sortBy === 'most_applicants') return b.applicants - a.applicants;
        if (sortBy === 'largest_quota') return b.quota - a.quota;
        return b.projectedScore - a.projectedScore;
      });
  }, [universities, majors, majorFilter, pathway, sortBy]);

  const totalPages = Math.max(1, Math.ceil(flattenedPrograms.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const visibleRows = flattenedPrograms.slice(
    safePage * ROWS_PER_PAGE,
    safePage * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  const totalQuota = flattenedPrograms.reduce((acc, r) => acc + r.quota, 0);
  const totalApplicants = flattenedPrograms.reduce((acc, r) => acc + r.applicants, 0);
  const avgTightness =
    flattenedPrograms.length > 0
      ? (
          flattenedPrograms.reduce((acc, r) => acc + r.tightness, 0) /
          flattenedPrograms.length
        ).toFixed(2)
      : '0.00';

  const formattedSyncTime = useMemo(() => {
    try {
      return new Date(lastSyncedAt).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  }, [lastSyncedAt]);

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col justify-between gap-4 overflow-hidden"
    >
      {/* Header & Controls */}
      <motion.div
        variants={staggerCardVariants}
        className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0"
      >
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 07 · PEMINAT &amp; KEKETATAN DINAMIS SNPMB (UPDATE #{syncCount} · {formattedSyncTime} WIB)
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Peta Persaingan Masuk 5 Jurusan di 10 PTN
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Major Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setMajorFilter('all');
                setPage(0);
              }}
              className={`px-3 py-1.5 text-xs xl:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                majorFilter === 'all'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Semua
            </button>
            {majors.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMajorFilter(m.id);
                  setPage(0);
                }}
                className={`px-3 py-1.5 text-xs xl:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                  majorFilter === m.id
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {m.shortName}
              </button>
            ))}
          </div>

          {/* Pathway SNBT vs SNBP */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setPathway('snbt')}
              className={`px-3 py-1.5 text-xs xl:text-sm font-mono font-bold rounded-lg transition-colors ${
                pathway === 'snbt'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SNBT
            </button>
            <button
              onClick={() => setPathway('snbp')}
              className={`px-3 py-1.5 text-xs xl:text-sm font-mono font-bold rounded-lg transition-colors ${
                pathway === 'snbp'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SNBP
            </button>
          </div>

          <button
            onClick={onRefreshData}
            disabled={isSyncing}
            className="px-3.5 py-2 text-xs xl:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl border border-slate-700 flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sinkronisasi</span>
          </button>
        </div>
      </motion.div>

      {/* Main Split: Left (5 cols) = 3 Big KPIs + Flex-1 Visual Bar Chart, Right (7 cols) = 5-Row Full-Height Table */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (5 cols) */}
        <motion.div
          variants={staggerCardVariants}
          className="col-span-5 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          {/* 3 Big Summary KPIs */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Kuota</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-white tabular-nums mt-0.5">
                {totalQuota.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Peminat</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-cyan-400 tabular-nums mt-0.5">
                {totalApplicants.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Rerata Keketatan</div>
              <div className="text-2xl xl:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums mt-0.5">
                {avgTightness}%
              </div>
            </div>
          </div>

          {/* Flex-1 5 Visual Bars matching current page */}
          <div className="flex-1 min-h-0 flex flex-col my-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 shrink-0">
              <span>GRAFIK PERBANDINGAN (HALAMAN {safePage + 1})</span>
              <span>Kecil % = Paling Ketat</span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-2.5">
              {visibleRows.map((row) => {
                const barWidth = Math.min(100, Math.max(10, row.tightness * 6.5));
                return (
                  <div
                    key={`${row.ptnId}-${row.majorId}`}
                    onClick={() => onJumpToPredictor(row.ptnId, row.majorId)}
                    className="flex-1 min-h-0 px-3.5 py-2 rounded-xl bg-slate-900/85 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-colors flex flex-col justify-center"
                  >
                    <div className="flex items-center justify-between gap-2 text-sm xl:text-base mb-1.5">
                      <div className="flex items-center min-w-0 font-bold text-white">
                        <span className="font-mono text-cyan-400 mr-2 shrink-0">
                          {row.ptnCode}
                        </span>
                        <HoverReveal
                          text={row.programNameOfficial}
                          className="truncate"
                        />
                      </div>
                      <div className="font-mono font-extrabold text-cyan-400 tabular-nums shrink-0">
                        {row.tightness.toFixed(2)}%{' '}
                        <span className="text-slate-400 text-xs">(1:{row.ratioOneTo})</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-sm overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{ width: `${barWidth}%`, backgroundColor: row.accentHex }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs font-mono text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Sumber Publik:</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://snpmb.bppp.kemdikbud.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Portal SNPMB ↗
              </a>
              <a
                href="https://pddikti.kemdiktisaintek.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                PDDIKTI ↗
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Zone (7 cols): 5-Row Full-Height Paginated Grid Table (Zero Dead Space) */}
        <motion.div
          variants={staggerCardVariants}
          key={`table-${majorFilter}-${pathway}-${safePage}-${sortBy}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="col-span-7 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as typeof sortBy);
                  setPage(0);
                }}
                aria-label="Urutkan Tabel"
                className="bg-transparent text-sm font-mono font-bold text-slate-100 focus:outline-none"
              >
                <option value="tightest" className="bg-slate-900">
                  Urut: Keketatan Tertinggi
                </option>
                <option value="most_applicants" className="bg-slate-900">
                  Urut: Peminat Terbanyak
                </option>
                <option value="largest_quota" className="bg-slate-900">
                  Urut: Kuota Terbesar
                </option>
                <option value="highest_score" className="bg-slate-900">
                  Urut: Skor UTBK Tertinggi
                </option>
              </select>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-2 font-mono">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={safePage === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Hal Sebelumnya</span>
              </button>
              <span className="text-sm font-bold text-cyan-400 px-2 tabular-nums">
                Hal {safePage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={safePage >= totalPages - 1}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 disabled:opacity-40 flex items-center gap-1"
              >
                <span>Hal Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-Height 12-Column Structured Table */}
          <div className="flex-1 min-h-0 flex flex-col my-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-3 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase shrink-0">
              <div className="col-span-2">PTN</div>
              <div className="col-span-4">Program Studi</div>
              <div className="col-span-2 text-right">Kuota / Peminat</div>
              <div className="col-span-2 text-right">Keketatan</div>
              <div className="col-span-2 text-right">Skor UTBK</div>
            </div>

            {/* 5 Equal-Height Flex-1 Rows */}
            <div className="flex-1 min-h-0 flex flex-col gap-2 pt-2">
              {visibleRows.map((row) => (
                <div
                  key={`${row.ptnId}-${row.majorId}`}
                  onClick={() => onJumpToPredictor(row.ptnId, row.majorId)}
                  className="flex-1 min-h-0 grid grid-cols-12 gap-3 items-center px-4 py-2 rounded-xl bg-slate-900/75 border border-slate-800/90 hover:bg-slate-800/90 hover:border-cyan-400 cursor-pointer transition-all"
                >
                  <div className="col-span-2 font-mono text-lg xl:text-xl font-extrabold text-cyan-400">
                    {row.ptnCode}
                  </div>
                  <div className="col-span-4 min-w-0 flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: row.accentHex }}
                    />
                    <HoverReveal
                      text={row.programNameOfficial}
                      className="text-base xl:text-lg font-bold text-white truncate"
                    />
                  </div>
                  <div className="col-span-2 text-right font-mono tabular-nums">
                    <span className="text-base xl:text-lg font-bold text-white">
                      {row.quota}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">
                      / {row.applicants.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="col-span-2 text-right font-mono tabular-nums">
                    <div className="text-base xl:text-lg font-extrabold text-cyan-400">
                      {row.tightness.toFixed(2)}%
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Rasio 1 : {row.ratioOneTo}
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-mono text-lg xl:text-xl font-extrabold text-emerald-400 tabular-nums">
                    {row.projectedScore}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs xl:text-sm text-slate-300 font-medium shrink-0">
            <span>Data Daya Tampung &amp; Peminat Resmi SNPMB</span>
            <span className="font-mono text-cyan-400">
              Menampilkan 5 dari {flattenedPrograms.length} prodi
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
