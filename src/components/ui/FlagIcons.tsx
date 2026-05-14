/** SVG: los emojis de bandera suelen no renderizar en Windows. */

export function FlagAr({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#74ACDF" />
      <rect y="5.33" width="24" height="5.34" fill="#fff" />
      <rect y="10.67" width="24" height="5.33" fill="#74ACDF" />
      <circle cx="12" cy="8" r="2.1" fill="#F6B40E" stroke="#8B4513" strokeWidth="0.12" />
    </svg>
  );
}

export function FlagUs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.23" width="24" height="1.23" fill="#fff" />
      <rect y="3.7" width="24" height="1.23" fill="#fff" />
      <rect y="6.15" width="24" height="1.23" fill="#fff" />
      <rect y="8.6" width="24" height="1.23" fill="#fff" />
      <rect y="11.05" width="24" height="1.23" fill="#fff" />
      <rect y="13.5" width="24" height="1.23" fill="#fff" />
      <rect width="9.8" height="8.65" fill="#3C3B6E" />
    </svg>
  );
}
