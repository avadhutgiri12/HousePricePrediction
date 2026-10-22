"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";

/**
 * Navbar — Sticky navigation for House Price Prediction.
 *
 * Features:
 *   • Full-width sticky header with contained content
 *   • Brand mark with emerald accent
 *   • Desktop: Horizontal nav with hover/focus states
 *   • Mobile: Slide-down drawer with Framer Motion
 *   • Respects prefers-reduced-motion
 *   • Keyboard accessible with visible focus states
 *   • Scroll-aware background opacity
 */

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict Price" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

const ctaLink = { href: "/predict", label: "Get Estimate" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const transitionDuration = prefersReducedMotion ? 0 : 0.3;

  if (!mounted) {
    return (
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="h-16" />
      </nav>
    );
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main navigation"
      role="navigation"
    >
      <div
        className={`relative h-16 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#E5E7E2]/60 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >

        <div className="relative flex h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between gap-4">
          {/* Left: Brand / Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 text-xl font-bold tracking-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 rounded-md px-2 py-1 -mx-2 -my-1 ${
              isScrolled
                ? "focus-visible:ring-offset-white"
                : "focus-visible:ring-offset-transparent"
            }`}
            aria-label="HomeWorth Home"
          >
            <Image
              src="/images/logo.png"
              alt="HomeWorth"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="hidden sm:inline flex items-baseline gap-0.5">
              <span style={{ color: "#000a1a" }}>Home</span>
              <span style={{ color: "#18794e" }}>Worth</span>
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 ${
                  isScrolled
                    ? "text-[#525252] hover:text-[#171717] hover:bg-[#18794E]/5 focus-visible:ring-offset-white"
                    : "text-white/90 hover:text-white hover:bg-white/10 focus-visible:ring-offset-transparent"
                }`}
                aria-current={link.href === "/" ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <Link
              href={ctaLink.href}
              className="hidden lg:flex items-center justify-center gap-2 px-5 py-2.5 bg-[#18794E] text-white rounded-xl font-medium text-sm transition-all duration-200 hover:bg-[#156a44] hover:shadow-[0_4px_16px_rgba(24,121,78,0.3)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {ctaLink.label}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 ${
                isScrolled
                  ? "text-[#525252] hover:text-[#171717] hover:bg-[#18794E]/10 focus-visible:ring-offset-white"
                  : "text-white hover:text-white hover:bg-white/10 focus-visible:ring-offset-transparent"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden absolute top-full left-0 right-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: transitionDuration, ease: "easeOut" }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="bg-white/98 backdrop-blur-xl border-b border-[#E5E7E2]/60 shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-4 pb-4">
                <div className="py-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all ${
                        link.href === "/"
                          ? "bg-[#18794E]/10 text-[#18794E]"
                          : "text-[#525252] hover:text-[#171717] hover:bg-[#F7F7F2]"
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                      aria-current={link.href === "/" ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E5E7E2]/50">
                  <Link
                    href={ctaLink.href}
                    onClick={closeMenu}
                    className="block w-full text-center px-4 py-3 bg-[#18794E] text-white rounded-xl font-medium text-base transition-all hover:bg-[#156a44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {ctaLink.label}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: transitionDuration }}
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Reduced motion style override */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors,
          .transition-opacity,
          .transition-height {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </nav>
  );
}