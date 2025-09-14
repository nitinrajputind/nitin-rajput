import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import './button.scss';

interface ButtonProps {
  text: string;
  link?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  external?: boolean;
  onClick?: () => void;
  type?: 'button' | 'link';
}

export default function Button({ 
  text, 
  link, 
  variant = 'primary', 
  size = 'medium',
  external = false,
  onClick,
  type = 'link'
}: ButtonProps) {
  const buttonClasses = `btn btn--${variant} btn--${size}`;
  
  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
  );

  // If type is button or onClick is provided without link, render as button
  if (type === 'button' || (onClick && !link)) {
    return (
      <button 
        className={buttonClasses}
        onClick={onClick}
        type="button"
      >
        {buttonContent}
      </button>
    );
  }

  if (external && link) {
    return (
      <a 
        href={link} 
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  if (link && link.startsWith('#')) {
    return (
      <a 
        href={link} 
        className={buttonClasses}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  if (link) {
    return (
      <Link href={link} className={buttonClasses} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  }

  // Fallback to button if no link provided
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      type="button"
    >
      {buttonContent}
    </button>
  );
}
