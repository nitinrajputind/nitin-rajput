"use client";
import React from "react";
import { motion } from "framer-motion";
import "./starfieldVariants.scss";

// =============================================================================
// ✨ CONSTELLATION PATTERN BACKGROUND
// =============================================================================
export const ConstellationField: React.FC<{ className?: string }> = ({ className = "" }) => {
  const constellations = [
    // Big Dipper
    { id: 'big-dipper', points: [[20, 30], [25, 25], [35, 28], [45, 20], [55, 25], [65, 18], [75, 22]] },
    // Orion's Belt  
    { id: 'orion', points: [[60, 60], [65, 58], [70, 62]] },
    // Cassiopeia
    { id: 'cassiopeia', points: [[10, 70], [18, 65], [25, 72], [32, 67], [40, 75]] },
    // Custom constellation
    { id: 'custom', points: [[75, 40], [80, 35], [88, 42], [82, 48]] }
  ];

  return (
    <div className={`constellation-field ${className}`}>
      <svg className="constellation-field__svg" viewBox="0 0 100 100">
        {constellations.map((constellation) => (
          <g key={constellation.id} className="constellation-field__constellation">
            {/* Draw connecting lines */}
            {constellation.points.map((point, index) => {
              const nextPoint = constellation.points[index + 1];
              if (!nextPoint) return null;
              
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={point[0]}
                  y1={point[1]}
                  x2={nextPoint[0]}
                  y2={nextPoint[1]}
                  stroke="var(--theme-color)"
                  strokeWidth="0.1"
                  opacity="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 2, delay: index * 0.5 }}
                />
              );
            })}
            
            {/* Draw stars */}
            {constellation.points.map((point, index) => (
              <motion.circle
                key={`star-${index}`}
                cx={point[0]}
                cy={point[1]}
                r="0.3"
                fill="var(--theme-color)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8]
                }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 3
                }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

// =============================================================================
// 💫 FLOATING PARTICLES BACKGROUND
// =============================================================================
export const FloatingParticles: React.FC<{ className?: string }> = ({ className = "" }) => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className={`floating-particles ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="floating-particles__particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// 🌟 GEOMETRIC PATTERN BACKGROUND  
// =============================================================================
export const GeometricStars: React.FC<{ className?: string }> = ({ className = "" }) => {
  const patterns = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    type: ['triangle', 'diamond', 'hexagon'][Math.floor(Math.random() * 3)],
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    delay: Math.random() * 3,
  }));

  return (
    <div className={`geometric-stars ${className}`}>
      {patterns.map((pattern) => (
        <motion.div
          key={pattern.id}
          className={`geometric-stars__shape geometric-stars__shape--${pattern.type}`}
          style={{
            left: `${pattern.x}%`,
            top: `${pattern.y}%`,
            width: `${pattern.size}px`,
            height: `${pattern.size}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8,
            delay: pattern.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// ⭐ PULSING DOTS BACKGROUND
// =============================================================================
export const PulsingDots: React.FC<{ className?: string }> = ({ className = "" }) => {
  const dots = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    color: ['var(--theme-color)', '#8b5cf6', '#3b82f6', '#ec4899'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className={`pulsing-dots ${className}`}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="pulsing-dots__dot"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3],
            boxShadow: [
              `0 0 0px ${dot.color}`,
              `0 0 20px ${dot.color}`,
              `0 0 0px ${dot.color}`
            ],
          }}
          transition={{
            duration: 3,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// 🌌 AURORA BACKGROUND  
// =============================================================================
export const AuroraBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`aurora-background ${className}`}>
      <motion.div
        className="aurora-background__wave aurora-background__wave--1"
        animate={{
          background: [
            "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
            "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
            "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.1), transparent)",
            "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
          ],
          transform: ["translateX(-100%)", "translateX(100%)"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="aurora-background__wave aurora-background__wave--2"
        animate={{
          background: [
            "linear-gradient(120deg, transparent, rgba(59, 130, 246, 0.08), transparent)",
            "linear-gradient(120deg, transparent, rgba(236, 72, 153, 0.08), transparent)",
            "linear-gradient(120deg, transparent, rgba(139, 92, 246, 0.08), transparent)",
            "linear-gradient(120deg, transparent, rgba(59, 130, 246, 0.08), transparent)",
          ],
          transform: ["translateX(100%)", "translateX(-100%)"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      />
      
      <motion.div
        className="aurora-background__wave aurora-background__wave--3"
        animate={{
          background: [
            "linear-gradient(60deg, transparent, rgba(236, 72, 153, 0.06), transparent)",
            "linear-gradient(60deg, transparent, rgba(139, 92, 246, 0.06), transparent)",
            "linear-gradient(60deg, transparent, rgba(59, 130, 246, 0.06), transparent)",
            "linear-gradient(60deg, transparent, rgba(236, 72, 153, 0.06), transparent)",
          ],
          transform: ["translateY(-100%)", "translateY(100%)"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 10,
        }}
      />
    </div>
  );
};
