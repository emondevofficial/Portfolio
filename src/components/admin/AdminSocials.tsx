import React, { useState } from 'react';
import { SocialLink } from '../../types/portfolio.ts';
import { createSocialLink, updateSocialLink, deleteSocialLink } from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, Eye, EyeOff, Globe } from 'lucide-react';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';

interface AdminSocialsProps {
  socialLinks: SocialLink[];
}

export const AdminSocials: React.FC<AdminSocialsProps> = ({ socialLinks }) => {
  const [editingLink, setEditingLink] = useState<Partial<SocialLink> | null>(null);

  const platforms: SocialLink['platform'][] = [
    'github',
    'linkedin',
    'twitter',
    'youtube',
    'instagram',
    'email',
    'website',
    'other',
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink?.url) return;
    if (editingLink.id) {
      await updateSocialLink(editingLink.id, editingLink);
    } else {
      await createSocialLink(editingLink as Omit<SocialLink, 'id'>);
    }
    setEditingLink(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Social Profiles & Links ({socialLinks.length})
          </h2>
          <p className="text-xs text-zinc-500">
            Manage public links to GitHub, LinkedIn, X, email, and blogs.
          </p>
        </div>

        <button
          onClick={() => setEditingLink({ platform: 'github', label: 'GitHub', url: 'https://github.com', icon: 'Github', isEnabled: true, order: socialLinks.length + 1 })}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {socialLinks.map((link) => (
          <div
            key={link.id || link.platform}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <DynamicIcon name={link.icon} className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                  {link.label}
                </div>
                <div className="text-xs text-zinc-400 truncate max-w-44">
                  {link.url}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => link.id && updateSocialLink(link.id, { isEnabled: !link.isEnabled })}
                className={`p-1.5 rounded-lg border text-xs ${
                  link.isEnabled ? 'text-emerald-500 border-emerald-500/20' : 'text-zinc-400'
                }`}
              >
                {link.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setEditingLink(link)} className="p-1.5 text-zinc-400 hover:text-blue-500">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => link.id && deleteSocialLink(link.id)} className="p-1.5 text-zinc-400 hover:text-rose-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Social Link Details</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Platform</label>
                <select
                  value={editingLink.platform || 'github'}
                  onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Label</label>
                <input
                  type="text"
                  required
                  value={editingLink.label || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">URL</label>
                <input
                  type="text"
                  required
                  value={editingLink.url || ''}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Icon Name</label>
                <input
                  type="text"
                  value={editingLink.icon || 'Globe'}
                  onChange={(e) => setEditingLink({ ...editingLink, icon: e.target.value })}
                  placeholder="Github, Linkedin, Twitter, Mail, Globe"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setEditingLink(null)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
