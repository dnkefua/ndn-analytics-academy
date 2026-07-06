import { CheckCircle2 } from "lucide-react";

interface StudentSubmissionChecklistProps {
  title?: string;
  items: string[];
}

export function StudentSubmissionChecklist({
  title = "Student submission checklist",
  items,
}: StudentSubmissionChecklistProps) {
  return (
    <section className="rounded-lg border border-[#22C55E]/35 bg-[#22C55E]/10 p-5">
      <h3 className="text-xl font-black text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#22C55E]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
