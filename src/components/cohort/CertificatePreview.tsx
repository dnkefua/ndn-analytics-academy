import { Award } from "lucide-react";
import { cohortInfo } from "../../data/cohort";
import { certificateAttendanceRules, certificateCompletionRequirements } from "../../data/cohortSchedule";

export function CertificatePreview() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F5B400]">
          Certificate Preview
        </p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          Certificate in AI MVP App Building
        </h1>
      </div>

      <section className="rounded-lg border border-[#F5B400]/45 bg-[#071527] p-4 shadow-2xl shadow-[#F5B400]/10">
        <div className="rounded-lg border border-white/16 bg-[radial-gradient(circle_at_top,rgba(245,180,0,0.14),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(63,169,245,0.08))] p-8 text-center sm:p-12">
          <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-lg border border-[#F5B400]/45 bg-[#F5B400]/15">
            <Award className="h-9 w-9 text-[#F5B400]" aria-hidden="true" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#F5B400]">
            Certificate of Completion
          </p>
          <p className="mt-8 text-base text-slate-300">This certifies that</p>
          <div className="mx-auto mt-5 max-w-xl border-b border-[#F5B400]/40 pb-4 text-4xl font-black text-white">
            [Student Name]
          </div>
          <p className="mt-8 text-base text-slate-300">has successfully completed</p>
          <h2 className="mt-4 text-3xl font-black text-white">{cohortInfo.fullName}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-300">
            and demonstrated practical understanding of AI-assisted MVP app development,
            product planning, Firebase fundamentals, AI feature design, and MVP launch
            preparation.
          </p>
          <p className="mt-8 text-lg font-black text-white">
            Issued by NDN Analytics Academy
          </p>
          <p className="mt-2 text-[#F5B400]">2026</p>

          <div className="mt-10 grid gap-4 border-t border-white/12 pt-6 text-left sm:grid-cols-3">
            {[
              ["Certificate ID", "NDN-AIMVP-C1-[ID]"],
              ["Instructor Signature", "[Signature Placeholder]"],
              ["Completion Date", "[Date Placeholder]"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                <p className="mt-2 text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 text-center">
        <p className="inline-flex rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/12 px-5 py-3 text-sm font-black text-[#FDE68A]">
          Complete the cohort to earn your certificate
        </p>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[#22C55E]/35 bg-[#22C55E]/10 p-6">
          <h2 className="text-2xl font-black text-white">Required completion evidence</h2>
          <ul className="mt-5 space-y-3">
            {certificateCompletionRequirements.map((item) => (
              <li key={item} className="text-sm leading-6 text-slate-200">- {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-6">
          <h2 className="text-2xl font-black text-white">Attendance and submission rules</h2>
          <ul className="mt-5 space-y-3">
            {certificateAttendanceRules.map((item) => (
              <li key={item} className="text-sm leading-6 text-slate-200">- {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
