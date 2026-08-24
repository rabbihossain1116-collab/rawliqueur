export default function ApplicationLogo({ className = '' }) {
    return (
        <svg
            viewBox="0 0 220 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <text x="5" y="48" fontFamily="Georgia, serif" fontSize="48" fontWeight="bold" fill="#1a1a1a">R</text>
            <text x="42" y="48" fontFamily="Georgia, serif" fontSize="48" fontWeight="bold" fill="#C41E3A">L</text>
            <polygon points="24,18 32,23 24,28" fill="#C41E3A" />
            <rect x="72" y="12" width="5" height="12" rx="2.5" fill="#C9A84C" />
            <path d="M 69 22 Q 69 29 74.5 29 Q 80 29 80 22" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            <line x1="74.5" y1="29" x2="74.5" y2="33" stroke="#C9A84C" strokeWidth="1.5" />
            <line x1="71" y1="33" x2="78" y2="33" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M 82 8 Q 95 5 98 18" stroke="#C41E3A" strokeWidth="1.5" fill="none" />
            <text x="88" y="28" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#1a1a1a" letterSpacing="3">RAW</text>
            <text x="88" y="48" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#C41E3A" letterSpacing="3">LIQUEUR</text>
            <text x="5" y="64" fontFamily="Arial, sans-serif" fontSize="5.5" fill="#888" letterSpacing="1.5">NO AI, NO EDIT, JUST RAW TALENT.</text>
        </svg>
    );
}
