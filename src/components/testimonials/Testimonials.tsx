import React from 'react';
import { motion } from 'motion/react';
import { Testimonial } from '../../types/portfolio.ts';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const activeTestimonials = testimonials
    .filter(t => t.isEnabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            Endorsements & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
            What engineering leaders say.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Feedback from engineering vice presidents, startup founders, and technical collaborators.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activeTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id || testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote content */}
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author attribution */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    {testimonial.name}
                  </h4>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {testimonial.role}, <span className="text-zinc-700 dark:text-zinc-300 font-medium">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
