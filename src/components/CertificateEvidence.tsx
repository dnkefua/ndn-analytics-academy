import React from 'react';
import { EarnedCertificate } from '../types/academy';
import { COURSES } from '../data/courses';
import { CourseGradeSummary } from '../services/gradingService';
import { Share2, Printer, X, ShieldCheck, Clock, Award, Layers } from 'lucide-react';

interface CertificateEvidenceProps {
  certificate: EarnedCertificate;
  grade?: CourseGradeSummary;
  onClose: () => void;
}

// Deterministic PRNG from a string seed — powers the verification matrix
const hashString = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const mulberry32 = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// A QR-style verification matrix rendered as SVG, deterministic per verification id
const VerificationMatrix: React.FC<{ seed: string; size?: number }> = ({ seed, size = 84 }) => {
  const n = 21;
  const cell = size / n;
  const rand = mulberry32(hashString(seed));

  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);

  const finderCell = (r: number, c: number) => {
    const lr = r < 7 ? r : r - (n - 7);
    const lc = c < 7 ? c : c - (n - 7);
    const ring = Math.min(lr, lc, 6 - lr, 6 - lc);
    return ring === 0 || ring >= 2; // solid outer ring + solid 3×3 core
  };

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const filled = isFinder(r, c) ? finderCell(r, c) : rand() > 0.52;
      if (filled) {
        cells.push(
          <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell * 0.92} height={cell * 0.92} rx={cell * 0.18} />
        );
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="fill-slate-900" aria-label="Verification matrix">
      {cells}
    </svg>
  );
};

// Gold embossed seal with circular text and ribbon tails
const GoldSeal: React.FC = () => (
  <svg width="126" height="150" viewBox="0 0 126 150" aria-label="NDN Analytics Academy gold seal">
    <defs>
      <linearGradient id="sealGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f7e08b" />
        <stop offset="45%" stopColor="#d4a72c" />
        <stop offset="100%" stopColor="#9a7418" />
      </linearGradient>
      <linearGradient id="sealGoldInner" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff3c0" />
        <stop offset="60%" stopColor="#e3b93f" />
        <stop offset="100%" stopColor="#b8912a" />
      </linearGradient>
      <path id="sealTextPath" d="M 63 17 A 46 46 0 1 1 62.9 17" fill="none" />
    </defs>

    {/* Ribbons */}
    <path d="M44 100 L36 146 L52 134 L60 148 L66 104 Z" fill="#b91c1c" />
    <path d="M82 100 L90 146 L74 134 L66 148 L60 104 Z" fill="#991b1b" />

    {/* Starburst */}
    <g transform="translate(63 63)">
      {Array.from({ length: 24 }).map((_, i) => (
        <path
          key={i}
          d="M0 -58 L6 -46 L-6 -46 Z"
          transform={`rotate(${i * 15})`}
          fill="url(#sealGold)"
        />
      ))}
    </g>

    <circle cx="63" cy="63" r="50" fill="url(#sealGold)" stroke="#7c5e14" strokeWidth="1.5" />
    <circle cx="63" cy="63" r="42" fill="url(#sealGoldInner)" stroke="#8a6a1a" strokeWidth="1" />
    <circle cx="63" cy="63" r="30" fill="none" stroke="#7c5e14" strokeWidth="0.8" strokeDasharray="2 2" />

    <text fontSize="7.4" fontWeight="700" letterSpacing="1.6" fill="#5c4409">
      <textPath href="#sealTextPath" startOffset="0%">
        NDN ANALYTICS ACADEMY • VERIFIED CREDENTIAL •
      </textPath>
    </text>

    <text x="63" y="59" textAnchor="middle" fontSize="16" fontWeight="900" fill="#4a3707" fontFamily="Georgia, serif">NDN</text>
    <text x="63" y="72" textAnchor="middle" fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill="#5c4409">CERTIFIED</text>
    <text x="63" y="81" textAnchor="middle" fontSize="6.4" fontWeight="700" letterSpacing="1.2" fill="#5c4409">EST. 2024</text>
  </svg>
);

// Ornamental corner flourish
const CornerOrnament: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" className={className} aria-hidden="true">
    <g fill="none" stroke="#c9a227" strokeWidth="1.6">
      <path d="M4 32 L4 4 L32 4" />
      <path d="M10 40 L10 10 L40 10" strokeWidth="0.9" opacity="0.65" />
      <circle cx="4" cy="4" r="2.4" fill="#c9a227" stroke="none" />
      <path d="M16 4 C22 8 22 14 16 16 C14 10 12 8 16 4 Z" fill="#c9a227" stroke="none" opacity="0.85" />
      <path d="M4 16 C8 22 14 22 16 16 C10 14 8 12 4 16 Z" fill="#c9a227" stroke="none" opacity="0.85" />
    </g>
  </svg>
);

const honorsFromGrade = (grade?: CourseGradeSummary): string | null => {
  if (!grade) return null;
  if (grade.letterGrade === 'A+' || grade.letterGrade === 'A') return 'With Highest Distinction';
  if (grade.letterGrade === 'A-' || grade.letterGrade === 'B+') return 'With Distinction';
  if (grade.letterGrade === 'B') return 'With Merit';
  return null;
};

const LEVEL_LABELS: Record<string, string> = {
  L1_FOUNDATION: 'Foundation Level',
  L2_INTERMEDIATE: 'Intermediate Level',
  L3_PROFESSIONAL: 'Professional Level',
  L4_EXPERT: 'Expert Level',
};

export const CertificateEvidence: React.FC<CertificateEvidenceProps> = ({
  certificate,
  grade,
  onClose,
}) => {
  const course = COURSES.find(c => c.id === certificate.courseId);
  const honors = honorsFromGrade(grade);

  const handlePrint = () => window.print();

  const shareText = `I earned the "${certificate.title}" professional certificate at NDN Analytics Academy (${certificate.cpdCredits} CPD credits). Verification: ${certificate.verificationId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto print:p-0 print:bg-white print:items-start">
      {/* Print isolation: only the certificate prints, in landscape */}
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body * { visibility: hidden; }
          #ndn-certificate, #ndn-certificate * { visibility: visible; }
          #ndn-certificate {
            position: fixed; inset: 0; margin: 0 !important;
            width: 100vw; height: 100vh; border-radius: 0 !important;
            -webkit-print-color-adjust: exact; print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="relative w-full max-w-5xl space-y-4 my-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 p-2.5 text-slate-300 hover:text-white rounded-full bg-slate-800 border border-slate-700 shadow-xl cursor-pointer print:hidden"
          aria-label="Close certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ════════ THE DIPLOMA ════════ */}
        <div
          id="ndn-certificate"
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #0b1226 0%, #101c3d 45%, #0b1226 100%)',
          }}
        >
          {/* Outer gold frame */}
          <div className="absolute inset-3 rounded-xl border-2 pointer-events-none" style={{ borderColor: '#c9a227' }} />
          <div className="absolute inset-5 rounded-lg border pointer-events-none" style={{ borderColor: 'rgba(201,162,39,0.45)' }} />

          {/* Corner ornaments */}
          <CornerOrnament className="absolute top-6 left-6" />
          <CornerOrnament className="absolute top-6 right-6 rotate-90" />
          <CornerOrnament className="absolute bottom-6 right-6 rotate-180" />
          <CornerOrnament className="absolute bottom-6 left-6 -rotate-90" />

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
            <img src="/ndn_3d_logo.png" alt="" className="w-[420px] h-[420px] object-contain" />
          </div>

          {/* Subtle radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(201,162,39,0.10), transparent 70%)' }} />

          <div className="relative z-10 px-10 sm:px-16 py-12 space-y-7 text-center">
            {/* Letterhead */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <img src="/ndn_3d_logo.png" alt="NDN Analytics emblem" className="w-12 h-12 object-contain" />
                <div className="text-left">
                  <span className="block text-sm font-extrabold tracking-[0.25em] text-white font-display">NDN ANALYTICS</span>
                  <span className="block text-[10px] font-bold tracking-[0.42em]" style={{ color: '#c9a227' }}>PROFESSIONAL ACADEMY</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4 pt-1">
                <span className="h-px w-20 bg-gradient-to-r from-transparent" style={{ backgroundImage: 'linear-gradient(to right, transparent, #c9a227)' }} />
                <span className="text-[9px] tracking-[0.35em] font-bold" style={{ color: '#c9a227' }}>✦</span>
                <span className="h-px w-20" style={{ backgroundImage: 'linear-gradient(to left, transparent, #c9a227)' }} />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-[2.6rem] leading-tight font-display font-extrabold text-white tracking-tight">
                Certificate of Professional Achievement
              </h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Awarded under the academic authority of NDN Analytics Inc.
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-3">
              <p className="text-xs text-slate-400 uppercase tracking-[0.25em]">This certifies that</p>
              <h2
                className="text-4xl sm:text-5xl font-bold"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', color: '#f3d97a', textShadow: '0 2px 18px rgba(201,162,39,0.35)' }}
              >
                {certificate.recipientName}
              </h2>
              <div className="flex items-center justify-center">
                <span className="h-px w-72 sm:w-96" style={{ backgroundImage: 'linear-gradient(to right, transparent, rgba(201,162,39,0.7), transparent)' }} />
              </div>
              <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
                has satisfied all academic requirements — graded module evaluations, practical laboratory
                assessments, and the capstone project defense — and is hereby awarded certification in
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display max-w-3xl mx-auto">
                {certificate.title}
              </h3>
              {honors && (
                <p className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: '#f3d97a' }}>
                  ✦ {honors} ✦
                </p>
              )}
            </div>

            {/* Credential metadata band */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto py-4 border-t border-b" style={{ borderColor: 'rgba(201,162,39,0.25)' }}>
              <div className="space-y-1">
                <span className="flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-slate-500"><Layers className="w-3 h-3 mr-1" />Course Code</span>
                <span className="block text-sm font-bold text-white font-mono">{course?.code ?? '—'}</span>
                <span className="block text-[9px] text-slate-500">{course ? LEVEL_LABELS[course.level] : ''}</span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-slate-500"><Clock className="w-3 h-3 mr-1" />Program Hours</span>
                <span className="block text-sm font-bold text-white">{course?.durationHours ?? '—'} hours</span>
                <span className="block text-[9px] text-slate-500">{certificate.cpdCredits} CPD credits</span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-slate-500"><Award className="w-3 h-3 mr-1" />Final Grade</span>
                <span className="block text-sm font-bold" style={{ color: '#f3d97a' }}>{grade?.letterGrade ?? 'Pass'}</span>
                <span className="block text-[9px] text-slate-500">{grade ? `${grade.finalScore}% weighted` : 'requirements met'}</span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-slate-500"><ShieldCheck className="w-3 h-3 mr-1" />Issued</span>
                <span className="block text-sm font-bold text-white">{certificate.issueDate}</span>
                <span className="block text-[9px] text-slate-500">valid indefinitely</span>
              </div>
            </div>

            {/* Signature / Seal / Verification row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-2 max-w-4xl mx-auto">
              {/* Signature */}
              <div className="text-center space-y-1 order-2 sm:order-1">
                <div
                  className="text-3xl leading-none"
                  style={{ fontFamily: '"Segoe Script", "Brush Script MT", cursive', color: '#e8eefc' }}
                >
                  Desmond Nkefua
                </div>
                <div className="h-px w-52 mx-auto" style={{ backgroundColor: 'rgba(201,162,39,0.6)' }} />
                <span className="block text-[11px] font-bold text-white pt-1">MSc Desmond Nkefua</span>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-slate-400">Academic Director & Founder</span>
              </div>

              {/* Seal */}
              <div className="order-1 sm:order-2 -my-2">
                <GoldSeal />
              </div>

              {/* Verification */}
              <div className="text-center space-y-2 order-3">
                <div className="p-2 rounded-lg inline-block" style={{ background: '#f3e9c9' }}>
                  <VerificationMatrix seed={certificate.verificationId} />
                </div>
                <span className="block text-[10px] font-mono font-bold tracking-wider" style={{ color: '#c9a227' }}>
                  {certificate.verificationId}
                </span>
                <span className="block text-[8.5px] uppercase tracking-[0.15em] text-slate-500">
                  verify at ndnanalytics.com/verify
                </span>
              </div>
            </div>

            {/* Footer strip */}
            <p className="text-[8.5px] text-slate-500 tracking-wide pt-1">
              Credential {certificate.id} • This certificate attests to independently assessed practical competency.
              Authenticity is verifiable against the NDN Analytics credential registry using the verification ID above.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-[10px] text-slate-500 hidden sm:block">Tip: use landscape orientation when saving</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://ndnanalytics.com")}&summary=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl text-slate-950 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-md"
              style={{ background: 'linear-gradient(135deg, #f3d97a, #c9a227)' }}
            >
              <Share2 className="w-4 h-4" />
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
