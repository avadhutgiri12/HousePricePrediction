"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import AboutFeaturesCarousel from "./AboutFeaturesCarousel";
import { stats } from "@/data/features";
import "@/app/globals.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
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

        {/* Floating orb accents — uses global .animate-pulse-slow from globals.css */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#18794E]/10 blur-3xl animate-pulse-slow" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#18794E]/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          {/* Header - Minimal */}
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
              About HousePrice
            </motion.span>

            <motion.h2
              className="text-4xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] tracking-tighter mb-6"
              variants={itemVariants}
            >
              Where Data Meets
              <br />
              <span className="font-medium gradient-text-emerald">
                Property Intelligence
              </span>
            </motion.h2>

            <motion.p
              className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto"
              variants={itemVariants}
            >
              We strip away the noise. No guesswork. No bias. Just clean, machine-learned property valuations
              that help you move with certainty.
            </motion.p>
          </motion.div>

          {/* Stats - Minimal horizontal line */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 mb-20 lg:mb-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center flex flex-col items-center relative"
                variants={itemVariants}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 font-normal tracking-wide uppercase">
                  {stat.label}
                </div>
                {/* Vertical divider between stats on desktop — uses global .divider-subtle-vertical */}
                {index < stats.length - 1 && (
                  <motion.div
                    className="hidden md:block divider-subtle-vertical absolute right-[-50%] md:right-[-50%] top-1/2 -translate-y-1/2"
                    variants={itemVariants}
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  />
                )}
                {/* Horizontal divider between stats on mobile — uses global .divider-subtle */}
                {index < stats.length - 1 && (
                  <div className="md:hidden w-full divider-subtle mt-6" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Features - 3D Horizontal Carousel */}
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AboutFeaturesCarousel autoRotateInterval={2000} />
          </motion.div>

          {/* Mission - Minimal footer */}
          <motion.div
            className="mt-20 lg:mt-24 pt-12 lg:pt-16 border-t border-white/5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-2xl mx-auto text-center">
              <motion.p className="text-white/40 text-sm tracking-widest uppercase font-light mb-3" variants={itemVariants}>
                Our Principle
              </motion.p>
              <motion.h3 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-6 tracking-tight" variants={itemVariants}>
                Clarity over complexity.
                <br />
                <span className="font-medium text-white/70">Always.</span>
              </motion.h3>
              <motion.p className="text-white/30 text-base leading-relaxed max-w-lg mx-auto" variants={itemVariants}>
                Every feature, every data point, every prediction — designed to give you the confidence
                to decide without hesitation.
              </motion.p>
            </div>

            {/* CTA - Minimal — uses global .btn-ghost and .btn-outline */}
            <motion.div className="mt-12 flex items-center justify-center gap-3" variants={itemVariants} style={{ transitionDelay: '0.3s' }}>
              <motion.button
                className="btn-ghost group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore the Model
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-[#18794E] transition-colors" />
              </motion.button>
              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Methodology
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}