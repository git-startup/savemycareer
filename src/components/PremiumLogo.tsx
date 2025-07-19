import React from 'react';
import {Link} from '@/i18n/routing';

interface PremiumLogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  animate?: boolean;
  className?: string;
}

export default function PremiumLogo({ 
  size = 'medium', 
  showTagline = true, 
  animate = false,
  className = '' 
}: PremiumLogoProps) {
  const sizes = {
    small: { height: 'h-8', width: 'w-36', fontSize: '24' },
    medium: { height: 'h-12', width: 'w-56', fontSize: '32' },
    large: { height: 'h-16', width: 'w-72', fontSize: '40' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`${className} ${animate ? 'group' : ''}`}>
      <Link href="/">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 600 140" 
        className={`${currentSize.height} ${currentSize.width} transition-all duration-300 ${animate ? 'group-hover:scale-105' : ''}`}
        style={{ minWidth: size === 'small' ? '140px' : size === 'large' ? '280px' : '200px' }}
      >
        {/* SVG Definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="30%" stopColor="#3B82F6" />
            <stop offset="70%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
          
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="dropShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Logo Icon Container */}
        <g transform="translate(20, 20)">
          {/* Premium layered background circles */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" opacity="0.05"/>
          <circle cx="50" cy="50" r="42" fill="url(#logoGradient)" opacity="0.1"/>
          <circle cx="50" cy="50" r="36" fill="url(#logoGradient)" opacity="0.15"/>
          
          {/* AI Data Visualization Network */}
          <g transform="translate(15, 15)">
            {/* Neural network nodes with gradient fills */}
            <circle cx="10" cy="10" r="5" fill="#3B82F6" opacity="0.9" filter="url(#dropShadow)"/>
            <circle cx="50" cy="15" r="5" fill="#8B5CF6" opacity="0.9" filter="url(#dropShadow)"/>
            <circle cx="30" cy="35" r="5" fill="#06B6D4" opacity="0.9" filter="url(#dropShadow)"/>
            <circle cx="60" cy="40" r="5" fill="#3B82F6" opacity="0.9" filter="url(#dropShadow)"/>
            <circle cx="15" cy="55" r="5" fill="#8B5CF6" opacity="0.9" filter="url(#dropShadow)"/>
            <circle cx="45" cy="60" r="5" fill="#06B6D4" opacity="0.9" filter="url(#dropShadow)"/>
            
            {/* Enhanced connection lines */}
            <path d="M10,10 L50,15 M50,15 L30,35 M30,35 L60,40 M60,40 L15,55 M15,55 L45,60" 
                  stroke="url(#logoGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  opacity="0.7"
                  strokeLinecap="round"/>
            
            {/* Data flow indicators */}
            <circle cx="30" cy="12" r="2" fill="#3B82F6" opacity="0.6">
              {animate && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>}
            </circle>
            <circle cx="40" cy="25" r="2" fill="#8B5CF6" opacity="0.6">
              {animate && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite"/>}
            </circle>
            <circle cx="45" cy="37" r="2" fill="#06B6D4" opacity="0.6">
              {animate && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1s" repeatCount="indefinite"/>}
            </circle>
          </g>
          
          {/* Central AI Symbol */}
          <g transform="translate(32, 32)">
            <rect x="0" y="0" width="36" height="36" rx="10" 
                  fill="url(#aiGradient)" 
                  opacity="0.95"
                  filter="url(#dropShadow)"/>
            <rect x="2" y="2" width="32" height="32" rx="8" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="1"/>
            <text x="18" y="24" textAnchor="middle" 
                  fontFamily="Arial, sans-serif" 
                  fontWeight="bold" 
                  fontSize="16" 
                  fill="white"
                  filter="url(#dropShadow)">AI</text>
          </g>
          
          {/* Hover glow effect */}
          {animate && (
            <circle cx="50" cy="50" r="50" 
                    fill="url(#logoGradient)" 
                    opacity="0" 
                    className="group-hover:opacity-10 transition-opacity duration-300"/>
          )}
        </g>
        
        {/* Premium Typography */}
        <g transform="translate(130, 25)">
          <text x="0" y="40" 
                fontFamily="Arial, sans-serif" 
                fontWeight="800" 
                fontSize={currentSize.fontSize} 
                fill="url(#textGradient)"
                filter="url(#dropShadow)">
            <tspan>Save</tspan>
            <tspan fill="#3B82F6">My</tspan>
            <tspan>Career</tspan>
            <tspan fill="#8B5CF6">.ai</tspan>
          </text>
          
          {/* Professional Tagline */}
          {showTagline && (
            <text x="0" y="62" 
                  fontFamily="Arial, sans-serif" 
                  fontWeight="500" 
                  fontSize="14" 
                  fill="#6B7280"
                  opacity="0.8">
              AI Career Intelligence Platform
            </text>
          )}
        </g>
        
        {/* Premium accent elements */}
        <g opacity="0.1">
          <circle cx="550" cy="20" r="3" fill="#3B82F6"/>
          <circle cx="570" cy="35" r="2" fill="#8B5CF6"/>
          <circle cx="560" cy="50" r="2.5" fill="#06B6D4"/>
        </g>
      </svg>
      </Link>
    </div>
  );
}