import { Brain, Target, Zap, Shield, BarChart3, Users } from "lucide-react";

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Brain,
    title: "ML-Powered Estimates",
    description: "Advanced machine learning models trained on real property data to deliver accurate price predictions.",
  },
  {
    icon: Target,
    title: "Precise Valuations",
    description: "Our algorithms consider location, size, amenities, market trends, and comparable sales for precision.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get property price estimates in seconds — no waiting, no appointments, just data-driven insights.",
  },
  {
    icon: Shield,
    title: "Transparent Methodology",
    description: "Understand how your estimate was calculated with clear breakdowns of contributing factors.",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Access neighborhood trends, price history, and market analytics to make informed decisions.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description: "Whether you're buying, selling, or investing — our tool adapts to your property journey.",
  },
];

export const stats = [
  { value: "10K+", label: "Properties Analyzed" },
  { value: "94%", label: "Accuracy Rate" },
  { value: "50+", label: "Data Points" },
  { value: "24/7", label: "Availability" },
];