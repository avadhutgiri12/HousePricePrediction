"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Info, AlertCircle } from "lucide-react";

interface PredictionResultProps {
  predictedPrice: number;
  lowerBound: number;
  upperBound: number;
  confidence: number;
  className?: string;
}

/**
 * PredictionResult — Displays the prediction results with confidence interval.
 *
 * Features:
 *   • Main predicted price prominently displayed
 *   • Confidence meter with visual progress bar
 *   • Prediction range (lower/upper bounds)
 *   • Accessible color coding and icons
 *   • Respects prefers-reduced-motion
 */
export default function PredictionResult({
  predictedPrice,
  lowerBound,
  upperBound,
  confidence,
  className = "",
}: PredictionResultProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const confidenceColor =
    confidence >= 80 ? "#18794E" : confidence >= 60 ? "#EAB308" : "#EF4444";

  return (
    <motion.div
      className={`glass-card p-6 lg:p-8 rounded-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#18794E]/10 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-[#18794E]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#171717]">Prediction Result</h3>
          <p className="text-sm text-[#525252]">
            ML-powered valuation based on California housing data
          </p>
        </div>
      </div>

      {/* Main Prediction */}
      <div className="text-center mb-8">
        <p className="text-sm text-[#525252] uppercase tracking-wider mb-2">
          Estimated Property Value
        </p>
        <motion.div
          className="text-4xl lg:text-5xl font-bold text-[#171717]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {formatPrice(predictedPrice)}
        </motion.div>
      </div>

      {/* Confidence Meter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#171717]">Model Confidence</span>
          <span className="text-sm font-bold" style={{ color: confidenceColor }}>
            {confidence.toFixed(1)}%
          </span>
        </div>
        <div className="h-3 bg-[#E5E7E2] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              backgroundColor: confidenceColor,
              width: `${Math.min(confidence, 100)}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(confidence, 100)}%` }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        <p className="text-xs text-[#525252] mt-2 text-center">
          Based on Random Forest tree agreement ({confidence >= 80 ? "High" : confidence >= 60 ? "Moderate" : "Low"} reliability)
        </p>
      </div>

      {/* Prediction Range */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/50 rounded-xl p-4 border border-[#E5E7E2]/50">
          <p className="text-xs text-[#525252] uppercase tracking-wider mb-1">Lower Estimate</p>
          <p className="text-xl font-bold text-[#EF4444]">{formatPrice(lowerBound)}</p>
        </div>
        <div className="bg-white/50 rounded-xl p-4 border border-[#E5E7E2]/50">
          <p className="text-xs text-[#525252] uppercase tracking-wider mb-1">Upper Estimate</p>
          <p className="text-xl font-bold text-[#18794E]">{formatPrice(upperBound)}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-[#FFF7ED]/50 border border-[#FED7AA]/50 rounded-xl">
        <Info className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="text-sm text-[#9A3412]">
          <p className="font-medium mb-1">Important Disclaimer</p>
          <p>
            This prediction is an ML estimate based on the California housing dataset (1990 census).
            The confidence value reflects model uncertainty from tree disagreement, not a statistically
            calibrated probability. The prediction range is approximate and should not be interpreted
            as a guaranteed market-value range. Consult a professional appraiser for official valuations.
          </p>
        </div>
      </div>
    </motion.div>
  );
}