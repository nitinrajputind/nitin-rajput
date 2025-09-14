"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/button/Button";
import "./hero.scss";

const roles = [
  "Full Stack Engineer",
  "Frontend Developer", 
  "Backend Developer",
  "React Developer",
  "Node.js Developer",
  "Web Developer"
];

const techStack = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
  { name: "TypeScript", icon: "🔷", color: "#3178C6" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
  { name: "Firebase", icon: "🔥", color: "#FFCA28" },
  { name: "Git", icon: "📝", color: "#F05032" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "GraphQL", icon: "🔗", color: "#E10098" }
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTechSet, setCurrentTechSet] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const current = roles[currentRole];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1));
      } else {
        setDisplayText(current.substring(0, displayText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    if (!isDeleting && displayText === current) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Auto-rotate tech stack
  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setCurrentTechSet((prev) => (prev + 1) % Math.ceil(techStack.length / 3));
    }, 3000);

    return () => clearInterval(interval);
  }, [isRotating]);

  const getCurrentTechSet = () => {
    const start = currentTechSet * 3;
    return techStack.slice(start, start + 3);
  };

  const handleTechClick = () => {
    setCurrentTechSet((prev) => (prev + 1) % Math.ceil(techStack.length / 3));
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <section className="hero section" id="home">
      <div className="hero_wrapper">
        <motion.div 
          className="hero_content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero_greeting" variants={itemVariants}>
            <span className="hero_greeting_text">Hi, my name is</span>
          </motion.div>
          
          <motion.h1 className="hero_name" variants={itemVariants}>
            Nitin Rajput.
          </motion.h1>
          
          <motion.h2 className="hero_title" variants={itemVariants}>
            <span className="hero_role">
              I&apos;m a{" "}
              <span className="hero_role_text">
                {displayText}
                <span className="hero_cursor">|</span>
              </span>
            </span>
          </motion.h2>
          
          <motion.p className="hero_description" variants={itemVariants}>
            I create exceptional digital experiences that solve real-world problems and drive business growth. 
            Currently focused on building scalable applications with modern web technologies.
          </motion.p>

          {/* Dynamic Stats */}
          <motion.div className="hero_stats" variants={itemVariants}>
            <div className="hero_stats_grid">
              <motion.div 
                className="hero_stat_item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="hero_stat_number"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  5+
                </motion.span>
                <span className="hero_stat_label">Years Experience</span>
              </motion.div>
              
              <motion.div 
                className="hero_stat_item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="hero_stat_number"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  50+
                </motion.span>
                <span className="hero_stat_label">Projects Completed</span>
              </motion.div>
              
              <motion.div 
                className="hero_stat_item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="hero_stat_number"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  10K+
                </motion.span>
                <span className="hero_stat_label">Users Impacted</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div className="hero_availability" variants={itemVariants}>
            <div className="hero_availability_indicator">
              <motion.div 
                className="hero_availability_dot"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <span className="hero_availability_text">Available for freelance work</span>
            </div>
            <div className="hero_location">
              <span className="hero_location_text">📍 Mumbai, India (UTC+5:30)</span>
            </div>
          </motion.div>
          
          <motion.div className="hero_cta" variants={itemVariants}>
            <Button 
              text="Get In Touch" 
              link="#contact"
              variant="primary"
            />
            <Button 
              text="View My Work" 
              link="#projects"
              variant="secondary"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero_visual"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero_animation_container">
            {getCurrentTechSet().map((tech, index) => (
              <motion.div 
                key={`${tech.name}-${currentTechSet}`}
                className={`hero_floating_element hero_element_${index + 1}`}
                variants={floatingVariants}
                animate={{
                  ...floatingVariants.animate,
                  opacity: 1, 
                  scale: 1
                }}
                transition={{ 
                  ...floatingVariants.animate.transition,
                  delay: index * 0.5 
                }}
                onClick={handleTechClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div 
                  className="hero_tech_icon"
                  style={{ color: tech.color }}
                >
                  {tech.icon}
                </div>
                <div className="hero_tech_name">{tech.name}</div>
              </motion.div>
            ))}
            
            <motion.div 
              className="hero_rotating_ring"
              variants={rotateVariants}
              animate="animate"
            >
              <div className="hero_ring"></div>
            </motion.div>
            
            <motion.div 
              className="hero_center_circle"
              variants={floatingVariants}
              animate="animate"
              onClick={toggleRotation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isRotating ? "Pause rotation" : "Start rotation"}
            >
              <div className="hero_center_content">
                <span>N</span>
                <div className="hero_rotation_indicator">
                  {isRotating ? "⏸️" : "▶️"}
                </div>
              </div>
            </motion.div>
            
            <div className="hero_tech_controls">
              <motion.button 
                className="hero_tech_button"
                onClick={handleTechClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Next tech stack"
              >
                🔄
              </motion.button>
              <div className="hero_tech_indicators">
                {Array.from({ length: Math.ceil(techStack.length / 3) }).map((_, index) => (
                  <div 
                    key={index}
                    className={`hero_tech_indicator ${index === currentTechSet ? 'active' : ''}`}
                    onClick={() => setCurrentTechSet(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div className="hero_scroll" variants={itemVariants}>
        <div className="hero_scroll_indicator">
          <div className="hero_scroll_line"></div>
          <span>Scroll down</span>
        </div>
      </motion.div>
    </section>
  );
}
