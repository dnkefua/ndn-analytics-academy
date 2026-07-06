import { CalendarDays, Clock, Target } from "lucide-react";
import type { CohortSession } from "../../data/cohortSchedule";

interface SessionPlanCardProps {
  session: CohortSession;
}

export function SessionPlanCard({ session }: SessionPlanCardProps) {
  const isDeadline = session.sessionType.includes("Assignment");

  return (
    <article className={`rounded-lg border p-5 ${isDeadline ? "border-[#F5B400]/35 bg-[#F5B400]/10" : "border-white/12 bg-white/6"}`}>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#3FA9F5]/35 bg-[#3FA9F5]/12 px-3 py-1 text-xs font-bold text-[#BAE6FD]">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {session.date}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#071527]/70 px-3 py-1 text-xs font-bold text-slate-200">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {session.duration}
        </span>
      </div>

      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F5B400]">
        {session.sessionType}
      </p>
      <h3 className="mt-2 text-2xl font-black text-white">{session.title}</h3>
      <p className="mt-2 text-sm font-semibold text-[#BAE6FD]">{session.time}</p>

      <div className="mt-5 rounded-lg border border-white/10 bg-[#071527]/70 p-4">
        <h4 className="flex items-center gap-2 text-sm font-black text-white">
          <Target className="h-4 w-4 text-[#22C55E]" aria-hidden="true" />
          Target outcome
        </h4>
        <p className="mt-2 text-sm leading-6 text-slate-300">{session.target}</p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-black text-white">Learning points</h4>
          <ul className="mt-3 space-y-2">
            {session.learningPoints.map((point) => (
              <li key={point} className="text-sm leading-6 text-slate-300">- {point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black text-white">Student outputs</h4>
          <ul className="mt-3 space-y-2">
            {session.studentOutputs.map((output) => (
              <li key={output} className="text-sm leading-6 text-slate-300">- {output}</li>
            ))}
          </ul>
        </div>
      </div>

      {session.practicalActivity && (
        <div className="mt-5 rounded-lg border border-[#3FA9F5]/25 bg-[#3FA9F5]/10 p-4">
          <h4 className="text-sm font-black text-white">Practical activity</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{session.practicalActivity}</p>
        </div>
      )}

      {session.prompt && (
        <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/12 bg-[#06101f] p-4 font-mono text-sm leading-7 text-[#BAE6FD]">
          {session.prompt}
        </pre>
      )}

      {session.instructorActions && session.instructorActions.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-black text-white">Instructor actions</h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {session.instructorActions.map((action) => (
              <li key={action} className="rounded-lg border border-white/10 bg-[#071527]/70 p-3 text-sm leading-6 text-slate-300">
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
