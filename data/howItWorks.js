import { BrainCircuit, Briefcase, TrendingUp, ScrollText,FileEdit, Search, UserPlus, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Share your industry and expertise for personalized guidance",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craft Your Documents",
    description: "Create ATS-optimized resumes and compelling cover letters",
    icon: <FileEdit className="w-8 h-8 text-primary" />, // Assuming you might want this import
  },
  {
    title: "Prepare for Interviews",
    description:
      "Practice with AI-powered mock interviews tailored to your role",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Receive AI Coaching",
    description: "Get personalized career guidance and recommendations from your AI coach.",
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Analyze Skill Gaps",
    description: "Identify areas for improvement with detailed skill gap analysis.",
    icon: <Search className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description: "Monitor improvements with detailed performance analytics",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
