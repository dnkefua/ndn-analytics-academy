import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, FileText, PlayCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { curriculumWeeks, type WeeklyLesson } from "../../data/curriculum";
import { getWeeklySchedule } from "../../data/cohortSchedule";
import { WeeklyScheduleSection } from "./WeeklyScheduleSection";

interface WeeklyLessonTemplateProps {
  lesson: WeeklyLesson;
}

export function WeeklyLessonTemplate({ lesson }: WeeklyLessonTemplateProps) {
  const schedule = getWeeklySchedule(lesson.week);
  const orderedWeeks = [...curriculumWeeks].sort((a, b) => a.week - b.week);
  const currentIndex = orderedWeeks.findIndex((w) => w.week === lesson.week);
  const prevWeek = currentIndex > 0 ? orderedWeeks[currentIndex - 1] : null;
  const nextWeek = currentIndex < orderedWeeks.length - 1 ? orderedWeeks[currentIndex + 1] : null;

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          to="/courses/ai-mvp-builder-africa/curriculum"
          className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 py-2 text-sm font-bold text-white hover:border-[#3FA9F5]/50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to curriculum
        </Link>
        <Link
          to="/enroll"
          className="inline-flex items-center rounded-lg bg-[#F5B400] px-4 py-2 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
        >
          Enroll
        </Link>
      </div>

      {/* Week switcher — jump directly to any week's day-to-day lessons */}
      <nav aria-label="Weekly lessons" className="mb-8 rounded-lg border border-white/12 bg-white/6 p-3">
        <p className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Weekly lessons</p>
        <div className="flex flex-wrap gap-2">
          {orderedWeeks.map((w) => {
            const active = w.week === lesson.week;
            return (
              <Link
                key={w.slug}
                to={w.route}
                aria-current={active ? "page" : undefined}
                title={w.previewTitle}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-[#3FA9F5] text-[#071527]"
                    : "border border-white/12 bg-[#071527]/60 text-slate-200 hover:border-[#3FA9F5]/50 hover:text-white"
                }`}
              >
                Week {w.week}
              </Link>
            );
          })}
        </div>
      </nav>

      <header className="rounded-lg border border-white/12 bg-white/6 p-6">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F5B400]">
          Week {lesson.week}
        </p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          {lesson.theme}
        </p>
      </header>

      {schedule && <WeeklyScheduleSection schedule={schedule} />}

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="text-2xl font-black text-white">Learning objectives</h2>
          <ul className="mt-5 space-y-3">
            {lesson.learningObjectives.map((objective) => (
              <li key={objective} className="flex gap-3 text-sm leading-6 text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#22C55E]" aria-hidden="true" />
                {objective}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="text-2xl font-black text-white">Live session topics</h2>
          <div className="mt-5 grid gap-3">
            {lesson.liveSessions.map((session, index) => (
              <div key={session} className="rounded-lg border border-[#3FA9F5]/25 bg-[#3FA9F5]/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#BAE6FD]">
                  Session {index + 1}
                </p>
                <p className="mt-2 font-black text-white">{session}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-white/12 bg-white/6 p-6">
        <h2 className="text-2xl font-black text-white">Key lesson notes</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {lesson.keyLessonNotes.map((note) => (
            <p key={note} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4 text-sm leading-6 text-slate-300">
              {note}
            </p>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-[#3FA9F5]/30 bg-[#3FA9F5]/10 p-6">
          <div className="mb-5 flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-[#3FA9F5]" aria-hidden="true" />
            <h2 className="text-2xl font-black text-white">Video and replay plan</h2>
          </div>
          <div className="space-y-3">
            {lesson.videoLessons.map((video) => (
              <div key={video.title} className="rounded-lg border border-white/12 bg-[#071527]/75 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#3FA9F5]/35 bg-[#3FA9F5]/12 px-3 py-1 text-xs font-bold text-[#BAE6FD]">
                    {video.status}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {video.duration}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-black text-white">{video.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{video.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/12 bg-white/6 p-6">
          <div className="mb-5 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#F5B400]" aria-hidden="true" />
            <h2 className="text-2xl font-black text-white">Documentation resources</h2>
          </div>
          <div className="space-y-3">
            {lesson.documentation.map((doc) => (
              <div key={doc.title} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5B400]">{doc.format}</p>
                <h3 className="mt-2 text-base font-black text-white">{doc.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{doc.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-[#F5B400]/30 bg-[#F5B400]/10 p-6">
        <div className="mb-4 flex items-center gap-2 text-[#F5B400]">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          <h2 className="text-2xl font-black text-white">AI prompt of the week</h2>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/12 bg-[#06101f] p-5 font-mono text-sm leading-7 text-[#BAE6FD]">
          {lesson.prompt}
        </pre>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-white/12 bg-white/6 p-6">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-[#3FA9F5]" aria-hidden="true" />
            <h2 className="text-2xl font-black text-white">Assignment</h2>
          </div>
          <p className="text-sm leading-7 text-slate-300">{lesson.assignment}</p>
          <h3 className="mt-6 text-lg font-black text-white">Deliverables</h3>
          <ul className="mt-3 space-y-2">
            {lesson.deliverables.map((deliverable) => (
              <li key={deliverable} className="text-sm text-slate-200">- {deliverable}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="text-2xl font-black text-white">Completion checklist</h2>
          <ul className="mt-5 space-y-3">
            {lesson.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                <span className="mt-0.5 h-4 w-4 flex-none rounded border border-[#F5B400]/50 bg-[#F5B400]/10" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/10 p-4 text-sm leading-6 text-slate-200">
            <span className="font-bold text-[#BBF7D0]">Outcome:</span> {lesson.outcome}
          </div>
        </section>
      </div>

      {/* Previous / Next week navigation */}
      <nav aria-label="Week navigation" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
        {prevWeek ? (
          <Link
            to={prevWeek.route}
            className="group flex flex-1 items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-4 text-left transition hover:border-[#3FA9F5]/50 hover:bg-white/8"
          >
            <ArrowLeft className="h-5 w-5 flex-none text-[#3FA9F5]" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Previous week</span>
              <span className="block truncate font-black text-white">Week {prevWeek.week}: {prevWeek.title}</span>
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {nextWeek ? (
          <Link
            to={nextWeek.route}
            className="group flex flex-1 items-center justify-end gap-3 rounded-lg border border-white/12 bg-white/6 p-4 text-right transition hover:border-[#3FA9F5]/50 hover:bg-white/8"
          >
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Next week</span>
              <span className="block truncate font-black text-white">Week {nextWeek.week}: {nextWeek.title}</span>
            </span>
            <ArrowRight className="h-5 w-5 flex-none text-[#3FA9F5]" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            to="/enroll"
            className="flex flex-1 items-center justify-end gap-3 rounded-lg border border-[#F5B400]/40 bg-[#F5B400]/10 p-4 text-right transition hover:bg-[#F5B400]/15"
          >
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[#F5B400]">You reached the final week</span>
              <span className="block truncate font-black text-white">Enroll to build your MVP</span>
            </span>
            <ArrowRight className="h-5 w-5 flex-none text-[#F5B400]" aria-hidden="true" />
          </Link>
        )}
      </nav>
    </article>
  );
}
