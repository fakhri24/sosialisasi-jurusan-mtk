import React from 'react';
import { motion } from 'motion/react';
import { MajorId } from '../../data/mathFmipaData';

interface MajorIllustrationProps {
  majorId: MajorId;
  accentHex: string;
  className?: string;
}

/**
 * Animated Vector SVG Illustration tailored to each of the 5 FMIPA Majors.
 * Pure SVG + Framer Motion: crisp at any resolution, zero layout shift, and visually alive.
 */
export const MajorDomainIllustration: React.FC<MajorIllustrationProps> = ({
  majorId,
  accentHex,
  className = 'w-full h-full',
}) => {
  if (majorId === 'matematika') {
    // Topology Torus / Geometric Manifold & Cryptographic Lattice
    return (
      <svg viewBox="0 0 220 130" className={className} fill="none">
        <defs>
          <radialGradient id="grad-math" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.28" />
            <stop offset="100%" stopColor={accentHex} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="65" r="58" fill="url(#grad-math)" />
        {/* Coordinate Grid */}
        <line x1="20" y1="65" x2="200" y2="65" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="110" y1="10" x2="110" y2="120" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
        {/* Rotating/Pulsing Parametric Ellipses (Manifold) */}
        <motion.ellipse
          cx="110"
          cy="65"
          rx="64"
          ry="26"
          stroke={accentHex}
          strokeWidth="1.75"
          strokeOpacity="0.85"
          initial={{ rotate: -18, scale: 0.92 }}
          animate={{ rotate: 18, scale: 1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ transformOrigin: '110px 65px' }}
        />
        <motion.ellipse
          cx="110"
          cy="65"
          rx="64"
          ry="26"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeOpacity="0.65"
          strokeDasharray="5 3"
          initial={{ rotate: 42, scale: 0.95 }}
          animate={{ rotate: -42, scale: 1.03 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ transformOrigin: '110px 65px' }}
        />
        {/* Inner Hexagonal Lattice */}
        <polygon
          points="110,25 145,45 145,85 110,105 75,85 75,45"
          stroke={accentHex}
          strokeWidth="1.5"
          fill={accentHex}
          fillOpacity="0.08"
        />
        {/* Vertex Nodes */}
        {[
          [110, 25],
          [145, 45],
          [145, 85],
          [110, 105],
          [75, 85],
          [75, 45],
          [110, 65],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === 6 ? 5 : 3.5}
            fill={i === 6 ? '#38BDF8' : accentHex}
            stroke="#0F172A"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        {/* Math Symbols */}
        <text x="24" y="28" className="fill-indigo-300/90 text-[11px] font-mono font-bold">
          ∮ f(z)dz · Topologi
        </text>
        <text x="148" y="114" className="fill-cyan-300/90 text-[11px] font-mono font-bold">
          ∀x ∈ ℝⁿ
        </text>
      </svg>
    );
  }

  if (majorId === 'aktuaria') {
    // Actuarial Survival Curve + Stochastic Financial Shield
    return (
      <svg viewBox="0 0 220 130" className={className} fill="none">
        <defs>
          <linearGradient id="grad-akt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.32" />
            <stop offset="100%" stopColor={accentHex} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Grid */}
        <line x1="24" y1="105" x2="198" y2="105" stroke="#334155" strokeWidth="1.5" />
        <line x1="24" y1="20" x2="24" y2="105" stroke="#334155" strokeWidth="1.5" />
        {/* Area under Risk / Reserve Curve */}
        <path
          d="M 24 92 Q 65 86, 95 64 T 155 34 L 192 22 L 192 105 L 24 105 Z"
          fill="url(#grad-akt)"
        />
        {/* Upper & Lower Confidence Band */}
        <path
          d="M 24 82 Q 65 74, 95 52 T 155 24 L 192 14"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.6"
        />
        {/* Main Actuarial Compound Curve */}
        <motion.path
          d="M 24 92 Q 65 86, 95 64 T 155 34 L 192 22"
          stroke={accentHex}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Survival Curve S(x) */}
        <motion.path
          d="M 24 30 Q 85 34, 130 68 T 192 98"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {/* Data Points */}
        {[
          [55, 84],
          [95, 64],
          [140, 42],
          [182, 25],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill={accentHex}
            stroke="#0F172A"
            strokeWidth="2"
          />
        ))}
        {/* Shield Emblem */}
        <g transform="translate(148, 52)">
          <path
            d="M20 4 L36 10 V22 C36 33 28 41 20 45 C12 41 4 33 4 22 V10 L20 4 Z"
            fill="#0F172A"
            stroke={accentHex}
            strokeWidth="2"
          />
          <text x="20" y="28" textAnchor="middle" className="fill-emerald-400 text-[10px] font-mono font-extrabold">
            FSAI
          </text>
        </g>
        <text x="32" y="24" className="fill-amber-300 text-[10px] font-mono font-bold">
          S(x) Mortalitas &amp; Risiko
        </text>
      </svg>
    );
  }

  if (majorId === 'statistika') {
    // Gaussian Normal Distribution Bell Curve + Confidence Intervals
    return (
      <svg viewBox="0 0 220 130" className={className} fill="none">
        <defs>
          <linearGradient id="grad-stat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.38" />
            <stop offset="100%" stopColor={accentHex} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <line x1="16" y1="106" x2="204" y2="106" stroke="#334155" strokeWidth="1.5" />
        {/* Bell Curve Fill */}
        <path
          d="M 18 105 C 50 105, 68 95, 84 56 C 95 28, 103 18, 110 18 C 117 18, 125 28, 136 56 C 152 95, 170 105, 202 105 Z"
          fill="url(#grad-stat)"
        />
        {/* Mean & Standard Deviation Lines */}
        <line x1="110" y1="18" x2="110" y2="106" stroke={accentHex} strokeWidth="2" strokeDasharray="3 3" />
        <line x1="78" y1="68" x2="78" y2="106" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="142" y1="68" x2="142" y2="106" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="2 2" />
        {/* Bell Curve Stroke */}
        <motion.path
          d="M 18 105 C 50 105, 68 95, 84 56 C 95 28, 103 18, 110 18 C 117 18, 125 28, 136 56 C 152 95, 170 105, 202 105"
          stroke={accentHex}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        {/* Scatter Sample Dots */}
        {[
          [60, 88],
          [92, 42],
          [110, 18],
          [128, 42],
          [160, 88],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="#F8FAFC"
            stroke={accentHex}
            strokeWidth="2.5"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
        <text x="110" y="121" textAnchor="middle" className="fill-cyan-300 text-[10px] font-mono font-bold">
          -1.96σ · μ (95% CI) · +1.96σ
        </text>
      </svg>
    );
  }

  if (majorId === 'sains-data') {
    // Big Data Pipeline Nodes & High-Dimensional Clustering
    return (
      <svg viewBox="0 0 220 130" className={className} fill="none">
        {/* Background Grid */}
        <rect x="18" y="16" width="184" height="96" rx="10" stroke="#1E293B" strokeWidth="1" fill="#0B1120" fillOpacity="0.5" />
        {/* Cluster Group A */}
        <circle cx="65" cy="52" r="26" fill={accentHex} fillOpacity="0.12" stroke={accentHex} strokeWidth="1" strokeDasharray="3 3" />
        {/* Cluster Group B */}
        <circle cx="152" cy="70" r="28" fill="#06B6D4" fillOpacity="0.12" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3" />
        {/* Decision Boundary Hyperplane */}
        <line x1="45" y1="104" x2="170" y2="22" stroke="#F43F5E" strokeWidth="2" strokeDasharray="5 3" />
        {/* Cluster A Points */}
        {[
          [55, 45],
          [72, 42],
          [62, 60],
          [50, 58],
          [76, 56],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`a-${i}`}
            cx={cx}
            cy={cy}
            r="4"
            fill={accentHex}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, delay: i * 0.18, repeat: Infinity }}
          />
        ))}
        {/* Cluster B Points */}
        {[
          [142, 62],
          [160, 60],
          [152, 78],
          [138, 76],
          [165, 75],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`b-${i}`}
            cx={cx}
            cy={cy}
            r="4"
            fill="#06B6D4"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        <text x="28" y="30" className="fill-amber-300 text-[10px] font-mono font-bold">
          ETL · Clustering · Big Data
        </text>
      </svg>
    );
  }

  // Default: 'ai' (Deep Neural Network / Transformer Graph)
  const inputNodes = [28, 65, 102];
  const hiddenNodes = [20, 50, 80, 110];
  const outputNodes = [42, 88];

  return (
    <svg viewBox="0 0 220 130" className={className} fill="none">
      {/* Synaptic Connections Input -> Hidden */}
      {inputNodes.map((y1, i) =>
        hiddenNodes.map((y2, j) => (
          <line
            key={`ih-${i}-${j}`}
            x1="42"
            y1={y1}
            x2="110"
            y2={y2}
            stroke={accentHex}
            strokeOpacity="0.32"
            strokeWidth="1.2"
          />
        ))
      )}
      {/* Synaptic Connections Hidden -> Output */}
      {hiddenNodes.map((y1, i) =>
        outputNodes.map((y2, j) => (
          <line
            key={`ho-${i}-${j}`}
            x1="110"
            y1={y1}
            x2="178"
            y2={y2}
            stroke="#38BDF8"
            strokeOpacity="0.4"
            strokeWidth="1.4"
          />
        ))
      )}
      {/* Input Layer Nodes */}
      {inputNodes.map((y, i) => (
        <circle
          key={`in-${i}`}
          cx="42"
          cy={y}
          r="6"
          fill="#0F172A"
          stroke={accentHex}
          strokeWidth="2.5"
        />
      ))}
      {/* Hidden Layer Nodes */}
      {hiddenNodes.map((y, i) => (
        <motion.circle
          key={`hid-${i}`}
          cx="110"
          cy={y}
          r="6.5"
          fill={accentHex}
          stroke="#0F172A"
          strokeWidth="2"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
      {/* Output Layer Nodes */}
      {outputNodes.map((y, i) => (
        <motion.circle
          key={`out-${i}`}
          cx="178"
          cy={y}
          r="7"
          fill="#38BDF8"
          stroke="#0F172A"
          strokeWidth="2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

interface PtnCampusSvgProps {
  ptnId: string;
  ptnCode: string;
  city: string;
  establishedYear: number;
  facultyName: string;
  landmarkLabel: string;
}

/**
 * Pure Vector Architectural & Mathematical Campus Illustration for all 10 PTNs.
 * Replaces mismatched external photos with crisp, consistent, geometric campus landmark vectors.
 */
export const PtnCampusBannerSvg: React.FC<PtnCampusSvgProps> = ({
  ptnId,
  ptnCode,
  city,
  establishedYear,
  facultyName,
  landmarkLabel,
}) => {
  const paletteMap: Record<
    string,
    { primary: string; secondary: string; badgeBg: string; accentText: string }
  > = {
    ui: { primary: '#FACC15', secondary: '#22D3EE', badgeBg: '#422006', accentText: '#FDE047' },
    itb: { primary: '#38BDF8', secondary: '#818CF8', badgeBg: '#082F49', accentText: '#7DD3FC' },
    ugm: { primary: '#F59E0B', secondary: '#34D399', badgeBg: '#451A03', accentText: '#FCD34D' },
    its: { primary: '#22D3EE', secondary: '#3B82F6', badgeBg: '#083344', accentText: '#67E8F9' },
    ipb: { primary: '#10B981', secondary: '#38BDF8', badgeBg: '#064E3B', accentText: '#6EE7B7' },
    unair: { primary: '#FBBF24', secondary: '#60A5FA', badgeBg: '#1E3A8A', accentText: '#FDE68A' },
    unpad: { primary: '#FB7185', secondary: '#FBBF24', badgeBg: '#4C0519', accentText: '#FDA4AF' },
    ub: { primary: '#60A5FA', secondary: '#F59E0B', badgeBg: '#172554', accentText: '#93C5FD' },
    undip: { primary: '#818CF8', secondary: '#22D3EE', badgeBg: '#1E1B4B', accentText: '#A5B4FC' },
    uns: { primary: '#34D399', secondary: '#FBBF24', badgeBg: '#064E3B', accentText: '#6EE7B7' },
  };

  const colors = paletteMap[ptnId] || paletteMap.ui;

  const renderArchitectureSilhouette = () => {
    switch (ptnId) {
      case 'ui':
        // UI Rectorate Rotunda & Layered Geometric Roof
        return (
          <g>
            <rect x="210" y="92" width="180" height="58" rx="3" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <rect x="255" y="50" width="90" height="42" fill="#1E293B" stroke={colors.primary} strokeWidth="2" />
            <polygon points="240,50 300,18 360,50" fill={colors.primary} fillOpacity="0.22" stroke={colors.primary} strokeWidth="2" />
            <polygon points="195,92 300,66 405,92" fill={colors.secondary} fillOpacity="0.15" stroke={colors.secondary} strokeWidth="1.5" />
            {[230, 255, 280, 305, 330, 355, 370].map((x, i) => (
              <line key={i} x1={x} y1="96" x2={x} y2="146" stroke={colors.primary} strokeOpacity="0.45" strokeWidth="2" />
            ))}
          </g>
        );
      case 'itb':
        // ITB Iconic Sundanese Multi-Tiered Aula Roof & CAS Building
        return (
          <g>
            <rect x="190" y="96" width="220" height="54" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <polygon points="175,96 235,56 365,56 425,96" fill={colors.primary} fillOpacity="0.2" stroke={colors.primary} strokeWidth="2" />
            <polygon points="225,56 265,26 335,26 375,56" fill={colors.secondary} fillOpacity="0.25" stroke={colors.secondary} strokeWidth="2" />
            {[210, 240, 270, 300, 330, 360, 390].map((x, i) => (
              <rect key={i} x={x - 5} y="106" width="10" height="44" fill="#1E293B" stroke={colors.primary} strokeWidth="1.2" />
            ))}
          </g>
        );
      case 'ugm':
        // UGM Balairung Classical Colonnade & Central Pediment
        return (
          <g>
            <rect x="180" y="88" width="240" height="62" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <polygon points="170,88 300,32 430,88" fill={colors.primary} fillOpacity="0.2" stroke={colors.primary} strokeWidth="2" />
            {[198, 226, 254, 282, 318, 346, 374, 402].map((x, i) => (
              <line key={i} x1={x} y1="88" x2={x} y2="150" stroke={colors.primary} strokeWidth="3" />
            ))}
            <circle cx="300" cy="64" r="11" fill="#0F172A" stroke={colors.secondary} strokeWidth="2" />
          </g>
        );
      case 'its':
        // ITS MIPA High-Rise Tower & Research Center Twin Geometry
        return (
          <g>
            <rect x="245" y="24" width="68" height="126" rx="4" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <rect x="322" y="52" width="62" height="98" rx="4" fill="#1E293B" stroke={colors.secondary} strokeWidth="2" />
            <rect x="195" y="78" width="44" height="72" rx="3" fill="#0F172A" stroke={colors.primary} strokeWidth="1.5" />
            {[38, 56, 74, 92, 110, 128].map((y, i) => (
              <line key={i} x1="255" y1={y} x2="303" y2={y} stroke={colors.primary} strokeWidth="2" strokeOpacity="0.6" />
            ))}
            {[68, 86, 104, 122].map((y, i) => (
              <line key={i} x1="332" y1={y} x2="374" y2={y} stroke={colors.secondary} strokeWidth="2" strokeOpacity="0.6" />
            ))}
          </g>
        );
      case 'ipb':
        // IPB Modern Geometric Arch & SSMI Data Science Complex
        return (
          <g>
            <rect x="195" y="76" width="210" height="74" rx="4" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <circle cx="300" cy="68" r="38" fill="#0F172A" stroke={colors.primary} strokeWidth="2.5" />
            <circle cx="300" cy="68" r="24" fill={colors.primary} fillOpacity="0.18" stroke={colors.secondary} strokeWidth="1.5" strokeDasharray="4 2" />
            {[215, 245, 355, 385].map((x, i) => (
              <rect key={i} x={x} y="92" width="14" height="58" fill="#1E293B" stroke={colors.primary} strokeWidth="1.2" />
            ))}
          </g>
        );
      case 'unair':
        // UNAIR FTMM Nano Building & Kampus C Classical Portal
        return (
          <g>
            <rect x="200" y="54" width="200" height="96" rx="6" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <path d="M 255 150 V 95 A 45 45 0 0 1 345 95 V 150" fill={colors.secondary} fillOpacity="0.16" stroke={colors.primary} strokeWidth="2" />
            <polygon points="230,54 300,24 370,54" fill={colors.primary} fillOpacity="0.22" stroke={colors.primary} strokeWidth="2" />
          </g>
        );
      case 'unpad':
        // UNPAD Jatinangor Octagonal Modern Rectorate & Dome
        return (
          <g>
            <polygon points="210,150 230,72 370,72 390,150" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <path d="M 248 72 Q 300 22 352 72 Z" fill={colors.primary} fillOpacity="0.22" stroke={colors.primary} strokeWidth="2" />
            {[245, 272, 300, 328, 355].map((x, i) => (
              <line key={i} x1={x} y1="78" x2={x} y2="146" stroke={colors.secondary} strokeWidth="2" strokeOpacity="0.65" />
            ))}
          </g>
        );
      case 'ub':
        // UB 9-Floor MIPA Center & Javanese Crown Roof
        return (
          <g>
            <rect x="235" y="30" width="130" height="120" rx="4" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <polygon points="220,34 300,12 380,34" fill={colors.secondary} fillOpacity="0.28" stroke={colors.secondary} strokeWidth="2" />
            {[48, 66, 84, 102, 120, 136].map((y, i) => (
              <line key={i} x1="250" y1={y} x2="350" y2={y} stroke={colors.primary} strokeWidth="2" strokeOpacity="0.65" />
            ))}
          </g>
        );
      case 'undip':
        // UNDIP Acintya Prasada FSM Modern Stepped Facade
        return (
          <g>
            <rect x="200" y="76" width="200" height="74" rx="3" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <rect x="240" y="44" width="120" height="106" rx="3" fill="#1E293B" stroke={colors.secondary} strokeWidth="2" />
            <polygon points="232,44 300,20 368,44" fill={colors.primary} fillOpacity="0.25" stroke={colors.primary} strokeWidth="2" />
            {[62, 82, 102, 122].map((y, i) => (
              <line key={i} x1="256" y1={y} x2="344" y2={y} stroke={colors.primary} strokeWidth="2" />
            ))}
          </g>
        );
      default:
        // UNS Joglo Kentingan Roof & Modern Science Wing
        return (
          <g>
            <rect x="200" y="92" width="200" height="58" fill="#0F172A" stroke={colors.primary} strokeWidth="2" />
            <polygon points="180,92 250,54 350,54 420,92" fill={colors.primary} fillOpacity="0.22" stroke={colors.primary} strokeWidth="2" />
            <polygon points="245,54 280,24 320,24 355,54" fill={colors.secondary} fillOpacity="0.28" stroke={colors.secondary} strokeWidth="2" />
            {[225, 260, 300, 340, 375].map((x, i) => (
              <line key={i} x1={x} y1="96" x2={x} y2="148" stroke={colors.primary} strokeWidth="2.5" />
            ))}
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 600 185" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id={`bg-${ptnId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#090D16" />
          <stop offset="55%" stopColor="#0F172A" />
          <stop offset="100%" stopColor={colors.badgeBg} stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={`glow-${ptnId}`} cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.24" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="600" height="185" fill={`url(#bg-${ptnId})`} />
      <circle cx="300" cy="88" r="145" fill={`url(#glow-${ptnId})`} />

      {/* Perspective Blueprint Grid */}
      {[35, 70, 105, 140].map((y, idx) => (
        <line
          key={`h-${idx}`}
          x1="0"
          y1={y}
          x2="600"
          y2={y}
          stroke="#1E293B"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {[90, 195, 300, 405, 510].map((x, idx) => (
        <line
          key={`v-${idx}`}
          x1={x}
          y1="0"
          x2={x}
          y2="150"
          stroke="#1E293B"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Mathematical Constellation Nodes on Left & Right Wings */}
      <g opacity="0.75">
        <path
          d="M 38 118 Q 88 64 148 92 T 210 68"
          stroke={colors.secondary}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M 395 68 Q 455 96 510 60 T 568 108"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        {[
          [48, 110],
          [96, 78],
          [148, 92],
          [452, 82],
          [510, 60],
          [556, 98],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3.5"
            fill={i % 2 === 0 ? colors.primary : colors.secondary}
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.6, delay: i * 0.25, repeat: Infinity }}
          />
        ))}
        <text x="28" y="54" className="fill-slate-500 text-[11px] font-mono font-bold">
          ∑ f(x) · ℝⁿ
        </text>
        <text x="488" y="46" className="fill-slate-500 text-[11px] font-mono font-bold">
          P(A|B) · AI
        </text>
      </g>

      {/* Iconic University Building Silhouette */}
      {renderArchitectureSilhouette()}

      {/* Ground Horizon Line */}
      <line x1="24" y1="150" x2="576" y2="150" stroke={colors.primary} strokeWidth="2" strokeOpacity="0.65" />

      {/* Top Left Badge: PTN Code & City */}
      <g transform="translate(18, 14)">
        <rect
          width="225"
          height="26"
          rx="6"
          fill="#020617"
          fillOpacity="0.88"
          stroke="#334155"
          strokeWidth="1"
        />
        <circle cx="14" cy="13" r="4" fill={colors.primary} />
        <text x="26" y="17" className="fill-slate-100 text-[11px] font-mono font-bold">
          {ptnCode} · {city} ({establishedYear})
        </text>
      </g>

      {/* Top Right Badge: Faculty Code */}
      <g transform="translate(412, 14)">
        <rect
          width="170"
          height="26"
          rx="6"
          fill="#020617"
          fillOpacity="0.88"
          stroke={colors.primary}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <text
          x="85"
          y="17"
          textAnchor="middle"
          fill={colors.accentText}
          className="text-[11px] font-mono font-extrabold"
        >
          {facultyName}
        </text>
      </g>

      {/* Bottom Caption Bar inside SVG */}
      <rect x="0" y="152" width="600" height="33" fill="#020617" fillOpacity="0.9" />
      <text x="20" y="173" className="fill-slate-200 text-[12px] font-mono font-bold">
        {landmarkLabel}
      </text>
    </svg>
  );
};

/**
 * Compact Pure Vector SVG Emblem for Laboratory Facilities (No Photos)
 */
export const LabVectorIconSvg: React.FC<{
  svgType: 'compute' | 'actuary' | 'ai' | 'math' | 'data';
}> = ({ svgType }) => {
  if (svgType === 'actuary') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" fill="none">
        <rect width="36" height="36" rx="8" fill="#064E3B" fillOpacity="0.55" stroke="#10B981" strokeWidth="1.2" />
        <path d="M8 25 L14 19 L20 22 L28 11" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="28" cy="11" r="2.5" fill="#34D399" />
      </svg>
    );
  }
  if (svgType === 'ai') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" fill="none">
        <rect width="36" height="36" rx="8" fill="#4C0519" fillOpacity="0.55" stroke="#F43F5E" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2.5" fill="#FB7185" />
        <circle cx="12" cy="24" r="2.5" fill="#FB7185" />
        <circle cx="25" cy="18" r="3" fill="#38BDF8" />
        <line x1="14" y1="12" x2="22" y2="18" stroke="#FB7185" strokeWidth="1.5" />
        <line x1="14" y1="24" x2="22" y2="18" stroke="#FB7185" strokeWidth="1.5" />
      </svg>
    );
  }
  if (svgType === 'data') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" fill="none">
        <rect width="36" height="36" rx="8" fill="#451A03" fillOpacity="0.55" stroke="#F59E0B" strokeWidth="1.2" />
        <ellipse cx="18" cy="11" rx="8" ry="3.5" stroke="#FBBF24" strokeWidth="1.6" />
        <path d="M10 11 V24 C10 26 26 26 26 24 V11" stroke="#FBBF24" strokeWidth="1.6" />
        <path d="M10 17.5 C10 19.5 26 19.5 26 17.5" stroke="#FBBF24" strokeWidth="1.4" />
      </svg>
    );
  }
  if (svgType === 'math') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" fill="none">
        <rect width="36" height="36" rx="8" fill="#1E1B4B" fillOpacity="0.65" stroke="#818CF8" strokeWidth="1.2" />
        <polygon points="18,8 27,14 27,23 18,28 9,23 9,14" stroke="#A5B4FC" strokeWidth="1.6" />
        <circle cx="18" cy="18" r="2.5" fill="#38BDF8" />
      </svg>
    );
  }
  // 'compute' default
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" fill="none">
      <rect width="36" height="36" rx="8" fill="#083344" fillOpacity="0.6" stroke="#22D3EE" strokeWidth="1.2" />
      <rect x="9" y="10" width="18" height="12" rx="2" stroke="#67E8F9" strokeWidth="1.6" />
      <line x1="13" y1="26" x2="23" y2="26" stroke="#67E8F9" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

interface MajorRadarSvgProps {
  mathAbstraction: number;
  codingIntensity: number;
  businessFinanceFocus: number;
  dataEngineeringFocus: number;
  accentHex: string;
}

/**
 * 4-Axis Diamond Radar Chart for Slide 01 DNA Metrics
 */
export const MajorRadarSvg: React.FC<MajorRadarSvgProps> = ({
  mathAbstraction,
  codingIntensity,
  businessFinanceFocus,
  dataEngineeringFocus,
  accentHex,
}) => {
  const cx = 90;
  const cy = 68;
  const maxR = 46;

  // Top: Math, Right: Coding, Bottom: Finance, Left: Data
  const topY = cy - (mathAbstraction / 100) * maxR;
  const rightX = cx + (codingIntensity / 100) * maxR;
  const bottomY = cy + (businessFinanceFocus / 100) * maxR;
  const leftX = cx - (dataEngineeringFocus / 100) * maxR;

  const polygonPoints = `${cx},${topY} ${rightX},${cy} ${cx},${bottomY} ${leftX},${cy}`;

  return (
    <svg viewBox="0 0 180 136" className="w-full h-full overflow-visible">
      {/* Concentric Diamond Grids */}
      {[0.35, 0.7, 1].map((scale, i) => {
        const r = maxR * scale;
        return (
          <polygon
            key={i}
            points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
            fill="none"
            stroke="#1E293B"
            strokeWidth="1"
            strokeDasharray={i < 2 ? '2 2' : undefined}
          />
        );
      })}
      {/* Axes */}
      <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="#334155" strokeWidth="1" />
      <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="#334155" strokeWidth="1" />

      {/* Active Major Polygon */}
      <motion.polygon
        points={polygonPoints}
        fill={accentHex}
        fillOpacity="0.28"
        stroke={accentHex}
        strokeWidth="2.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Vertices */}
      <circle cx={cx} cy={topY} r="3.5" fill="#818CF8" />
      <circle cx={rightX} cy={cy} r="3.5" fill="#FB7185" />
      <circle cx={cx} cy={bottomY} r="3.5" fill="#34D399" />
      <circle cx={leftX} cy={cy} r="3.5" fill="#FBBF24" />

      {/* Labels */}
      <text x={cx} y={13} textAnchor="middle" className="fill-indigo-300 text-[9px] font-mono font-bold">
        RUMUS {mathAbstraction}%
      </text>
      <text x={cx + maxR + 6} y={cy + 3} textAnchor="start" className="fill-rose-300 text-[9px] font-mono font-bold">
        KODING
      </text>
      <text x={cx} y={130} textAnchor="middle" className="fill-emerald-300 text-[9px] font-mono font-bold">
        BISNIS {businessFinanceFocus}%
      </text>
      <text x={cx - maxR - 6} y={cy + 3} textAnchor="end" className="fill-amber-300 text-[9px] font-mono font-bold">
        DATA
      </text>
    </svg>
  );
};

interface RadialGaugeSvgProps {
  value: number;
  max?: number;
  min?: number;
  colorHex: string;
  label?: string;
  displayText: string;
}

/**
 * Semi-circular / Arc Gauge for UTBK Scores & Probability Percentages
 */
export const SemiCircleGaugeSvg: React.FC<RadialGaugeSvgProps> = ({
  value,
  min = 0,
  max = 100,
  colorHex,
  displayText,
  label,
}) => {
  const ratio = Math.max(0, Math.min(1, (value - min) / Math.max(1, max - min)));
  const radius = 38;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference * (1 - ratio);

  return (
    <svg viewBox="0 0 100 62" className="w-28 xl:w-32 h-auto overflow-visible shrink-0">
      {/* Background Track Arc */}
      <path
        d="M 12 50 A 38 38 0 0 1 88 50"
        fill="none"
        stroke="#1E293B"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Active Foreground Arc */}
      <motion.path
        d="M 12 50 A 38 38 0 0 1 88 50"
        fill="none"
        stroke={colorHex}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        className="fill-white text-[15px] font-mono font-extrabold"
      >
        {displayText}
      </text>
      {label && (
        <text
          x="50"
          y="59"
          textAnchor="middle"
          className="fill-slate-400 text-[8.5px] font-mono uppercase"
        >
          {label}
        </text>
      )}
    </svg>
  );
};
