import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiMapPin, FiCalendar, FiAward, FiBookOpen } from "react-icons/fi";
import "./educationCard.scss";

interface EducationCardProps {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  location: string;
  gpa: string;
  description: string;
  achievements: string[];
  relevantCourses: string[];
  index: number;
}

const EducationCard = ({
  degree,
  field,
  institution,
  duration,
  location,
  gpa,
  description,
  achievements,
  relevantCourses,
  index,
}: EducationCardProps) => {
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
      className="education_card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="education_card_timeline">
        <div className="education_card_timeline_dot">
          <div className="education_card_timeline_dot_inner"></div>
        </div>
        <div className="education_card_timeline_line"></div>
      </div>

      <div className="education_card_content">
        <div className="education_card_header" onClick={toggleExpanded}>
          <div className="education_card_icon">
            <FiBookOpen className="education_card_icon_svg" />
          </div>
          <div className="education_card_header_info">
            <h3 className="education_card_degree">{degree}</h3>
            <h4 className="education_card_field">{field}</h4>
            <p className="education_card_institution">{institution}</p>
            <div className="education_card_meta">
              <div className="education_card_meta_item">
                <FiCalendar className="education_card_meta_icon" />
                <span>{duration}</span>
              </div>
              <div className="education_card_meta_item">
                <FiMapPin className="education_card_meta_icon" />
                <span>{location}</span>
              </div>
              <div className="education_card_meta_item">
                <FiAward className="education_card_meta_icon" />
                <span>GPA: {gpa}</span>
              </div>
            </div>
          </div>
          <div className="education_card_toggle">
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="education_card_body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="education_card_description">
                <p>{description}</p>
              </div>

              {achievements.length > 0 && (
                <div className="education_card_achievements">
                  <h5 className="education_card_achievements_title">Key Achievements:</h5>
                  <ul className="education_card_achievements_list">
                    {achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="education_card_achievements_item">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {relevantCourses.length > 0 && (
                <div className="education_card_courses">
                  <h5 className="education_card_courses_title">Relevant Coursework:</h5>
                  <div className="education_card_courses_list">
                    {relevantCourses.map((course, courseIndex) => (
                      <span key={courseIndex} className="education_card_course_tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EducationCard;
