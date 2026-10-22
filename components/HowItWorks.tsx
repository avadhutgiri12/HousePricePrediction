"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import HowItWorksSlider from "./HowItWorksSlider";
import { ArrowRight } from "lucide-react";
import { howItWorksSteps, trustSignals } from "@/data/how-it-works";
import "@/app/globals.css";

const customEase: Transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: customEase }
};

export default function HowItWorks() {
  return (
    <>
      <section className="w-full min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#18794E]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#18794E]/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#18794E]/5 via-transparent to-transparent" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        {/* Floating orb accents */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#18794E]/10 blur-3xl animate-pulse-slow" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#18794E]/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          {/* Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="badge-minimal"
              variants={itemVariants}
            >
              <span className="pulse-dot" />
              How It Works
            </motion.span>

            <motion.h2
              className="text-4xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] tracking-tighter mb-6"
              variants={itemVariants}
            >
              From Data to
              <br />
              <span className="font-medium gradient-text-emerald">
                Valuation in Seconds
              </span>
            </motion.h2>

            <motion.p
              className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Our machine learning pipeline transforms raw property data into precise,
              actionable price estimates — no guesswork, no bias.
            </motion.p>
          </motion.div>

          {/* Process Steps - Horizontal Expandable Slider */}
          <HowItWorksSlider
            steps={howItWorksSteps}
            className="mt-10"
          />

          {/* Trust Signals */}
          <motion.div
            className="mt-20 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {trustSignals.map((signal, index) => (
              <motion.div
                key={signal.title}
                className="glass-card p-6 text-center transition-all duration-500 hover:border-white/20 hover:bg-white/10"
                variants={itemVariants}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#18794E]/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <signal.icon className="w-6 h-6 text-white/70 group-hover:text-[#18794E] transition-colors duration-300" aria-hidden="true" />
                </motion.div>
                <motion.h4 className="text-xl font-light text-white mb-2">
                  {signal.title}
                </motion.h4>
                <motion.p className="text-sm text-white/40 leading-relaxed">
                  {signal.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}