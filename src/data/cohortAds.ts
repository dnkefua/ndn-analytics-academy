export interface CohortAdVariant {
  test: string;
  variant: string;
  angle: string;
  headline: string;
  primaryText: string;
  cta: string;
}

export const cohortAds: CohortAdVariant[] = [
  {
    test: "A/B Test 1",
    variant: "Ad A",
    angle: "Outcome-Focused",
    headline: "Build Your MVP App in 6 Weeks",
    primaryText:
      "Build your first MVP app in 6 weeks using AI.\n\nNDN Analytics Academy is launching its first premium cohort for African founders, students, and business owners who want to turn an app idea into a working MVP.\n\nYou will learn how to plan your app, design screens, build core features, use Firebase, add AI features, and prepare your demo.\n\nOnly 10 seats are available. Early-bird seats start at $420 for the first 3 students.\n\nMessage us to apply.",
    cta: "Send Message",
  },
  {
    test: "A/B Test 1",
    variant: "Ad B",
    angle: "Mission-Focused",
    headline: "AI App Building for African Founders",
    primaryText:
      "Africa needs more builders, not just more ideas.\n\nNDN Analytics Academy is launching a 6-week AI MVP Builder cohort to help African founders, students, and business owners learn how to create real apps using AI.\n\nBring your idea. We will help you structure it, design it, build it, and present your MVP.\n\nOnly 10 people will join the first cohort. Early-bird seats start at $420.\n\nApply now.",
    cta: "Apply Now",
  },
  {
    test: "A/B Test 2",
    variant: "Ad A",
    angle: "Founder Pain",
    headline: "Stop Waiting. Build Your MVP.",
    primaryText:
      "You have an app idea, but you do not know where to start.\n\nThis 6-week cohort will help you turn your idea into a clear MVP plan, app screens, database structure, AI feature, and demo.\n\nYou do not need to be an expert developer to begin. You need a clear problem, the right tools, and guided mentorship.\n\nCohort 1 is limited to 10 students. Early-bird seats start at $420.\n\nMessage us to apply.",
    cta: "Send Message",
  },
  {
    test: "A/B Test 2",
    variant: "Ad B",
    angle: "Practical Skill",
    headline: "Learn to Build Apps with AI",
    primaryText:
      "Learn the practical skills behind modern app building.\n\nIn 6 weeks, NDN Analytics Academy will teach you how to use AI tools, Firebase, product design, and MVP strategy to create your first working app demo.\n\nThis premium cohort is for beginners, founders, students, and small business owners who want to build real digital products.\n\nOnly 10 seats available. Early-bird starts at $420.",
    cta: "Learn More",
  },
  {
    test: "A/B Test 3",
    variant: "Ad A",
    angle: "Scarcity",
    headline: "Only 10 Seats Available",
    primaryText:
      "Cohort 1 is now open.\n\nNDN Analytics Academy is accepting only 10 people for its first 6-week AI MVP Builder course.\n\nYou will learn how to take an app idea and build a working MVP using AI, Firebase, and practical product strategy.\n\nEarly-bird seats are $420 for the first 3 students.\n\nReserve your seat.",
    cta: "Reserve Your Seat",
  },
  {
    test: "A/B Test 3",
    variant: "Ad B",
    angle: "Transformation",
    headline: "From App Idea to MVP",
    primaryText:
      "In 6 weeks, your app idea can become a working MVP direction.\n\nThis first NDN Analytics Academy cohort is designed for African founders, students, and business owners who want guided support to build their first AI-powered app.\n\nYou will leave with a product plan, app screens, Firebase structure, AI feature, demo, and launch roadmap.\n\nApply for Cohort 1.",
    cta: "Apply Now",
  },
];
