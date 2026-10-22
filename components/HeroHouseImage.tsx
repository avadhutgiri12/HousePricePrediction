"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * HeroHouseImage renders the property image with a graceful CSS fallback.
 *
 * If /images/hero-house.jpg fails to load (e.g. the asset has not been added yet),
 * it renders a premium placeholder with a house silhouette so the layout never
 * breaks and no broken-image icon is shown.
 */
export interface HeroHouseImageProps {
  className?: string;
  alt?: string;
}

export default function HeroHouseImage({ className = "", alt = "Modern architectural house with clean lines and large windows" }: HeroHouseImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`w-full h-full rounded-2xl overflow-hidden border border-[#E5E7E2] bg-[#F7F7F2] flex flex-col items-center justify-center relative ${className}`}
      >
        <div className="absolute inset-0 bg-[#18794E]/5 flex items-center justify-center">
          <svg
            className="w-40 h-40 text-[#18794E]/10"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L4 12V26H28V12L16 2ZM16 6L10 14V24H22V14L16 6Z"
              fill="#18794E"
              opacity={0.15}
            />
          </svg>
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-sm font-medium text-[#171917]">Property image</p>
          <p className="text-xs text-[#737873] mt-1">
            Add /images/hero-house.jpg
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden border border-[#E5E7E2] bg-[#F7F7F2] ${className}`}>
      <Image
        fill
        src="/images/heroIMG.jpg"
        alt={alt}
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, 100vw"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}
