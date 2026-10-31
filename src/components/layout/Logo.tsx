import React from "react";

interface LogoProps {
  scale?: number;
  color?: string;
  iconColor?: string;
  showText?: boolean;
  className?: string;
}

export function Logo({
  scale = 1,
  color,
  className = "",
}: LogoProps) {
  const baseHeight = 28;
  const H = Math.round(baseHeight * scale);

  // If color is white or #FFF or #FFFFFF, make the logo completely white via CSS filters
  const isWhite = color && ['#fff', '#ffffff', 'white'].includes(color.toLowerCase());

  return (
    <img 
      src="/logo.png" 
      alt="ideakicks" 
      className={`select-none flex-shrink-0 ${className}`} 
      style={{ 
        height: `${H}px`, 
        width: "auto",
        filter: isWhite ? 'brightness(0) invert(1)' : 'none'
      }}
    />
  );
}
