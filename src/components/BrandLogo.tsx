import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-8 w-8', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="url(#brand-grad)" />
      {/* Precision geometric tool symbol: stylized interlocking hex/compass with central pivot */}
      <path
        d="M16 6L24 10.6V21.4L16 26L8 21.4V10.6L16 6Z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M16 11V21M11 13.5L21 18.5M21 13.5L11 18.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="16" cy="16" r="2.2" fill="#38bdf8" />
      <defs>
        <linearGradient id="brand-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
};
