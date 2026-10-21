"use client";

import Link from "next/link";
import { motion, type Variants, type Transition } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import HeroHouseImage from "./HeroHouseImage";

/**
 * Hero — premium real-estate landing hero for the House Price Prediction site.
 *
 * A client component that renders:
 *   • Full-screen background image covering the entire section
 *   • Headline, description, two CTA buttons, and a trust line (left column, overlay on image)
 *   • Floating illustrative property-value card (bottom center on desktop)
 *
 * Motion via Framer Motion, respects `prefers-reduced-motion`.
 * CSS animations defined in globals.css.
 */

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemTransition: Transition = {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as const, // custom ease-out
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: itemTransition,
    },
  };

  return (
    <>
      <section className="w-full min-h-screen relative overflow-hidden flex items-center">
        {/* Full-screen background image */}
        <div className="absolute inset-0 z-0">
          <HeroHouseImage className="w-full h-full" />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-linear-to-r from-[#171917]/80 via-[#171917]/60 to-transparent" />

        {/* Decorative soft emerald glow (left side) */}
        <div
          className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 w-150 h-150 rounded-full bg-[#18794E]/15 blur-[120px] pointer-events-none z-20"
        />

        {/* Content - left aligned */}
        <motion.div
          className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="max-w-2xl" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide uppercase mb-8 lg:mb-10 backdrop-blur-sm border border-white/20"
              variants={itemVariants}
              style={{ transitionDelay: "0s" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#18794E]" aria-hidden="true" />
              AI-POWERED VALUATION
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl font-light lg:text-5xl xl:text-6xl font-bold text-white leading-[1.12] tracking-tight mb-6 lg:mb-8 max-w-3xl"
              variants={itemVariants}
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="block ">Instant Property</span>
              <span className="block text-[#18794E]">Price Estimates</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-[#D1D5D0] leading-relaxed mb-8 lg:mb-10 max-w-lg"
              variants={itemVariants}
              style={{ transitionDelay: "0.2s" }}
            >
              Enter property details. Get an ML-driven price estimate in seconds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10 lg:mb-12"
              variants={itemVariants}
              style={{ transitionDelay: "0.3s" }}
            >
              <Link
                href="/predict"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#18794E] text-white rounded-full font-medium text-base transition-all hover:bg-[#156a44] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917]"
                aria-label="Get price estimate"
              >
                Get My Estimate
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/how-it-works"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white border border-white/20 rounded-full font-medium text-base transition-all hover:bg-white/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917] backdrop-blur-sm"
              >
                How It Works
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#D1D5D0]/80 tracking-widest uppercase font-medium"
              variants={itemVariants}
              style={{ transitionDelay: "0.4s" }}
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#18794E]/80" aria-hidden="true" />
                Machine learning
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#18794E]/80" aria-hidden="true" />
                Data-driven
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#18794E]/80" aria-hidden="true" />
                Free to use
              </span>
            </motion.p>
          </motion.div>

          {/* Floating property value card - bottom right on desktop */}
          <div
            className="hidden lg:block absolute bottom-14 right-18 w-full max-w-xs animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/20 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#18794E]"></div>
                <span className="text-xs font-semibold text-[#18794E] tracking-wide uppercase">
                  Property Value
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                ₹75,00,000
              </div>
              <p className="text-sm text-[#D1D5D0] leading-tight">
                Estimated property price
              </p>
              <p className="text-[10px] text-[#D1D5D0]/70 mt-2 uppercase tracking-wider opacity-70">
                Illustrative example
              </p>
            </div>
          </div>

          {/* Mobile: card in normal flow below content */}
          <motion.div className="lg:hidden mt-10" variants={itemVariants} style={{ transitionDelay: "0.5s" }}>
            <div className="bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/20 shadow-2xl shadow-black/20 max-w-xs mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#18794E]"></div>
                <span className="text-xs font-semibold text-[#18794E] tracking-wide uppercase">
                  Property Value
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                ₹75,00,000
              </div>
              <p className="text-sm text-[#D1D5D0] leading-tight">
                Estimated property price
              </p>
              <p className="text-[10px] text-[#D1D5D0]/70 mt-2 uppercase tracking-wider opacity-70">
                Illustrative example
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}