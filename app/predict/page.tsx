import { Metadata } from "next";
import PredictPageClient from "./PredictPageClient";

export const metadata: Metadata = {
  title: "Predict Price | HousePrice",
  description: "Get an AI-powered property price estimate using machine learning. Enter property details for a data-driven valuation.",
};

export default function PredictPage() {
  return <PredictPageClient />;
}