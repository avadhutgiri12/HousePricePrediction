"use client";

import Link from "next/link";
import FaintGrid from "@/components/ui/FaintGrid";

/**
 * Footer — Light theme footer for HomeWorth.
 *
 * Features:
 *   • Brand mark with emerald accent
 *   • Navigation links organized by category
 *   • Social/contact links
 *   • Copyright notice
 *   • Responsive: stacks on mobile, horizontal on desktop
 *   • Accessible: semantic HTML, proper heading hierarchy, focus states
 */

const footerLinks = {
  product: [
    { href: "/predict", label: "Predict Price" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
    { href: "#", label: "Blog" },
  ],
  support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
  legal: [
    { href: "#", label: "Cookie Policy" },
    { href: "#", label: "Data Processing" },
  ],
};

const socialLinks = [
  { href: "#", label: "Twitter", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.69L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
  { href: "#", label: "LinkedIn", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
  { href: "#", label: "GitHub", icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )},
];

export default function Footer() {
  const currentYear = 2025;

  return (
    <footer className="w-full relative overflow-hidden border-t border-[#E5E7E2]" style={{
      background: "radial-gradient(circle, hsla(34, 33%, 61%, 1) 0%, hsla(0, 0%, 89%, 1) 100%)"
    }}>
      {/* Faint grid overlay */}
      <FaintGrid color="#171717" size={50} thickness={0.5} opacity={0.04} className="pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        {/* Top section: Brand + link columns */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 mb-12 lg:mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight" aria-label="HomeWorth Home">
              <span className="relative flex items-center justify-center">
                <span className="w-8 h-8 rounded-xl bg-[#18794E] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path
                      d="M16 2L4 12V26H28V12L16 2ZM16 6L10 14V24H22V14L16 6Z"
                      fill="currentColor"
                      opacity={0.2}
                    />
                    <path d="M16 6L10 14V24H22V14L16 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute -inset-1 rounded-xl bg-[#18794E]/10" aria-hidden="true" />
              </span>
              <span className="flex items-baseline gap-0.5">
                <span style={{ color: "#000a1a" }}>Home</span>
                <span style={{ color: "#18794e" }}>Worth</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-[#737873] leading-relaxed max-w-xs">
              Data-driven property valuations powered by machine learning. Make confident real estate decisions with accurate, unbiased price estimates.
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-[#737873] hover:text-[#18794E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 rounded-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product column */}
          <nav aria-label="Product">
            <h3 className="text-sm font-semibold text-[#171717] uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#525252] hover:text-[#18794E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company column */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-[#171717] uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#525252] hover:text-[#18794E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support column */}
          <nav aria-label="Support">
            <h3 className="text-sm font-semibold text-[#171717] uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#525252] hover:text-[#18794E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom section: Legal links + copyright */}
        <div className="pt-8 border-t border-[#E5E7E2]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Legal links */}
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-4 lg:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#737873] hover:text-[#18794E] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18794E] focus-visible:ring-offset-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-sm text-[#737873]">
              © {currentYear} HomeWorth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}