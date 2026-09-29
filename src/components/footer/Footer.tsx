import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Profile, SocialLink } from '../../types/portfolio.ts';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';

interface FooterProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ profile, socialLinks }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSocials = socialLinks.filter(s => s.isEnabled);

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="text-center sm:text-left space-y-1">
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {profile.name} <span className="font-normal text-zinc-500">· Senior Full-Stack Engineer</span>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} All rights reserved. Designed with precision & type safety.
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {activeSocials.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
            >
              <DynamicIcon name={link.icon} className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
