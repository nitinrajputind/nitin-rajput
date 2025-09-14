"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiCode, FiDatabase, FiTool, FiHeart, FiStar, FiTrendingUp } from "react-icons/fi";
import SvgIcon from "@/components/svg/SvgIcon";
import "./skill.scss";
import { technoolgy } from "@/constants/constants";

interface SkillItem {
  name: string;
  icon: string;
  proficiency?: number;
}

interface SkillCategory {
  name: string;
  skill: SkillItem[];
}

type ViewMode = 'cards' | 'grid' | 'list' | 'radar';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('frontend') || name.includes('language')) return FiCode;
    if (name.includes('backend') || name.includes('database')) return FiDatabase;
    if (name.includes('tools')) return FiTool;
    if (name.includes('soft')) return FiHeart;
    return FiCode;
  };



  const filteredCategories = activeCategory 
    ? technoolgy.filter(category => category.name === activeCategory)
    : technoolgy;

  return (
    <section className="skills section" id="skills">
      <motion.div 
        className="skills_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="skills_header" variants={itemVariants}>
          <h2 className="skills_title">
            <span className="skills_title_number">02.</span>
            Skills & Technologies
          </h2>
          <div className="skills_title_line"></div>
        </motion.div>

        <motion.p className="skills_description" variants={itemVariants}>
          Here are some of the technologies and tools I&apos;ve been working with recently. 
          I&apos;m always eager to learn new technologies and stay up-to-date with the latest industry trends.
        </motion.p>

        {/* Category Filter Tabs */}
        <motion.div className="skills_categories" variants={itemVariants}>
          <motion.button
            className={`skills_category_btn ${activeCategory === null ? 'active' : ''}`}
            onClick={() => setActiveCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiStar className="skills_category_icon" />
            All Skills
          </motion.button>
          {technoolgy.map((category) => {
            const IconComponent = getCategoryIcon(category.name);
  return (
              <motion.button
                key={category.name}
                className={`skills_category_btn ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="skills_category_icon" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div className="skills_view_toggle" variants={itemVariants}>
          <div className="skills_view_buttons">
            <button
              className={`skills_view_btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              Cards
            </button>
            <button
              className={`skills_view_btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`skills_view_btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button
              className={`skills_view_btn ${viewMode === 'radar' ? 'active' : ''}`}
              onClick={() => setViewMode('radar')}
            >
              Radar
            </button>
          </div>
        </motion.div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeCategory}-${viewMode}`}
            className={`skills_content skills_content--${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {viewMode === 'cards' && (
              <div className="skills_cards">
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    className="skills_card"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(var(--theme-color-rgb), 0.2)"
                    }}
                  >
                    <div className="skills_card_header">
                      {React.createElement(getCategoryIcon(category.name), {
                        className: "skills_card_icon"
                      })}
                      <h3 className="skills_card_title">{category.name}</h3>
                      <span className="skills_card_count">{category.skill.length}</span>
                    </div>
                    <div className="skills_card_items">
                      {category.skill.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="skills_card_item"
                          variants={skillVariants}
                          whileHover={{ scale: 1.1, zIndex: 10 }}
                          onHoverStart={() => setHoveredSkill(skill.name)}
                          onHoverEnd={() => setHoveredSkill(null)}
                        >
                          <div className="skills_card_item_icon">
                            <SvgIcon
                              name={skill.icon}
                              width={32}
                              height={32}
                              className="skills_icon"
                            />
                          </div>
                          <span className="skills_card_item_name">{skill.name}</span>
                          <AnimatePresence>
                            {hoveredSkill === skill.name && (
                              <motion.div
                                className="skills_card_item_tooltip"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                              >
                                <div className="skills_tooltip_proficiency">
                                  <span>Proficiency: {skill.proficiency || 80}%</span>
                                   <div className="skills_tooltip_bar">
                                     <motion.div
                                       className="skills_tooltip_bar_fill"
                                       initial={{ width: 0 }}
                                       animate={{ width: `${skill.proficiency || 80}%` }}
                                       transition={{ duration: 0.5, ease: "easeOut" }}
                                     />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="skills_grid_modern">
                {filteredCategories.flatMap(category =>
                  category.skill.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="skills_grid_item"
                      variants={skillVariants}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 10,
                        boxShadow: "0 15px 30px rgba(var(--theme-color-rgb), 0.3)"
                      }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      <div className="skills_grid_item_content">
                        <div className="skills_grid_item_icon">
                          <SvgIcon
                            name={skill.icon}
                            width={40}
                            height={40}
                            className="skills_icon"
                          />
                        </div>
                        <h4 className="skills_grid_item_name">{skill.name}</h4>
                        <div className="skills_grid_item_proficiency">
                          <div className="skills_proficiency_bar">
                             <motion.div
                               className="skills_proficiency_fill"
                               initial={{ width: 0 }}
                               animate={{ width: `${skill.proficiency || 80}%` }}
                               transition={{ duration: 1, delay: 0.2 }}
                             />
                           </div>
                           <span className="skills_proficiency_text">
                             {skill.proficiency || 80}%
                           </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="skills_list">
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    className="skills_list_category"
                    variants={itemVariants}
                  >
                    <div className="skills_list_category_header">
                      {React.createElement(getCategoryIcon(category.name), {
                        className: "skills_list_category_icon"
                      })}
                      <h3 className="skills_list_category_title">{category.name}</h3>
                      <FiTrendingUp className="skills_list_category_trend" />
                    </div>
                    <div className="skills_list_items">
                      {category.skill.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="skills_list_item"
                          variants={skillVariants}
                          whileHover={{ x: 10, backgroundColor: "rgba(var(--theme-color-rgb), 0.1)" }}
                        >
                          <div className="skills_list_item_info">
                            <div className="skills_list_item_icon">
                              <SvgIcon
                                name={skill.icon}
                                width={24}
                                height={24}
                                className="skills_icon"
                              />
                            </div>
                            <span className="skills_list_item_name">{skill.name}</span>
                          </div>
                          <div className="skills_list_item_proficiency">
                            <div className="skills_list_proficiency_bar">
                               <motion.div
                                 className="skills_list_proficiency_fill"
                                 initial={{ width: 0 }}
                                 animate={{ width: `${skill.proficiency || 80}%` }}
                                 transition={{ duration: 0.8, delay: index * 0.1 }}
                               />
                             </div>
                             <span className="skills_list_proficiency_text">
                               {skill.proficiency || 80}%
                             </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
      </div>
            )}

            {viewMode === 'radar' && (
              <div className="skills_radar">
                <div className="skills_radar_info">
                  <h3 className="skills_radar_title">Top Skills Radar</h3>
                  <p className="skills_radar_subtitle">
                    Displaying top 8 skills by proficiency level
                  </p>
                </div>
                <div className="skills_radar_container">
                  <div className="skills_radar_chart">
                    <svg
                      className="skills_radar_svg"
                      viewBox="0 0 400 400"
                      width="400"
                      height="400"
                    >
                      {/* Radar Grid */}
                      <g className="skills_radar_grid">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <circle
                            key={level}
                            cx="200"
                            cy="200"
                            r={level * 30}
                            fill="none"
                            stroke="rgba(157, 0, 255, 0.1)"
                            strokeWidth="1"
                          />
                        ))}
                        {/* Grid Lines */}
                        {Array.from({ length: 8 }, (_, i) => {
                          const angle = (i * 45) * (Math.PI / 180);
                          const x2 = 200 + Math.cos(angle - Math.PI / 2) * 150;
                          const y2 = 200 + Math.sin(angle - Math.PI / 2) * 150;
                          return (
                            <line
                              key={i}
                              x1="200"
                              y1="200"
                              x2={x2}
                              y2={y2}
                              stroke="rgba(157, 0, 255, 0.1)"
                              strokeWidth="1"
                            />
                          );
                        })}
                      </g>

                      {/* Skill Points */}
                      <g className="skills_radar_points">
                        {(() => {
                          // Get top skills by proficiency, limit to 8 for clean display
                          const allSkills = filteredCategories.flatMap(category => category.skill);
                          const topSkills = allSkills
                            .sort((a, b) => (b.proficiency || 80) - (a.proficiency || 80))
                            .slice(0, 8);
                          
                          return topSkills.map((skill, index) => {
                            const totalSkills = topSkills.length;
                            const angle = (index * (360 / totalSkills)) * (Math.PI / 180);
                            const proficiency = skill.proficiency || 80;
                            const radius = (proficiency / 100) * 140; // Slightly smaller radius
                            const x = 200 + Math.cos(angle - Math.PI / 2) * radius;
                            const y = 200 + Math.sin(angle - Math.PI / 2) * radius;
                            
                            // Calculate label position with better spacing
                            const labelRadius = 165;
                            const labelX = 200 + Math.cos(angle - Math.PI / 2) * labelRadius;
                            const labelY = 200 + Math.sin(angle - Math.PI / 2) * labelRadius;
                            
                            // Determine text anchor based on position
                            let textAnchor = "middle";
                            if (labelX < 180) textAnchor = "end";
                            else if (labelX > 220) textAnchor = "start";
                            
                            return (
                              <g key={skill.name}>
                                <motion.circle
                                  cx={x}
                                  cy={y}
                                  r="8"
                                  fill="var(--theme-color)"
                                  stroke="white"
                                  strokeWidth="3"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: index * 0.1, duration: 0.5 }}
                                  whileHover={{ scale: 1.3 }}
                                />
                                {/* Connection line from center */}
                                <motion.line
                                  x1="200"
                                  y1="200"
                                  x2={x}
                                  y2={y}
                                  stroke="rgba(157, 0, 255, 0.3)"
                                  strokeWidth="1"
                                  strokeDasharray="3,3"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                                />
                                {/* Skill Labels with better positioning */}
                                <motion.text
                                  x={labelX}
                                  y={labelY}
                                  textAnchor={textAnchor}
                                  dominantBaseline="middle"
                                  fill="var(--lightest-slate)"
                                  fontSize="11"
                                  fontWeight="600"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                                >
                                  {skill.name}
                                </motion.text>
                                {/* Proficiency percentage */}
                                <motion.text
                                  x={labelX}
                                  y={labelY + 12}
                                  textAnchor={textAnchor}
                                  dominantBaseline="middle"
                                  fill="var(--theme-color)"
                                  fontSize="9"
                                  fontWeight="500"
                                  fontFamily="var(--fira-code)"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                                >
                                  {proficiency}%
                                </motion.text>
                              </g>
                            );
                          });
                        })()}
                      </g>

                      {/* Radar Area */}
                      <motion.polygon
                        points={(() => {
                          const allSkills = filteredCategories.flatMap(category => category.skill);
                          const topSkills = allSkills
                            .sort((a, b) => (b.proficiency || 80) - (a.proficiency || 80))
                            .slice(0, 8);
                          
                          return topSkills.map((skill, index) => {
                            const totalSkills = topSkills.length;
                            const angle = (index * (360 / totalSkills)) * (Math.PI / 180);
                            const proficiency = skill.proficiency || 80;
                            const radius = (proficiency / 100) * 140;
                            const x = 200 + Math.cos(angle - Math.PI / 2) * radius;
                            const y = 200 + Math.sin(angle - Math.PI / 2) * radius;
                            return `${x},${y}`;
                          }).join(' ');
                        })()}
                        fill="rgba(157, 0, 255, 0.15)"
                        stroke="var(--theme-color)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>

                  {/* Radar Legend */}
                  <div className="skills_radar_legend">
                    <div className="skills_radar_legend_title">Skill Proficiency</div>
                    <div className="skills_radar_legend_levels">
                      {[
                        { level: 5, label: 'Expert', range: '90-100%' },
                        { level: 4, label: 'Advanced', range: '80-89%' },
                        { level: 3, label: 'Intermediate', range: '70-79%' },
                        { level: 2, label: 'Beginner', range: '60-69%' },
                        { level: 1, label: 'Learning', range: '0-59%' }
                      ].map((item) => (
                        <div key={item.level} className="skills_radar_legend_item">
                          <div 
                            className="skills_radar_legend_dot"
                            style={{ 
                              backgroundColor: `rgba(157, 0, 255, ${item.level * 0.2})` 
                            }}
                          />
                          <div className="skills_radar_legend_content">
                            <span className="skills_radar_legend_label">{item.label}</span>
                            <span className="skills_radar_legend_range">{item.range}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Summary */}
                <div className="skills_radar_summary">
                  <div className="skills_radar_stats">
                    <div className="skills_radar_stat">
                      <span className="skills_radar_stat_number">
                        {filteredCategories.reduce((acc, cat) => acc + cat.skill.length, 0)}
                      </span>
                      <span className="skills_radar_stat_label">Total Skills</span>
                    </div>
                    <div className="skills_radar_stat">
                      <span className="skills_radar_stat_number">
                        {Math.round(
                          filteredCategories.flatMap(cat => cat.skill)
                            .reduce((acc, skill) => acc + (skill.proficiency || 80), 0) /
                          filteredCategories.flatMap(cat => cat.skill).length
                        )}%
                      </span>
                      <span className="skills_radar_stat_label">Average Proficiency</span>
                    </div>
                    <div className="skills_radar_stat">
                      <span className="skills_radar_stat_number">
                        {filteredCategories.length}
                      </span>
                      <span className="skills_radar_stat_label">Categories</span>
                    </div>
                  </div>
      </div>
    </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
