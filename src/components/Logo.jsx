export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="#22d3c8" strokeWidth="1.5" fill="none" />
      <ellipse cx="32" cy="32" rx="14" ry="30" stroke="#22d3c8" strokeWidth="1" fill="none" opacity="0.4" />
      <line x1="2" y1="32" x2="62" y2="32" stroke="#22d3c8" strokeWidth="1" opacity="0.4" />
      <line x1="8" y1="16" x2="56" y2="16" stroke="#22d3c8" strokeWidth="0.75" opacity="0.25" />
      <line x1="8" y1="48" x2="56" y2="48" stroke="#22d3c8" strokeWidth="0.75" opacity="0.25" />
      <text x="32" y="38" textAnchor="middle" fontSize="16" fontWeight="600" fill="#22d3c8">CV</text>
    </svg>
  )
}
