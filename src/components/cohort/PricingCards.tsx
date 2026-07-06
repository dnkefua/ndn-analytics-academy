import { CheckCircle2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { pricingPlans } from "../../data/pricing";

export function PricingCards() {
  const handlePricingClick = (_planId: string) => {
    // TODO: Track pricing_plan_selected
  };

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <article
          key={plan.id}
          className={`relative flex rounded-lg border p-6 ${
            plan.recommended
              ? "border-[#F5B400]/70 bg-[#F5B400]/10 shadow-xl shadow-[#F5B400]/12"
              : "border-white/12 bg-white/6"
          }`}
        >
          {plan.recommended && (
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#F5B400] px-3 py-1 text-xs font-black text-[#071527]">
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              Recommended
            </div>
          )}
          <div className="flex w-full flex-col">
            <div className="mb-5">
              <p className="text-sm font-bold text-[#F5B400]">{plan.label}</p>
              <h3 className="mt-2 text-2xl font-black text-white">{plan.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="pb-1 text-sm text-slate-300">USD</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{plan.positioning}</p>
              {plan.limitedNote && (
                <p className="mt-3 rounded-lg border border-[#F5B400]/30 bg-[#F5B400]/10 p-3 text-sm font-semibold text-[#FDE68A]">
                  {plan.limitedNote}
                </p>
              )}
            </div>

            <ul className="mb-6 space-y-3">
              {plan.includes.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#22C55E]" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={`/apply?plan=${plan.id}`}
              onClick={() => handlePricingClick(plan.id)}
              className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-sm font-black transition ${
                plan.recommended
                  ? "bg-[#F5B400] text-[#071527] hover:bg-[#FFD166]"
                  : "border border-[#3FA9F5]/45 bg-[#3FA9F5]/12 text-white hover:bg-[#3FA9F5]/20"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
