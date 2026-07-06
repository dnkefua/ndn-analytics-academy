export interface WeeklyLesson {
  week: number;
  slug: string;
  route: string;
  title: string;
  previewTitle: string;
  shortDescription: string;
  outcome: string;
  theme: string;
  learningObjectives: string[];
  liveSessions: string[];
  keyLessonNotes: string[];
  videoLessons: Array<{
    title: string;
    duration: string;
    description: string;
    status: string;
  }>;
  documentation: Array<{
    title: string;
    format: string;
    description: string;
  }>;
  prompt: string;
  assignment: string;
  deliverables: string[];
  checklist: string[];
}

export const curriculumWeeks: WeeklyLesson[] = [
  {
    week: 1,
    slug: "week-1",
    route: "/courses/ai-mvp-builder-africa/week-1",
    title: "From Idea to MVP",
    previewTitle: "Week 1 - From Idea to MVP",
    shortDescription: "Clarify the problem, target user, MVP scope, and success metric before building.",
    outcome: "Each student has a clear MVP blueprint.",
    theme: "Stop thinking like an idea owner. Start thinking like a product builder.",
    learningObjectives: [
      "Understand what an MVP is.",
      "Choose one problem to solve.",
      "Define target users.",
      "Write a problem statement.",
      "Use AI to structure an app idea.",
      "Avoid building too many features.",
    ],
    liveSessions: [
      "How to Turn an Idea into an MVP",
      "Using AI to Create Your App Blueprint",
    ],
    keyLessonNotes: [
      "A strong MVP focuses on one user group and one painful problem.",
      "AI is used to structure thinking, not to replace product judgment.",
      "Feature discipline is the first builder skill.",
    ],
    videoLessons: [
      {
        title: "Cohort orientation and founder mindset",
        duration: "12-18 min",
        description: "Introduces the 6-week builder path, attendance expectations, and the difference between an idea and an MVP.",
        status: "Orientation video",
      },
      {
        title: "Idea to MVP blueprint walkthrough",
        duration: "25-35 min",
        description: "Screen-share walkthrough showing how to turn a raw app idea into a problem statement, user group, and first feature scope.",
        status: "Live replay",
      },
    ],
    documentation: [
      {
        title: "MVP idea brief template",
        format: "Workbook",
        description: "A structured document for app idea, audience, problem statement, core features, and success metric.",
      },
      {
        title: "AI product planning prompt sheet",
        format: "Prompt reference",
        description: "Copy-ready prompts for app blueprinting, user persona creation, feature prioritization, and launch planning.",
      },
      {
        title: "Feature scope guardrails",
        format: "Checklist",
        description: "A short checklist for reducing a big idea into one realistic MVP direction.",
      },
    ],
    prompt:
      "Act as a senior product manager. Help me turn this app idea into a 6-week MVP plan. The app idea is: [insert idea]. The target users are: [insert users]. Generate the problem statement, user personas, MVP features, user journey, screens, data model, and launch plan.",
    assignment:
      "Submit app idea, target users, problem statement, 5 MVP features, user journey, and success metric.",
    deliverables: [
      "App idea brief",
      "Target user statement",
      "Problem statement",
      "5-feature MVP scope",
      "User journey",
      "Success metric",
    ],
    checklist: [
      "I selected one problem to solve.",
      "I identified my primary users.",
      "I wrote a simple MVP problem statement.",
      "I listed only the features needed for a first demo.",
    ],
  },
  {
    week: 2,
    slug: "week-2",
    route: "/courses/ai-mvp-builder-africa/week-2",
    title: "App Screens, User Flow, and Design",
    previewTitle: "Week 2 - App Screens, User Flow, and Design",
    shortDescription: "Map the app experience before development begins.",
    outcome: "Each student has a complete app design plan.",
    theme: "Design the app before building the app.",
    learningObjectives: [
      "Identify required screens.",
      "Build user flows.",
      "Create a simple navigation structure.",
      "Use AI for UI/UX planning.",
      "Create basic branding.",
      "Prepare a clickable prototype or design plan.",
    ],
    liveSessions: [
      "Designing App Screens with AI",
      "Building a Clickable User Flow",
    ],
    keyLessonNotes: [
      "Screens are promises to users; each screen should support a real action.",
      "A simple flow is easier to build, test, and explain.",
      "Visual polish should support clarity and trust.",
    ],
    videoLessons: [
      {
        title: "Designing app screens with AI",
        duration: "20-30 min",
        description: "Shows how to generate screen lists, layout descriptions, navigation labels, and interface copy from a clear MVP brief.",
        status: "Live replay",
      },
      {
        title: "Clickable user flow walkthrough",
        duration: "20-30 min",
        description: "Demonstrates how a student can map 5-7 screens into a coherent flow before writing code.",
        status: "Build lab recording",
      },
    ],
    documentation: [
      {
        title: "Screen planning worksheet",
        format: "Worksheet",
        description: "A screen-by-screen planning guide for home, onboarding, dashboard, feature, form, and settings screens.",
      },
      {
        title: "User flow diagram guide",
        format: "Reference",
        description: "A beginner-friendly explanation of how to map entry points, core actions, empty states, and completion states.",
      },
      {
        title: "Brand basics checklist",
        format: "Checklist",
        description: "Naming, tagline, colors, trust signals, and UI copy checks for a first MVP.",
      },
    ],
    prompt:
      "Act as a senior UI/UX designer. Design the screen structure for an MVP app called [app name]. The app helps [target users] solve [problem]. Generate the required screens, layout descriptions, button labels, navigation flow, and recommended colors.",
    assignment:
      "Create 5-7 app screens, user flow diagram, basic brand colors, app name, and tagline.",
    deliverables: [
      "5-7 app screens",
      "User flow diagram",
      "Navigation structure",
      "Basic brand colors",
      "App name",
      "Tagline",
    ],
    checklist: [
      "I know which screens my MVP needs.",
      "I mapped how a user moves through the app.",
      "I selected basic brand colors.",
      "I prepared a screen-by-screen build plan.",
    ],
  },
  {
    week: 3,
    slug: "week-3",
    route: "/courses/ai-mvp-builder-africa/week-3",
    title: "Building the MVP Frontend",
    previewTitle: "Week 3 - Building the MVP Frontend",
    shortDescription: "Turn the design plan into a visible, responsive app interface.",
    outcome: "Each student has a visible frontend MVP.",
    theme: "Turn the design into a working app interface.",
    learningObjectives: [
      "Understand frontend structure.",
      "Create pages and components.",
      "Build forms and dashboards.",
      "Use AI coding assistants effectively.",
      "Make the interface responsive.",
      "Connect interface elements to user actions.",
    ],
    liveSessions: [
      "Building the First App Interface",
      "Forms, Dashboards, and User Actions",
    ],
    keyLessonNotes: [
      "A frontend MVP should make the core workflow visible.",
      "Forms, lists, and dashboards are the foundation of many useful apps.",
      "AI coding assistants work best when given a clear component plan.",
    ],
    videoLessons: [
      {
        title: "Frontend structure for beginners",
        duration: "25-40 min",
        description: "Explains pages, components, forms, dashboards, and responsive layout in practical MVP terms.",
        status: "Live replay",
      },
      {
        title: "Building forms and dashboard states",
        duration: "25-40 min",
        description: "A guided build-lab video for translating planned screens into a working app interface.",
        status: "Build lab recording",
      },
    ],
    documentation: [
      {
        title: "Frontend component plan",
        format: "Template",
        description: "A simple page and component breakdown for home, login mock, dashboard, feature screen, and data form.",
      },
      {
        title: "Responsive UI checklist",
        format: "Checklist",
        description: "Mobile, tablet, and desktop checks for spacing, typography, buttons, forms, and empty states.",
      },
      {
        title: "AI coding assistant workflow",
        format: "Guide",
        description: "How to ask for code safely, review generated output, and avoid copying code that you do not understand.",
      },
    ],
    prompt:
      "Act as a senior frontend engineer. Generate a beginner-friendly frontend structure for an MVP app called [app name]. The app has these screens: [list screens]. Create a component plan, page structure, form fields, dashboard layout, and responsive UI recommendations.",
    assignment:
      "Build home page, signup/login screen mock, dashboard, main feature screen, and one data input form.",
    deliverables: [
      "Home page",
      "Signup/login screen mock",
      "Dashboard",
      "Main feature screen",
      "Data input form",
    ],
    checklist: [
      "I built the first visible screens.",
      "I created at least one form.",
      "I tested the interface on mobile width.",
      "I can explain the main user action.",
    ],
  },
  {
    week: 4,
    slug: "week-4",
    route: "/courses/ai-mvp-builder-africa/week-4",
    title: "Backend, Firebase, and Data",
    previewTitle: "Week 4 - Backend, Firebase, and Data",
    shortDescription: "Plan Firebase collections, documents, user records, and core data actions.",
    outcome: "Each student has an app structure that can save and retrieve data.",
    theme: "Real apps need real data.",
    learningObjectives: [
      "Understand what a backend does.",
      "Understand Firebase and Firestore basics.",
      "Learn collections and documents.",
      "Understand user records.",
      "Learn CRUD basics.",
      "Create a simple database plan.",
      "Understand basic security rules.",
    ],
    liveSessions: [
      "Firebase for Beginners",
      "Connecting App Screens to Data",
    ],
    keyLessonNotes: [
      "A database stores the state of the product.",
      "Firestore collections should follow the user actions your MVP supports.",
      "Security rules are part of product quality, not an afterthought.",
    ],
    videoLessons: [
      {
        title: "Firebase and Firestore for MVP builders",
        duration: "30-45 min",
        description: "Introduces Firebase projects, Firestore collections, documents, user records, and simple CRUD workflows.",
        status: "Live replay",
      },
      {
        title: "Connecting one screen to data",
        duration: "25-40 min",
        description: "Build-lab walkthrough for planning one working save/read feature from the student's app screen.",
        status: "Build lab recording",
      },
    ],
    documentation: [
      {
        title: "Firebase setup notes",
        format: "Reference",
        description: "Project setup, app registration, environment configuration, and safe starter guidance.",
      },
      {
        title: "Firestore data model worksheet",
        format: "Worksheet",
        description: "Collections, fields, relationships, sample records, and CRUD actions for the student's MVP.",
      },
      {
        title: "Starter security rules checklist",
        format: "Checklist",
        description: "Beginner security questions for user records, read/write access, and protecting private data.",
      },
    ],
    prompt:
      "Act as a Firebase architect. Design a Firestore database for an MVP app that helps [users] do [main action]. Generate the collections, fields, relationships, sample records, CRUD operations, and simple security rule suggestions.",
    assignment:
      "Create Firebase project, basic database structure, user collection, app-specific data collection, and one working save/read feature.",
    deliverables: [
      "Firebase project plan",
      "User collection",
      "App-specific collection",
      "Sample records",
      "Save/read workflow",
      "Security rule notes",
    ],
    checklist: [
      "I can explain collections and documents.",
      "I mapped my MVP data model.",
      "I planned one save/read feature.",
      "I noted basic security considerations.",
    ],
  },
  {
    week: 5,
    slug: "week-5",
    route: "/courses/ai-mvp-builder-africa/week-5",
    title: "AI Features and Automation",
    previewTitle: "Week 5 - AI Features and Automation",
    shortDescription: "Choose one useful AI feature and design it responsibly.",
    outcome: "Each student has one AI-powered MVP feature.",
    theme: "Add intelligence to the MVP.",
    learningObjectives: [
      "Understand what makes an app AI-powered.",
      "Choose one useful AI feature.",
      "Write safer AI prompts.",
      "Add AI summary, assistant, report, or recommendation logic.",
      "Understand responsible AI disclaimers.",
      "Avoid false AI claims.",
    ],
    liveSessions: [
      "Adding AI Features to Your MVP",
      "AI Agents, Prompts, and App Automation",
    ],
    keyLessonNotes: [
      "The best first AI feature solves a narrow product problem.",
      "Prompt templates should define inputs, outputs, and safety boundaries.",
      "Responsible AI copy builds trust with users.",
    ],
    videoLessons: [
      {
        title: "Choosing the first AI feature",
        duration: "20-30 min",
        description: "Covers AI assistants, summaries, recommendations, content generation, reports, and decision-support features.",
        status: "Live replay",
      },
      {
        title: "Prompt templates and safe output design",
        duration: "25-35 min",
        description: "Walks through prompt inputs, output formats, disclaimers, user expectations, and integration planning.",
        status: "Build lab recording",
      },
    ],
    documentation: [
      {
        title: "AI feature planning worksheet",
        format: "Worksheet",
        description: "Feature description, user flow, prompt template, input data, output format, and safety considerations.",
      },
      {
        title: "Responsible AI disclaimer examples",
        format: "Reference",
        description: "Plain-language disclaimers for healthcare, finance, education, and general advice-style MVPs.",
      },
      {
        title: "AI integration checklist",
        format: "Checklist",
        description: "A practical list for API inputs, outputs, logging, error states, and user review.",
      },
    ],
    prompt:
      "Act as an applied AI engineer. Suggest one useful AI feature for my MVP app. The app helps [users] solve [problem]. Generate the feature description, user flow, prompt template, input data, output format, safety considerations, and integration steps.",
    assignment:
      "Add or design one AI-powered feature such as an AI assistant, AI summary, AI recommendation, AI content generator, AI report generator, or AI decision-support feature.",
    deliverables: [
      "AI feature description",
      "User flow",
      "Prompt template",
      "Input/output format",
      "Safety considerations",
      "Integration steps",
    ],
    checklist: [
      "I chose one useful AI feature.",
      "I wrote a prompt template.",
      "I defined the expected output format.",
      "I added responsible AI notes.",
    ],
  },
  {
    week: 6,
    slug: "week-6",
    route: "/courses/ai-mvp-builder-africa/week-6",
    title: "Launch, Demo, and First Users",
    previewTitle: "Week 6 - Launch, Demo, and First Users",
    shortDescription: "Prepare the demo, pitch, landing copy, feedback plan, and 30-day roadmap.",
    outcome: "Each student completes and presents an MVP demo.",
    theme: "A product is not finished until someone can use it.",
    learningObjectives: [
      "Prepare an MVP demo.",
      "Create landing page copy.",
      "Record a short pitch video.",
      "Collect user feedback.",
      "Understand pricing and launch basics.",
      "Present a roadmap for the next 30 days.",
    ],
    liveSessions: [
      "Deploying and Presenting Your MVP",
      "MVP Demo Day",
    ],
    keyLessonNotes: [
      "A clear demo explains the problem, user, workflow, and next step.",
      "Launch copy should invite the right early users to respond.",
      "The next 30 days matter more than pretending the MVP is finished.",
    ],
    videoLessons: [
      {
        title: "Preparing the MVP demo",
        duration: "25-35 min",
        description: "Shows how to present the problem, user, screen flow, data feature, AI feature, and next-step roadmap.",
        status: "Live replay",
      },
      {
        title: "Demo day and pitch review",
        duration: "45-60 min",
        description: "Final presentation session, feedback guidance, and launch readiness review.",
        status: "Demo recording where available",
      },
    ],
    documentation: [
      {
        title: "Demo script template",
        format: "Template",
        description: "A 2-minute structure for problem, audience, app walkthrough, AI feature, and next step.",
      },
      {
        title: "Landing page copy worksheet",
        format: "Worksheet",
        description: "Headline, subheadline, audience, problem, benefits, CTA, trust points, and launch offer.",
      },
      {
        title: "30-day launch roadmap",
        format: "Planning document",
        description: "A practical plan for early users, feedback questions, feature fixes, pricing tests, and next build steps.",
      },
    ],
    prompt:
      "Act as a startup launch coach. Help me prepare a launch plan for my MVP app. The app is called [app name]. It helps [users] solve [problem]. Generate landing page copy, a 2-minute demo script, target early users, feedback questions, pricing ideas, and a 30-day improvement roadmap.",
    assignment:
      "Submit app link or demo, 2-minute pitch video, landing page copy, screenshots, and next 30-day improvement plan.",
    deliverables: [
      "App link or demo",
      "2-minute pitch video",
      "Landing page copy",
      "Screenshots",
      "Feedback questions",
      "30-day improvement plan",
    ],
    checklist: [
      "I prepared my demo flow.",
      "I wrote landing page copy.",
      "I recorded or planned my pitch video.",
      "I created a next 30-day roadmap.",
    ],
  },
];

export const getWeekBySlug = (slug?: string) =>
  curriculumWeeks.find((week) => week.slug === slug);
