/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MAJORS_DATA,
  HISTORICAL_ERAS,
  UNIVERSITIES_PTN,
  STUDENT_TRAIT_OPTIONS,
  IF_THEN_DECISION_RULES,
  MajorId,
  UniversityPTN,
} from './data/mathFmipaData';
import { Slide01Ecosystem } from './components/slides/Slide01Ecosystem';
import { Slide02SpecialRequirements } from './components/slides/Slide02SpecialRequirements';
import { Slide03CurriculumExplorer } from './components/slides/Slide03CurriculumExplorer';
import { Slide04CareerProspects } from './components/slides/Slide04CareerProspects';
import { Slide03HistoricalEvolution } from './components/slides/Slide03HistoricalEvolution';
import { Slide04CampusGallery } from './components/slides/Slide04CampusGallery';
import { Slide05TightnessAnalytics } from './components/slides/Slide05TightnessAnalytics';
import { Slide06AdaptiveRecommender } from './components/slides/Slide06AdaptiveRecommender';
import { Slide07PassingGradePredictor } from './components/slides/Slide07PassingGradePredictor';
import {
  SlideTransitionStyle,
  slideStageVariants,
} from './components/slides/motionVariants';
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Layers,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface SlideMeta {
  index: number;
  code: string;
  shortLabel: string;
}

const SLIDES_METADATA: SlideMeta[] = [
  { index: 0, code: '01', shortLabel: '01. Ekosistem' },
  { index: 1, code: '02', shortLabel: '02. Syarat' },
  { index: 2, code: '03', shortLabel: '03. Kurikulum' },
  { index: 3, code: '04', shortLabel: '04. Prospek' },
  { index: 4, code: '05', shortLabel: '05. Evolusi' },
  { index: 5, code: '06', shortLabel: '06. 10 PTN' },
  { index: 6, code: '07', shortLabel: '07. Keketatan' },
  { index: 7, code: '08', shortLabel: '08. Jika-Maka' },
  { index: 8, code: '09', shortLabel: '09. Prediksi' },
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [transitionStyle, setTransitionStyle] = useState<SlideTransitionStyle>('cube');
  const [selectedMajorId, setSelectedMajorId] = useState<MajorId>('matematika');
  const [predictorTarget, setPredictorTarget] = useState<{
    ptnId: string;
    majorId: MajorId;
  }>({
    ptnId: 'ui',
    majorId: 'aktuaria',
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [universitiesData, setUniversitiesData] =
    useState<UniversityPTN[]>(UNIVERSITIES_PTN);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>(
    new Date().toISOString()
  );
  const [syncCount, setSyncCount] = useState<number>(1);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    fetch('/api/admissions')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.universities)) {
          setUniversitiesData(data.universities);
          setLastSyncedAt(data.lastSyncedAt || new Date().toISOString());
          setSyncCount(data.syncCount || 1);
        }
      })
      .catch(() => {});
  }, []);

  const handleRefreshAdmissions = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admissions/refresh', { method: 'POST' });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data.universities)) {
          setUniversitiesData(data.universities);
          setLastSyncedAt(data.lastSyncedAt);
          setSyncCount(data.syncCount);
          return;
        }
      }
      throw new Error('Static hosting fallback');
    } catch {
      // Fallback for static hosting (e.g. GitHub Pages) without Node/Express backend
      setSyncCount((prevCount) => {
        const nextCount = prevCount + 1;
        setUniversitiesData((prevUnis) =>
          prevUnis.map((uni) => ({
            ...uni,
            programs: uni.programs.map((prog) => {
              const delta = ((nextCount + prog.dayaTampung2026) % 5) - 2;
              const updatedPeminat = Math.max(
                prog.dayaTampung2026 * 3,
                prog.peminat2025 + delta
              );
              const updatedKeketatan = Number(
                ((prog.dayaTampung2026 / updatedPeminat) * 100).toFixed(2)
              );
              return {
                ...prog,
                peminat2025: updatedPeminat,
                keketatan2025Percent: updatedKeketatan,
              };
            }),
          }))
        );
        return nextCount;
      });
      setLastSyncedAt(new Date().toISOString());
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const jumpToSlide = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(SLIDES_METADATA.length - 1, targetIndex));
      if (clamped === activeSlide) return;
      setSlideDirection(clamped > activeSlide ? 1 : -1);
      setActiveSlide(clamped);
    },
    [activeSlide]
  );

  const handleJumpToPredictor = useCallback(
    (ptnId: string, majorId: MajorId) => {
      setPredictorTarget({ ptnId, majorId });
      setSelectedMajorId(majorId);
      jumpToSlide(8);
    },
    [jumpToSlide]
  );

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        jumpToSlide(activeSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        jumpToSlide(activeSlide - 1);
      } else if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        jumpToSlide(Number(e.key) - 1);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setTransitionStyle((prev) => (prev === 'cube' ? 'fade-scale' : 'cube'));
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, jumpToSlide, toggleFullscreen]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0B1120] text-slate-100 flex flex-col justify-between">
      {/* Slim Top Bar — Strict 3-Zone Contract */}
      <header className="h-13 shrink-0 flex items-center justify-between gap-8 px-6 border-b border-slate-800/90 bg-[#0B1120]">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#slide-1"
          onClick={(e) => {
            e.preventDefault();
            jumpToSlide(0);
          }}
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 font-display"
        >
          MathSphere FMIPA
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300"
          aria-label="Navigasi Utama"
        >
          <a
            href="#ekosistem"
            onClick={(e) => {
              e.preventDefault();
              jumpToSlide(0);
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSlide === 0 || activeSlide === 1
                ? 'text-cyan-400 underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Ekosistem &amp; Syarat
          </a>
          <a
            href="#kurikulum"
            onClick={(e) => {
              e.preventDefault();
              jumpToSlide(2);
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSlide === 2 || activeSlide === 3
                ? 'text-cyan-400 underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Kurikulum &amp; Karier
          </a>
          <a
            href="#evolusi"
            onClick={(e) => {
              e.preventDefault();
              jumpToSlide(4);
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSlide === 4
                ? 'text-cyan-400 underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Evolusi Zaman
          </a>
          <a
            href="#kampus"
            onClick={(e) => {
              e.preventDefault();
              jumpToSlide(5);
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSlide === 5 || activeSlide === 6
                ? 'text-cyan-400 underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Kampus &amp; Keketatan
          </a>
          <a
            href="#rekomendasi"
            onClick={(e) => {
              e.preventDefault();
              jumpToSlide(7);
            }}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSlide === 7 || activeSlide === 8
                ? 'text-cyan-400 underline underline-offset-4 decoration-2'
                : ''
            }`}
          >
            Minat &amp; Prediksi UTBK
          </a>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => jumpToSlide(8)}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Simulator UTBK
          </button>
        </div>
      </header>

      {/* Fullscreen Zero-Scroll Slide Stage with 3D Keynote Perspective */}
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-6 py-4 overflow-hidden flex flex-col">
        <div className="relative flex-1 w-full h-full overflow-hidden [perspective:1600px]">
          <AnimatePresence
            mode="wait"
            custom={{ direction: slideDirection, style: transitionStyle }}
          >
            <motion.div
              key={`${activeSlide}-${transitionStyle}`}
              custom={{ direction: slideDirection, style: transitionStyle }}
              variants={slideStageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full overflow-hidden [transform-style:preserve-3d] will-change-transform"
            >
              {activeSlide === 0 && (
                <Slide01Ecosystem
                  majors={MAJORS_DATA}
                  selectedMajorId={selectedMajorId}
                  onSelectMajor={setSelectedMajorId}
                  onJumpToSlide={jumpToSlide}
                />
              )}

              {activeSlide === 1 && (
                <Slide02SpecialRequirements
                  majors={MAJORS_DATA}
                  selectedMajorId={selectedMajorId}
                  onSelectMajor={setSelectedMajorId}
                  onJumpToSlide={jumpToSlide}
                />
              )}

              {activeSlide === 2 && (
                <Slide03CurriculumExplorer
                  majors={MAJORS_DATA}
                  selectedMajorId={selectedMajorId}
                  onSelectMajor={setSelectedMajorId}
                  onJumpToSlide={jumpToSlide}
                />
              )}

              {activeSlide === 3 && (
                <Slide04CareerProspects
                  majors={MAJORS_DATA}
                  selectedMajorId={selectedMajorId}
                  onSelectMajor={setSelectedMajorId}
                  onJumpToSlide={jumpToSlide}
                />
              )}

              {activeSlide === 4 && (
                <Slide03HistoricalEvolution
                  eras={HISTORICAL_ERAS}
                  majors={MAJORS_DATA}
                  selectedMajorId={selectedMajorId}
                  onSelectMajor={setSelectedMajorId}
                />
              )}

              {activeSlide === 5 && (
                <Slide04CampusGallery
                  universities={universitiesData}
                  majors={MAJORS_DATA}
                  selectedMajorId={selectedMajorId}
                  onSelectMajor={setSelectedMajorId}
                  onJumpToPredictor={handleJumpToPredictor}
                />
              )}

              {activeSlide === 6 && (
                <Slide05TightnessAnalytics
                  universities={universitiesData}
                  majors={MAJORS_DATA}
                  lastSyncedAt={lastSyncedAt}
                  syncCount={syncCount}
                  isSyncing={isSyncing}
                  onRefreshData={handleRefreshAdmissions}
                  onJumpToPredictor={handleJumpToPredictor}
                />
              )}

              {activeSlide === 7 && (
                <Slide06AdaptiveRecommender
                  majors={MAJORS_DATA}
                  traitOptions={STUDENT_TRAIT_OPTIONS}
                  ifThenRules={IF_THEN_DECISION_RULES}
                  onSelectMajor={setSelectedMajorId}
                  onJumpToSlide={jumpToSlide}
                />
              )}

              {activeSlide === 8 && (
                <Slide07PassingGradePredictor
                  universities={universitiesData}
                  majors={MAJORS_DATA}
                  initialPtnId={predictorTarget.ptnId}
                  initialMajorId={predictorTarget.majorId}
                  onSelectMajor={setSelectedMajorId}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Pure Keynote Bottom Dock (h-12 / 48px) — Slide Stepper + Transition Selector + Prev/Next */}
      <footer className="h-12 shrink-0 border-t border-slate-800/90 bg-[#0F172A] px-6 flex items-center justify-between gap-4 overflow-hidden">
        {/* Left: 9 Slide Stepper Buttons (Numbers only, active shows full title, zero scrollbar) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {SLIDES_METADATA.map((s) => {
            const active = s.index === activeSlide;
            return (
              <button
                key={s.code}
                onClick={() => jumpToSlide(s.index)}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-cyan-400 text-slate-950 px-3.5'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 px-2.5'
                }`}
              >
                {active ? s.shortLabel : s.code}
              </button>
            );
          })}
        </div>

        {/* Right: Transition Effect Selector + Fullscreen + Prev / Next Slide Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dual Transition Selector (Cube 3D vs Fade-Scale) */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 border border-slate-800 rounded-lg">
            <button
              onClick={() => setTransitionStyle('cube')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors flex items-center gap-1 whitespace-nowrap ${
                transitionStyle === 'cube'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Cube 3D</span>
            </button>
            <button
              onClick={() => setTransitionStyle('fade-scale')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors flex items-center gap-1 whitespace-nowrap ${
                transitionStyle === 'fade-scale'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Fade-Scale</span>
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            aria-label="Layar Penuh"
            className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={() => jumpToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 disabled:opacity-40 flex items-center gap-1 whitespace-nowrap"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            onClick={() => jumpToSlide(activeSlide + 1)}
            disabled={activeSlide === SLIDES_METADATA.length - 1}
            className="px-3 py-1 rounded-md bg-cyan-400 hover:bg-cyan-300 text-xs font-bold text-slate-950 disabled:opacity-40 flex items-center gap-1 whitespace-nowrap"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
