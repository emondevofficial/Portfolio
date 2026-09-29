import React, { useState } from 'react';
import { Experience } from '../../types/portfolio.ts';
import { createExperience, updateExperience, deleteExperience } from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, Building2, Calendar, MapPin } from 'lucide-react';

interface AdminExperienceProps {
  experiences: Experience[];
}

export const AdminExperience: React.FC<AdminExperienceProps> = ({ experiences }) => {
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyExp: Partial<Experience> = {
    company: '',
    position: '',
    location: 'San Francisco, CA',
    startDate: '2024',
    endDate: 'Present',
    isCurrent: true,
    description: '',
    highlights: [''],
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
    order: experiences.length + 1,
  };

  const handleStartCreate = () => {
    setEditingExp(emptyExp);
    setIsCreating(true);
  };

  const handleStartEdit = (exp: Experience) => {
    setEditingExp(exp);
    setIsCreating(false);
  };

  const handleDelete = async (id: string, company: string) => {
    if (!window.confirm(`Delete experience at "${company}"?`)) return;
    try {
      setLoading(true);
      await deleteExperience(id);
    } catch (err) {
      console.error(err);
      alert('Failed to delete experience.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.company || !editingExp?.position) return;

    try {
      setLoading(true);
      if (isCreating) {
        await createExperience(editingExp as Omit<Experience, 'id'>);
      } else if (editingExp.id) {
        await updateExperience(editingExp.id, editingExp);
      }
      setEditingExp(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save experience.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Work Experience Timeline ({experiences.length})
          </h2>
          <p className="text-xs text-zinc-500">
            Chronological engineering roles, key responsibilities, and architectural milestones.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id || `${exp.company}-${exp.startDate}`}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {exp.position}
                </h3>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  @ {exp.company}
                </span>
                {exp.isCurrent && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                    Current
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <span>{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</span>
                <span>·</span>
                <span>{exp.location}</span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 max-w-2xl">
                {exp.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleStartEdit(exp)}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => exp.id && handleDelete(exp.id, exp.company)}
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Edit Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isCreating ? 'Add Career Experience' : `Edit Role at ${editingExp.company}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Company Name</label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Role Title</label>
                  <input
                    type="text"
                    required
                    value={editingExp.position || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Start Date</label>
                  <input
                    type="text"
                    required
                    value={editingExp.startDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    placeholder="2022"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">End Date</label>
                  <input
                    type="text"
                    disabled={editingExp.isCurrent}
                    value={editingExp.endDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isCurrentExp"
                  checked={editingExp.isCurrent ?? false}
                  onChange={(e) => setEditingExp({ ...editingExp, isCurrent: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <label htmlFor="isCurrentExp" className="text-xs font-semibold cursor-pointer">
                  Currently employed here
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Overview Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Key Achievements / Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingExp.highlights?.join('\n') || ''}
                  onChange={(e) => setEditingExp({
                    ...editingExp,
                    highlights: e.target.value.split('\n').filter(Boolean)
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingExp.technologies?.join(', ') || ''}
                  onChange={(e) => setEditingExp({
                    ...editingExp,
                    technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
