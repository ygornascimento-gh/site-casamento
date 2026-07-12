const BranchLeft = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 300" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M180 290C160 250 140 200 100 160C60 120 30 100 10 60C20 90 50 130 80 160C110 190 150 230 170 280"
      stroke="#A8B5A0"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="60" cy="100" r="8" fill="#F2B5C8" opacity="0.6" />
    <circle cx="100" cy="160" r="6" fill="#F2B5C8" opacity="0.4" />
    <circle cx="130" cy="210" r="7" fill="#F2B5C8" opacity="0.5" />
    <path d="M50 120C40 110 35 95 45 85C55 95 50 110 50 120Z" fill="#A8B5A0" opacity="0.5" />
    <path d="M90 175C80 165 75 150 85 140C95 150 90 165 90 175Z" fill="#A8B5A0" opacity="0.4" />
    <path d="M140 230C130 220 125 205 135 195C145 205 140 220 140 230Z" fill="#A8B5A0" opacity="0.4" />
  </svg>
);

export default BranchLeft;
