import React, { useState } from 'react';
import { SiteSettings } from '../../types/portfolio.ts';
import { updateSiteSettings } from '../../lib/portfolioService.ts';
import { Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface AdminSettingsProps {
  settings: SiteSettings;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings }) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleToggleSection = (section: keyof SiteSettings['sectionsEnabled']) => {
    setFormData((prev) => ({
      ...prev,
      sectionsEnabled: {
        ...prev.sectionsEnabled,
        [section]: !prev.sectionsEnabled[section],
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccess(false);
      await updateSiteSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update site settings.');
    } finally {
      setSaving(false);
    }
  };

  const sectionsList: Array<{ key: keyof SiteSettings['sectionsEnabled']; label: string; desc: string }> = [
    { key: 'hero', label: 'Hero Section', desc: 'Main intro, avatar, social links, and CTAs' },
    { key: 'about', label: 'About & Bio', desc: 'Narrative biography and quantitative developer metrics' },
    { key: 'skills', label: 'Skills & Proficiency', desc: 'Categorized technical capabilities and progress bars' },
    { key: 'technologies', label: 'Ecosystem Technologies', desc: 'Featured stack badges' },
    { key: 'services', label: 'Consulting Services', desc: 'Service offerings, deliverables, and architecture advisory' },
    { key: 'projects', label: 'Selected Work & Projects', desc: 'Case studies, project filter, and detail modal' },
    { key: 'experience', label: 'Career Timeline', desc: 'Work history, positions, and company milestones' },
    { key: 'education', label: 'Education', desc: 'Degrees, universities, and academic honors' },
    { key: 'certifications', label: 'Certifications', desc: 'AWS, Google Cloud, and Kubernetes credentials' },
    { key: 'achievements', label: 'Achievements', desc: 'Open-source stats, hackathon awards, and speaking' },
    { key: 'testimonials', label: 'Testimonials', desc: 'Client and engineering leadership recommendations' },
    { key: 'resume', label: 'Resume / CV', desc: 'Modal view and print/download action' },
    { key: 'contact', label: 'Contact System', desc: 'Interactive contact form and direct coordinates' },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Site Settings & SEO Configuration
          </h2>
          <p className="text-xs text-zinc-500">
            Control dynamic SEO tags, social share previews, and public section visibility.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Site Settings</span>
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Site settings and section toggles updated in Firestore!</span>
        </div>
      )}

      {/* SEO Configuration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          SEO & Open Graph Meta Tags
        </h3>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Site Title</label>
            <input
              type="text"
              required
              value={formData.siteTitle || ''}
              onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Meta Description</label>
            <textarea
              rows={3}
              required
              value={formData.siteDescription || ''}
              onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Keywords (Comma separated)</label>
            <input
              type="text"
              value={formData.keywords || ''}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Author Name</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Social Share Image (OG Image)</label>
              <input
                type="text"
                value={formData.ogImage || ''}
                onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Enable/Disable Controls */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xs">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Portfolio Sections Visibility
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Toggle which sections appear on the live public portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectionsList.map((sec) => (
            <div
              key={sec.key}
              onClick={() => handleToggleSection(sec.key)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                formData.sectionsEnabled[sec.key]
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
                  : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 opacity-60'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {sec.label}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {sec.desc}
                </div>
              </div>

              <div
                className={`w-10 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  formData.sectionsEnabled[sec.key] ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    formData.sectionsEnabled[sec.key] ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
