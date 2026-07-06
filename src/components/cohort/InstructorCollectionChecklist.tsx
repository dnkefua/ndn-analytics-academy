import { ClipboardCheck } from "lucide-react";

interface InstructorCollectionChecklistProps {
  title?: string;
  items: string[];
}

export function InstructorCollectionChecklist({
  title = "Instructor must collect",
  items,
}: InstructorCollectionChecklistProps) {
  return (
    <section className="rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-5">
      <h3 className="flex items-center gap-2 text-xl font-black text-white">
        <ClipboardCheck className="h-5 w-5 text-[#F5B400]" aria-hidden="true" />
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#F5B400]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
