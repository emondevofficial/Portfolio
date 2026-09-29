import React from 'react';
import { motion } from 'motion/react';
import { Profile } from '../../types/portfolio.ts';
import { Briefcase, Code2, Users, Sparkles } from 'lucide-react';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const stats = [
    { label: 'Years of Experience', value: `${profile.yearsOfExperience}+`, icon: Briefcase, note: 'Production systems' },
    { label: 'Completed Projects', value: `${profile.completedProjects}+`, icon: Code2, note: 'Shipped to production' },
    { label: 'Happy Clients & Teams', value: `${profile.happyClients}+`, icon: Users, note: 'Global collaboration' },
    { label: 'Technologies & Tools', value: `${profile.technologiesCount}+`, icon: Sparkles, note: 'Ecosystem mastery' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            Background & Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
            Engineering software with precision and scale.
          </h2>
        </div>

        {/* Grid: Narrative on left, Stats on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-100 text-lg sm:text-xl">
              {profile.bio}
            </p>

            <p>
              {profile.aboutText}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
                Core Engineering Tenets
              </h4>
              <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong>Zero-Compromise Type Safety:</strong> Catching edge cases at compile-time with strict TypeScript and deterministic schema contracts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong>Distributed Predictability:</strong> Building idempotent event streams, resilient caching layers, and graceful degradation during network partitions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong>Fluid Ergonomics:</strong> Crafting interfaces that respond sub-100ms with accessible keyboard flows and zero visual clutter.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="p-2 w-fit rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight tabular-nums pt-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {stat.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {stat.note}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
