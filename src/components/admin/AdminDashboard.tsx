import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';
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
} from '../../types/portfolio.ts';

// Admin Sub-Panels
import { AdminOverview } from './AdminOverview.tsx';
import { AdminProfile } from './AdminProfile.tsx';
import { AdminProjects } from './AdminProjects.tsx';
import { AdminExperience } from './AdminExperience.tsx';
import { AdminSkills } from './AdminSkills.tsx';
import { AdminServices } from './AdminServices.tsx';
import { AdminCredentials } from './AdminCredentials.tsx';
import { AdminTestimonials } from './AdminTestimonials.tsx';
import { AdminSocials } from './AdminSocials.tsx';
import { AdminMessages } from './AdminMessages.tsx';
import { AdminSettings } from './AdminSettings.tsx';
import { AdminMedia } from './AdminMedia.tsx';

import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  Cpu,
  Layout,
  GraduationCap,
  MessageSquare,
  Share2,
  Inbox,
  Settings,
  Image,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';

interface AdminDashboardProps {
  profile: Profile;
  socialLinks: SocialLink[];
  skills: Skill[];
  technologies: Technology[];
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  services: Service[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  messages: ContactMessage[];
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  profile,
  socialLinks,
  skills,
  technologies,
  projects,
  experiences,
  educations,
  certifications,
  achievements,
  services,
  testimonials,
  settings,
  messages,
  onExitAdmin,
}) => {
  const { user, logout } = useAuth();
  const { actualTheme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Bio', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: projects.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, badge: experiences.length },
    { id: 'skills', label: 'Skills & Tech', icon: Cpu, badge: skills.length },
    { id: 'services', label: 'Services', icon: Layout, badge: services.length },
    { id: 'credentials', label: 'Credentials', icon: GraduationCap },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, badge: testimonials.length },
    { id: 'socials', label: 'Social Links', icon: Share2, badge: socialLinks.length },
    { id: 'messages', label: 'Inquiries', icon: Inbox, badge: unreadCount > 0 ? `${unreadCount} new` : undefined, isAlert: unreadCount > 0 },
    { id: 'settings', label: 'Site Settings & SEO', icon: Settings },
    { id: 'media', label: 'Media Assets', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-sm">Portfolio CMS</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500"
          >
            {actualTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onExitAdmin}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500"
            title="View Live Portfolio"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-4 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div>
              <div className="font-bold text-base tracking-tight flex items-center gap-1.5">
                <span>Admin CMS</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold">
                  v2.0
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-mono truncate max-w-44">
                {user?.email || 'deve3859@gmail.com'}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        item.isAlert
                          ? 'bg-rose-500 text-white font-bold'
                          : isActive
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-blue-500" />
            <span>Public Portfolio</span>
          </button>

          <div className="flex items-center justify-between px-1 pt-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs flex items-center gap-1.5"
            >
              {actualTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              <span>{actualTheme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-xl text-zinc-500 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs flex items-center gap-1.5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto min-h-screen">
        {activeTab === 'overview' && (
          <AdminOverview
            projects={projects}
            skills={skills}
            experiences={experiences}
            messages={messages}
            profile={profile}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'profile' && <AdminProfile profile={profile} />}

        {activeTab === 'projects' && <AdminProjects projects={projects} />}

        {activeTab === 'experience' && <AdminExperience experiences={experiences} />}

        {activeTab === 'skills' && <AdminSkills skills={skills} technologies={technologies} />}

        {activeTab === 'services' && <AdminServices services={services} />}

        {activeTab === 'credentials' && (
          <AdminCredentials
            educations={educations}
            certifications={certifications}
            achievements={achievements}
          />
        )}

        {activeTab === 'testimonials' && <AdminTestimonials testimonials={testimonials} />}

        {activeTab === 'socials' && <AdminSocials socialLinks={socialLinks} />}

        {activeTab === 'messages' && <AdminMessages messages={messages} />}

        {activeTab === 'settings' && <AdminSettings settings={settings} />}

        {activeTab === 'media' && <AdminMedia />}
      </main>

    </div>
  );
};
