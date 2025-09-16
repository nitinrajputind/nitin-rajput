"use client";
import React, { useState } from 'react';
import './Tooltip.scss';

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  position = 'top',
  delay = 300,
  disabled = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div 
      className={`tooltip-wrapper tooltip-wrapper--${position}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && !disabled && (
        <div className={`tooltip-content tooltip-content--${position}`}>
          {typeof content === 'string' ? content : content}
          <div className={`tooltip-arrow tooltip-arrow--${position}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
