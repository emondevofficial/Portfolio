import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { Profile, SiteSettings } from '../../types/portfolio.ts';

interface NavbarProps {
  profile: Profile;
  settings: SiteSettings;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, settings, onOpenResume, activeSection }) => {
  const { actualTheme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: settings.navigationLabels?.about || 'About', href: '#about', id: 'about', enabled: settings.sectionsEnabled.about },
    { label: settings.navigationLabels?.skills || 'Skills & Tech', href: '#skills', id: 'skills', enabled: settings.sectionsEnabled.skills },
    { label: settings.navigationLabels?.projects || 'Selected Work', href: '#projects', id: 'projects', enabled: settings.sectionsEnabled.projects },
    { label: settings.navigationLabels?.experience || 'Experience', href: '#experience', id: 'experience', enabled: settings.sectionsEnabled.experience },
    { label: settings.navigationLabels?.services || 'Services', href: '#services', id: 'services', enabled: settings.sectionsEnabled.services },
    { label: settings.navigationLabels?.contact || 'Contact', href: '#contact', id: 'contact', enabled: settings.sectionsEnabled.contact },
  ].filter(link => link.enabled);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            {profile.name || 'Alex Mercer'}
            <span className="text-blue-600 dark:text-blue-400 ml-1">.</span>
          </a>

          {/* Zone 2: 4-6 nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium transition-colors whitespace-nowrap py-1 relative ${
                    isActive
                      ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
              aria-label={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {actualTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Resume Button */}
            {settings.sectionsEnabled.resume && (
              <button
                onClick={onOpenResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 transition-colors whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            {/* Primary Action CTA */}
            {settings.sectionsEnabled.contact && (
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            {settings.sectionsEnabled.resume && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {actualTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
              <span>{actualTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
