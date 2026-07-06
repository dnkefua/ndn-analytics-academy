import { cohortFaqs } from "../../data/faqs";

export function FAQAccordion() {
  return (
    <div className="space-y-3">
      {cohortFaqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-lg border border-white/12 bg-white/6 p-5 open:border-[#3FA9F5]/45 open:bg-[#3FA9F5]/8"
        >
          <summary className="cursor-pointer list-none text-base font-black text-white">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span className="text-xl text-[#F5B400] group-open:hidden">+</span>
              <span className="hidden text-xl text-[#F5B400] group-open:inline">-</span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
