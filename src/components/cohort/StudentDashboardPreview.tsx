import { Award, CalendarClock, CheckCircle2, CreditCard, FileText, PlayCircle } from "lucide-react";
import { documentationLibrary, videoLibrary } from "../../data/cohort";
import { curriculumWeeks } from "../../data/curriculum";

const progressCards = [
  "Idea Brief",
  "User Flow",
  "App Screens",
  "Frontend",
  "Firebase Data",
  "AI Feature",
  "Demo Video",
  "Launch Plan",
];

const promptLibrary = [
  "Product manager MVP blueprint prompt",
  "UI/UX screen structure prompt",
  "Firebase architecture prompt",
  "Applied AI feature prompt",
];

export function StudentDashboardPreview() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-[#3FA9F5]/35 bg-[#3FA9F5]/10 p-5 text-sm font-semibold leading-6 text-slate-200">
        This dashboard preview will become available to enrolled students after cohort onboarding.
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F5B400]">
            Student Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-black text-white">
            Welcome to AI MVP Builder Africa - Cohort 1
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Track your MVP build progress, weekly lessons, assignments, prompts, payments,
            and certificate readiness from one focused cohort workspace.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Cohort progress", "0%", "Onboarding"],
            ["Current week", "Week 1", "Idea to MVP"],
            ["Next live session", "Wednesday", "Live teaching"],
            ["Assignment due", "Sunday", "Progress check-in"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-lg border border-white/12 bg-white/6 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
              <p className="mt-3 text-2xl font-black text-white">{value}</p>
              <p className="mt-1 text-sm text-[#3FA9F5]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-black text-white">
            <PlayCircle className="h-5 w-5 text-[#3FA9F5]" aria-hidden="true" />
            Lesson list
          </h2>
          <div className="space-y-3">
            {curriculumWeeks.map((week) => (
              <div key={week.slug} className="rounded-lg border border-white/10 bg-[#071527]/70 p-3">
                <p className="text-xs font-bold text-[#F5B400]">Week {week.week}</p>
                <p className="mt-1 text-sm font-bold text-white">{week.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="text-2xl font-black text-white">MVP checklist</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {progressCards.map((card) => (
              <div key={card} className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#071527]/70 p-4">
                <span className="h-4 w-4 rounded border border-[#F5B400]/50 bg-[#F5B400]/10" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-100">{card}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="text-xl font-black text-white">Prompt library</h2>
          <ul className="mt-4 space-y-3">
            {promptLibrary.map((prompt) => (
              <li key={prompt} className="flex gap-3 text-sm leading-6 text-slate-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#22C55E]" aria-hidden="true" />
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <CreditCard className="h-5 w-5 text-[#F5B400]" aria-hidden="true" />
            Payment plan card
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Selected plan, confirmation status, receipt notes, and balance information
            will appear here after onboarding.
          </p>
        </div>

        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <Award className="h-5 w-5 text-[#F5B400]" aria-hidden="true" />
            Certificate progress
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Complete assignments, final demo, and presentation requirements to unlock
            your certificate.
          </p>
          <div className="mt-5 h-2 rounded-full bg-white/12">
            <div className="h-full w-1/6 rounded-full bg-[#F5B400]" />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[#3FA9F5]/35 bg-[#3FA9F5]/10 p-6">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-black text-white">
            <PlayCircle className="h-5 w-5 text-[#3FA9F5]" aria-hidden="true" />
            Video library
          </h2>
          <div className="space-y-3">
            {videoLibrary.map((video) => (
              <div key={video.title} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4">
                <p className="text-sm font-black text-white">{video.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{video.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="mb-5 flex items-center gap-2 text-2xl font-black text-white">
            <FileText className="h-5 w-5 text-[#F5B400]" aria-hidden="true" />
            Documentation library
          </h2>
          <div className="space-y-3">
            {documentationLibrary.map((doc) => (
              <div key={doc.title} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4">
                <p className="text-sm font-black text-white">{doc.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{doc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-[#22C55E]/35 bg-[#22C55E]/10 p-6">
        <h2 className="flex items-center gap-2 text-2xl font-black text-white">
          <CalendarClock className="h-5 w-5 text-[#22C55E]" aria-hidden="true" />
          Final demo checklist
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Demo link", "Pitch video", "Screenshots", "30-day roadmap"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4 text-sm font-bold text-slate-100">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
