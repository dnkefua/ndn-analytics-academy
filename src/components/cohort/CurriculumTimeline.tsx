import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { curriculumWeeks } from "../../data/curriculum";

export function CurriculumTimeline() {
  const handleCurriculumClick = () => {
    // TODO: Track curriculum view tracking
  };

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {curriculumWeeks.map((week) => (
        <article key={week.slug} className="group rounded-lg border border-white/12 bg-white/6 p-5 transition hover:border-[#3FA9F5]/50 hover:bg-white/8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3FA9F5]/30 bg-[#3FA9F5]/12 px-3 py-1 text-xs font-bold text-[#BAE6FD]">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Week {week.week}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5B400]">
              Outcome
            </span>
          </div>
          <h3 className="text-xl font-black text-white">{week.previewTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{week.shortDescription}</p>
          <div className="mt-4 rounded-lg border border-white/10 bg-[#071527]/70 p-3 text-sm text-slate-200">
            <span className="font-bold text-[#F5B400]">Outcome:</span> {week.outcome}
          </div>
          <Link
            to={week.route}
            onClick={handleCurriculumClick}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#3FA9F5] transition group-hover:text-[#BAE6FD]"
          >
            View week detail
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
