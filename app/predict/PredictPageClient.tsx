"use client";

import { motion } from "framer-motion";
import PredictionForm from "@/components/PredictionForm";

export default function PredictPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] lg:min-h-[70vh] relative flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0A0A0A] via-[#171917] to-[#0A0A0A]" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#18794E]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#18794E]/5 blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#18794E] animate-pulse" aria-hidden="true" />
              AI-POWERED VALUATION
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.12] tracking-tight mb-6 max-w-3xl mx-auto">
              <span className="block">Predict Your</span>
              <span className="block text-[#18794E]">Property Value</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-[#D1D5D0] leading-relaxed mb-10 max-w-2xl mx-auto">
              Enter your property details and receive an intelligent price estimate in seconds.
              Powered by a Random Forest model trained on California housing data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-12 lg:py-20 min-h-[40vh] relative" style={{
        background: 'linear-gradient(270deg, hsla(205, 46%, 10%, 1) 0%, hsla(191, 28%, 23%, 1) 90%, hsla(207, 41%, 27%, 1) 100%)'
      }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <PredictionForm />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-16 lg:py-24 bg-[#171917]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#18794E]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#18794E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Data-Driven</h3>
              <p className="text-[#D1D5D0]">
                Trained on 20,000+ California housing records from the 1990 census dataset.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#18794E]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#18794E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Results</h3>
              <p className="text-[#D1D5D0]">
                Get your estimate in seconds with confidence intervals and model reliability scores.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#18794E]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#18794E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Free to Use</h3>
              <p className="text-[#D1D5D0]">
                No registration required. Get unlimited predictions for your property research.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}