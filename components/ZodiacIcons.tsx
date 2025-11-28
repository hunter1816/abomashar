import React from 'react';

interface ZodiacIconProps {
  signNumber: number; // 1 to 12
  className?: string;
}

const ZodiacSymbol: React.FC<ZodiacIconProps> = ({ signNumber, className = "w-12 h-12" }) => {
  // Common style for paths
  const pathStyle = "fill-current";

  switch (signNumber) {
    case 1: // Aries - الحمل
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="opacity-0" /> {/* Placeholder bounding box if needed, using custom paths below */}
          <path d="M8.88 4.66a5.5 5.5 0 0 0-2.6 1.13 6 6 0 0 0-2.27 4.2h2a4 4 0 0 1 1.4-2.8 3.5 3.5 0 0 1 4.59.8V19h4v-11a3.5 3.5 0 0 1 4.58-.8 4 4 0 0 1 1.41 2.8h2a6 6 0 0 0-2.27-4.2 5.5 5.5 0 0 0-7.72.6V3.5h-1V6a5.5 5.5 0 0 0-4.12-1.34z" className={pathStyle} />
        </svg>
      );
    case 2: // Taurus - الثور
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a5 5 0 0 0-5 5v1.26A6.95 6.95 0 0 0 2 15a7 7 0 1 0 14 0 6.95 6.95 0 0 0-5-6.74V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v2.09c-1.87-.61-3.7-.63-6 0V7a3 3 0 0 1 3-3zm0 6a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" className={pathStyle} />
        </svg>
      );
    case 3: // Gemini - الجوزاء
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3a1 1 0 0 0 0 2h.42a15.7 15.7 0 0 1 3.5 2.06A4 4 0 0 0 9 8v8a4 4 0 0 0 1.25 1.25c-1.63.78-3.1 1.76-4.25 2.75H6a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2h-.42a15.7 15.7 0 0 1-4.25-2.75A4 4 0 0 0 15 16V8a4 4 0 0 0-1.08-.94A15.7 15.7 0 0 1 17.58 5H18a1 1 0 0 0 0-2H6zm5 5h2v8h-2V8z" className={pathStyle} />
        </svg>
      );
    case 4: // Cancer - السرطان
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M15.05 3.32a6 6 0 0 0-4.08 7.15 6 6 0 0 1-5.71 4.79 6 6 0 0 1 0-12 1 1 0 0 0 0-2 8 8 0 0 0 0 16 8 8 0 0 0 7.84-6.52 4 4 0 0 1 3.2-3.4 4 4 0 0 1 4.7 3.66h2c0-4.42-3.58-8-8-7.68zm-6.1 17.36a6 6 0 0 0 4.08-7.15 6 6 0 0 1 5.71-4.79 6 6 0 0 1 0 12 1 1 0 0 0 0 2 8 8 0 0 0 0-16 8 8 0 0 0-7.84 6.52 4 4 0 0 1-3.2 3.4 4 4 0 0 1-4.7-3.66h-2c0 4.42 3.58 8 8 7.68z" className={pathStyle} />
        </svg>
      );
    case 5: // Leo - الأسد
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a4 4 0 0 0-4 4 1 1 0 0 0 2 0 2 2 0 0 1 4 0 2 2 0 0 1-2 2c-3.12 0-5.74 2.15-6.66 5.06A4 4 0 1 0 2 17a4 4 0 0 0 4 4 5 5 0 0 0 5-5c0-2.76 1.84-4 4-4a2 2 0 0 1 2 2 2 2 0 0 1-2 2 1 1 0 1 0 0 2 4 4 0 0 0 0-8 6.07 6.07 0 0 0-3-.8V9a4 4 0 0 0-3.61-3.98A4.01 4.01 0 0 0 12 2zM6 15a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" className={pathStyle} />
        </svg>
      );
    case 6: // Virgo - العذراء
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4v2c2.2 0 4 1.8 4 4v7c0 1.66 1.34 3 3 3s3-1.34 3-3V9c0-1.1.9-2 2-2s2 .9 2 2v2c0 3.31 2.69 6 6 6v-2c-2.2 0-4-1.8-4-4v-2c0-2.21-1.79-4-4-4s-4 1.79-4 4v7c0 .55-.45 1-1 1s-1-.45-1-1V9c0-2.21-1.79-4-4-4S5 6.79 5 9v11H3V9c0-3.31 2.69-6 6-6s6 2.69 6 6v2.39C15.56 10.5 16.71 10 18 10c1.65 0 3 1.35 3 3v3.26c1.05-.72 2-1.93 2-3.26h-2c0 1.5-.7 2-1 2v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v3.5c0 1.37-1.13 2.5-2.5 2.5S7 18.37 7 17V9c0-3.31-2.69-6-6-6v1z" className={pathStyle} />
        </svg>
      );
    case 7: // Libra - الميزان
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M2 17h20v2H2v-2zm10-6c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5zm0-5c-3.1 0-5.83 1.5-7.53 3.82L6.1 11.2C7.36 9.87 9.09 9 11 9s3.64.87 4.9 2.2l1.63-1.38A9.03 9.03 0 0 0 10 6zm0-2a11 11 0 0 1 9.17 4.96l-1.6 1.36A9 9 0 0 0 10 6a9 9 0 0 0-7.57 4.32l-1.6-1.36A11 11 0 0 1 10 4z" className={pathStyle} />
        </svg>
      );
    case 8: // Scorpio - العقرب
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8c0-2.21-1.79-4-4-4S8 5.79 8 8v7c0 .55-.45 1-1 1s-1-.45-1-1V9c0-2.21-1.79-4-4-4S0 6.79 0 9v5c0 3.31 2.69 6 6 6 1.29 0 2.49-.41 3.47-1.11.31 1.77 1.85 3.11 3.73 3.11h3l2.8-2.8 1.41 1.41 1.41-1.41-2.12-2.12-1.42 1.42L16 20.8V17c0-1.66 1.34-3 3-3s3 1.34 3 3v2h2v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v3.5c0 1.37-1.13 2.5-2.5 2.5S11 18.37 11 17V8c0-1.1.9-2 2-2s2 .9 2 2v5h2V8zM5 8c0-1.1.9-2 2-2s2 .9 2 2v7c0 1.66 1.34 3 3 3s3-1.34 3-3V9h2v6c0 3.31-2.69 6-6 6s-6-2.69-6-6V9h2v-1z" className={pathStyle} />
        </svg>
      );
    case 9: // Sagittarius - القوس
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M19.78 6.56l-1.66-1.66c-.3-.3-.77-.3-1.06 0L15.34 6.62l-2.07-2.07c-2.31-2.31-6.1-2.3-8.41.01-2.3 2.3-2.3 6.07-.02 8.35l2.05 2.05-1.49 1.49c-.3.3-.3.77 0 1.06l1.66 1.66c.3.3.77.3 1.06 0l1.49-1.49 2.05 2.05c1.15 1.15 2.66 1.73 4.17 1.73 1.5 0 3.01-.57 4.16-1.72l2.08-2.08 1.71 1.71c.3.3.77.3 1.06 0l1.66-1.66c.3-.3.3-.77 0-1.06l-6.17-6.17c.01.01.01 0 0 0zM7.67 10.09c-1.14-1.13-1.14-2.98 0-4.11 1.13-1.13 2.97-1.14 4.11 0l1.71 1.71-4.11 4.11-1.71-1.71zm9.35 9.36c-1.14 1.13-2.99 1.14-4.11 0l-1.7-1.7 4.1-4.1 1.71 1.71c1.13 1.13 1.13 2.98 0 4.09zM22 2l-6 1.5L18.5 6 22 2z" className={pathStyle} />
        </svg>
      );
    case 10: // Capricorn - الجدي
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5c-2.2 0-4 1.8-4 4v7H5V8H3v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V9c0-1.1.9-2 2-2s2 .9 2 2v2.5c0 1.93-1.57 3.5-3.5 3.5S8 15.43 8 13.5V11H6v2.5c0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5V9c0-2.2-1.8-4-4-4z" className={pathStyle} />
          <path d="M19.5 13c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" className={pathStyle} />
        </svg>
      );
    case 11: // Aquarius - الدلو
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M20.29 7.71l-1.41-1.42L15 10.17 11.12 6.3 9 8.42 5.12 4.54 2.29 7.37l1.42 1.42 2.83-2.83L9 8.42l2.12-2.12 3.88 3.87 3.88-3.88 1.41 1.42z" className={pathStyle} />
          <path d="M20.29 13.71l-1.41-1.42-3.88 3.88-3.88-3.87-2.12 2.12-2.42-2.42-1.46 1.46-1.42-1.42 2.83-2.83L9 11.42l2.12-2.12 3.88 3.87 3.88-3.88 1.41 1.42z" className={pathStyle} />
          <path d="M20.29 19.71l-1.41-1.42-3.88 3.88-3.88-3.87-2.12 2.12-3.88-3.87L2.29 19.38l1.42 1.42 2.83-2.83 2.47 2.46 2.11-2.11 3.88 3.87 3.88-3.88 1.41 1.42z" className={pathStyle} />
        </svg>
      );
    case 12: // Pisces - الحوت
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2 0V4.07c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z" className="opacity-10" />
          <path d="M16.5 12c0-3.5-1.5-6.5-4.5-8.5v17c3-2 4.5-5 4.5-8.5zM7.5 12c0 3.5 1.5 6.5 4.5 8.5v-17C9 5.5 7.5 8.5 7.5 12z" className={pathStyle} />
          <rect x="5" y="11" width="14" height="2" rx="1" className={pathStyle} />
        </svg>
      );
    default:
      return null;
  }
};

export default ZodiacSymbol;
