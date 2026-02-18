export interface IndustryRole {
  label: string;
  roles: string[];
}

export const industries: IndustryRole[] = [
  {
    label: "Technology",
    roles: [
      "Software Engineer",
      "Data Scientist",
      "Product Manager",
      "DevOps Engineer",
      "UX Designer",
      "QA Engineer",
      "CTO",
    ],
  },
  {
    label: "Healthcare",
    roles: [
      "Registered Nurse",
      "Physician Assistant",
      "Healthcare Administrator",
      "Clinical Research Coordinator",
      "Medical Lab Technician",
      "Health Informatics Specialist",
    ],
  },
  {
    label: "Finance",
    roles: [
      "Financial Analyst",
      "Investment Banker",
      "Risk Manager",
      "Accountant",
      "Financial Planner",
      "Compliance Officer",
    ],
  },
  {
    label: "Education",
    roles: [
      "Teacher",
      "Curriculum Designer",
      "School Administrator",
      "EdTech Specialist",
      "Academic Advisor",
      "Training Manager",
    ],
  },
  {
    label: "Manufacturing",
    roles: [
      "Production Manager",
      "Quality Assurance Engineer",
      "Supply Chain Manager",
      "Industrial Engineer",
      "Plant Manager",
      "Safety Coordinator",
    ],
  },
  {
    label: "Creative",
    roles: [
      "Art Director",
      "Content Strategist",
      "Graphic Designer",
      "Video Producer",
      "Brand Manager",
      "Creative Director",
    ],
  },
];

export const transferableSkills = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Project Management",
  "Data Analysis",
  "Critical Thinking",
  "Teamwork",
  "Adaptability",
  "Time Management",
  "Strategic Planning",
];

export interface UserProfile {
  currentRole: string;
  targetRole: string;
  industry: string;
  targetIndustry: string;
  yearsExperience: number;
  skills: string[];
}

// Platform-aware target skill profiles
const platformTargets: Record<string, Record<string, number>> = {
  corporate: {
    Leadership: 90,
    Communication: 88,
    "Problem Solving": 85,
    "Data Analysis": 82,
    "Project Mgmt": 88,
    "Strategic Planning": 92,
  },
  healthcare: {
    Leadership: 80,
    Communication: 92,
    "Problem Solving": 88,
    "Data Analysis": 78,
    "Project Mgmt": 75,
    "Strategic Planning": 70,
  },
  creative: {
    Leadership: 72,
    Communication: 90,
    "Problem Solving": 85,
    "Data Analysis": 65,
    "Project Mgmt": 78,
    "Strategic Planning": 74,
  },
  education: {
    Leadership: 78,
    Communication: 95,
    "Problem Solving": 82,
    "Data Analysis": 70,
    "Project Mgmt": 76,
    "Strategic Planning": 72,
  },
  manufacturing: {
    Leadership: 82,
    Communication: 80,
    "Problem Solving": 90,
    "Data Analysis": 75,
    "Project Mgmt": 88,
    "Strategic Planning": 80,
  },
};

export function generateSkillAnalysis(profile: UserProfile) {
  const platform = (profile as UserProfile & { platform?: string }).platform ?? "corporate";
  const targets = platformTargets[platform] ?? platformTargets.corporate;

  const baseSkills = [
    { skill: "Leadership", current: 60 },
    { skill: "Communication", current: 75 },
    { skill: "Problem Solving", current: 70 },
    { skill: "Data Analysis", current: 45 },
    { skill: "Project Mgmt", current: 55 },
    { skill: "Strategic Planning", current: 35 },
  ];

  // Boost current scores based on experience
  const expBoost = Math.min(profile.yearsExperience * 2, 20);
  return baseSkills.map((s) => ({
    ...s,
    current: Math.min(s.current + expBoost, 95),
    target: targets[s.skill] ?? 80,
  }));
}

export function generateGapRecommendations(profile: UserProfile) {
  const crossIndustry = profile.industry !== profile.targetIndustry;

  return [
    {
      skill: crossIndustry ? "Industry Knowledge" : "Domain Expertise",
      gap: crossIndustry ? 55 : 30,
      course: crossIndustry
        ? `${profile.targetIndustry} Fundamentals`
        : "Advanced Domain Mastery",
      url: "#",
      description: crossIndustry
        ? `Build foundational knowledge in ${profile.targetIndustry} to transition smoothly.`
        : "Deepen your expertise in your current industry for the next level.",
    },
    {
      skill: "Strategic Leadership",
      gap: 40,
      course: "Executive Leadership Program",
      url: "#",
      description:
        "Develop strategic thinking and people management skills for senior roles.",
    },
    {
      skill: "Data-Driven Decision Making",
      gap: 35,
      course: "Analytics for Professionals",
      url: "#",
      description:
        "Learn to leverage data insights for better business outcomes across any field.",
    },
  ];
}
