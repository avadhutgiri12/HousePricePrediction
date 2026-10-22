"use client";

import { useMemo } from "react";

/**
 * FaintGrid — A subtle grid pattern overlay.
 *
 * Renders an SVG grid pattern that can be used as a decorative overlay.
 * The grid is very faint to add texture without overwhelming content.
 *
 * Props:
 *   - color: stroke color for grid lines (default: currentColor with low opacity)
 *   - size: grid cell size in pixels (default: 40)
 *   - thickness: line thickness in pixels (default: 0.5)
 *   - opacity: opacity of grid lines (default: 0.06)
 *   - className: additional CSS classes
 */
export interface FaintGridProps {
  color?: string;
  size?: number;
  thickness?: number;
  opacity?: number;
  className?: string;
}

export default function FaintGrid({
  color = "currentColor",
  size = 40,
  thickness = 0.5,
  opacity = 0.06,
  className = "",
}: FaintGridProps) {
  const patternId = useMemo(() => `faint-grid-${size}-${thickness}-${opacity}`, [size, thickness, opacity]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
            <path
              d={`M ${size} 0 L 0 0 0 ${size}`}
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              strokeOpacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}