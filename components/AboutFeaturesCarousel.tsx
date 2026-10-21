"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface AboutFeaturesCarouselProps {
  features: Feature[];
  autoRotateInterval?: number;
  className?: string;
}

export default function AboutFeaturesCarousel({
  features,
  autoRotateInterval = 2000,
  className = "",
}: AboutFeaturesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featureCount = features.length;

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || isHovering) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureCount);
    }, autoRotateInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoRotating, isHovering, autoRotateInterval, featureCount]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setIsAutoRotating(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setIsAutoRotating(true);
  }, []);

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-roledescription="carousel"
      aria-label="Features carousel"
    >
      {/* Navigation Buttons */}
      <motion.button
        className="carousel-nav-btn carousel-nav-btn--prev"
        onClick={goToPrev}
        aria-label="Previous feature"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      <motion.button
        className="carousel-nav-btn carousel-nav-btn--next"
        onClick={goToNext}
        aria-label="Next feature"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </motion.button>

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
              aria-label={`Feature ${index + 1} of ${featureCount}`}
              aria-current={isActive ? "true" : "false"}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !isActive && goToIndex(index)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isActive) {
                  e.preventDefault();
                  goToIndex(index);
                }
              }}
              whileHover={isActive ? { scale: 1.02 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 shrink-0">
                <feature.icon className="w-7 h-7 text-white/70" aria-hidden="true" />
              </div>

              {/* Title with outline/stroke effect */}
              <h3
                className="text-3xl lg:text-4xl font-light text-stroke-white tracking-tight mb-3"
                style={{ WebkitTextStroke: "1px currentColor", color: "transparent" }}
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