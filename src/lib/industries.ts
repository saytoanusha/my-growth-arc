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

export function generateSkillAnalysis(profile: UserProfile) {
  // Simulated AI analysis based on role transition
  const baseSkills = [
    { skill: "Leadership", current: 60, target: 85 },
    { skill: "Communication", current: 75, target: 90 },
    { skill: "Problem Solving", current: 70, target: 88 },
    { skill: "Data Analysis", current: 45, target: 80 },
    { skill: "Project Mgmt", current: 55, target: 85 },
    { skill: "Strategic Planning", current: 35, target: 82 },
  ];

  // Adjust based on experience
  const expBoost = Math.min(profile.yearsExperience * 2, 20);
  return baseSkills.map((s) => ({
    ...s,
    current: Math.min(s.current + expBoost, 95),
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
