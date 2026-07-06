import { Link } from "react-router-dom";
import type { WeeklySchedule } from "../../data/cohortSchedule";
import { CohortClassRhythm } from "./CohortClassRhythm";
import { SessionPlanCard } from "./SessionPlanCard";
import { WeeklyAssignmentCard } from "./WeeklyAssignmentCard";

interface WeeklyScheduleSectionProps {
  schedule: WeeklySchedule;
}

export function WeeklyScheduleSection({ schedule }: WeeklyScheduleSectionProps) {
  return (
    <section className="mt-8 space-y-6">
      <header className="rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-6">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F5B400]">
          {schedule.dateRange}
        </p>
        <h2 className="mt-2 text-3xl font-black text-white">{schedule.title}</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-white/12 bg-[#071527]/70 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Weekly goal</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{schedule.weeklyGoal}</p>
          </div>
          <div className="rounded-lg border border-white/12 bg-[#071527]/70 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Weekly deliverable</p>
            <p className="mt-2 text-xl font-black text-white">{schedule.weeklyDeliverable}</p>
          </div>
        </div>
      </header>

      <CohortClassRhythm />

      <div className="grid gap-5">
        {schedule.sessions.map((session) => (
          <SessionPlanCard key={session.id} session={session} />
        ))}
      </div>

      <WeeklyAssignmentCard assignment={schedule.assignment} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          to="/courses/ai-mvp-builder-africa/curriculum"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/12 bg-white/8 px-5 py-3 text-sm font-black text-white hover:border-[#3FA9F5]/50"
        >
          Back to Curriculum
        </Link>
        <Link
          to="/apply"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-5 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
        >
          Apply for Cohort 1
        </Link>
      </div>
    </section>
  );
}
