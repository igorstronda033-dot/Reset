
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-16 h-16" }) => {
  return (
    <svg 
      viewBox="0 0 400 400" 
      className={`${className} animate-logo-mount`} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      
      {/* Outer Circle with Arrows */}
      <circle cx="200" cy="200" r="190" fill="black" stroke="none" />
      
      {/* Outer ring / arrows approximation */}
      <path 
        d="M 200,20 A 180,180 0 0,1 380,200 L 350,200 A 150,150 0 0,0 200,50 Z" 
        fill="url(#blueGradient)" 
      />
      <path 
        d="M 200,380 A 180,180 0 0,1 20,200 L 50,200 A 150,150 0 0,0 200,350 Z" 
        fill="url(#blueGradient)" 
      />
      {/* Arrow heads */}
      <path d="M 380,200 L 400,180 L 360,180 Z" fill="url(#blueGradient)" transform="rotate(45 380 200)" />
      <path d="M 20,200 L 0,220 L 40,220 Z" fill="url(#blueGradient)" transform="rotate(45 20 200)" />

      {/* Addiction Icons (Simplified paths) */}
      <g fill="white">
        {/* Bottle */}
        <path d="M 190,105 L 210,105 L 210,115 L 215,115 L 215,160 L 185,160 L 185,115 L 190,115 Z" />
        {/* Pill */}
        <rect x="225" y="145" width="20" height="10" rx="5" transform="rotate(-30 235 150)" />
        <rect x="235" y="155" width="20" height="10" rx="5" transform="rotate(20 245 160)" />
        {/* Phone */}
        <rect x="135" y="120" width="25" height="40" rx="4" transform="rotate(-20 147 140)" stroke="white" strokeWidth="2" fill="none" />
        {/* Leaf */}
        <path d="M 270,160 C 270,140 290,130 310,140 C 300,160 270,170 270,160" />
        <path d="M 270,160 C 260,135 240,145 250,165 C 270,175 270,160 270,160" />
        {/* Syringe */}
        <path d="M 165,135 L 185,155 M 168,138 L 182,152 L 178,156 L 164,142 Z" stroke="white" strokeWidth="3" />
      </g>

      {/* Breaking Chain */}
      <g transform="translate(100, 180)">
        {/* Left Link (Blue) */}
        <path d="M 60,10 A 30,30 0 1,0 60,70 L 90,70 L 90,55 L 60,55 A 15,15 0 1,1 60,25 L 90,25 L 90,10 Z" fill="#2563eb" />
        {/* Right Link (Red) */}
        <path d="M 140,10 A 30,30 0 1,1 140,70 L 110,70 L 110,55 L 140,55 A 15,15 0 1,0 140,25 L 110,25 L 110,10 Z" fill="#dc2626" />
        {/* Shatter pieces */}
        <path d="M 95,30 L 105,25 L 100,40 Z" fill="white" />
        <path d="M 98,50 L 108,60 L 90,55 Z" fill="white" />
      </g>

      {/* Text "RESET" */}
      <text x="200" y="300" textAnchor="middle" fill="white" fontSize="60" fontWeight="900" fontStyle="italic" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>RESET</text>
      
      {/* Text "VÍCIO ZERO" */}
      <text x="200" y="340" textAnchor="middle" fill="#0ea5e9" fontSize="24" fontWeight="700" letterSpacing="4">VÍCIO ZERO</text>
    </svg>
  );
};

export default Logo;