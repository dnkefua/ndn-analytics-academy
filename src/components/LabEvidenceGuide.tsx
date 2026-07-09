import React from 'react';
import { ExternalLink, FileText, Film, Image as ImageIcon, ListChecks, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Lab, Lesson } from '../types/academy';
import { LAB_EVIDENCE_GUIDES } from '../data/labEvidenceGuides';

interface LabEvidenceGuideProps {
  lab: Lab;
  videoLesson?: Lesson;
}

export const LabEvidenceGuide: React.FC<LabEvidenceGuideProps> = ({ lab, videoLesson }) => {
  const guide = LAB_EVIDENCE_GUIDES[lab.id];
  if (!guide) return null;

  return (
    <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl text-slate-100">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Docs Walkthrough</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">Production Evidence Guide</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{guide.focus}</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold text-cyan-300">
          {lab.title}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 space-y-5">
          {videoLesson?.videoUrl && (
            <figure className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Film className="w-4 h-4" />
                <span>Embedded Video Companion</span>
              </div>
              <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-lg" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={videoLesson.videoUrl}
                  title={videoLesson.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <figcaption className="text-center text-[11px] text-slate-500 italic">{videoLesson.title}</figcaption>
            </figure>
          )}

          <figure className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <ImageIcon className="w-4 h-4" />
              <span>Official Docs Screenshot</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-lg">
              <img src={guide.screenshot.src} alt={guide.screenshot.alt} loading="lazy" className="w-full block" />
            </div>
            <figcaption className="text-center text-[11px] text-slate-500 italic">{guide.screenshot.caption}</figcaption>
          </figure>
        </div>

        <div className="xl:col-span-2 space-y-5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Primary Documentation</span>
            </h3>
            <div className="space-y-2">
              {guide.docs.map((doc) => (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-cyan-300 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                >
                  <span>{doc.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-emerald-400" />
              <span>Walkthrough Exercises</span>
            </h3>
            <ol className="space-y-2">
              {guide.walkthrough.map((step, idx) => (
                <li key={step} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Submission Evidence Pack</span>
            </h3>
            <ul className="space-y-2">
              {guide.evidence.map((item) => (
                <li key={item} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-amber-200 flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-amber-400" />
              <span>Common Review Flags</span>
            </h3>
            <ul className="space-y-2">
              {guide.pitfalls.map((item) => (
                <li key={item} className="flex gap-2 text-xs text-amber-100/80 leading-relaxed">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
