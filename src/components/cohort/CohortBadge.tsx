interface CohortBadgeProps {
  children: React.ReactNode;
  tone?: "gold" | "blue" | "green" | "neutral";
}

const toneClasses = {
  gold: "border-[#F5B400]/40 bg-[#F5B400]/12 text-[#FDE68A]",
  blue: "border-[#3FA9F5]/40 bg-[#3FA9F5]/12 text-[#BAE6FD]",
  green: "border-[#22C55E]/40 bg-[#22C55E]/12 text-[#BBF7D0]",
  neutral: "border-white/15 bg-white/8 text-slate-200",
};

export function CohortBadge({ children, tone = "neutral" }: CohortBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
