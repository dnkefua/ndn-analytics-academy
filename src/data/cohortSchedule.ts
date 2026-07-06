export type CohortSession = {
  id: string;
  week: number;
  date: string;
  day: string;
  time: string;
  sessionType: string;
  duration: string;
  title: string;
  target: string;
  learningPoints: string[];
  practicalActivity?: string;
  prompt?: string;
  instructorActions?: string[];
  studentOutputs: string[];
};

export type WeeklyAssignment = {
  title: string;
  deadline: string;
  instructions: string;
  studentMustSubmit: string[];
  instructorMustCollect: string[];
  completionCriteria: string[];
};

export type WeeklySchedule = {
  week: number;
  dateRange: string;
  title: string;
  focus: string;
  weeklyGoal: string;
  weeklyDeliverable: string;
  sessions: CohortSession[];
  assignment: WeeklyAssignment;
};

export const classTimes = {
  monday: "7:00 PM WAT / 10:00 PM Dubai",
  wednesday: "7:00 PM WAT / 10:00 PM Dubai",
  saturday: "10:00 AM WAT / 1:00 PM Dubai",
  sunday: "Assignment deadline",
};

export const cohortRhythmStats = [
  ["Live sessions per week", "3"],
  ["Live hours per week", "6 hours"],
  ["Total live sessions", "18"],
  ["Total live guided hours", "36"],
  ["Recommended homework", "3-5 hours per week"],
  ["Total expected student effort", "54-66 hours"],
];

export const cohortClassRhythm = [
  {
    day: "Monday",
    time: classTimes.monday,
    sessionType: "Strategy / Concept Class",
    duration: "1.5 hours",
    purpose: "Teach the strategy, concepts, examples, and decisions students need before building.",
  },
  {
    day: "Wednesday",
    time: classTimes.wednesday,
    sessionType: "Guided Build Class",
    duration: "2 hours",
    purpose: "Use AI prompts and guided structure to produce the weekly builder artifact.",
  },
  {
    day: "Saturday",
    time: classTimes.saturday,
    sessionType: "Online Practical Build Lab",
    duration: "2.5 hours",
    purpose: "Review work, fix weak areas, and help students complete the weekly deliverable.",
  },
  {
    day: "Sunday",
    time: classTimes.sunday,
    sessionType: "Assignment Deadline",
    duration: "Async submission",
    purpose: "Students submit the weekly artifact for instructor review and feedback.",
  },
];

const defaultSundayLearningPoints = [
  "Submit the weekly deliverable",
  "Confirm all required evidence is included",
  "Prepare for instructor review",
];

export const weeklySchedules: WeeklySchedule[] = [
  {
    week: 1,
    dateRange: "July 13-19, 2026",
    title: "Week 1 - From Idea to MVP",
    focus: "Idea to MVP",
    weeklyGoal:
      "Every student leaves with a clear app idea, target users, MVP problem statement, and first product blueprint.",
    weeklyDeliverable: "MVP Blueprint",
    sessions: [
      {
        id: "week-1-monday",
        week: 1,
        date: "Monday, July 13, 2026",
        day: "Monday",
        time: classTimes.monday,
        sessionType: "Strategy / Concept Class",
        duration: "1.5 hours",
        title: "What Is an MVP and Why Most App Ideas Fail",
        target:
          "Students understand what an MVP is, why beginners overbuild, how to choose one clear problem, and how to reduce a big idea into a 6-week MVP.",
        learningPoints: [
          "What an MVP is",
          "Difference between an idea, feature, product, and business",
          "Why beginners overbuild",
          "How to choose one clear problem",
          "How to identify the first user group",
          "How to reduce a big idea into a 6-week MVP",
        ],
        practicalActivity:
          "Students describe their app idea in one sentence, name the first user group, and reduce the idea to one main action.",
        instructorActions: [
          "Explain MVP basics",
          "Give African market examples",
          "Help students reduce large ideas into simple MVPs",
          "Identify students with unclear ideas for follow-up",
        ],
        studentOutputs: [
          "App idea",
          "Target user",
          "Main problem",
          "Main action the app helps users complete",
        ],
      },
      {
        id: "week-1-wednesday",
        week: 1,
        date: "Wednesday, July 15, 2026",
        day: "Wednesday",
        time: classTimes.wednesday,
        sessionType: "Guided Build Class",
        duration: "2 hours",
        title: "Using AI to Create an MVP Blueprint",
        target:
          "Students use AI to generate their MVP problem statement, user personas, MVP features, user journey, screens, data needs, and first build plan.",
        learningPoints: [
          "How to feed a clear app idea into AI",
          "How to review AI-generated product plans",
          "How to remove unnecessary features",
          "How to turn AI output into an MVP blueprint",
        ],
        practicalActivity:
          "Run the product manager prompt live, review the output, and refine it into a usable MVP blueprint.",
        prompt:
          "Act as a senior product manager. Help me turn this app idea into a 6-week MVP plan. The app idea is: [insert idea]. The target users are: [insert users]. Generate the problem statement, user personas, MVP features, user journey, screens, data model, and launch plan.",
        instructorActions: [
          "Walk through the prompt live",
          "Review student AI outputs",
          "Help students remove unnecessary features",
          "Ask students to explain the core problem in one sentence",
        ],
        studentOutputs: [
          "MVP problem statement",
          "User personas",
          "5 core MVP features",
          "User journey",
          "App screen list",
          "Basic data needs",
          "First version build plan",
        ],
      },
      {
        id: "week-1-saturday",
        week: 1,
        date: "Saturday, July 18, 2026",
        day: "Saturday",
        time: classTimes.saturday,
        sessionType: "Online Practical Build Lab",
        duration: "2.5 hours",
        title: "Finalizing Your MVP Blueprint",
        target: "Students complete and refine their final MVP blueprint.",
        learningPoints: [
          "How to test whether the problem is clear",
          "How to tighten MVP scope",
          "How to define a measurable success metric",
        ],
        practicalActivity:
          "Students present their MVP blueprint draft and receive scope, clarity, and user feedback.",
        instructorActions: [
          "Review each student's MVP blueprint",
          "Give feedback on scope",
          "Approve or request revision before Week 2",
          "Document weak areas for follow-up",
        ],
        studentOutputs: [
          "Final app idea",
          "Problem statement",
          "Target user",
          "MVP feature list",
          "User journey",
          "Success metric",
        ],
      },
      {
        id: "week-1-sunday",
        week: 1,
        date: "Sunday, July 19, 2026",
        day: "Sunday",
        time: classTimes.sunday,
        sessionType: "Assignment Deadline",
        duration: "Async submission",
        title: "Week 1 Assignment Submission",
        target: "Students submit the MVP Blueprint for instructor review.",
        learningPoints: defaultSundayLearningPoints,
        practicalActivity: "Submit your MVP Blueprint.",
        instructorActions: [
          "Collect all MVP Blueprint documents",
          "Mark students approved or revision needed",
          "Prepare Week 2 UX support notes",
        ],
        studentOutputs: [
          "App idea",
          "Problem statement",
          "Target users",
          "5 MVP features",
          "User journey",
          "Success metric",
        ],
      },
    ],
    assignment: {
      title: "Submit your MVP Blueprint",
      deadline: "Sunday, July 19, 2026",
      instructions: "Submit your MVP Blueprint.",
      studentMustSubmit: [
        "App idea",
        "Problem statement",
        "Target users",
        "5 MVP features",
        "User journey",
        "Success metric",
      ],
      instructorMustCollect: [
        "MVP Blueprint document",
        "Student app idea list",
        "Student risk/clarity notes",
        "Students who need extra support before Week 2",
      ],
      completionCriteria: [
        "Problem is clearly defined",
        "Target user is specific",
        "MVP has no more than 5 core features",
        "User journey is understandable",
        "Success metric is measurable",
      ],
    },
  },
  {
    week: 2,
    dateRange: "July 20-26, 2026",
    title: "Week 2 - App Screens, User Flow, and Design",
    focus: "Screens and user flow",
    weeklyGoal:
      "Every student creates the screen plan, user flow, app name, basic brand direction, and design structure.",
    weeklyDeliverable: "App Design Blueprint",
    sessions: [
      {
        id: "week-2-monday",
        week: 2,
        date: "Monday, July 20, 2026",
        day: "Monday",
        time: classTimes.monday,
        sessionType: "Strategy / Concept Class",
        duration: "1.5 hours",
        title: "Designing Before Building",
        target:
          "Students understand why every app needs a user flow, how to decide required screens, and how to design around one main user journey.",
        learningPoints: [
          "Why every app needs a user flow",
          "How to decide required screens",
          "Basic UI/UX principles",
          "How to avoid confusing navigation",
          "How to name and position an app",
          "How to design for one main user action",
        ],
        practicalActivity:
          "Students turn the Week 1 MVP blueprint into an app name, tagline, screen list, and user flow.",
        instructorActions: [
          "Teach simple UI/UX structure",
          "Review student screen lists",
          "Remove unnecessary pages",
          "Ensure every screen supports the MVP goal",
        ],
        studentOutputs: ["App name", "App tagline", "5-7 required screens", "Main user flow"],
      },
      {
        id: "week-2-wednesday",
        week: 2,
        date: "Wednesday, July 22, 2026",
        day: "Wednesday",
        time: classTimes.wednesday,
        sessionType: "Guided Build Class",
        duration: "2 hours",
        title: "Creating App Screens with AI",
        target:
          "Students use AI to create screen descriptions, navigation flow, button labels, form fields, dashboard layout, and basic app colors.",
        learningPoints: [
          "How to prompt AI for UI structure",
          "How to turn MVP scope into screens",
          "How to review button labels and form fields",
          "How to avoid too much navigation",
        ],
        practicalActivity:
          "Students generate and refine screen descriptions, navigation, button labels, and basic app colors.",
        prompt:
          "Act as a senior UI/UX designer. Design the screen structure for an MVP app called [app name]. The app helps [target users] solve [problem]. Generate the required screens, layout descriptions, button labels, navigation flow, and recommended colors.",
        instructorActions: [
          "Demonstrate prompt use",
          "Help students improve weak screen structures",
          "Make sure app flow is not too complex",
          "Encourage clear button labels and simple navigation",
        ],
        studentOutputs: [
          "Screen descriptions",
          "Navigation flow",
          "Button labels",
          "Form fields",
          "Dashboard layout",
          "Basic app colors",
        ],
      },
      {
        id: "week-2-saturday",
        week: 2,
        date: "Saturday, July 25, 2026",
        day: "Saturday",
        time: classTimes.saturday,
        sessionType: "Online Practical Build Lab",
        duration: "2.5 hours",
        title: "Building the App Design Plan",
        target:
          "Students complete the app screen plan, user flow, app color palette, navigation structure, and homepage or dashboard wireframe.",
        learningPoints: [
          "How to review each screen for necessity",
          "How to make the dashboard/homepage clear",
          "How to finalize a build-ready design blueprint",
        ],
        practicalActivity:
          "Students share the screen plan and wireframe, then revise the design blueprint with instructor feedback.",
        instructorActions: [
          "Review whether each screen is necessary",
          "Help students improve unclear flows",
          "Approve app design blueprint for frontend work",
        ],
        studentOutputs: [
          "5-7 app screens",
          "User flow diagram",
          "App color palette",
          "Navigation structure",
          "Homepage or dashboard wireframe",
        ],
      },
      {
        id: "week-2-sunday",
        week: 2,
        date: "Sunday, July 26, 2026",
        day: "Sunday",
        time: classTimes.sunday,
        sessionType: "Assignment Deadline",
        duration: "Async submission",
        title: "Week 2 Assignment Submission",
        target: "Students submit the App Design Blueprint for instructor review.",
        learningPoints: defaultSundayLearningPoints,
        practicalActivity: "Submit your App Design Blueprint.",
        instructorActions: [
          "Collect app design blueprints",
          "Record UX support needs",
          "Identify students ready for frontend work",
        ],
        studentOutputs: ["App name", "Tagline", "Screen list", "User flow", "Wireframes or descriptions", "App colors"],
      },
    ],
    assignment: {
      title: "Submit your App Design Blueprint",
      deadline: "Sunday, July 26, 2026",
      instructions: "Submit your App Design Blueprint.",
      studentMustSubmit: [
        "App name",
        "Tagline",
        "Screen list",
        "User flow",
        "Basic wireframes or screen descriptions",
        "App colors",
      ],
      instructorMustCollect: [
        "App design blueprint",
        "Screen list",
        "User flow diagram",
        "Notes on students needing UX support",
      ],
      completionCriteria: [
        "App has a clear name and tagline",
        "Screen list supports the MVP",
        "User flow is easy to follow",
        "Main dashboard/homepage is defined",
        "Design direction is simple and consistent",
      ],
    },
  },
  {
    week: 3,
    dateRange: "July 27-August 2, 2026",
    title: "Week 3 - Building the MVP Frontend",
    focus: "Frontend",
    weeklyGoal: "Every student creates the visible frontend structure of their MVP.",
    weeklyDeliverable: "Frontend MVP Draft",
    sessions: [
      {
        id: "week-3-monday",
        week: 3,
        date: "Monday, July 27, 2026",
        day: "Monday",
        time: classTimes.monday,
        sessionType: "Strategy / Concept Class",
        duration: "1.5 hours",
        title: "Frontend Basics for MVP Apps",
        target:
          "Students understand frontend structure, pages, components, dashboards, forms, and how to organize a simple app interface.",
        learningPoints: [
          "What frontend means",
          "Difference between pages and components",
          "How dashboards work",
          "How forms collect user data",
          "How to structure a simple app interface",
          "How to use AI to generate frontend plans",
        ],
        practicalActivity:
          "Students translate the design blueprint into pages, components, form fields, and dashboard sections.",
        instructorActions: [
          "Explain frontend structure in beginner language",
          "Map design screens to pages and components",
          "Check that form fields match the MVP action",
          "Prepare students for guided AI frontend planning",
        ],
        studentOutputs: ["Page list", "Component list", "Form field list", "Dashboard structure"],
      },
      {
        id: "week-3-wednesday",
        week: 3,
        date: "Wednesday, July 29, 2026",
        day: "Wednesday",
        time: classTimes.wednesday,
        sessionType: "Guided Build Class",
        duration: "2 hours",
        title: "Building the First App Interface",
        target:
          "Students build or generate the homepage, login/signup mock, dashboard, main feature screen, and one data entry form.",
        learningPoints: [
          "How to prompt for a frontend structure",
          "How to organize screens into a first interface",
          "How to check responsiveness and clarity",
          "How to make one core action visible",
        ],
        practicalActivity:
          "Students use the frontend prompt to create a component plan and first visible app interface.",
        prompt:
          "Act as a senior frontend engineer. Generate a beginner-friendly frontend structure for an MVP app called [app name]. The app has these screens: [list screens]. Create a component plan, page structure, form fields, dashboard layout, and responsive UI recommendations.",
        instructorActions: [
          "Demonstrate the frontend prompt",
          "Review page/component plans",
          "Help students simplify the interface",
          "Check the main user action is visible",
        ],
        studentOutputs: ["Homepage", "Login/signup mock", "Dashboard", "Main feature screen", "Data entry form"],
      },
      {
        id: "week-3-saturday",
        week: 3,
        date: "Saturday, August 1, 2026",
        day: "Saturday",
        time: classTimes.saturday,
        sessionType: "Online Practical Build Lab",
        duration: "2.5 hours",
        title: "Frontend Build Review",
        target:
          "Students complete their main interface, dashboard, one form, basic navigation, and responsive layout check.",
        learningPoints: [
          "How to inspect MVP screens",
          "How to improve unclear layouts",
          "How to check mobile and desktop states",
        ],
        practicalActivity:
          "Students present screenshots or preview links for live interface review and cleanup.",
        instructorActions: [
          "Help students fix confusing layouts",
          "Check missing pages",
          "Improve poor button labels",
          "Verify the user flow is visible in the interface",
        ],
        studentOutputs: ["Main interface", "Dashboard", "One form", "Basic navigation", "Responsive layout check"],
      },
      {
        id: "week-3-sunday",
        week: 3,
        date: "Sunday, August 2, 2026",
        day: "Sunday",
        time: classTimes.sunday,
        sessionType: "Assignment Deadline",
        duration: "Async submission",
        title: "Week 3 Assignment Submission",
        target: "Students submit the Frontend MVP Draft for instructor review.",
        learningPoints: defaultSundayLearningPoints,
        practicalActivity: "Submit your Frontend MVP Draft.",
        instructorActions: [
          "Collect frontend previews",
          "Identify incomplete screens",
          "Create readiness list for backend work",
        ],
        studentOutputs: [
          "Frontend screenshots or app preview link",
          "Page/component structure",
          "Dashboard screenshot",
          "Main form screenshot",
          "Short explanation of what the user can do",
        ],
      },
    ],
    assignment: {
      title: "Submit your Frontend MVP Draft",
      deadline: "Sunday, August 2, 2026",
      instructions: "Submit your Frontend MVP Draft.",
      studentMustSubmit: [
        "Frontend screenshots or app preview link",
        "Page/component structure",
        "Dashboard screenshot",
        "Main form screenshot",
        "Short explanation of what the user can do",
      ],
      instructorMustCollect: [
        "Frontend preview link or screenshots",
        "Notes on incomplete screens",
        "List of students ready for backend work",
      ],
      completionCriteria: [
        "Main pages are visible",
        "Dashboard is understandable",
        "Form fields match app needs",
        "User can understand what action to take",
        "Navigation is clear enough for MVP stage",
      ],
    },
  },
  {
    week: 4,
    dateRange: "August 3-9, 2026",
    title: "Week 4 - Backend, Firebase, and Data",
    focus: "Firebase and data",
    weeklyGoal:
      "Every student understands backend basics and creates a Firebase/Firestore data structure for their app.",
    weeklyDeliverable: "Firebase/Data Blueprint",
    sessions: [
      {
        id: "week-4-monday",
        week: 4,
        date: "Monday, August 3, 2026",
        day: "Monday",
        time: classTimes.monday,
        sessionType: "Strategy / Concept Class",
        duration: "1.5 hours",
        title: "Backend and Database Basics",
        target:
          "Students understand what a backend does, what Firebase and Firestore are, and how users, records, collections, and documents work.",
        learningPoints: [
          "What a backend does",
          "What Firebase is",
          "What Firestore is",
          "Difference between users, records, collections, and documents",
          "What CRUD means",
          "Why apps need authentication",
          "Basic security rule concepts",
        ],
        practicalActivity:
          "Students list the users, records, fields, collections, and actions their MVP needs.",
        instructorActions: [
          "Teach backend basics",
          "Explain Firestore with simple examples",
          "Connect app screens to data needs",
          "Flag data models that are too complex",
        ],
        studentOutputs: ["User data needed", "Main app data", "Collections", "Fields", "Basic user actions"],
      },
      {
        id: "week-4-wednesday",
        week: 4,
        date: "Wednesday, August 5, 2026",
        day: "Wednesday",
        time: classTimes.wednesday,
        sessionType: "Guided Build Class",
        duration: "2 hours",
        title: "Designing Your Firebase Data Model",
        target:
          "Students use AI to create Firestore collections, fields, sample records, CRUD operations, and simple security rule suggestions.",
        learningPoints: [
          "How to prompt for a Firebase data model",
          "How to review collections and fields",
          "How to think through CRUD operations",
          "How to check simple security assumptions",
        ],
        practicalActivity:
          "Students generate a Firestore data model and revise it against their app screens.",
        prompt:
          "Act as a Firebase architect. Design a Firestore database for an MVP app that helps [users] do [main action]. Generate the collections, fields, relationships, sample records, CRUD operations, and simple security rule suggestions.",
        instructorActions: [
          "Demonstrate the Firebase prompt",
          "Review collections and fields",
          "Remove unnecessary relationships",
          "Check one save/read workflow",
        ],
        studentOutputs: [
          "Firestore collections",
          "Fields",
          "Sample records",
          "CRUD operations",
          "Simple security rule suggestions",
        ],
      },
      {
        id: "week-4-saturday",
        week: 4,
        date: "Saturday, August 8, 2026",
        day: "Saturday",
        time: classTimes.saturday,
        sessionType: "Online Practical Build Lab",
        duration: "2.5 hours",
        title: "Connecting Data to the MVP",
        target:
          "Students complete Firebase project setup or Firebase plan, Firestore collection structure, user collection, app-specific data collection, and one save/read workflow plan.",
        learningPoints: [
          "How to connect screens to data",
          "How to describe one save/read workflow",
          "How to keep the database simple",
        ],
        practicalActivity:
          "Students present a Firebase setup screenshot or written data model and explain one save/read workflow.",
        instructorActions: [
          "Simplify overcomplicated database structures",
          "Check if data fields match actual app screens",
          "Confirm students understand one save/read workflow",
        ],
        studentOutputs: [
          "Firebase project setup or plan",
          "Firestore collection structure",
          "User collection",
          "App-specific data collection",
          "One save/read workflow plan",
        ],
      },
      {
        id: "week-4-sunday",
        week: 4,
        date: "Sunday, August 9, 2026",
        day: "Sunday",
        time: classTimes.sunday,
        sessionType: "Assignment Deadline",
        duration: "Async submission",
        title: "Week 4 Assignment Submission",
        target: "Students submit the Firebase and Data Blueprint for instructor review.",
        learningPoints: defaultSundayLearningPoints,
        practicalActivity: "Submit your Firebase and Data Blueprint.",
        instructorActions: [
          "Collect Firebase screenshots or data plans",
          "Record backend support needs",
          "Confirm readiness for AI feature planning",
        ],
        studentOutputs: [
          "Firebase project screenshot or setup plan",
          "Firestore collection structure",
          "Sample data record",
          "User data structure",
          "One save/read feature explanation",
        ],
      },
    ],
    assignment: {
      title: "Submit your Firebase and Data Blueprint",
      deadline: "Sunday, August 9, 2026",
      instructions: "Submit your Firebase and Data Blueprint.",
      studentMustSubmit: [
        "Firebase project screenshot or setup plan",
        "Firestore collection structure",
        "Sample data record",
        "User data structure",
        "One save/read feature explanation",
      ],
      instructorMustCollect: [
        "Firebase screenshots or written data plan",
        "Firestore collection design",
        "Notes on students needing backend support",
      ],
      completionCriteria: [
        "Main collections are clear",
        "Data fields support the MVP",
        "One save/read workflow is explained",
        "Student understands basic CRUD",
        "Data structure is not overcomplicated",
      ],
    },
  },
  {
    week: 5,
    dateRange: "August 10-16, 2026",
    title: "Week 5 - AI Features and Automation",
    focus: "AI feature",
    weeklyGoal: "Every student designs or adds one useful AI-powered feature to their MVP.",
    weeklyDeliverable: "AI Feature Plan or Prototype",
    sessions: [
      {
        id: "week-5-monday",
        week: 5,
        date: "Monday, August 10, 2026",
        day: "Monday",
        time: classTimes.monday,
        sessionType: "Strategy / Concept Class",
        duration: "1.5 hours",
        title: "What Makes an App AI-Powered?",
        target:
          "Students understand what an AI feature is, how to choose one useful AI feature, and how to avoid unrealistic AI claims.",
        learningPoints: [
          "What an AI feature is",
          "Difference between normal automation and AI",
          "AI assistant vs AI summary vs AI recommendation",
          "How to choose one simple AI feature",
          "Responsible AI basics",
          "Why AI claims must be realistic",
        ],
        practicalActivity:
          "Students choose one AI feature type and explain the user benefit in one sentence.",
        instructorActions: [
          "Explain practical AI feature categories",
          "Challenge unrealistic AI claims",
          "Help students choose one simple AI feature",
          "Document safety-sensitive use cases",
        ],
        studentOutputs: ["Selected AI feature type", "AI feature goal", "User benefit"],
      },
      {
        id: "week-5-wednesday",
        week: 5,
        date: "Wednesday, August 12, 2026",
        day: "Wednesday",
        time: classTimes.wednesday,
        sessionType: "Guided Build Class",
        duration: "2 hours",
        title: "Designing the AI Feature",
        target:
          "Students create the AI feature description, input data, output format, prompt template, user flow, safety notes, and integration plan.",
        learningPoints: [
          "How to specify AI inputs",
          "How to define AI outputs",
          "How to write prompt templates",
          "How to add safety notes and disclaimers",
        ],
        practicalActivity:
          "Students generate and refine a practical AI feature plan using the applied AI prompt.",
        prompt:
          "Act as an applied AI engineer. Suggest one useful AI feature for my MVP app. The app helps [users] solve [problem]. Generate the feature description, user flow, prompt template, input data, output format, safety considerations, and integration steps.",
        instructorActions: [
          "Walk through the AI feature prompt",
          "Review user value and safety",
          "Simplify distracting AI ideas",
          "Check input/output clarity",
        ],
        studentOutputs: [
          "AI feature description",
          "Input data",
          "Output format",
          "Prompt template",
          "User flow",
          "Safety notes",
          "Integration plan",
        ],
      },
      {
        id: "week-5-saturday",
        week: 5,
        date: "Saturday, August 15, 2026",
        day: "Saturday",
        time: classTimes.saturday,
        sessionType: "Online Practical Build Lab",
        duration: "2.5 hours",
        title: "AI Feature Build and Review",
        target:
          "Students complete the AI prompt, AI feature screen, input/output flow, disclaimer or safety note, and demo explanation.",
        learningPoints: [
          "How to explain the AI feature in the app",
          "How to review prompt quality",
          "How to add a responsible safety note",
        ],
        practicalActivity:
          "Students present the AI feature screen or mockup and walk through input, output, and safety notes.",
        instructorActions: [
          "Review usefulness",
          "Check safety/disclaimer wording",
          "Make sure the AI feature supports the MVP instead of distracting from it",
        ],
        studentOutputs: [
          "AI prompt",
          "AI feature screen",
          "Input/output flow",
          "Disclaimer or safety note",
          "Demo of how the AI feature helps the user",
        ],
      },
      {
        id: "week-5-sunday",
        week: 5,
        date: "Sunday, August 16, 2026",
        day: "Sunday",
        time: classTimes.sunday,
        sessionType: "Assignment Deadline",
        duration: "Async submission",
        title: "Week 5 Assignment Submission",
        target: "Students submit the AI Feature Plan or Prototype for instructor review.",
        learningPoints: defaultSundayLearningPoints,
        practicalActivity: "Submit your AI Feature Plan or Prototype.",
        instructorActions: [
          "Collect AI feature plans",
          "Review prompt templates and safety notes",
          "Confirm students ready for final demo week",
        ],
        studentOutputs: [
          "AI feature description",
          "Prompt template",
          "Input/output example",
          "Screenshot or mockup of AI feature",
          "Safety/disclaimer note",
        ],
      },
    ],
    assignment: {
      title: "Submit your AI Feature Plan or Prototype",
      deadline: "Sunday, August 16, 2026",
      instructions: "Submit your AI Feature Plan or Prototype.",
      studentMustSubmit: [
        "AI feature description",
        "Prompt template",
        "Input/output example",
        "Screenshot or mockup of AI feature",
        "Safety/disclaimer note",
      ],
      instructorMustCollect: [
        "AI feature plan",
        "Prompt templates",
        "Safety notes",
        "Students ready for final demo week",
      ],
      completionCriteria: [
        "AI feature solves a real user problem",
        "Prompt is specific",
        "Input and output are clear",
        "Safety note is included where needed",
        "Feature is simple enough for MVP stage",
      ],
    },
  },
  {
    week: 6,
    dateRange: "August 17-23, 2026",
    title: "Week 6 - Launch, Demo, and First Users",
    focus: "Demo and launch",
    weeklyGoal: "Every student prepares a demo, launch message, landing page copy, and final presentation.",
    weeklyDeliverable: "Final MVP Demo Package",
    sessions: [
      {
        id: "week-6-monday",
        week: 6,
        date: "Monday, August 17, 2026",
        day: "Monday",
        time: classTimes.monday,
        sessionType: "Strategy / Concept Class",
        duration: "1.5 hours",
        title: "Launching an MVP",
        target:
          "Students understand what a demo should show, how to explain the problem, how to present the app, and how to ask for user feedback.",
        learningPoints: [
          "What a demo should show",
          "How to explain the problem",
          "How to present the app",
          "How to ask for user feedback",
          "How to create simple landing page copy",
          "How to plan the next 30 days after the cohort",
        ],
        practicalActivity:
          "Students draft the app pitch, demo structure, landing headline, early users, and feedback questions.",
        instructorActions: [
          "Explain demo structure",
          "Show simple landing copy examples",
          "Help students choose early users",
          "Prepare Demo Day expectations",
        ],
        studentOutputs: [
          "App pitch",
          "Demo structure",
          "Landing page headline",
          "Target early users",
          "Feedback questions",
        ],
      },
      {
        id: "week-6-wednesday",
        week: 6,
        date: "Wednesday, August 19, 2026",
        day: "Wednesday",
        time: classTimes.wednesday,
        sessionType: "Guided Build Class",
        duration: "2 hours",
        title: "Preparing the MVP Demo and Launch Plan",
        target:
          "Students create a 2-minute demo script, screenshots, landing page copy, feedback questions, pricing or monetization idea, and 30-day improvement roadmap.",
        learningPoints: [
          "How to write a 2-minute demo script",
          "How to prepare screenshots",
          "How to create launch copy",
          "How to build a 30-day improvement roadmap",
        ],
        practicalActivity:
          "Students use the launch coach prompt to generate and refine their final demo package.",
        prompt:
          "Act as a startup launch coach. Help me prepare a launch plan for my MVP app. The app is called [app name]. It helps [users] solve [problem]. Generate landing page copy, a 2-minute demo script, target early users, feedback questions, pricing ideas, and a 30-day improvement roadmap.",
        instructorActions: [
          "Walk through the launch prompt",
          "Review demo scripts",
          "Improve weak launch copy",
          "Check that the 30-day plan is realistic",
        ],
        studentOutputs: [
          "2-minute demo script",
          "App screenshots",
          "Landing page copy",
          "Feedback form questions",
          "Pricing or monetization idea",
          "30-day improvement roadmap",
        ],
      },
      {
        id: "week-6-saturday",
        week: 6,
        date: "Saturday, August 22, 2026",
        day: "Saturday",
        time: classTimes.saturday,
        sessionType: "Practical Build Lab + Demo Day",
        duration: "2.5 hours",
        title: "MVP Presentations",
        target:
          "Each student presents their problem, target users, app name, main screens, Firebase/data structure, AI feature, demo or mock demo, launch plan, and next 30-day roadmap.",
        learningPoints: [
          "MVP pitch: 2 minutes",
          "Demo walkthrough: 4 minutes",
          "Instructor feedback: 3 minutes",
          "Total per student: 9 minutes",
        ],
        practicalActivity:
          "Students present the final MVP Demo Package and receive instructor feedback.",
        instructorActions: [
          "Score final demo",
          "Give improvement feedback",
          "Confirm certificate eligibility",
          "Identify strongest projects for showcase or case studies",
        ],
        studentOutputs: [
          "Problem being solved",
          "Target users",
          "App name",
          "Main screens",
          "Firebase/data structure",
          "AI feature",
          "Demo or mock demo",
          "Launch plan",
          "Next 30-day roadmap",
        ],
      },
      {
        id: "week-6-sunday",
        week: 6,
        date: "Sunday, August 23, 2026",
        day: "Sunday",
        time: classTimes.sunday,
        sessionType: "Assignment Deadline",
        duration: "Async submission",
        title: "Final Assignment Submission",
        target: "Students submit the Final MVP Demo Package for certificate review.",
        learningPoints: defaultSundayLearningPoints,
        practicalActivity: "Submit your Final MVP Demo Package.",
        instructorActions: [
          "Collect final demo packages",
          "Complete certificate eligibility checklist",
          "Select showcase candidates",
          "Prepare follow-up support recommendations",
        ],
        studentOutputs: [
          "MVP demo link or screenshots",
          "2-minute pitch script or video",
          "Landing page copy",
          "AI feature explanation",
          "Firebase/data structure",
          "30-day launch roadmap",
        ],
      },
    ],
    assignment: {
      title: "Submit your Final MVP Demo Package",
      deadline: "Sunday, August 23, 2026",
      instructions: "Submit your Final MVP Demo Package.",
      studentMustSubmit: [
        "MVP demo link or screenshots",
        "2-minute pitch script or video",
        "Landing page copy",
        "AI feature explanation",
        "Firebase/data structure",
        "30-day launch roadmap",
      ],
      instructorMustCollect: [
        "Final MVP Demo Package",
        "Certificate eligibility checklist",
        "Best student projects for showcase",
        "Follow-up support recommendations",
      ],
      completionCriteria: [
        "Student presents on Demo Day",
        "MVP problem is clear",
        "App structure is understandable",
        "AI feature is explained",
        "Launch plan is realistic",
        "Final submission is complete",
      ],
    },
  },
];

export const curriculumSummaryRows = weeklySchedules.map((week) => ({
  week: `Week ${week.week}`,
  focus: week.focus,
  deliverable: week.weeklyDeliverable,
}));

export const weeklyDeliverableStatuses = weeklySchedules.map((week, index) => ({
  week: `Week ${week.week}`,
  deliverable: week.weeklyDeliverable,
  status: index === 0 ? "In progress" : "Not started",
}));

export const certificateCompletionRequirements = [
  "MVP blueprint",
  "App screen plan",
  "Frontend draft",
  "Firebase/data plan",
  "AI feature plan",
  "Final demo package",
  "Demo Day presentation",
];

export const certificateAttendanceRules = [
  "Students must attend at least 12 of 18 live sessions.",
  "Students must submit at least 5 of 6 weekly assignments.",
  "Students must present on Demo Day to receive a certificate.",
  "Students who miss class must watch the replay, if available, and submit the assignment.",
  "Students must work on one MVP idea throughout the cohort unless the instructor approves a change.",
  "Students should spend at least 3-5 hours per week outside class.",
];

export const workloadCommitments = [
  "3 live sessions per week",
  "6 guided hours per week",
  "36 total live hours",
  "3-5 homework hours per week",
  "Final demo presentation required for certificate",
];

export const getWeeklySchedule = (week: number) =>
  weeklySchedules.find((schedule) => schedule.week === week);
