const FloralDivider = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <div className={`flex items-center justify-center py-8 ${flip ? "rotate-180" : ""} ${className}`}>
    <svg viewBox="0 0 400 40" fill="none" className="w-64 h-10" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 20C50 20 80 10 120 10C140 10 160 15 200 20C240 25 260 30 280 30C320 30 350 20 400 20"
        stroke="#D4A574"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="200" cy="20" r="4" fill="#F2B5C8" />
      <path d="M180 18C175 12 178 5 185 8C182 14 180 18 180 18Z" fill="#A8B5A0" opacity="0.6" />
      <path d="M220 22C225 28 222 35 215 32C218 26 220 22 220 22Z" fill="#A8B5A0" opacity="0.6" />
    </svg>
  </div>
);

export default FloralDivider;
