import { CalendarDays, Clock } from "lucide-react";
import { cohortClassRhythm, cohortRhythmStats } from "../../data/cohortSchedule";

export function CohortClassRhythm() {
  return (
    <section className="rounded-lg border border-white/12 bg-white/6 p-6">
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F5B400]">Class rhythm</p>
        <h2 className="mt-2 text-2xl font-black text-white">Weekly teaching structure</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cohortRhythmStats.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-2 text-lg font-black text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {cohortClassRhythm.map((item) => (
          <div key={item.day} className="rounded-lg border border-[#3FA9F5]/25 bg-[#3FA9F5]/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-[#BAE6FD]">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-black">{item.day}</span>
            </div>
            <p className="text-base font-black text-white">{item.sessionType}</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#F5B400]">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {item.time}
            </p>
            <p className="mt-1 text-sm text-slate-300">{item.duration}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.purpose}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
