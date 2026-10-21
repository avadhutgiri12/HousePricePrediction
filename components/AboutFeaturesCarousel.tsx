"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { features } from "@/data/features";

interface AboutFeaturesCarouselProps {
  autoRotateInterval?: number;
  className?: string;
}

export default function AboutFeaturesCarousel({
  autoRotateInterval = 2000,
  className = "",
}: AboutFeaturesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featureCount = features.length;

  // Auto-rotation effect (continues even on hover)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureCount);
    }, autoRotateInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRotateInterval, featureCount]);

  // Navigation handlers
  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + featureCount) % featureCount);
  }, [featureCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % featureCount);
  }, [featureCount]);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  // Compute relative position for each feature (0 = active, ±1 = side, ±2 = far, etc.)
  const getRelativePosition = useCallback(
    (index: number) => {
      let diff = index - activeIndex;

      // Handle wrap-around for shortest path
      if (diff > featureCount / 2) diff -= featureCount;
      if (diff < -featureCount / 2) diff += featureCount;

      return diff;
    },
    [activeIndex, featureCount]
  );

  // Get position class for styling
  const getPositionClass = (relativePos: number) => {
    switch (relativePos) {
      case 0:
        return "carousel-card--active";
      case 1:
      case -1:
        return "carousel-card--side-1";
      case 2:
      case -2:
        return "carousel-card--side-2";
      default:
        return "carousel-card--hidden";
    }
  };

  return (
    <div
      className={`carousel-container relative w-full max-w-6xl mx-auto ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Features carousel"
    >
      {/* Carousel Track */}
      <div
        className="carousel-track flex items-center justify-center min-h-100 px-8"
        role="list"
        aria-live="polite"
        aria-atomic="true"
      >
        {features.map((feature, index) => {
          const relativePos = getRelativePosition(index);
          const positionClass = getPositionClass(relativePos);
          const isActive = relativePos === 0;
          const isRightSide = relativePos > 0;

          // Z-index management for proper layering
          const zIndex = relativePos === 0 ? 10 : relativePos === 1 || relativePos === -1 ? 5 : relativePos === 2 || relativePos === -2 ? 2 : 0;

          return (
            <motion.article
              key={feature.title}
              className={`carousel-card glass-card relative w-full max-w-lg ${positionClass} ${isRightSide && !isActive ? 'carousel-card--right' : ''}`}
              style={{ zIndex }}
              role="listitem"
              aria-roledescription="slide"
              aria-label={`${feature.title} — feature ${index + 1} of ${featureCount}`}
              title={feature.title}
              aria-current={isActive ? "true" : "false"}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !isActive && goToIndex(index)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isActive) {
                  e.preventDefault();
                  goToIndex(index);
                }
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 shrink-0">
                <feature.icon className="w-7 h-7 text-white/70" aria-hidden="true" />
              </div>

              {/* Title - solid black */}
              <h3
                className="text-3xl lg:text-4xl font-light text-black tracking-tight mb-3"
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-base text-white/50 leading-relaxed font-light">
                {feature.description}
              </p>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#18794E]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                />
              )}
            </motion.article>
          );
        })}
      </div>

      {/* Live region for screen readers */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Showing feature {activeIndex + 1} of {featureCount}: {features[activeIndex].title}
      </div>
    </div>
  );
}