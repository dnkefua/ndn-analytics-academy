export const COHORT_APPLICATION_FORM_URL =
  import.meta.env.VITE_COHORT_APPLICATION_FORM_URL ||
  "/enroll";

export const COHORT_LEAD_EMAIL = "nkefua@ndnanalytics.com";

export const getCohortLeadMailto = (subject = "AI MVP Builder Africa Cohort 1 Lead") =>
  `mailto:${COHORT_LEAD_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const cohortInfo = {
  courseName: "AI MVP Builder Africa",
  cohortName: "Cohort 1",
  fullName: "AI MVP Builder Africa - Cohort 1",
  startDate: "Monday, July 13, 2026",
  startDateShort: "July 13, 2026",
  duration: "6 weeks",
  seats: "Only 10 students",
  certificate: "Certificate in AI MVP App Building",
  certificateIssuer: "NDN Analytics Academy",
  startingPrice: "$420",
  promise:
    "In 6 weeks, you will learn how to turn your app idea into a working MVP using AI, Firebase, and practical product strategy.",
  positioning: "Africa needs more builders, not just more ideas.",
  supportLine:
    "Bring your idea. We will help you structure it, design it, build it, add AI features, and prepare your MVP demo.",
};

export const cohortSeo = {
  landing: {
    title: "AI MVP Builder Africa - Build Your MVP App in 6 Weeks",
    description:
      "Join NDN Analytics Academy Cohort 1 and learn how to build an MVP app using AI, Firebase, and practical product strategy. Designed for African founders, students, and business owners. Seats start at $420.",
    canonicalPath: "/cohort-1",
  },
  apply: {
    title: "Enroll for AI MVP Builder Africa - Cohort 1",
    description:
      "Enroll for the first NDN Analytics Academy cohort for African builders learning to create MVP apps with AI. Only 10 seats available.",
    canonicalPath: "/enroll",
  },
  curriculum: {
    title: "AI MVP Builder Africa Curriculum",
    description:
      "Explore the 6-week curriculum covering MVP planning, app design, frontend building, Firebase, AI features, and MVP launch.",
    canonicalPath: "/courses/ai-mvp-builder-africa/curriculum",
  },
};

export const heroBadges = [
  "Cohort 1",
  "Starts July 13, 2026",
  "Only 10 Seats",
  "Founder-Friendly",
  "AI + Firebase + Product Strategy",
  "Certificate Included",
];

export const problemCards = [
  "I have an idea but no structure.",
  "I do not know what screens my app needs.",
  "I do not understand backend or databases.",
  "I want to use AI but do not know how.",
  "I need help launching my first version.",
];

export const solutionSteps = [
  "Define the app idea.",
  "Design the app screens.",
  "Build the frontend.",
  "Connect Firebase.",
  "Add an AI feature.",
  "Present and launch the MVP.",
];

export const audiences = [
  "African founders",
  "Students",
  "Small business owners",
  "Nurses and healthcare workers",
  "Diaspora entrepreneurs",
  "Beginner builders",
  "Non-technical founders",
  "People who want practical AI skills",
];

export const notForText =
  "This course is not for people who want passive theory, instant riches, or someone else to build everything for them. It is for people ready to learn, practice, and build.";

export const deliverables = [
  "MVP idea brief",
  "User journey",
  "App screen plan",
  "Basic frontend",
  "Firebase backend structure",
  "One working data feature",
  "One AI-powered feature",
  "Demo video",
  "Landing page copy",
  "Launch roadmap",
  "Certificate of completion",
];

export const courseFormat = [
  "3 live sessions per week",
  "6 guided hours per week",
  "Monday strategy/concept class",
  "Wednesday guided build class",
  "Saturday online practical build lab",
  "Weekly assignment",
  "Sunday assignment deadline",
  "Community support",
  "Demo review",
  "Final presentation",
  "Video replays where available",
  "Documentation and templates",
  "Certificate",
];

export const weeklyRhythm = [
  { day: "Monday", activity: "Strategy / Concept Class - 1.5 hours" },
  { day: "Wednesday", activity: "Guided Build Class - 2 hours" },
  { day: "Saturday", activity: "Online Practical Build Lab - 2.5 hours" },
  { day: "Sunday", activity: "Assignment deadline - async submission" },
];

export const credibilityPoints = [
  "AI product development",
  "Blockchain solutions",
  "Firebase and Google Cloud app architecture",
  "Healthcare technology",
  "Fintech and community finance",
  "Education technology",
  "Diaspora platforms",
  "Practical build/deploy/support experience",
];

export const instructor = {
  name: "MSc Desmond Nkefua",
  title: "Founder and Lead Builder, NDN Analytics Inc.",
  focus:
    "AI products, blockchain solutions, Firebase, Google Cloud, MVP development, and African digital infrastructure.",
};

export const applicationSteps = [
  "Enroll using the cohort form.",
  "Share your app idea and learning goals.",
  `Your application details are sent to ${COHORT_LEAD_EMAIL}.`,
  "Receive confirmation and payment instructions.",
  "Join the cohort and start building.",
];

export const courseMetadata = [
  ["Course", "AI MVP Builder Africa"],
  ["Cohort", "Cohort 1"],
  ["Start Date", "July 13, 2026"],
  ["Duration", "6 Weeks"],
  ["Level", "Beginner to Intermediate"],
  ["Format", "Live cohort + guided assignments"],
  ["Seats", "10"],
  ["Certificate", "Yes"],
  ["Final Project", "MVP demo"],
  ["Starting Price", "$420"],
];

export const toolsCovered = [
  "AI coding assistant",
  "ChatGPT/Gemini-style prompting",
  "Firebase",
  "Firestore",
  "Authentication concepts",
  "Google Cloud concepts",
  "GitHub",
  "App design/wireframing tools",
  "Landing page tools",
  "Demo video tools",
];

export const videoLibrary = [
  {
    title: "Welcome and cohort orientation",
    detail: "Short onboarding video covering the cohort promise, expectations, schedule, and success path.",
  },
  {
    title: "Weekly lesson replays",
    detail: "Recordings from live teaching sessions will be organized by week where available.",
  },
  {
    title: "Build lab walkthroughs",
    detail: "Screen-share walkthroughs for app planning, frontend structure, Firebase setup, AI prompts, and demo preparation.",
  },
  {
    title: "Final demo review recordings",
    detail: "Demo-day feedback clips and presentation guidance for students completing the cohort.",
  },
];

export const documentationLibrary = [
  {
    title: "Cohort onboarding guide",
    detail: "Student expectations, weekly rhythm, communication rules, attendance notes, and submission standards.",
  },
  {
    title: "MVP planning workbook",
    detail: "Problem statement, audience, feature scope, user journey, app screens, and launch roadmap templates.",
  },
  {
    title: "Prompt library",
    detail: "Reusable prompts for product planning, UI/UX, Firebase architecture, AI feature design, and launch copy.",
  },
  {
    title: "Firebase starter notes",
    detail: "Beginner-friendly references for projects, authentication concepts, Firestore collections, records, and basic rules.",
  },
  {
    title: "Demo and launch checklist",
    detail: "A practical checklist for demo links, video pitch, screenshots, landing page copy, feedback collection, and next steps.",
  },
  {
    title: "Certificate completion requirements",
    detail: "Assignment, demo, attendance, and presentation requirements for earning the NDN Analytics Academy certificate.",
  },
];

export const learningOutcomes = [
  "Convert an idea into a clear MVP plan.",
  "Define users, features, screens, and core workflows.",
  "Use AI prompts to accelerate product planning and development.",
  "Design an app interface and user journey.",
  "Understand frontend, backend, and database basics.",
  "Create a Firebase data model.",
  "Add one AI-powered feature to an app.",
  "Prepare a demo and launch roadmap.",
  "Present an MVP confidently.",
  "Continue improving the app after the cohort.",
];

export const technicalLevelOptions = [
  "Beginner",
  "Some technical experience",
  "Developer",
  "Founder/non-technical",
  "Student",
  "Business owner",
];

export const applicationFields = [
  "Full name",
  "Email address",
  "WhatsApp number",
  "Country",
  "City",
  "Current role",
  "Technical level",
  "Do you already have an app idea?",
  "Describe your app idea",
  "Why do you want to join this cohort?",
  "Preferred pricing option",
  "Can you attend live sessions?",
  "How did you hear about us?",
];
