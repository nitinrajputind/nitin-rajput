"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EducationCard from "@/components/education/EducationCard";
import "./education.scss";
import { education } from "@/constants/constants";

export default function Education() {
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
    <section className="education section" id="education">
      <motion.div 
        className="education_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="education_header" variants={itemVariants}>
          <h2 className="education_title">
            <span className="education_title_number">05.</span>
            Education
          </h2>
          <div className="education_title_line"></div>
        </motion.div>

        <motion.div className="education_content" variants={itemVariants}>
          <div className="education_timeline">
            {education &&
              education?.map((item, index) => (
                <EducationCard
                  key={index}
                  degree={item.degree}
                  field={item.field}
                  institution={item.institution}
                  duration={item.duration}
                  location={item.location}
                  cgpa={item.cgpa}
                  description={item.description}
                  achievements={item.achievements}
                  relevantCourses={item.relevantCourses}
                  index={index}
                />
              ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
