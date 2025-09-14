"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExperienceCard from "@/components/experience/ExperienceCard";
import "./experience.scss";
import { experience } from "@/constants/constants";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="experience section" id="experience">
      <motion.div 
        className="experience_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="experience_header" variants={itemVariants}>
          <h2 className="experience_title">
            <span className="experience_title_number">03.</span>
            Where I&apos;ve Worked
          </h2>
          <div className="experience_title_line"></div>
        </motion.div>

        <motion.div className="experience_content" variants={itemVariants}>
          <div className="experience_timeline">
            {experience &&
              experience?.map((item, index) => (
                <ExperienceCard
                  key={index}
                  icon={item.image}
                  role={item.role}
                  details={item.description}
                  duration={item.duration}
                  company={item.company}
                  skills={item.skills}
                  index={index}
                  responsibilities={item.responsibilities}
                  teamSize={item.teamSize}
                  metrics={item.metrics}
                />
              ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
