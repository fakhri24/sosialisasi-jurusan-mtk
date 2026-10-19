import React, { useMemo, useState } from 'react';
import {
  IfThenRule,
  MajorId,
  MajorProfile,
  StudentTraitOption,
} from '../../data/mathFmipaData';
import { ArrowRight, GitBranch } from 'lucide-react';

interface Slide06AdaptiveRecommenderProps {
  majors: MajorProfile[];
  traitOptions: StudentTraitOption[];
  ifThenRules: IfThenRule[];
  onSelectMajor: (id: MajorId) => void;
  onJumpToSlide: (slideIndex: number) => void;
}

interface ArchetypePreset {
  id: string;
  label: string;
  selections: {
    math_style: string;
    problem_solving: string;
    coding_affinity: string;
    industry_goal: string;
  };
}

const ARCHETYPE_PRESETS: ArchetypePreset[] = [
  {
    id: 'preset-math',
    label: 'A: Logika & Kriptografi',
    selections: {
      math_style: 'math_proof',
      problem_solving: 'solve_theoretical',
      coding_affinity: 'code_scientific',
      industry_goal: 'goal_quant_crypto',
    },
  },
  {
    id: 'preset-akt',
    label: 'B: Peluang & Finansial',
    selections: {
      math_style: 'math_prob_finance',
      problem_solving: 'solve_risk_valuation',
      coding_affinity: 'code_financial_r',
      industry_goal: 'goal_actuary_ojk',
    },
  },
  {
    id: 'preset-stat',
    label: 'C: Survei & Eksperimen',
    selections: {
      math_style: 'math_data_infer',
      problem_solving: 'solve_experiment',
      coding_affinity: 'code_financial_r',
      industry_goal: 'goal_biostat_policy',
    },
  },
  {
    id: 'preset-ds',
    label: 'D: Database & Bisnis',
    selections: {
      math_style: 'math_data_infer',
      problem_solving: 'solve_pipeline_automation',
      coding_affinity: 'code_bigdata_sql',
      industry_goal: 'goal_tech_ai',
    },
  },
  {
    id: 'preset-ai',
    label: 'E: Matriks & Robotika AI',
    selections: {
      math_style: 'math_matrix_algo',
      problem_solving: 'solve_pipeline_automation',
      coding_affinity: 'code_deeplearning',
      industry_goal: 'goal_tech_ai',
    },
  },
];

export const Slide06AdaptiveRecommender: React.FC<Slide06AdaptiveRecommenderProps> = ({
  majors,
  traitOptions,
  ifThenRules,
  onSelectMajor,
  onJumpToSlide,
}) => {
  const [selections, setSelections] = useState<{
    math_style: string;
    problem_solving: string;
    coding_affinity: string;
    industry_goal: string;
  }>(ARCHETYPE_PRESETS[0].selections);

  const selectedIds = useMemo(() => Object.values(selections), [selections]);

  const recommendationResult = useMemo(() => {
    const rawScores: Record<MajorId, number> = {
      matematika: 0,
      aktuaria: 0,
      statistika: 0,
      'sains-data': 0,
      ai: 0,
    };

    selectedIds.forEach((optId) => {
      const opt = traitOptions.find((t) => t.id === optId);
      if (opt) {
        (Object.keys(rawScores) as MajorId[]).forEach((mId) => {
          rawScores[mId] += opt.weights[mId] || 0;
        });
      }
    });

    const evaluatedRules = ifThenRules
      .map((rule) => {
        const matchCount = rule.ifConditions.filter((c) => selectedIds.includes(c)).length;
        const isFullMatch = matchCount === rule.ifConditions.length;
        if (isFullMatch) {
          rawScores[rule.thenMajorId] += 22;
        } else if (matchCount > 0) {
          rawScores[rule.thenMajorId] += 8;
        }
        return {
          ...rule,
          matchCount,
          isFullMatch,
        };
      })
      .sort((a, b) => b.matchCount - a.matchCount || b.confidenceWeight - a.confidenceWeight);

    const maxPossible = Math.max(...Object.values(rawScores), 1);

    const rankedMajors = majors
      .map((m) => {
        const score = rawScores[m.id];
        const affinityPercent = Math.min(99, Math.round((score / maxPossible) * 96));
        return {
          major: m,
          rawScore: score,
          affinityPercent,
        };
      })
      .sort((a, b) => b.rawScore - a.rawScore);

    return {
      rankedMajors,
      topRecommendation: rankedMajors[0],
      secondRecommendation: rankedMajors[1],
      activeRule: evaluatedRules[0],
    };
  }, [selectedIds, traitOptions, ifThenRules, majors]);

  const categories: Array<{
    key: keyof typeof selections;
    step: string;
    title: string;
  }> = [
    { key: 'math_style', step: '01', title: 'Materi Matematika Favorit' },
    { key: 'problem_solving', step: '02', title: 'Tipe Masalah yang Disukai' },
    { key: 'coding_affinity', step: '03', title: 'Gaya Komputasi & Koding' },
    { key: 'industry_goal', step: '04', title: 'Target Karier Industri' },
  ];

  const getOptionLabel = (id: string) =>
    traitOptions.find((t) => t.id === id)?.label || id;

  const topMajor = recommendationResult.topRecommendation.major;
  const activeRule = recommendationResult.activeRule;

  return (
    <div className="h-full flex flex-col justify-between gap-4 overflow-hidden">
      {/* Header & Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 rounded-2xl px-6 py-3.5 shrink-0">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-0.5">
            SLIDE 08 · REKOMENDASI ADAPTIF BERBASIS LOGIKA &ldquo;JIKA–MAKA&rdquo;
          </div>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white">
            Simulasi Keputusan Minat Siswa
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {ARCHETYPE_PRESETS.map((preset) => {
            const isCurrent =
              selections.math_style === preset.selections.math_style &&
              selections.problem_solving === preset.selections.problem_solving &&
              selections.coding_affinity === preset.selections.coding_affinity &&
              selections.industry_goal === preset.selections.industry_goal;

            return (
              <button
                key={preset.id}
                onClick={() => setSelections(preset.selections)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Left (6 cols) = 4 Compact Selection Rows, Right (6 cols) = Giant IF-THEN Verdict */}
      <div className="flex-1 grid grid-cols-12 gap-5 items-stretch overflow-hidden">
        {/* Left Zone (6 cols): 4 Choice Rows */}
        <div className="col-span-6 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-5 overflow-hidden">
          {categories.map((cat) => {
            const options = traitOptions.filter((t) => t.category === cat.key);
            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="text-xs xl:text-sm font-mono font-bold text-cyan-400">
                  {cat.step}. {cat.title.toUpperCase()}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {options.map((opt) => {
                    const active = selections[cat.key] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() =>
                          setSelections((prev) => ({ ...prev, [cat.key]: opt.id }))
                        }
                        className={`px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                          active
                            ? 'bg-slate-800 border-cyan-400 text-white shadow-sm'
                            : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:text-white'
                        }`}
                      >
                        <div className="text-xs xl:text-sm font-bold truncate">
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Zone (6 cols): Giant Recommendation Verdict & IF-THEN Syllogism */}
        <div className="col-span-6 flex flex-col justify-between bg-[#0F172A] border border-slate-800 rounded-2xl p-6 overflow-hidden">
          {/* Top Recommendation Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
            <div className="flex items-center justify-between text-xs xl:text-sm font-mono mb-1">
              <span className="font-bold" style={{ color: topMajor.accentHex }}>
                HASIL REKOMENDASI UTAMA
              </span>
              <span className="text-slate-400 tabular-nums">
                Alternatif #2: {recommendationResult.secondRecommendation.major.shortName} ({recommendationResult.secondRecommendation.affinityPercent}%)
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-4 my-1">
              <h2 className="text-3xl xl:text-4xl font-extrabold text-white">
                {topMajor.name}
              </h2>
              <span className="text-3xl xl:text-4xl font-extrabold font-mono text-cyan-400 tabular-nums">
                {recommendationResult.topRecommendation.affinityPercent}%
              </span>
            </div>

            <p className="text-sm xl:text-base text-slate-200 font-medium">
              {topMajor.keyDifferentiator}
            </p>
          </div>

          {/* Explicit IF-THEN Formula Block */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-2">
              <GitBranch className="w-4 h-4" />
              <span>ATURAN KEPUTUSAN AKTIF ({activeRule.ruleCode})</span>
            </div>

            <div className="text-base xl:text-lg font-mono leading-snug text-slate-100 mb-2">
              <span className="text-amber-400 font-extrabold">JIKA </span>
              <span>[{getOptionLabel(selections.math_style)}]</span>
              <span className="text-amber-400 font-extrabold"> + DAN </span>
              <span>[{getOptionLabel(selections.problem_solving)}]</span>
              <span className="text-emerald-400 font-extrabold"> &rarr; MAKA COCOK MASUK </span>
              <span className="text-white font-extrabold underline decoration-cyan-400">
                {topMajor.name.toUpperCase()}
              </span>
            </div>

            <div className="text-sm xl:text-base text-cyan-300 font-medium">
              {activeRule.characteristicQuote}
            </div>
          </div>

          {/* 5-Major Affinity Bars */}
          <div className="space-y-2">
            {recommendationResult.rankedMajors.map((item, idx) => (
              <div
                key={item.major.id}
                onClick={() => onSelectMajor(item.major.id)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="w-36 text-sm xl:text-base font-bold text-slate-100 truncate shrink-0">
                  <span className="font-mono text-slate-500 mr-1.5">0{idx + 1}.</span>
                  {item.major.shortName}
                </div>
                <div className="flex-1 h-3 bg-slate-950 rounded-sm overflow-hidden border border-slate-800">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${item.affinityPercent}%`,
                      backgroundColor: item.major.accentHex,
                    }}
                  />
                </div>
                <div className="w-14 text-right font-mono text-sm xl:text-base font-extrabold text-white tabular-nums shrink-0">
                  {item.affinityPercent}%
                </div>
              </div>
            ))}
          </div>

          {/* CTA to UTBK Predictor */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs xl:text-sm text-slate-400 font-mono">
              Uji peluang skor UTBK untuk {topMajor.shortName}
            </span>
            <button
              onClick={() => {
                onSelectMajor(topMajor.id);
                onJumpToSlide(8);
              }}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Simulator Prediksi UTBK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
