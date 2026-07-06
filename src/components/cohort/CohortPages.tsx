import { FormEvent, useMemo, useState } from "react";
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
  COHORT_APPLICATION_FORM_URL,
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/" },
  { label: "Cohort 1", href: "/cohort-1" },
  { label: "Curriculum", href: "/courses/ai-mvp-builder-africa/curriculum" },
  { label: "Apply", href: "/apply" },
  { label: "Dashboard", href: "/student-dashboard" },
  { label: "Certificate", href: "/certificate-preview" },
];

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
            to="/apply"
            className="inline-flex min-h-11 items-center rounded-lg bg-[#F5B400] px-5 py-2 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
          >
            Apply Now
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
              to="/apply"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-5 py-3 text-sm font-black text-[#071527]"
            >
              Apply Now
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
            ["Apply", "/apply"],
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

      <Section eyebrow="Application Process" title="Apply, confirm, and start building">
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
          to="/apply"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
        >
          Apply for Cohort 1
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
            <Link to="/apply" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]">
              Apply Now
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

      <Section eyebrow="Tools" title="Tools and concepts covered">
        <OutcomeGrid outcomes={toolsCovered} />
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
  const [submitted, setSubmitted] = useState(false);
  const [preferredPlan, setPreferredPlan] = useState(defaultPlan);
  const [leadMailHref, setLeadMailHref] = useState(getCohortLeadMailto("AI MVP Builder Africa Cohort 1 Application"));

  const preferredPlanLabel = useMemo(() => {
    const plan = pricingPlans.find((item) => item.id === preferredPlan);
    return plan ? `${plan.name} - ${plan.price}` : pricingOptionLabels[1];
  }, [preferredPlan]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const read = (name: string) => String(formData.get(name) || "").trim();
    const selectedPlanLabel =
      pricingPlans.find((item) => item.id === preferredPlan)?.name || "Standard";
    const emailBody = [
      "New AI MVP Builder Africa - Cohort 1 application",
      "",
      `Full name: ${read("fullName")}`,
      `Email address: ${read("email")}`,
      `WhatsApp number: ${read("whatsapp")}`,
      `Country: ${read("country")}`,
      `City: ${read("city")}`,
      `Current role: ${read("role")}`,
      `Technical level: ${read("technicalLevel")}`,
      `Has app idea: ${read("hasIdea")}`,
      `Preferred pricing option: ${selectedPlanLabel} (${preferredPlanLabel})`,
      `Can attend live sessions: ${read("canAttendLive")}`,
      `How they heard about us: ${read("referral")}`,
      "",
      "App idea:",
      read("appIdea"),
      "",
      "Why they want to join:",
      read("motivation"),
    ].join("\n");
    const mailHref = `mailto:${COHORT_LEAD_EMAIL}?subject=${encodeURIComponent(
      "AI MVP Builder Africa Cohort 1 Application"
    )}&body=${encodeURIComponent(emailBody)}`;
    setLeadMailHref(mailHref);
    // TODO: Add Meta Pixel event: CohortApplicationSubmitted
    // TODO: Add GA4 event: cohort_application_form_submitted
    setSubmitted(true);
    window.open(mailHref, "_blank", "noopener,noreferrer");
  };

  const handleExternalClick = () => {
    // TODO: Track external application form click tracking
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
              Apply for AI MVP Builder Africa - Cohort 1
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Only 10 students will be accepted into the first cohort. Complete the application
              below to reserve your opportunity.
            </p>
            <div className="mt-6 rounded-lg border border-[#F5B400]/35 bg-[#F5B400]/10 p-5 text-sm leading-7 text-slate-200">
              Applications and cohort leads are routed to{" "}
              <a href={getCohortLeadMailto("AI MVP Builder Africa Cohort 1 Lead")} className="font-black text-[#FDE68A] underline">
                {COHORT_LEAD_EMAIL}
              </a>
              . This frontend preview opens a prefilled email after submission so the lead details can be sent directly.
            </div>
            <div className="mt-6 rounded-lg border border-[#3FA9F5]/35 bg-[#3FA9F5]/10 p-5">
              <p className="text-sm font-bold text-white">Selected pricing option</p>
              <p className="mt-2 text-2xl font-black text-[#F5B400]">{preferredPlanLabel}</p>
            </div>
            <a
              href={COHORT_APPLICATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExternalClick}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/8 px-5 py-3 text-sm font-black text-white hover:border-[#3FA9F5]/50"
            >
              Email Application / Open Form
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/6 p-5 sm:p-6">
            {submitted ? (
              <div className="rounded-lg border border-[#22C55E]/35 bg-[#22C55E]/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#22C55E]" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-black text-white">Application received.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Your email client should open with a prefilled message to {COHORT_LEAD_EMAIL}. Send that email so our team can contact you with the next steps.
                </p>
                <a
                  href={leadMailHref}
                  className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F5B400] px-5 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
                >
                  Send Application Email
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
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

                <label className="grid gap-2 text-sm font-bold text-slate-200">
                  Can you attend live sessions?
                  <select name="canAttendLive" className={inputClass} required>
                    <option value="Yes">Yes</option>
                    <option value="Mostly yes">Mostly yes</option>
                    <option value="Need schedule confirmation">Need schedule confirmation</option>
                  </select>
                </label>

                <TextInput label="How did you hear about us?" name="referral" />

                <button
                  type="submit"
                  className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F5B400] px-6 py-3 text-sm font-black text-[#071527] hover:bg-[#FFD166]"
                >
                  Submit Application
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
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
