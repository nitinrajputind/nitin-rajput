"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/button/Button";
import ParticleNetwork from "@/components/common/ParticleNetwork";
import "./hero.scss";

const roles = [
  "Full Stack Engineer",
  "Frontend Developer", 
  "Backend Developer",
  "React Developer",
  "Node.js Developer",
  "Web Developer"
];

// right visual now uses a lightweight animated SVG globe (no heavy libs)

export default function Hero() {
  const [currentRole, setCurrentRole] = useState<number>(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  

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

  // removed rotating tech tiles in favor of SVG globe

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
                  3+
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
                  10+
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
              <span className="hero_availability_text">Available for Freelance work</span>
            </div>
            <div className="hero_location">
              <span className="hero_location_text">📍 Bangalore, India (UTC+5:30)</span>
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
            <ParticleNetwork className="hero_globe" />
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
