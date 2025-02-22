export const Logo = () => {
    return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" aria-labelledby="title">
                <style jsx>{`
                    @keyframes pulse {
                    0% { opacity: 0.8; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 0.8; transform: scale(1); }
                    }
                    .logo-text { filter: url(#shadow); }
                    .hover-scale { transition: transform 0.3s ease; }
                    .hover-scale:hover { transform: scale(1.01); }
                `}</style>
            
                <defs>
                    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F0FF"/>
                    <stop offset="100%" stopColor="#AD00FF"/>
                    </linearGradient>
                    
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,240,255,0.4)"/>
                    </filter>
                </defs>

                <title id="title">Zesty Logo</title>
            
                <g className="hover-scale">
                    {/* Animated Background Circle */}
                    <circle cx="40" cy="30" r="28" fill="none" stroke="url(#mainGradient)" strokeWidth="3"
                    strokeDasharray="0 100" opacity="0.3">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0;0 100" dur="8s" repeatCount="indefinite"/>
                    </circle>

                    {/* Dynamic Shapes */}
                    <path d="M25 45 L35 15 L55 45 Z" fill="none" stroke="url(#mainGradient)" strokeWidth="4"
                        strokeLinejoin="round" transform="rotate(15 40 30)">
                    <animateTransform attributeName="transform" type="rotate" from="15 40 30" to="375 40 30" 
                    dur="20s" repeatCount="indefinite"/>
                    </path>

                    {/* Pulsing Dots */}
                    <g className="pulse-group" style={{ animation: 'pulse 2s infinite' }}>
                    <circle cx="25" cy="45" r="5" fill="url(#mainGradient)">
                        <animate attributeName="cx" values="25;20;25" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="45" cy="45" r="5" fill="url(#mainGradient)">
                        <animate attributeName="cy" values="45;40;45" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    </g>
                </g>

                {/* Modern Text */}
                <text x="70" y="40" fontFamily="'Montserrat', sans-serif" fontSize="30" fontWeight="800" 
                        fill="url(#mainGradient)" className="logo-text">
                    ZESTY
                    <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
                </text>
                
                {/* Subtext with Hover Effect */}
                <text x="70" y="55" fontFamily="'Poppins', sans-serif" fontSize="10" fill="#A0A0FF"
                className="hover-scale" style={{ fontWeight: 600, letterSpacing: '1px' }}>
                    SHOP FUTURE-READY
                </text>
            </svg>

    )
}