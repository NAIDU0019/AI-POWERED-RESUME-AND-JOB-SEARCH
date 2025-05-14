import { BrainCircuit, Briefcase, TrendingUp, ScrollText, FileText, Search } from "lucide-react"; // Assuming you're using Lucide for the others

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI-Powered Career Guidance",
    description:
      "Get personalized career advice and insights powered by advanced AI technology.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 mb-4 text-primary" />, // Using TrendingUp from Lucide
    title: "Industry Insights",
    description:
      "Stay ahead with real-time industry trends, salary data, and market analysis.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
  },
  {
    icon: <FileText className="w-10 h-10 mb-4 text-primary" />,
    title: "Intelligent Cover Letter Creation",
    description: "Craft compelling cover letters tailored to specific job applications with AI.",
  },
  {
    icon: <Search className="w-10 h-10 mb-4 text-primary" />,
    title: "Skill Gap Analysis",
    description: "Identify your skill gaps and get recommendations for professional development.",
  },
];