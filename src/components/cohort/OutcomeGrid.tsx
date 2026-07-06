import { CheckCircle2 } from "lucide-react";

interface OutcomeGridProps {
  outcomes: string[];
}

export function OutcomeGrid({ outcomes }: OutcomeGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {outcomes.map((outcome) => (
        <div key={outcome} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
          <CheckCircle2 className="h-5 w-5 flex-none text-[#22C55E]" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-100">{outcome}</span>
        </div>
      ))}
    </div>
  );
}
