import { ArrowRight, Award, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cohortInfo, heroBadges } from "../../data/cohort";
import { CohortBadge } from "./CohortBadge";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "../ui/motion";
import { UniswapButton } from "../ui/UniswapButton";

export function CohortHero() {
  const handleApplyClick = () => {
    // TODO: Add Meta Pixel event: CohortApplyClick
    // TODO: Add GA4 event: apply_now_clicked
  };

  return (
    <section className="relative overflow-hidden bg-[#071527] pt-28">
      {/* Animated blob backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl mix-blend-screen animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-[40rem] h-[40rem] bg-yellow-500/10 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-4000" />
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071527] to-transparent z-10 pointer-events-none" />

      <FadeInStagger className="relative z-20 mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-24">
        <div className="flex flex-col justify-center">
          <FadeInStaggerItem className="mb-6 flex flex-wrap gap-2">
            {heroBadges.map((badge, index) => (
              <CohortBadge key={badge} tone={index === 1 || index === 2 ? "gold" : "blue"}>
                {badge}
              </CohortBadge>
            ))}
          </FadeInStaggerItem>

          <FadeInStaggerItem className="mb-4 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#F5B400] rounded-full border border-[#F5B400]/30 bg-[#F5B400]/10 px-3 py-1 shadow-[0_0_15px_rgba(245,180,0,0.2)]">
            <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
            {cohortInfo.positioning}
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <h1 className="max-w-4xl font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight">
              Build Your MVP App in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">6 Weeks</span> Using AI
            </h1>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A premium first cohort by NDN Analytics Academy for African founders,
              students, and business owners who want to turn app ideas into working MVPs.
            </p>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              {cohortInfo.supportLine}
            </p>
          </FadeInStaggerItem>

          <FadeInStaggerItem className="mt-8 flex flex-col gap-4 sm:flex-row">
            <UniswapButton
              to="/enroll"
              onClick={handleApplyClick}
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Enroll for Cohort 1
            </UniswapButton>
            <UniswapButton
              to="/courses/ai-mvp-builder-africa/curriculum"
              variant="outline"
              size="lg"
            >
              View Curriculum
            </UniswapButton>
          </FadeInStaggerItem>
        </div>

        <FadeIn delay={0.3} className="relative flex items-center justify-center">
          <div className="group w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_0_50px_rgba(63,169,245,0.15)] backdrop-blur-xl transition-all hover:border-[#3FA9F5]/30">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            <div className="relative mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F5B400] drop-shadow-[0_0_8px_rgba(245,180,0,0.5)]">
                  Founding Cohort
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  AI MVP Builder Africa
                </h2>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-xl border border-[#F5B400]/40 bg-gradient-to-br from-[#F5B400]/20 to-[#F5B400]/5 shadow-[0_0_20px_rgba(245,180,0,0.2)]">
                <Award className="h-8 w-8 text-[#F5B400]" aria-hidden="true" />
              </div>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-2">
              {[
                ["6 Weeks", "Guided builder sprint"],
                ["10 Students", "Focused support"],
                ["1 Working MVP Direction", "Demo-ready path"],
                ["Certificate Included", "NDN Academy credential"],
                ["Starting from $420", "First 3 students"],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-xl border border-white/5 bg-[#071527]/50 p-4 transition-colors hover:bg-[#071527]/80 hover:border-white/10">
                  <div className="mb-2 flex items-center gap-2 text-[#22C55E]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Included</span>
                  </div>
                  <p className="text-lg font-black text-white">{label}</p>
                  <p className="mt-1 text-sm text-slate-400">{detail}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-6 rounded-xl border border-[#3FA9F5]/30 bg-gradient-to-r from-[#3FA9F5]/10 to-transparent p-5 text-sm leading-relaxed text-slate-200">
              {cohortInfo.promise}
            </div>
          </div>
        </FadeIn>
      </FadeInStagger>
    </section>
  );
}
