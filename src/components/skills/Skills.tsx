import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill, Technology } from '../../types/portfolio.ts';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';

interface SkillsProps {
  skills: Skill[];
  technologies: Technology[];
}

export const Skills: React.FC<SkillsProps> = ({ skills, technologies }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Architecture & Tools'];

  const filteredSkills = skills
    .filter(s => s.isEnabled)
    .filter(s => (activeCategory === 'All' ? true : s.category === activeCategory))
    .sort((a, b) => a.order - b.order);

  const featuredTechs = technologies.filter(t => t.isFeatured).sort((a, b) => a.order - b.order);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
              Technical Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
              Skills, runtimes & modern stack.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              A comprehensive toolkit honed across millions of production requests, from browser pixel rendering to multi-region database replication.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-200/60 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id || skill.name}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400">
                      <DynamicIcon name={skill.icon} className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Proficiency progress bar */}
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                {skill.description && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {skill.description}
                  </p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Ecosystem Technologies */}
        {featuredTechs.length > 0 && (
          <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
              Daily Ecosystem & Tooling
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {featuredTechs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  <DynamicIcon name={tech.icon} className="w-3.5 h-3.5 text-blue-500" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
