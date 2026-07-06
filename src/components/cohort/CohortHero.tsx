import { ArrowRight, Award, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cohortInfo, heroBadges } from "../../data/cohort";
import { CohortBadge } from "./CohortBadge";

export function CohortHero() {
  const handleApplyClick = () => {
    // TODO: Add Meta Pixel event: CohortApplyClick
    // TODO: Add GA4 event: apply_now_clicked
  };

  return (
    <section className="relative overflow-hidden bg-[#071527] pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(63,169,245,0.18),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(245,180,0,0.16),transparent_30%),linear-gradient(135deg,#071527_0%,#0B1F3A_48%,#06101f_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071527] to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap gap-2">
            {heroBadges.map((badge, index) => (
              <CohortBadge key={badge} tone={index === 1 || index === 2 ? "gold" : "blue"}>
                {badge}
              </CohortBadge>
            ))}
          </div>

          <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-[#F5B400]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {cohortInfo.positioning}
          </div>

          <h1 className="max-w-4xl font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Build Your MVP App in 6 Weeks Using AI
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            A premium first cohort by NDN Analytics Academy for African founders,
            students, and business owners who want to turn app ideas into working MVPs.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            {cohortInfo.supportLine}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/apply"
              onClick={handleApplyClick}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] shadow-lg shadow-[#F5B400]/20 transition hover:bg-[#FFD166]"
            >
              Apply for Cohort 1
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/courses/ai-mvp-builder-africa/curriculum"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/18 bg-white/8 px-6 py-3 text-sm font-bold text-white transition hover:border-[#3FA9F5]/60 hover:bg-[#3FA9F5]/12"
            >
              View Curriculum
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-xl rounded-lg border border-white/12 bg-white/8 p-6 shadow-2xl shadow-[#3FA9F5]/20 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/12 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F5B400]">
                  Founding Cohort
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  AI MVP Builder Africa
                </h2>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-lg border border-[#F5B400]/40 bg-[#F5B400]/15">
                <Award className="h-7 w-7 text-[#F5B400]" aria-hidden="true" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["6 Weeks", "Guided builder sprint"],
                ["10 Students", "Focused support"],
                ["1 Working MVP Direction", "Demo-ready path"],
                ["Certificate Included", "NDN Academy credential"],
                ["Starting from $420", "First 3 students"],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-lg border border-white/12 bg-[#071527]/70 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#22C55E]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wide">Included</span>
                  </div>
                  <p className="text-lg font-black text-white">{label}</p>
                  <p className="mt-1 text-sm text-slate-300">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-[#3FA9F5]/30 bg-[#3FA9F5]/10 p-4 text-sm leading-6 text-slate-200">
              {cohortInfo.promise}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
