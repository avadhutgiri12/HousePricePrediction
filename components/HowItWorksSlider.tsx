
"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { howItWorksSteps, type HowItWorksStep } from "@/data/how-it-works";

interface HowItWorksSliderProps {
  steps?: HowItWorksStep[];
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function HowItWorksSlider({
  steps = howItWorksSteps,
  className = "",
}: HowItWorksSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePanelClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % steps.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + steps.length) % steps.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = steps.length - 1;
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        handlePanelClick(index);
        return;

      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);

    document
      .getElementById(`workflow-tab-${nextIndex}`)
      ?.focus();
  };

  if (!steps.length) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      <motion.div
        className="slider-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="tablist"
        aria-label="How the house price prediction system works"
      >
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const panelId = `workflow-panel-${index}`;
          const tabId = `workflow-tab-${index}`;

          return (
            <div
              key={step.number}
              id={tabId}
              className={[
                "slider-panel",
                isActive
                  ? "slider-panel--active"
                  : "slider-panel--inactive",
              ].join(" ")}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              aria-label={`Step ${step.number}: ${step.title}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handlePanelClick(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {/* Optional background image overlay */}
              <div className="slider-panel__overlay" aria-hidden="true" />

              {/* Collapsed vertical panel */}
              <div
                className="slider-collapsed"
                aria-hidden={isActive}
              >
                <span className="slider-panel__vertical-text">
                  {String(step.number).padStart(2, "0")}
                </span>

                <span className="slider-collapsed__icon">
                  <step.icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <span className="slider-collapsed__hint">
                  click to expand
                </span>
              </div>

              {/* Expanded panel content */}
              <div
                id={panelId}
                className="slider-expanded"
                role="tabpanel"
                aria-labelledby={tabId}
                aria-hidden={!isActive}
                inert={!isActive}
              >
                {/* Top row */}
                <div className="slider-expanded__top">
                  <span className="slider-step-number">
                    STEP {String(step.number).padStart(2, "0")}
                  </span>

                  <span className="slider-expanded__category">
                    HOUSE PRICE PREDICTION
                  </span>
                </div>

                {/* Main content */}
                <div className="slider-expanded__content">
                  <div className="slider-icon">
                    <step.icon
                      className="h-7 w-7"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="slider-expanded__title">
                    {step.title}
                  </h3>

                  <p className="slider-expanded__description">
                    {step.description}
                  </p>

                  <ul className="slider-expanded__details">
                    {step.details.map((detail) => (
                      <li key={detail}>
                        <span
                          className="slider-detail-dot"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom row */}
                <div className="slider-expanded__footer">
                  <span>
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(steps.length).padStart(2, "0")}
                  </span>

                  <span className="slider-expanded__arrow">
                    <ArrowRight
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Accessible status message */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Step {activeIndex + 1} of {steps.length}:{" "}
        {steps[activeIndex]?.title}
      </p>
    </div>
  );
}
