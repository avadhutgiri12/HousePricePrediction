import {
  Home,
  Database,
  Brain,
  BarChart3,
  FileText,
  Sparkles,
  Target,
  Zap,
  Shield
} from "lucide-react";

export interface HowItWorksStep {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string[];
}

export interface TrustSignal {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    icon: Home,
    title: "Enter Property Details",
    description: "Provide basic property information including location, size, number of bedrooms, bathrooms, property type, and key amenities.",
    details: [
      "Address & neighborhood",
      "Square footage & lot size",
      "Bedrooms & bathrooms",
      "Property type & age",
      "Key features & upgrades"
    ]
  },
  {
    number: "02",
    icon: Database,
    title: "Data Collection & Validation",
    description: "Our system pulls real-time data from multiple verified sources to build a comprehensive property profile.",
    details: [
      "Public records & tax assessments",
      "MLS & recent comparable sales",
      "Neighborhood demographics",
      "School ratings & walkability",
      "Market trends & inventory"
    ]
  },
  {
    number: "03",
    icon: Brain,
    title: "ML Model Processing",
    description: "Advanced machine learning algorithms analyze hundreds of variables to generate an accurate price prediction.",
    details: [
      "Gradient boosting regression",
      "Feature engineering & selection",
      "Hyperparameter optimization",
      "Cross-validation scoring",
      "Confidence interval calculation"
    ]
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Market Analysis",
    description: "The prediction is contextualized with local market intelligence for a complete picture.",
    details: [
      "Price trends (30/90/365 days)",
      "Supply & demand indicators",
      "Days on market analysis",
      "Seasonal adjustments",
      "Investment potential scoring"
    ]
  },
  {
    number: "05",
    icon: FileText,
    title: "Detailed Report Generation",
    description: "Receive a comprehensive valuation report with breakdowns, confidence scores, and actionable insights.",
    details: [
      "Estimated value range",
      "Key value drivers identified",
      "Comparable property table",
      "Risk factors & assumptions",
      "Exportable PDF report"
    ]
  }
];

export const trustSignals: TrustSignal[] = [
  {
    icon: Target,
    title: "94% Accuracy",
    description: "Validated against actual sales across 50+ markets"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your estimate in under 30 seconds"
  },
  {
    icon: Shield,
    title: "Transparent Methodology",
    description: "See exactly how your estimate was calculated"
  },
  {
    icon: Sparkles,
    title: "Free to Use",
    description: "No hidden fees, no account required"
  }
];