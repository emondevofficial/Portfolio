import React from 'react';
import { motion } from 'motion/react';
import { Service } from '../../types/portfolio.ts';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';
import { Check } from 'lucide-react';

interface ServicesProps {
  services: Service[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const activeServices = services
    .filter(s => s.isEnabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            Consulting & Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
            How I partner with startups & enterprises.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            From greenfield architecture to scaling bottlenecks, delivering end-to-end technical outcomes with production discipline.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activeServices.map((service, idx) => (
            <motion.div
              key={service.id || service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                    <DynamicIcon name={service.icon} className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500 tabular-nums">
                    0{idx + 1}.
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Deliverable features */}
              <div className="space-y-3 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
                  Key Deliverables
                </span>
                <ul className="space-y-2">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
