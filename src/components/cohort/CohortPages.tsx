import { FormEvent, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  BadgeDollarSign,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  Menu,
  PlayCircle,
  Send,
  X,
} from "lucide-react";
import { Link, Navigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import SEO from "../seo/SEO";
import FAQSchema from "../seo/FAQSchema";
import { ApplicationCTA } from "./ApplicationCTA";
import { CertificatePreview } from "./CertificatePreview";
import { CohortBadge } from "./CohortBadge";
import { CohortClassRhythm } from "./CohortClassRhythm";
import { CohortHero } from "./CohortHero";
import { CurriculumTimeline } from "./CurriculumTimeline";
import { FAQAccordion } from "./FAQAccordion";
import { InstructorCredibility } from "./InstructorCredibility";
import { OutcomeGrid } from "./OutcomeGrid";
import { PricingCards } from "./PricingCards";
import { ProblemCards } from "./ProblemCards";
import { RevenueTarget } from "./RevenueTarget";
import { StudentDashboardPreview } from "./StudentDashboardPreview";
import { WeeklyLessonTemplate } from "./WeeklyLessonTemplate";
import {
  COHORT_LEAD_EMAIL,
  applicationSteps,
  audiences,
  cohortInfo,
  cohortSeo,
  courseFormat,
  courseMetadata,
  documentationLibrary,
  deliverables,
  getCohortLeadMailto,
  learningOutcomes,
  notForText,
  solutionSteps,
  technicalLevelOptions,
  toolsCovered,
  videoLibrary,
  weeklyRhythm,
} from "../../data/cohort";
import { cohortAds } from "../../data/cohortAds";
import { curriculumWeeks, getWeekBySlug } from "../../data/curriculum";
import { cohortFaqs } from "../../data/faqs";
import { pricingOptionLabels, pricingPlans, type PricingPlan } from "../../data/pricing";
import { trackFormSubmit } from "../../lib/analytics";
import { addEngagement, attributeAnonymousEngagements, createLead } from "../../lib/leads";
import {
  certificateAttendanceRules,
  certificateCompletionRequirements,
  curriculumSummaryRows,
  workloadCommitments,
} from "../../data/cohortSchedule";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/" },
  { label: "Cohort 1", href: "/cohort-1" },
  { label: "Curriculum", href: "/courses/ai-mvp-builder-africa/curriculum" },
  { label: "Weekly Lessons", href: "/courses/ai-mvp-builder-africa/week-1" },
  { label: "Enroll", href: "/enroll" },
  { label: "Dashboard", href: "/student-dashboard" },
  { label: "Certificate", href: "/certificate-preview" },
];

const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EJS_PUBLIC = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${COHORT_LEAD_EMAIL}`;

function CohortNavigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#071527]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Cohort navigation">
        <Link to="/cohort-1" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/ndn_3d_logo.png"
            alt="NDN Analytics Academy"
            className="h-10 w-10 rounded-lg border border-[#3FA9F5]/35 object-contain"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-white">NDN Analytics Academy</span>
            <span className="block truncate text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5B400]">
              AI MVP Builder Africa
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.href + link.label}
                to={link.href}
                className={`rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
                  active ? "bg-[#3FA9F5]/18 text-[#BAE6FD]" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/enroll"
            className="inline-flex min-h-11 items-center rounded-lg bg-[#F5B400] px-5 py-2 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
          >
            Enroll Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/12 bg-[#071527] px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-100 hover:bg-white/8"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/enroll"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-5 py-3 text-sm font-black text-[#071527]"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function CohortFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/12 bg-[#06101f]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-black text-white">NDN Analytics Academy</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
            AI MVP Builder Africa helps serious founders, students, and operators
            turn app ideas into structured, demo-ready MVP directions.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#F5B400]">Cohort</p>
          {[
            ["AI MVP Builder Africa", "/cohort-1"],
            ["Curriculum", "/courses/ai-mvp-builder-africa/curriculum"],
            ["Enroll", "/enroll"],
            ["Certificate Preview", "/certificate-preview"],
          ].map(([label, href]) => (
            <Link key={href} to={href} className="mb-2 block text-sm font-semibold text-slate-300 hover:text-white">
              {label}
            </Link>
          ))}
        </div>
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#F5B400]">Company</p>
          <a
            href="https://www.ndnanalytics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            NDN Analytics website
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={getCohortLeadMailto("AI MVP Builder Africa Cohort 1 Lead")}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            {COHORT_LEAD_EMAIL}
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Copyright {year} NDN Analytics Academy
          </p>
        </div>
      </div>
    </footer>
  );
}

function CohortFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#071527] text-slate-100">
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none" />
      <CohortNavigation />
      <main className="relative z-10">{children}</main>
      <CohortFooter />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#F5B400]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-base leading-7 text-slate-300">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function ResourceGrid({
  title,
  items,
  icon,
}: {
  title: string;
  items: Array<{ title: string; detail: string }>;
  icon: "video" | "document";
}) {
  const Icon = icon === "video" ? PlayCircle : FileText;

  return (
    <div className="rounded-lg border border-white/12 bg-white/6 p-6">
      <h3 className="mb-5 flex items-center gap-2 text-2xl font-black text-white">
        <Icon className={`h-5 w-5 ${icon === "video" ? "text-[#3FA9F5]" : "text-[#F5B400]"}`} aria-hidden="true" />
        {title}
      </h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-lg border border-white/10 bg-[#071527]/70 p-4">
            <p className="text-base font-black text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoDocumentationSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ResourceGrid title="Video and replay library" items={videoLibrary} icon="video" />
      <ResourceGrid title="Documentation and templates" items={documentationLibrary} icon="document" />
    </div>
  );
}

function CurriculumSummaryTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/12 bg-white/6">
      <div className="grid grid-cols-[0.8fr_1.2fr_1.4fr] gap-0 border-b border-white/12 bg-[#071527]/90 text-xs font-black uppercase tracking-[0.16em] text-[#F5B400]">
        <div className="p-4">Week</div>
        <div className="p-4">Focus</div>
        <div className="p-4">Main Deliverable</div>
      </div>
      {curriculumSummaryRows.map((row) => (
        <div key={row.week} className="grid grid-cols-[0.8fr_1.2fr_1.4fr] border-b border-white/10 last:border-b-0">
          <div className="p-4 text-sm font-black text-white">{row.week}</div>
          <div className="p-4 text-sm text-slate-300">{row.focus}</div>
          <div className="p-4 text-sm font-bold text-[#BAE6FD]">{row.deliverable}</div>
        </div>
      ))}
    </div>
  );
}

function CertificateRulesSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-lg border border-[#22C55E]/35 bg-[#22C55E]/10 p-6">
        <h3 className="text-2xl font-black text-white">Certificate completion requirements</h3>
        <ul className="mt-5 space-y-3">
          {certificateCompletionRequirements.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#22C55E]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-6">
        <h3 className="text-2xl font-black text-white">Attendance and submission rules</h3>
        <ul className="mt-5 space-y-3">
          {certificateAttendanceRules.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
              <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#F5B400]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function WorkloadCommitmentSection() {
  return (
    <section className="rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-6">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F5B400]">
        Cohort Time Commitment
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">This is a serious builder cohort.</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        Students attend 3 live sessions per week: Monday concept class, Wednesday guided build class,
        and Saturday online practical build lab. Each week includes one assignment due on Sunday.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {workloadCommitments.map((item) => (
          <div key={item} className="rounded-lg border border-white/12 bg-[#071527]/70 p-4 text-sm font-black text-slate-100">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CohortLandingPage() {
  return (
    <CohortFrame>
      <SEO
        title={cohortSeo.landing.title}
        description={cohortSeo.landing.description}
        canonicalPath={cohortSeo.landing.canonicalPath}
        keywords="AI MVP Builder Africa, NDN Analytics Academy, African founders, Firebase course, AI app building cohort"
      />
      <FAQSchema faqs={cohortFaqs} />

      <CohortHero />

      <Section
        eyebrow="The Problem"
        title="You have an app idea, but where do you start?"
        subtitle="Many African founders and students have powerful ideas but get stuck because they think they need a big team, expensive developers, or years of coding experience. This cohort helps you start with one clear problem, one user group, and one practical MVP."
      >
        <ProblemCards />
      </Section>

      <Section
        eyebrow="The Path"
        title="A guided 6-week path from idea to MVP"
        subtitle="The cohort breaks product building into a practical weekly sequence, so every student knows what to focus on next."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutionSteps.map((step, index) => (
            <div key={step} className="rounded-lg border border-white/12 bg-white/6 p-5">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-[#3FA9F5]/15 text-sm font-black text-[#BAE6FD]">
                {index + 1}
              </div>
              <p className="text-base font-black text-white">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Who This Is For" title="Built for serious first-time and early-stage builders">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <div key={audience} className="rounded-lg border border-white/12 bg-white/6 p-5">
              <p className="text-sm font-black text-white">{audience}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-[#F59E0B]/35 bg-[#F59E0B]/10 p-5 text-sm font-semibold leading-7 text-slate-200">
          {notForText}
        </div>
      </Section>

      <Section
        eyebrow="Deliverables"
        title="By the end of 6 weeks, you will have more than notes."
        subtitle="You will have a clear MVP direction, a working demo path, and practical assets you can continue improving after the cohort."
      >
        <OutcomeGrid outcomes={deliverables} />
      </Section>

      <Section eyebrow="Curriculum Preview" title="Six focused weeks from idea to demo">
        <CurriculumTimeline />
      </Section>

      <Section eyebrow="Course Format" title="Live teaching, guided assignments, and practical build support">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {courseFormat.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
                <CheckCircle2 className="h-5 w-5 flex-none text-[#22C55E]" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-100">{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-[#3FA9F5]/35 bg-[#3FA9F5]/10 p-5">
            <h3 className="text-xl font-black text-white">Suggested weekly rhythm</h3>
            <div className="mt-5 grid gap-3">
              {weeklyRhythm.map((item) => (
                <div key={item.day} className="flex flex-col rounded-lg border border-white/10 bg-[#071527]/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-black text-[#F5B400]">{item.day}</span>
                  <span className="text-sm text-slate-200">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Videos and Documentation"
        title="Every week includes practical replays, templates, and build references"
        subtitle="Students get a clear learning path supported by lesson videos, build-lab replays where available, prompt references, MVP templates, Firebase notes, and demo documentation."
      >
        <VideoDocumentationSection />
      </Section>

      <Section
        eyebrow="Pricing"
        title="Updated Cohort 1 pricing"
        subtitle="Cohort 1 is limited to 10 students so every learner receives focused guidance."
      >
        <PricingCards />
        <div className="mt-8">
          <RevenueTarget />
        </div>
      </Section>

      <Section
        eyebrow="Instructor and Brand Credibility"
        title="Learn from builders creating real AI and digital products"
      >
        <InstructorCredibility />
      </Section>

      <Section eyebrow="Enrollment Process" title="Enroll, confirm, and start building">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {applicationSteps.map((step, index) => (
            <div key={step} className="rounded-lg border border-white/12 bg-white/6 p-5">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-[#F5B400]/15 text-sm font-black text-[#FDE68A]">
                {index + 1}
              </div>
              <p className="text-sm font-semibold leading-6 text-slate-100">{step}</p>
            </div>
          ))}
        </div>
        <Link
          to="/enroll"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
        >
          Enroll for Cohort 1
        </Link>
      </Section>

      <Section eyebrow="FAQ" title="Questions before you apply">
        <FAQAccordion />
      </Section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ApplicationCTA />
      </div>
    </CohortFrame>
  );
}

export function CohortCourseOverviewPage() {
  return (
    <CohortFrame>
      <SEO
        title="AI MVP Builder Africa - Cohort 1"
        description={cohortInfo.promise}
        canonicalPath="/courses/ai-mvp-builder-africa"
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div>
          <CohortBadge tone="gold">Premium guided cohort</CohortBadge>
          <h1 className="mt-5 text-4xl font-black text-white sm:text-5xl">
            {cohortInfo.fullName}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">{cohortInfo.promise}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/enroll" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]">
              Enroll Now
            </Link>
            <Link to="/courses/ai-mvp-builder-africa/curriculum" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/12 bg-white/8 px-6 py-3 text-sm font-bold text-white hover:border-[#3FA9F5]/50">
              View Curriculum
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <h2 className="text-2xl font-black text-white">Course metadata</h2>
          <div className="mt-5 grid gap-3">
            {courseMetadata.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#071527]/70 p-3">
                <span className="text-sm text-slate-400">{label}</span>
                <span className="text-right text-sm font-black text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Section eyebrow="Curriculum" title="A practical builder path">
        <CurriculumTimeline />
      </Section>
      <Section eyebrow="Videos and Documentation" title="Course assets included">
        <VideoDocumentationSection />
      </Section>
      <Section eyebrow="Pricing" title="Choose your Cohort 1 support level">
        <PricingCards />
      </Section>
    </CohortFrame>
  );
}

export function CurriculumPage() {
  return (
    <CohortFrame>
      <SEO
        title={cohortSeo.curriculum.title}
        description={cohortSeo.curriculum.description}
        canonicalPath={cohortSeo.curriculum.canonicalPath}
      />
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-white/12 bg-white/6 p-6">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F5B400]">Course catalog</p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            AI MVP Builder Africa Curriculum
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            A professional 6-week curriculum covering MVP planning, app design, frontend building,
            Firebase, AI features, launch preparation, and demo presentation.
          </p>
        </div>
      </section>

      <Section title="Course metadata">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {courseMetadata.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/12 bg-white/6 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
              <p className="mt-2 text-sm font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Cohort Rhythm" title="Total teaching structure">
        <CohortClassRhythm />
      </Section>

      <Section eyebrow="Tools" title="Tools and concepts covered">
        <OutcomeGrid outcomes={toolsCovered} />
      </Section>

      <Section eyebrow="Curriculum Summary" title="Weekly focus and main deliverable">
        <CurriculumSummaryTable />
      </Section>

      <Section eyebrow="Learning Outcomes" title="What students will be able to do">
        <OutcomeGrid outcomes={learningOutcomes} />
      </Section>

      <Section eyebrow="Videos and Documentation" title="Student resource library">
        <VideoDocumentationSection />
      </Section>

      <Section eyebrow="Weekly Plan" title="Full 6-week curriculum">
        <CurriculumTimeline />
      </Section>

      <Section eyebrow="Certificate Rules" title="What students must complete to earn the certificate">
        <CertificateRulesSection />
      </Section>
    </CohortFrame>
  );
}

export function WeekLessonPage() {
  const { weekSlug } = useParams<{ weekSlug: string }>();
  const lesson = getWeekBySlug(weekSlug);

  if (!lesson) {
    return <Navigate to="/courses/ai-mvp-builder-africa/curriculum" replace />;
  }

  return (
    <CohortFrame>
      <SEO
        title={`Week ${lesson.week}: ${lesson.title} - AI MVP Builder Africa`}
        description={`${lesson.shortDescription} ${lesson.outcome}`}
        canonicalPath={lesson.route}
      />
      <div className="pt-20">
        <WeeklyLessonTemplate lesson={lesson} />
      </div>
    </CohortFrame>
  );
}

export function ApplyPage() {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const defaultPlan: PricingPlan["id"] =
    pricingPlans.find((plan) => plan.id === selectedPlan)?.id || "standard";
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [preferredPlan, setPreferredPlan] = useState(defaultPlan);
  const [leadMailHref, setLeadMailHref] = useState(getCohortLeadMailto("AI MVP Builder Africa Cohort 1 Enrollment"));

  const preferredPlanLabel = useMemo(() => {
    const plan = pricingPlans.find((item) => item.id === preferredPlan);
    return plan ? `${plan.name} - ${plan.price}` : pricingOptionLabels[1];
  }, [preferredPlan]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDeliveryStatus("sending");
    trackFormSubmit("cohort_enrollment");

    const formData = new FormData(event.currentTarget);
    const read = (name: string) => String(formData.get(name) || "").trim();
    const checked = (name: string) => formData.getAll(name).map((item) => String(item).trim()).filter(Boolean);
    const selectedPlanLabel =
      pricingPlans.find((item) => item.id === preferredPlan)?.name || "Standard";
    const fullName = read("fullName");
    const emailAddress = read("email");
    const whatsapp = read("whatsapp");
    const emailBody = [
      "New AI MVP Builder Africa - Cohort 1 enrollment",
      "",
      `Full name: ${fullName}`,
      `Email address: ${emailAddress}`,
      `WhatsApp number: ${whatsapp}`,
      `Country: ${read("country")}`,
      `City: ${read("city")}`,
      `Current role: ${read("role")}`,
      `Technical level: ${read("technicalLevel")}`,
      `Has app idea: ${read("hasIdea")}`,
      `Current stage: ${read("currentStage")}`,
      `Preferred pricing option: ${selectedPlanLabel} (${preferredPlanLabel})`,
      `Can attend live sessions: ${read("canAttendLive")}`,
      `Start timeline: ${read("startTimeline")}`,
      `Enrollment/payment readiness: ${read("paymentReadiness")}`,
      `Completion seriousness: ${read("seriousness")}/5`,
      `Goals: ${checked("goals").join(", ")}`,
      `Consent: ${checked("consent").join(" | ")}`,
      `How they heard about us: ${read("referral")}`,
      "",
      "App idea:",
      read("appIdea"),
      "",
      "Why they want to join:",
      read("motivation"),
      "",
      "Biggest question or concern:",
      read("concern"),
    ].join("\n");
    const mailHref = `mailto:${COHORT_LEAD_EMAIL}?subject=${encodeURIComponent(
      "AI MVP Builder Africa Cohort 1 Enrollment"
    )}&body=${encodeURIComponent(emailBody)}`;
    setLeadMailHref(mailHref);

    try {
      const lead = await createLead({
        email: emailAddress,
        name: fullName,
        source: "cohort_enrollment",
        productInterests: ["AI MVP Builder Africa"],
        tags: ["cohort_1", "academy", "ai_mvp_builder_africa", selectedPlanLabel.toLowerCase().replace(/\s+/g, "_")],
      });

      if (lead?.id) {
        await attributeAnonymousEngagements(lead.id);
        await addEngagement(lead.id, "form_submit", {
          form: "cohort_enrollment",
          preferredPlan: selectedPlanLabel,
          technicalLevel: read("technicalLevel"),
          paymentReadiness: read("paymentReadiness"),
          seriousness: read("seriousness"),
        });
      }
    } catch (error) {
      console.warn("Cohort lead storage failed; continuing with email delivery.", error);
    }

    const emailParams = {
      to_email: COHORT_LEAD_EMAIL,
      from_name: fullName,
      from_email: emailAddress,
      reply_to: emailAddress,
      subject: "AI MVP Builder Africa Cohort 1 Enrollment",
      message: emailBody,
      full_name: fullName,
      whatsapp,
      country: read("country"),
      city: read("city"),
      current_role: read("role"),
      technical_level: read("technicalLevel"),
      current_stage: read("currentStage"),
      preferred_plan: `${selectedPlanLabel} (${preferredPlanLabel})`,
      payment_readiness: read("paymentReadiness"),
      start_timeline: read("startTimeline"),
      seriousness: read("seriousness"),
    };

    if (EJS_SERVICE && EJS_TEMPLATE && EJS_PUBLIC) {
      try {
        await emailjs.send(
          EJS_SERVICE,
          EJS_TEMPLATE,
          emailParams,
          { publicKey: EJS_PUBLIC }
        );
        setSubmitted(true);
        setDeliveryStatus("sent");
        formRef.current?.reset();
        return;
      } catch (error) {
        console.error("EmailJS cohort enrollment delivery failed.", error);
      }
    }

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "AI MVP Builder Africa Cohort 1 Enrollment",
          _template: "table",
          _captcha: "false",
          name: fullName,
          email: emailAddress,
          phone: whatsapp,
          message: emailBody,
          preferred_plan: `${selectedPlanLabel} (${preferredPlanLabel})`,
          payment_readiness: read("paymentReadiness"),
          start_timeline: read("startTimeline"),
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && String(result.success) !== "false") {
        setSubmitted(true);
        setDeliveryStatus("sent");
        formRef.current?.reset();
        return;
      }
    } catch (error) {
      console.warn("FormSubmit cohort enrollment delivery failed; falling back to mailto.", error);
    }

    setSubmitted(true);
    setDeliveryStatus("fallback");
    window.open(mailHref, "_blank", "noopener,noreferrer");
  };

  return (
    <CohortFrame>
      <SEO
        title={cohortSeo.apply.title}
        description={cohortSeo.apply.description}
        canonicalPath={cohortSeo.apply.canonicalPath}
      />
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <CohortBadge tone="gold">Only 10 students accepted</CohortBadge>
            <h1 className="mt-5 text-4xl font-black text-white sm:text-5xl">
              Enroll for AI MVP Builder Africa - Cohort 1
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Only 10 students will be accepted into the first cohort. Complete the enrollment
              form below and your details will be sent directly to NDN Analytics.
            </p>
            <div className="mt-6 rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-5 text-sm leading-7 text-slate-200">
              Enrollment leads are routed to{" "}
              <a href={getCohortLeadMailto("AI MVP Builder Africa Cohort 1 Lead")} className="font-black text-[#FDE68A] underline">
                {COHORT_LEAD_EMAIL}
              </a>
              . The form sends the applicant details by email and also stores a cohort lead when Firebase is available.
            </div>
            <div className="mt-6 rounded-lg border border-[#3FA9F5]/35 bg-[#3FA9F5]/10 p-5">
              <p className="text-sm font-bold text-white">Selected pricing option</p>
              <p className="mt-2 text-2xl font-black text-[#F5B400]">{preferredPlanLabel}</p>
            </div>
            <a
              href={getCohortLeadMailto("AI MVP Builder Africa Cohort 1 Enrollment Question")}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/8 px-5 py-3 text-sm font-black text-white hover:border-[#3FA9F5]/50"
            >
              Ask a question by email
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/6 p-5 sm:p-6">
            {submitted ? (
              <div className={`rounded-lg border p-6 text-center ${
                deliveryStatus === "sent"
                  ? "border-[#22C55E]/35 bg-[#22C55E]/10"
                  : "border-[#F5B400]/35 bg-[#F5B400]/10"
              }`}>
                <CheckCircle2 className={`mx-auto h-12 w-12 ${
                  deliveryStatus === "sent" ? "text-[#22C55E]" : "text-[#F5B400]"
                }`} aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-black text-white">Enrollment received.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {deliveryStatus === "sent"
                    ? `The enrollment details were sent directly to ${COHORT_LEAD_EMAIL}. Nkefua and the NDN Analytics team will follow up with the next step.`
                    : `The page prepared the enrollment details for ${COHORT_LEAD_EMAIL}. Use the backup email button below so no lead information is lost.`}
                </p>
                {deliveryStatus !== "sent" && (
                  <a
                    href={leadMailHref}
                    className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F5B400] px-5 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
                  >
                    Send Backup Enrollment Email
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput label="Full name" name="fullName" required />
                  <TextInput label="Email address" name="email" type="email" required />
                  <TextInput label="WhatsApp number" name="whatsapp" required />
                  <TextInput label="Country" name="country" required />
                  <TextInput label="City" name="city" />
                  <TextInput label="Current role" name="role" />
                </div>

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  Technical level
                  <select name="technicalLevel" className={inputClass} required>
                    {technicalLevelOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  Do you already have an app idea?
                  <select name="hasIdea" className={inputClass} required>
                    <option value="Yes">Yes</option>
                    <option value="Not yet">Not yet</option>
                    <option value="I have several ideas">I have several ideas</option>
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  What stage are you currently at?
                  <select name="currentStage" className={inputClass} required>
                    <option value="I only have an idea">I only have an idea</option>
                    <option value="I have written notes or a rough plan">I have written notes or a rough plan</option>
                    <option value="I have designs or wireframes">I have designs or wireframes</option>
                    <option value="I have started building">I have started building</option>
                    <option value="I already have an MVP and need launch help">I already have an MVP and need launch help</option>
                  </select>
                </label>

                <TextArea label="Describe your app idea" name="appIdea" />
                <TextArea label="Why do you want to join this cohort?" name="motivation" required />

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  Preferred pricing option
                  <select
                    name="pricingOption"
                    value={preferredPlan}
                    onChange={(event) => setPreferredPlan(event.target.value as PricingPlan["id"])}
                    className={inputClass}
                    required
                  >
                    {pricingPlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.price}
                      </option>
                    ))}
                  </select>
                </label>

                <fieldset className="rounded-lg border border-white/12 bg-[#06101f] p-4">
                  <legend className="px-1 text-sm font-bold text-slate-200">What do you want to achieve?</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {[
                      "Define a clear MVP idea",
                      "Design app screens and user flow",
                      "Build frontend structure",
                      "Create Firebase/backend data plan",
                      "Add an AI-powered feature",
                      "Prepare a demo and launch plan",
                      "Build a portfolio project",
                      "Learn enough to manage developers better",
                    ].map((goal) => (
                      <label key={goal} className="flex items-start gap-2 text-sm font-semibold text-slate-300">
                        <input type="checkbox" name="goals" value={goal} className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 accent-[#F5B400]" />
                        {goal}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  Can you attend live sessions?
                  <select name="canAttendLive" className={inputClass} required>
                    <option value="Yes">Yes</option>
                    <option value="Mostly yes">Mostly yes</option>
                    <option value="Need schedule confirmation">Need schedule confirmation</option>
                  </select>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold text-slate-200">
                    How soon do you want to start?
                    <select name="startTimeline" className={inputClass} required>
                      <option value="Immediately / next available cohort">Immediately / next available cohort</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="I am exploring options">I am exploring options</option>
                      <option value="I want this for my team or organization">I want this for my team or organization</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-bold text-slate-200">
                    Enrollment/payment readiness
                    <select name="paymentReadiness" className={inputClass} required>
                      <option value="I am ready to enroll now">I am ready to enroll now</option>
                      <option value="Send me the enrollment invoice/details">Send me the enrollment invoice/details</option>
                      <option value="I need a short call before enrolling">I need a short call before enrolling</option>
                      <option value="I need a payment plan">I need a payment plan</option>
                      <option value="My employer or sponsor will pay">My employer or sponsor will pay</option>
                      <option value="I need pricing details first">I need pricing details first</option>
                    </select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  How serious are you about completing the 6-week cohort?
                  <select name="seriousness" className={inputClass} required>
                    <option value="5">5 - Very serious</option>
                    <option value="4">4 - Serious</option>
                    <option value="3">3 - Interested but need details</option>
                    <option value="2">2 - Exploring</option>
                    <option value="1">1 - Not sure yet</option>
                  </select>
                </label>

                <TextArea label="What is your biggest question or concern before joining?" name="concern" />
                <TextInput label="How did you hear about us?" name="referral" />

                <fieldset className="rounded-lg border border-[#F5B400]/30 bg-[#F5B400]/10 p-4">
                  <legend className="px-1 text-sm font-black text-[#FDE68A]">Consent</legend>
                  <div className="mt-3 grid gap-3">
                    {[
                      "I agree that NDN Analytics may contact me by email or WhatsApp about this cohort.",
                      "I understand this is a professional paid cohort and enrollment details will be sent after review.",
                    ].map((item) => (
                      <label key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-200">
                        <input type="checkbox" name="consent" value={item} required className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 accent-[#F5B400]" />
                        {item}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
                  disabled={deliveryStatus === "sending"}
                >
                  {deliveryStatus === "sending" ? "Sending Enrollment..." : "Submit Enrollment"}
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8">
          <WorkloadCommitmentSection />
        </div>
      </section>
    </CohortFrame>
  );
}

const inputClass =
  "min-h-12 rounded-lg border border-white/12 bg-[#06101f] px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20";

function TextInput({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-200">
      {label}
      <input type={type} name={name} required={required} className={inputClass} />
    </label>
  );
}

function TextArea({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-200">
      {label}
      <textarea name={name} required={required} rows={4} className={inputClass} />
    </label>
  );
}

export function StudentDashboardPage() {
  return (
    <CohortFrame>
      <SEO
        title="AI MVP Builder Africa Student Dashboard Preview"
        description="Preview the Cohort 1 student dashboard for lessons, assignments, prompt library, MVP checklist, payment status, and certificate progress."
        canonicalPath="/student-dashboard"
      />
      <div className="pt-20">
        <StudentDashboardPreview />
      </div>
    </CohortFrame>
  );
}

export function CertificatePreviewPage() {
  return (
    <CohortFrame>
      <SEO
        title="AI MVP Builder Africa Certificate Preview"
        description="Preview the Certificate in AI MVP App Building issued by NDN Analytics Academy for Cohort 1 completion."
        canonicalPath="/certificate-preview"
      />
      <div className="pt-20">
        <CertificatePreview />
      </div>
    </CohortFrame>
  );
}

export function MarketingAdsPage() {
  const groupedAds = cohortAds.reduce<Record<string, typeof cohortAds>>((groups, ad) => {
    groups[ad.test] = groups[ad.test] || [];
    groups[ad.test].push(ad);
    return groups;
  }, {});

  return (
    <CohortFrame>
      <SEO
        title="AI MVP Builder Africa Cohort Ads"
        description="Internal Facebook A/B ad variants for the NDN Analytics Academy AI MVP Builder Africa Cohort 1 launch."
        canonicalPath="/marketing/cohort-ads"
      />
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border border-white/12 bg-white/6 p-6">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F5B400]">Internal Marketing</p>
          <h1 className="mt-3 text-4xl font-black text-white">Facebook A/B ad variants</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Cohort 1 ad copy for outcome, mission, founder pain, practical skill,
            scarcity, and transformation testing.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedAds).map(([testName, ads]) => (
            <section key={testName}>
              <h2 className="mb-4 text-2xl font-black text-white">{testName}</h2>
              <div className="grid gap-5 lg:grid-cols-2">
                {ads.map((ad) => (
                  <article key={`${ad.test}-${ad.variant}`} className="rounded-lg border border-white/12 bg-white/6 p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <CohortBadge tone="blue">{ad.variant}</CohortBadge>
                      <CohortBadge tone="gold">{ad.angle}</CohortBadge>
                    </div>
                    <h3 className="text-2xl font-black text-white">{ad.headline}</h3>
                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">
                      {ad.primaryText}
                    </p>
                    <div className="mt-5 inline-flex rounded-lg bg-[#3FA9F5]/14 px-4 py-2 text-sm font-black text-[#BAE6FD]">
                      CTA: {ad.cta}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </CohortFrame>
  );
}

export function CoursePlanningStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        [CalendarDays, "Starts", cohortInfo.startDateShort],
        [BookOpen, "Duration", cohortInfo.duration],
        [BadgeDollarSign, "Starting Price", cohortInfo.startingPrice],
      ].map(([Icon, label, value]) => {
        const StatIcon = Icon as typeof CalendarDays;
        return (
          <div key={label as string} className="rounded-lg border border-white/12 bg-white/6 p-5">
            <StatIcon className="mb-4 h-5 w-5 text-[#F5B400]" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label as string}</p>
            <p className="mt-2 text-lg font-black text-white">{value as string}</p>
          </div>
        );
      })}
    </div>
  );
}

export { curriculumWeeks };
