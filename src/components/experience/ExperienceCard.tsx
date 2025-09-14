import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./experienceCard.scss";

interface ExperienceCardProps {
  icon: any;
  role: string;
  company: string;
  details: string;
  skills: string;
  duration: string;
  index: number;
  responsibilities?: string[];
  teamSize?: string;
  metrics?: {
    users: string;
    performance: string;
    projects: string;
  };
}

const ExperienceCard = ({
  icon,
  role,
  company,
  details,
  skills,
  duration,
  index,
  responsibilities = [],
  teamSize,
  metrics,
}: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className="experience_card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="experience_card_timeline">
        <div className="experience_card_timeline_dot">
          <div className="experience_card_timeline_dot_inner"></div>
        </div>
        <div className="experience_card_timeline_line"></div>
      </div>

      <div className="experience_card_content">
        <div className="experience_card_header" onClick={toggleExpanded}>
          <div className="experience_card_icon">
            <Image
              src={icon}
              alt={`${company} logo`}
              width={48}
              height={48}
              className="experience_card_icon_image"
            />
          </div>
          <div className="experience_card_header_info">
            <h3 className="experience_card_role">{role}</h3>
            <h4 className="experience_card_company">{company}</h4>
            <p className="experience_card_duration">{duration}</p>
          </div>
          <div className="experience_card_toggle">
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="experience_card_body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="experience_card_description">
                <p>{details}</p>
              </div>

              {/* Team Size and Metrics */}
              {(teamSize || metrics) && (
                <div className="experience_card_metrics">
                  {teamSize && (
                    <div className="experience_card_team">
                      <span className="experience_card_team_label">Team Size:</span>
                      <span className="experience_card_team_value">{teamSize}</span>
                    </div>
                  )}
                  {metrics && (
                    <div className="experience_card_stats">
                      <div className="experience_card_stat">
                        <span className="experience_card_stat_value">{metrics.users}</span>
                        <span className="experience_card_stat_label">Users Served</span>
                      </div>
                      <div className="experience_card_stat">
                        <span className="experience_card_stat_value">{metrics.performance}</span>
                        <span className="experience_card_stat_label">Performance Boost</span>
                      </div>
                      <div className="experience_card_stat">
                        <span className="experience_card_stat_value">{metrics.projects}</span>
                        <span className="experience_card_stat_label">Projects Delivered</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {responsibilities.length > 0 && (
                <div className="experience_card_responsibilities">
                  <h5 className="experience_card_responsibilities_title">Key Responsibilities:</h5>
                  <ul className="experience_card_responsibilities_list">
                    {responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="experience_card_responsibilities_item">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="experience_card_skills">
                <h5 className="experience_card_skills_title">Technologies Used:</h5>
                <div className="experience_card_skills_list">
                  {skills.split(', ').map((skill, skillIndex) => (
                    <span key={skillIndex} className="experience_card_skill_tag">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
