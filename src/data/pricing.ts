export interface PricingPlan {
  id: "early-bird" | "standard" | "premium";
  name: string;
  price: string;
  label: string;
  positioning: string;
  cta: string;
  recommended?: boolean;
  limitedNote?: string;
  includes: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: "$420",
    label: "First 3 students only",
    positioning: "Founding cohort discount",
    cta: "Claim Early Bird Seat",
    includes: [
      "Full 6-week live cohort",
      "Weekly lessons",
      "Weekly assignments",
      "Community support",
      "MVP planning templates",
      "Prompt library",
      "Firebase starter guidance",
      "Final demo review",
      "Certificate of completion",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "$650",
    label: "Recommended",
    positioning: "Main cohort price",
    cta: "Apply Now",
    recommended: true,
    includes: [
      "Everything in Early Bird",
      "Deeper project feedback",
      "MVP launch checklist",
      "Landing page copy review",
      "Demo presentation support",
      "Access to cohort replay/resources where available",
    ],
  },
  {
    id: "premium",
    name: "Premium Builder Support",
    price: "$1,200",
    label: "Extra support for serious founders",
    positioning: "Best for founders who want personalized MVP guidance",
    cta: "Apply for Premium Support",
    limitedNote: "Premium support is limited to 3 students.",
    includes: [
      "Everything in Standard",
      "One extra 1-on-1 MVP strategy session",
      "Personalized app idea review",
      "Personalized Firebase/data model feedback",
      "Personalized AI feature review",
      "Final pitch/demo review",
      "Priority support during the cohort",
    ],
  },
];

export const revenueTargets = {
  base: [
    "3 Early Bird seats x $420 = $1,260",
    "7 Standard seats x $650 = $4,550",
    "Projected Cohort 1 revenue = $5,810",
  ],
  upside: [
    "2 Premium seats x $1,200 = $2,400",
    "5 Standard seats x $650 = $3,250",
    "3 Early Bird seats x $420 = $1,260",
    "Upside revenue scenario = $6,910",
  ],
  note: "These are internal cohort planning estimates, not income guarantees.",
};

export const pricingOptionLabels = pricingPlans.map((plan) => `${plan.name} - ${plan.price}`);
