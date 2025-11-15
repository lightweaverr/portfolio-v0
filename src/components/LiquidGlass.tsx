import React, { useState } from 'react';

interface LiquidGlassProps {
  children?: React.ReactNode;
  blur?: number;
  opacity?: number;
  saturation?: number;
  borderOpacity?: number;
  reflectionIntensity?: number;
  className?: string;
  animated?: boolean;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  blur = 12,
  opacity = 0.7,
  saturation = 1.8,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `rgba(0, 0, 0, ${opacity * 0.1})`,
        backdropFilter: `blur(${blur}px) saturate(${saturation})`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
      }}  
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.5
        }}
      />
      
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      
    </div>
  );
};


export default LiquidGlass;