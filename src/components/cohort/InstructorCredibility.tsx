import { BadgeCheck, Building2 } from "lucide-react";
import { credibilityPoints, instructor } from "../../data/cohort";

export function InstructorCredibility() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-white/12 bg-white/6 p-6">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F5B400]/35 bg-[#F5B400]/12 px-3 py-1 text-xs font-bold text-[#FDE68A]">
          <Building2 className="h-4 w-4" aria-hidden="true" />
          Instructor
        </div>
        <h3 className="text-2xl font-black text-white">{instructor.name}</h3>
        <p className="mt-2 text-sm font-bold text-[#3FA9F5]">{instructor.title}</p>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          <span className="font-bold text-white">Focus:</span> {instructor.focus}
        </p>
      </div>

      <div className="rounded-lg border border-white/12 bg-white/6 p-6">
        <h3 className="mb-4 text-xl font-black text-white">
          NDN Analytics credibility
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {credibilityPoints.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#071527]/60 p-3">
              <BadgeCheck className="h-4 w-4 flex-none text-[#22C55E]" aria-hidden="true" />
              <span className="text-sm font-semibold text-slate-200">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
