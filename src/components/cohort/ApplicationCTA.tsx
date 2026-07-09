import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COHORT_LEAD_EMAIL, getCohortLeadMailto } from "../../data/cohort";

interface ApplicationCTAProps {
  title?: string;
  subtitle?: string;
  cta?: string;
}

export function ApplicationCTA({
  title = "Your app idea deserves a first version.",
  subtitle = "Join Cohort 1 and learn how to build your MVP with AI in 6 weeks.",
  cta = "Enroll for Cohort 1",
}: ApplicationCTAProps) {
  const handleApplyClick = () => {
    // TODO: Add Meta Pixel event: CohortApplyClick
    // TODO: Add GA4 event: apply_now_clicked
  };

  return (
    <section className="rounded-lg border border-[#F5B400]/35 bg-gradient-to-br from-[#F5B400]/16 via-white/8 to-[#3FA9F5]/12 p-8 text-center shadow-xl shadow-[#F5B400]/10">
      <h2 className="mx-auto max-w-3xl text-3xl font-black text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-200">
        {subtitle}
      </p>
      <Link
        to="/enroll"
        onClick={handleApplyClick}
        className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] transition hover:bg-[#FFD166]"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <p className="mt-4 text-sm font-semibold text-slate-300">
        Enrollment and lead emails go to{" "}
        <a href={getCohortLeadMailto()} className="text-[#FDE68A] underline">
          {COHORT_LEAD_EMAIL}
        </a>
        .
      </p>
    </section>
  );
}
