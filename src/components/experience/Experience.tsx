import React from 'react';
import { motion } from 'motion/react';
import { Experience as ExperienceType } from '../../types/portfolio.ts';
import { Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            Career Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
            Work experience & leadership.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Track record of shipping mission-critical systems and scaling engineering teams.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-6 space-y-12">
          {sortedExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id || `${exp.company}-${exp.startDate}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline marker node */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-950 transition-colors ${
                  exp.isCurrent
                    ? 'bg-blue-600 dark:bg-blue-400 ring-4 ring-blue-500/20'
                    : 'bg-zinc-400 dark:bg-zinc-600'
                }`}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                
                {/* Header line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1 font-mono font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Narrative description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievement Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
