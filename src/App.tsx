/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

// Data types & service
import {
  Profile,
  SocialLink,
  Skill,
  Technology,
  Project,
  Experience,
  Education,
  Certification,
  Achievement,
  Service,
  Testimonial,
  SiteSettings,
  ContactMessage,
} from './types/portfolio.ts';

import {
  initialProfile,
  initialSocialLinks,
  initialSkills,
  initialTechnologies,
  initialProjects,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialAchievements,
  initialServices,
  initialTestimonials,
  initialSiteSettings,
} from './lib/initialData.ts';

import {
  subscribeProfile,
  subscribeSiteSettings,
  subscribeSocialLinks,
  subscribeSkills,
  subscribeTechnologies,
  subscribeProjects,
  subscribeExperiences,
  subscribeEducations,
  subscribeCertifications,
  subscribeAchievements,
  subscribeServices,
  subscribeTestimonials,
  subscribeContactMessages,
} from './lib/portfolioService.ts';

// Public Components
import { Navbar } from './components/navbar/Navbar.tsx';
import { Hero } from './components/hero/Hero.tsx';
import { About } from './components/about/About.tsx';
import { Skills } from './components/skills/Skills.tsx';
import { Services } from './components/services/Services.tsx';
import { Projects } from './components/projects/Projects.tsx';
import { Experience as ExperienceComponent } from './components/experience/Experience.tsx';
import { Credentials } from './components/credentials/Credentials.tsx';
import { Testimonials } from './components/testimonials/Testimonials.tsx';
import { Contact } from './components/contact/Contact.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { ResumeModal } from './components/resume/ResumeModal.tsx';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';

function MainApp() {
  const { isAdmin } = useAuth();

  // Firestore real-time states
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [technologies, setTechnologies] = useState<Technology[]>(initialTechnologies);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Navigation & View state
  const [route, setRoute] = useState<'home' | 'admin' | 'project-detail'>('home');
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Sync route with window hash/path
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') {
        setRoute('admin');
      } else if (hash.startsWith('#projects/')) {
        const slug = hash.replace('#projects/', '');
        setActiveProjectSlug(slug);
        setRoute('project-detail');
      } else if (route === 'admin' && hash !== '#admin') {
        // Returned from admin
        setRoute('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [route]);

  // Key combination: Ctrl+Shift+A or Cmd+Shift+A opens secret admin console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setRoute((prev) => (prev === 'admin' ? 'home' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subscribe to all Firestore collections
  useEffect(() => {
    const unsubProfile = subscribeProfile(setProfile);
    const unsubSettings = subscribeSiteSettings(setSettings);
    const unsubSocials = subscribeSocialLinks(setSocialLinks);
    const unsubSkills = subscribeSkills(setSkills);
    const unsubTechs = subscribeTechnologies(setTechnologies);
    const unsubProjects = subscribeProjects(setProjects);
    const unsubExperiences = subscribeExperiences(setExperiences);
    const unsubEducations = subscribeEducations(setEducations);
    const unsubCerts = subscribeCertifications(setCertifications);
    const unsubAchs = subscribeAchievements(setAchievements);
    const unsubServices = subscribeServices(setServices);
    const unsubTestimonials = subscribeTestimonials(setTestimonials);
    const unsubMessages = subscribeContactMessages(setMessages);

    return () => {
      unsubProfile();
      unsubSettings();
      unsubSocials();
      unsubSkills();
      unsubTechs();
      unsubProjects();
      unsubExperiences();
      unsubEducations();
      unsubCerts();
      unsubAchs();
      unsubServices();
      unsubTestimonials();
      unsubMessages();
    };
  }, []);

  // Update dynamic document title and description
  useEffect(() => {
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
  }, [settings.siteTitle]);

  // Intersection observer for active navigation section
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'services', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ADMIN ROUTE
  if (route === 'admin') {
    if (!isAdmin) {
      return (
        <AdminLogin
          onBackToSite={() => {
            window.location.hash = '';
            setRoute('home');
          }}
          onSuccess={() => setRoute('admin')}
        />
      );
    }

    return (
      <AdminDashboard
        profile={profile}
        socialLinks={socialLinks}
        skills={skills}
        technologies={technologies}
        projects={projects}
        experiences={experiences}
        educations={educations}
        certifications={certifications}
        achievements={achievements}
        services={services}
        testimonials={testimonials}
        settings={settings}
        messages={messages}
        onExitAdmin={() => {
          window.location.hash = '';
          setRoute('home');
        }}
      />
    );
  }

  // PUBLIC PORTFOLIO VIEW
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-blue-500/20 selection:text-blue-500 transition-colors duration-200">
      
      {/* Navbar */}
      <Navbar
        profile={profile}
        settings={settings}
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section */}
        {settings.sectionsEnabled.hero && (
          <div id="hero">
            <Hero
              profile={profile}
              socialLinks={socialLinks}
              onOpenResume={() => setIsResumeOpen(true)}
            />
          </div>
        )}

        {/* About Section */}
        {settings.sectionsEnabled.about && (
          <About profile={profile} />
        )}

        {/* Skills & Tech Section */}
        {settings.sectionsEnabled.skills && (
          <Skills skills={skills} technologies={technologies} />
        )}

        {/* Services Section */}
        {settings.sectionsEnabled.services && (
          <Services services={services} />
        )}

        {/* Projects Showcase Section */}
        {settings.sectionsEnabled.projects && (
          <Projects
            projects={projects}
            onSelectProjectSlug={(slug) => {
              window.location.hash = `projects/${slug}`;
            }}
          />
        )}

        {/* Experience Timeline Section */}
        {settings.sectionsEnabled.experience && (
          <ExperienceComponent experiences={experiences} />
        )}

        {/* Credentials & Honors Section */}
        {(settings.sectionsEnabled.education || settings.sectionsEnabled.certifications || settings.sectionsEnabled.achievements) && (
          <Credentials
            educations={educations}
            certifications={certifications}
            achievements={achievements}
          />
        )}

        {/* Testimonials Section */}
        {settings.sectionsEnabled.testimonials && (
          <Testimonials testimonials={testimonials} />
        )}

        {/* Contact Form Section */}
        {settings.sectionsEnabled.contact && (
          <Contact profile={profile} />
        )}
      </main>

      {/* Footer */}
      {settings.sectionsEnabled.footer && (
        <Footer profile={profile} socialLinks={socialLinks} />
      )}

      {/* Interactive Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        experiences={experiences}
        educations={educations}
        skills={skills}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
