
import React from 'react';

const RunnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="10" cy="4" r="1" />
    <path d="m16.2 7.8 1.9-1.1" />
    <path d="M14 12.3c.3-.3.5-.7.6-1.1l1.1-4.8" />
    <path d="m17.5 16.5-1.6-2.1" />
    <path d="m6.4 12.4-2 2.8" />
    <path d="M10.1 18.2.5 22.4" />
    <path d="M16 14l-2-3-4 4-3-2" />
    <path d="m7 12-2-2" />
  </svg>
);

export default RunnerIcon;
