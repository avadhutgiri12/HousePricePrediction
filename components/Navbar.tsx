"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Users, Mail, Briefcase, Target } from "lucide-react";

const leftLinks = [
  { href: "/contact", label: "Contact", Icon: Mail },
  { href: "/about", label: "About", Icon: Home },
  { href: "/customers", label: "Customers", Icon: Users },
];

const rightLinks = [
  { href: "/predict", label: "Predict", Icon: Target, primary: true },
  { href: "/portfolio", label: "Portfolio", Icon: Briefcase, primary: false },
];

const NavLink = ({ href, label, Icon, primary = false }: { href: string; label: string; Icon: React.ComponentType<{ className?: string }>; primary?: boolean }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E]/50 ${
      primary
        ? "bg-[#18794E] text-white hover:bg-[#156a44] active:scale-[0.97] shadow-[0_4px_16px_rgba(24,121,78,0.3)]"
        : "text-[#171717]/70 hover:text-[#171717] hover:bg-[#18794E]/10"
    }`}
  >
    <Icon className="w-4 h-4" aria-hidden="true" />
    {label}
  </Link>
);

const MobileNavLink = ({ href, label, Icon, primary = false, onClick }: { href: string; label: string; Icon: React.ComponentType<{ className?: string }>; primary?: boolean; onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all text-center ${
      primary
        ? "bg-[#18794E] text-white hover:bg-[#156a44]"
        : "text-[#171717]/70 hover:text-[#18794E] hover:bg-[#18794E]/10"
    }`}
  >
    <Icon className="w-5 h-5" aria-hidden="true" />
    {label}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4" aria-label="Main navigation">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E5E7E2]/50 shadow-[0_4px_24px_rgba(0,0,0,0.08)]" />
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4" aria-label="Main navigation">
      <div
        className={`relative rounded-3xl bg-white/70 backdrop-blur-xl border transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-white/80 border-[#E5E7E2]/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            : "border-[#E5E7E2]/40 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
        }`}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#18794E]/5 via-transparent to-[#18794E]/5 opacity-0 transition-opacity duration-500" aria-hidden="true" />

        <div className="relative flex h-14 items-center justify-between px-5 gap-4">
          {/* Left side - Mobile: Logo | Desktop: Left links */}
          <div className="flex items-center gap-2">
            {/* Mobile logo - only on mobile */}
            <Link
              href="/"
              className="lg:hidden flex items-center gap-2 text-lg font-bold tracking-tight text-[#171717]"
              aria-label="HousePrice Home"
            >
              <span className="relative">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18794E] block" />
                <span className="absolute -inset-0.5 rounded-full bg-[#18794E]/20 animate-pulse" aria-hidden="true" />
              </span>
              HousePrice
            </Link>

            {/* Desktop left links - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-1">
              {leftLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>
          </div>

          {/* Center - Logo (desktop only) */}
          <Link
            href="/"
            className="hidden lg:flex items-center gap-2 text-lg font-bold tracking-tight text-[#171717] shrink-0 mx-4"
            aria-label="HousePrice Home"
          >
            <span className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18794E] block" />
              <span className="absolute -inset-0.5 rounded-full bg-[#18794E]/20 animate-pulse" aria-hidden="true" />
            </span>
            HousePrice
          </Link>

          {/* Right side - Desktop: Right links | Mobile: Hamburger menu */}
          <div className="flex items-center gap-2">
            {/* Desktop right links - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2">
              {rightLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>

            {/* Mobile menu button - only on mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-[#171717]/70 hover:text-[#171717] hover:bg-[#18794E]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E]/50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu with Framer Motion animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-[#E5E7E2]/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="px-5 py-4 space-y-2">
                {leftLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    {...link}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
                <motion.div
                  className="pt-2 border-t border-[#E5E7E2]/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                />
                {rightLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    {...link}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Style for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.3); }
        }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse { animation: none; }
        }
      `}</style>
    </nav>
  );
}