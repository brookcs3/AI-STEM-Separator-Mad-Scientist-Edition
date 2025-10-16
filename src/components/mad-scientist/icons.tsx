import type { SVGProps } from 'react';

const commonProps = {
  strokeWidth: 2,
  fill: 'none',
  strokeLinecap: 'round' as 'round',
  strokeLinejoin: 'round' as 'round',
};

export const UploadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...commonProps}
    {...props}
  >
    <path d="M13 12.5l-1-10-1 10" />
    <path d="M12 2.5l4 5m-8 0l4-5" />
    <path d="M4 17.75c0-2 2-4.5 8-4.5s8 2.5 8 4.5" />
    <path d="M7 21.5h10" />
  </svg>
);

export const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...commonProps}
    {...props}
  >
    <path d="M12 2.5v13" />
    <path d="M16 11.5l-4 4-4-4" />
    <path d="M4 17.5h16v3H4z" />
  </svg>
);

export const VocalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...commonProps}
    {...props}
  >
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v1a7 7 0 01-14 0v-1" />
    <path d="M12 19v4m-4 0h8" />
  </svg>
);

export const InstrumentalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...commonProps}
    {...props}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
    <path d="M9 10l12-2" />
  </svg>
);

export const BrainIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...commonProps}
    {...props}
  >
    <path d="M12 2a4.5 4.5 0 00-4.5 4.5c0 1.5 2 3.5 2 3.5s-2 1.5-2 3.5A4.5 4.5 0 0012 22a4.5 4.5 0 004.5-4.5c0-2-2-2-2-3.5s2-2 2-3.5A4.5 4.5 0 0012 2z" />
    <path d="M12 2v20m-5-13.5h10M7 17.5h10" />
    <path d="M12 2L9.5 6.5m5 0L12 2" />
  </svg>
);

export const TerminalIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...commonProps}
      {...props}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
);

export const SparkleIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      {...props}
    >
        <path d="M12 2l2.35 7.15L22 12l-7.65 2.85L12 22l-2.35-7.15L2 12l7.65-2.85z"/>
    </svg>
);
