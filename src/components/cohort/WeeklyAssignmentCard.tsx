import { CalendarClock, ClipboardList } from "lucide-react";
import type { WeeklyAssignment } from "../../data/cohortSchedule";
import { InstructorCollectionChecklist } from "./InstructorCollectionChecklist";
import { StudentSubmissionChecklist } from "./StudentSubmissionChecklist";

interface WeeklyAssignmentCardProps {
  assignment: WeeklyAssignment;
}

export function WeeklyAssignmentCard({ assignment }: WeeklyAssignmentCardProps) {
  return (
    <section className="rounded-lg border border-white/12 bg-white/6 p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F5B400]">Weekly assignment</p>
          <h2 className="mt-2 text-2xl font-black text-white">{assignment.title}</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#F5B400]/35 bg-[#F5B400]/10 px-3 py-1 text-sm font-bold text-[#FDE68A]">
          <CalendarClock className="h-4 w-4" aria-hidden="true" />
          {assignment.deadline}
        </span>
      </div>

      <div className="rounded-lg border border-[#3FA9F5]/25 bg-[#3FA9F5]/10 p-4">
        <h3 className="flex items-center gap-2 text-sm font-black text-white">
          <ClipboardList className="h-4 w-4 text-[#3FA9F5]" aria-hidden="true" />
          Instructions
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-300">{assignment.instructions}</p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <StudentSubmissionChecklist items={assignment.studentMustSubmit} />
        <InstructorCollectionChecklist items={assignment.instructorMustCollect} />
      </div>

      <div className="mt-5 rounded-lg border border-white/12 bg-[#071527]/70 p-5">
        <h3 className="text-xl font-black text-white">Completion criteria</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {assignment.completionCriteria.map((criterion) => (
            <li key={criterion} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm leading-6 text-slate-300">
              {criterion}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
