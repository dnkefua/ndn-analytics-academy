import { AlertCircle } from "lucide-react";
import { problemCards } from "../../data/cohort";

export function ProblemCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {problemCards.map((problem) => (
        <div key={problem} className="rounded-lg border border-white/12 bg-white/6 p-5">
          <AlertCircle className="mb-4 h-5 w-5 text-[#F5B400]" aria-hidden="true" />
          <p className="text-sm font-semibold leading-6 text-slate-100">{problem}</p>
        </div>
      ))}
    </div>
  );
}
