"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./about.scss";
import { aboutImage } from "@/assets";

function About() {
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
    <section className="about section" id="about">
      <motion.div 
        className="about_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="about_header" variants={itemVariants}>
          <h2 className="about_title">
            <span className="about_title_number">01.</span>
            About Me
          </h2>
          <div className="about_title_line"></div>
        </motion.div>

        <div className="about_content">
          <motion.div className="about_text" variants={itemVariants}>
            <p className="about_text_paragraph">
              Hello! My name is Nitin Rajput, and I&apos;m a passionate Full-Stack Software Engineer 
              with over 3+ years of experience building modern web applications. I specialize in the 
              MERN stack (MongoDB, Express.js, React, and Node.js) and have a strong foundation in 
              creating scalable, performant, and user-friendly digital solutions.
            </p>
            
            <p className="about_text_paragraph">
              My expertise spans across the entire development lifecycle, from designing intuitive 
              user interfaces with React and Next.js to building robust backend services with Node.js 
              and Express. I&apos;m particularly passionate about creating accessible, responsive 
              applications that provide exceptional user experiences while meeting business objectives.
            </p>
            
            <p className="about_text_paragraph">
              Currently working as a Software Engineer at InspironLabs, I collaborate with 
              cross-functional teams to deliver high-quality products that make a real impact. 
              I&apos;m always eager to learn new technologies and stay up-to-date with the latest 
              industry trends to bring innovative solutions to every project.
            </p>

            {/* Personality Insights */}
            <motion.div className="about_insights" variants={itemVariants}>
              <h3 className="about_insights_title">Working Style & Interests</h3>
              <div className="about_insights_grid">
                <div className="about_insight_item">
                  <div className="about_insight_icon">🎯</div>
                  <div className="about_insight_content">
                    <h4>Problem Solver</h4>
                    <p>I love breaking down complex problems into manageable solutions</p>
                  </div>
                </div>
                <div className="about_insight_item">
                  <div className="about_insight_icon">🚀</div>
                  <div className="about_insight_content">
                    <h4>Performance Focused</h4>
                    <p>Obsessed with creating fast, optimized user experiences</p>
                  </div>
                </div>
                <div className="about_insight_item">
                  <div className="about_insight_icon">🎨</div>
                  <div className="about_insight_content">
                    <h4>Design Minded</h4>
                    <p>Strong eye for clean, intuitive interfaces that users love</p>
                  </div>
                </div>
                <div className="about_insight_item">
                  <div className="about_insight_icon">📚</div>
                  <div className="about_insight_content">
                    <h4>Continuous Learner</h4>
                    <p>Always exploring new technologies and development patterns</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fun Facts */}
            <motion.div className="about_fun_facts" variants={itemVariants}>
              <h3 className="about_fun_facts_title">Quick Facts About Me</h3>
              <div className="about_fun_facts_list">
                <motion.div 
                  className="about_fun_fact"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="about_fun_fact_emoji">☕</span>
                  <span className="about_fun_fact_text">Coffee enthusiast - 3+ cups per day keeps the code flowing</span>
                </motion.div>
                <motion.div 
                  className="about_fun_fact"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="about_fun_fact_emoji">🌙</span>
                  <span className="about_fun_fact_text">Night owl - My most productive hours are 10 PM to 2 AM</span>
                </motion.div>
                <motion.div 
                  className="about_fun_fact"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="about_fun_fact_emoji">🎮</span>
                  <span className="about_fun_fact_text">Gaming helps me think creatively and problem-solve</span>
                </motion.div>
                <motion.div 
                  className="about_fun_fact"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="about_fun_fact_emoji">🎵</span>
                  <span className="about_fun_fact_text">Lo-fi hip hop is my coding soundtrack of choice</span>
                </motion.div>
              </div>
            </motion.div>

            <div className="about_skills">
              <h3 className="about_skills_title">Here are a few technologies I&apos;ve been working with recently:</h3>
              <div className="about_skills_list">
                <div className="about_skills_column">
                  <span className="about_skills_item">JavaScript (ES6+)</span>
                  <span className="about_skills_item">React</span>
                  <span className="about_skills_item">Next.js</span>
                  <span className="about_skills_item">TypeScript</span>
                </div>
                <div className="about_skills_column">
                  <span className="about_skills_item">Node.js</span>
                  <span className="about_skills_item">Express.js</span>
                  <span className="about_skills_item">MongoDB</span>
                  <span className="about_skills_item">Firebase</span>
                </div>
                <div className="about_skills_column">
                  <span className="about_skills_item">HTML5 & CSS3</span>
                  <span className="about_skills_item">SCSS/Sass</span>
                  <span className="about_skills_item">Git & GitHub</span>
                  <span className="about_skills_item">REST APIs</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="about_image" variants={itemVariants}>
            <div className="about_image_wrapper">
              <div className="about_image_container">
                <Image 
                  src={aboutImage} 
                  alt="Nitin Rajput - Full Stack Developer" 
                  fill 
                  loading="lazy"
                  className="about_image_photo"
                />
              </div>
              <div className="about_image_overlay"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
