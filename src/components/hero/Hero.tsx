import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, FileText, Send, MapPin, CheckCircle2 } from 'lucide-react';
import { Profile, SocialLink } from '../../types/portfolio.ts';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, socialLinks, onOpenResume }) => {
  const activeSocials = socialLinks.filter(s => s.isEnabled).slice(0, 5);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Typography & Bio */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status & Location line */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            {profile.isAvailableForHire && (
              <span className="inline-flex items-center gap-2 font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{profile.statusText || 'Available for projects'}</span>
              </span>
            )}
            {profile.isAvailableForHire && <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">·</span>}
            <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location || 'San Francisco, CA'}</span>
            </span>
          </div>

          {/* Main Title & Name */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1] max-w-2xl text-balance">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-blue-600 dark:text-blue-400 tracking-tight">
              {profile.title}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {profile.shortIntro || profile.tagline}
          </p>

          {/* Actions & Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl transition-all shadow-xs"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Social Links Row */}
          {activeSocials.length > 0 && (
            <div className="pt-4 flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 mr-1">
                Connect:
              </span>
              {activeSocials.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 transition-all"
                >
                  <DynamicIcon name={link.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column: Visual Portrait & Key Metrics Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Image Container with hairline border & clean radius */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/5">
              <img
                src={profile.avatarUrl || '/src/assets/images/hero_dev_portrait_1790704527613.jpg'}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Quantitative Stat Card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-lg space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Engineering Track Record
                </span>
              </div>
              <div className="flex items-center gap-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm tabular-nums">
                    {profile.yearsOfExperience}+
                  </span>{' '}
                  Years Exp
                </div>
                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm tabular-nums">
                    {profile.completedProjects}+
                  </span>{' '}
                  Projects
                </div>
              </div>
            </div>

            {/* Architecture Focus Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-zinc-900/90 dark:bg-zinc-800/90 text-white backdrop-blur-md border border-zinc-700/50 rounded-xl px-3 py-1.5 shadow-md text-xs font-mono">
              <span>TypeScript · Go · Postgres</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
