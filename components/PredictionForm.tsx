"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import PredictionResult from "./PredictionResult";

interface NumericRange {
  min: number;
  max: number;
  median: number;
}

interface Metadata {
  numeric_ranges: Record<string, NumericRange>;
  ocean_proximity_categories: string[];
}

interface PropertyFeatures {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: string;
}

interface FormErrors {
  [key: string]: string;
}

interface PredictionResponse {
  predicted_price: number;
  lower_bound: number;
  upper_bound: number;
  confidence: number;
}

const FIELD_CONFIG = [
  {
    name: "longitude",
    label: "Longitude",
    type: "number" as const,
    step: 0.0001,
    format: "%.4f",
    placeholder: "-122.23",
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "number" as const,
    step: 0.0001,
    format: "%.4f",
    placeholder: "37.88",
  },
  {
    name: "housing_median_age",
    label: "Housing Median Age",
    type: "number" as const,
    step: 1,
    placeholder: "41",
  },
  {
    name: "total_rooms",
    label: "Total Rooms",
    type: "number" as const,
    step: 1,
    placeholder: "880",
  },
  {
    name: "total_bedrooms",
    label: "Total Bedrooms",
    type: "number" as const,
    step: 1,
    placeholder: "129",
  },
  {
    name: "population",
    label: "Population",
    type: "number" as const,
    step: 1,
    placeholder: "322",
  },
  {
    name: "households",
    label: "Households",
    type: "number" as const,
    step: 1,
    placeholder: "126",
  },
  {
    name: "median_income",
    label: "Median Income (×$10k)",
    type: "number" as const,
    step: 0.0001,
    format: "%.4f",
    placeholder: "8.3252",
  },
] as const;

const FIELD_LABELS: Record<string, string> = {
  longitude: "Longitude",
  latitude: "Latitude",
  housing_median_age: "Housing Median Age",
  total_rooms: "Total Rooms",
  total_bedrooms: "Total Bedrooms",
  population: "Population",
  households: "Households",
  median_income: "Median Income",
  ocean_proximity: "Ocean Proximity",
};

export default function PredictionForm() {
  const prefersReducedMotion = useReducedMotion();
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [formData, setFormData] = useState<PropertyFeatures>({
    longitude: -118.49,
    latitude: 34.26,
    housing_median_age: 29,
    total_rooms: 2127,
    total_bedrooms: 435,
    population: 1166,
    households: 409,
    median_income: 3.5348,
    ocean_proximity: "<1H OCEAN",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Fetch metadata on mount
  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch("/api/metadata");
        if (response.ok) {
          const data = await response.json();
          setMetadata(data);

          // Initialize form with median values from metadata
          if (data.numeric_ranges) {
            const initialData: PropertyFeatures = {
              longitude: data.numeric_ranges.longitude?.median ?? -118.49,
              latitude: data.numeric_ranges.latitude?.median ?? 34.26,
              housing_median_age: data.numeric_ranges.housing_median_age?.median ?? 29,
              total_rooms: data.numeric_ranges.total_rooms?.median ?? 2127,
              total_bedrooms: data.numeric_ranges.total_bedrooms?.median ?? 435,
              population: data.numeric_ranges.population?.median ?? 1166,
              households: data.numeric_ranges.households?.median ?? 409,
              median_income: data.numeric_ranges.median_income?.median ?? 3.5348,
              ocean_proximity: data.ocean_proximity_categories[0] ?? "<1H OCEAN",
            };
            setFormData(initialData);
          }
        }
      } catch (err) {
        console.error("Failed to fetch metadata:", err);
      }
    }
    fetchMetadata();
  }, []);

  // Validate a single field
  const validateField = (name: string, value: string | number): string => {
    if (!metadata) return "";

    if (name === "ocean_proximity") {
      if (!value) return "Ocean proximity is required";
      if (!metadata.ocean_proximity_categories.includes(value as string)) {
        return "Invalid ocean proximity value";
      }
      return "";
    }

    const range = metadata.numeric_ranges[name];
    if (!range) return "";

    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return `${FIELD_LABELS[name]} must be a number`;
    if (numValue < range.min) return `${FIELD_LABELS[name]} must be at least ${range.min}`;
    if (numValue > range.max) return `${FIELD_LABELS[name]} must be at most ${range.max}`;

    return "";
  };

  // Validate all fields
  const validateForm = (data: PropertyFeatures): FormErrors => {
    const newErrors: FormErrors = {};

    FIELD_CONFIG.forEach((field) => {
      const error = validateField(field.name, data[field.name as keyof PropertyFeatures]);
      if (error) newErrors[field.name] = error;
    });

    const oceanError = validateField("ocean_proximity", data.ocean_proximity);
    if (oceanError) newErrors.ocean_proximity = oceanError;

    return newErrors;
  };

  // Handle input change
  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Prediction failed");
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData((prev) => ({
      ...prev,
      longitude: metadata?.numeric_ranges.longitude?.median ?? -118.49,
      latitude: metadata?.numeric_ranges.latitude?.median ?? 34.26,
      housing_median_age: metadata?.numeric_ranges.housing_median_age?.median ?? 29,
      total_rooms: metadata?.numeric_ranges.total_rooms?.median ?? 2127,
      total_bedrooms: metadata?.numeric_ranges.total_bedrooms?.median ?? 435,
      population: metadata?.numeric_ranges.population?.median ?? 1166,
      households: metadata?.numeric_ranges.households?.median ?? 409,
      median_income: metadata?.numeric_ranges.median_income?.median ?? 3.5348,
      ocean_proximity: metadata?.ocean_proximity_categories[0] ?? "<1H OCEAN",
    }));
    setErrors({});
    setResult(null);
    setError(null);
    setSubmitAttempted(false);
  };

  const transitionDuration = prefersReducedMotion ? 0 : 0.4;

  if (!metadata) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center animate-fade-up">
        <Loader2 className="w-8 h-8 text-[#18794E] mx-auto animate-spin mb-4" aria-hidden="true" />
        <p className="text-[#525252]">Loading form configuration...</p>
      </div>
    );
  }

  return (
    <motion.form
      className="glass-card p-6 lg:p-8 rounded-2xl"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: transitionDuration, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Form Header */}
      <div className="mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide uppercase backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: transitionDuration }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#18794E] animate-pulse" aria-hidden="true" />
          Property Details
        </motion.div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mt-3 mb-2">
          Enter Property Information
        </h2>
        <p className="text-[#D1D5D0]">
          Fill in the property details below to get an AI-powered price estimate.
          All fields are required.
        </p>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="flex items-start gap-3 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: transitionDuration }}
            role="alert"
          >
            <AlertCircle className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-[#991B1B]">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
        {FIELD_CONFIG.map((field, index) => {
          const range = metadata.numeric_ranges[field.name];
          const hasError = submitAttempted && errors[field.name];

          return (
            <motion.div
              key={field.name}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: transitionDuration }}
            >
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-white mb-2"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof PropertyFeatures]}
                onChange={(e) =>
                  handleChange(
                    field.name,
                    field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value
                  )
                }
                min={range?.min}
                max={range?.max}
                step={field.step}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 text-white placeholder:text-[#737873] focus:outline-none focus:ring-2 focus:ring-[#18794E] focus:ring-offset-2 bg-white/5 ${
                  hasError
                    ? "border-[#EF4444] bg-[#7F1D1D]/30 focus:border-[#EF4444] focus:ring-[#EF4444]"
                    : "border-white/20 hover:border-[#18794E]/50"
                }`}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${field.name}-error` : undefined}
                disabled={isLoading}
              />
              {hasError && (
                <motion.p
                  id={`${field.name}-error`}
                  className="mt-1.5 text-sm text-[#EF4444] flex items-center gap-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errors[field.name]}
                </motion.p>
              )}
              {range && (
                <p className="mt-1 text-xs text-[#737873]">
                  Range: {range.min.toLocaleString()} – {range.max.toLocaleString()}
                </p>
              )}
            </motion.div>
          );
        })}

        {/* Ocean Proximity Select */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + FIELD_CONFIG.length * 0.05, duration: transitionDuration }}
        >
          <label
            htmlFor="ocean_proximity"
            className="block text-sm font-medium text-white mb-2"
          >
            Ocean Proximity
          </label>
          <select
            id="ocean_proximity"
            name="ocean_proximity"
            value={formData.ocean_proximity}
            onChange={(e) => handleChange("ocean_proximity", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 text-white bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#18794E] focus:ring-offset-2 appearance-none bg-no-repeat bg-right pr-10 ${
              submitAttempted && errors.ocean_proximity
                ? "border-[#EF4444] bg-[#7F1D1D]/30 focus:border-[#EF4444] focus:ring-[#EF4444]"
                : "border-white/20 hover:border-[#18794E]/50"
            }`}
            aria-invalid={submitAttempted && !!errors.ocean_proximity}
            aria-describedby={submitAttempted && errors.ocean_proximity ? "ocean_proximity-error" : undefined}
            disabled={isLoading}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem",
            }}
          >
            {metadata.ocean_proximity_categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {submitAttempted && errors.ocean_proximity && (
            <motion.p
              id="ocean_proximity-error"
              className="mt-1.5 text-sm text-[#EF4444] flex items-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
              {errors.ocean_proximity}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#18794E] text-white rounded-xl font-medium text-base transition-all duration-200 hover:bg-[#156A44] hover:shadow-[0_4px_16px_rgba(24,121,78,0.3)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              Predicting...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              Get Estimate
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 text-[#171717] border border-[#E5E7E2] rounded-xl font-medium text-base transition-all duration-200 hover:bg-white/10 hover:border-[#18794E]/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset Form
        </button>
      </div>

      {/* Result Display */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: transitionDuration }}
            className="mt-8"
          >
            <PredictionResult
              predictedPrice={result.predicted_price}
              lowerBound={result.lower_bound}
              upperBound={result.upper_bound}
              confidence={result.confidence}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}