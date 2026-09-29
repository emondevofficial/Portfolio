import React, { useState } from 'react';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  Mail,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  RefreshCw
} from 'lucide-react';
import { Project, Skill, Experience, ContactMessage, Profile } from '../../types/portfolio.ts';
import { seedDatabase } from '../../lib/portfolioService.ts';

interface AdminOverviewProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  messages: ContactMessage[];
  profile: Profile;
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  projects,
  skills,
  experiences,
  messages,
  profile,
  onNavigateTab,
}) => {
  const [seeding, setSeeding] = useState(false);
  const [seedProgress, setSeedProgress] = useState('');
  const [seedSuccess, setSeedSuccess] = useState(false);

  const unreadMessages = messages.filter((m) => !m.isRead);

  const handleSeed = async () => {
    if (!window.confirm('This will populate or restore default production portfolio items in Firestore. Continue?')) {
      return;
    }

    try {
      setSeeding(true);
      setSeedSuccess(false);
      await seedDatabase((msg) => setSeedProgress(msg));
      setSeedSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to seed database. Check console for details.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Connected to Firestore Database</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile.name || 'Alex'}
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            Manage your personal portfolio CMS. All edits are updated live in the Cloud Firestore database and reflected immediately on the public website.
          </p>
        </div>

        {/* Database Seed Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            <span>{seeding ? seedProgress || 'Syncing...' : 'Sync / Seed Initial Data'}</span>
          </button>
        </div>
      </div>

      {seedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Production portfolio items synchronized successfully to Firestore!</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2 cursor-pointer hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Projects</span>
            <FolderGit2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {projects.length}
          </div>
          <div className="text-xs text-zinc-500">
            {projects.filter((p) => p.isPublished).length} published
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('skills')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2 cursor-pointer hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Skills</span>
            <Cpu className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {skills.length}
          </div>
          <div className="text-xs text-zinc-500">
            Across 5 categories
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('experience')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2 cursor-pointer hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Experience</span>
            <Briefcase className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {experiences.length}
          </div>
          <div className="text-xs text-zinc-500">
            Career milestones
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('messages')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2 cursor-pointer hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Inquiries</span>
            <Mail className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tabular-nums flex items-center gap-2">
            <span>{messages.length}</span>
            {unreadMessages.length > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                {unreadMessages.length} new
              </span>
            )}
          </div>
          <div className="text-xs text-zinc-500">
            Contact submissions
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Inquiries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Recent Inquiries
            </h3>
            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="text-xs text-zinc-400 py-8 text-center">
              No inquiries received yet. Submit a test message on the public portfolio.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id || msg.createdAt}
                  onClick={() => onNavigateTab('messages')}
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 space-y-1 cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {msg.name}
                    </span>
                    {!msg.isRead && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        Unread
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                    {msg.subject}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Projects */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Active Projects Showcase
            </h3>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id || proj.slug}
                onClick={() => onNavigateTab('projects')}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 cursor-pointer hover:border-blue-400 transition-colors"
              >
                <div className="w-12 h-9 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-700 shrink-0">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {proj.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate">
                    {proj.category} · {proj.technologies.slice(0, 3).join(', ')}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    proj.isPublished
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-zinc-500/10 text-zinc-400'
                  }`}
                >
                  {proj.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
