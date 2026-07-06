import { revenueTargets } from "../../data/pricing";

export function RevenueTarget() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-lg border border-[#22C55E]/35 bg-[#22C55E]/10 p-5">
        <h3 className="text-xl font-black text-white">First-cohort revenue potential</h3>
        <div className="mt-4 space-y-2">
          {revenueTargets.base.map((line) => (
            <p key={line} className="rounded-lg bg-[#071527]/70 px-4 py-3 text-sm font-bold text-slate-100">
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-5">
        <h3 className="text-xl font-black text-white">Upside planning scenario</h3>
        <div className="mt-4 space-y-2">
          {revenueTargets.upside.map((line) => (
            <p key={line} className="rounded-lg bg-[#071527]/70 px-4 py-3 text-sm font-bold text-slate-100">
              {line}
            </p>
          ))}
        </div>
      </div>
      <p className="lg:col-span-2 text-sm leading-6 text-slate-400">
        {revenueTargets.note}
      </p>
    </div>
  );
}
