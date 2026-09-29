import React, { useState } from 'react';
import { Skill, Technology } from '../../types/portfolio.ts';
import {
  createSkill,
  updateSkill,
  deleteSkill,
  createTechnology,
  updateTechnology,
  deleteTechnology
} from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, CheckCircle2, Eye, EyeOff, Layers, Terminal } from 'lucide-react';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';

interface AdminSkillsProps {
  skills: Skill[];
  technologies: Technology[];
}

export const AdminSkills: React.FC<AdminSkillsProps> = ({ skills, technologies }) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'technologies'>('skills');
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingTech, setEditingTech] = useState<Partial<Technology> | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Architecture & Tools'];

  const emptySkill: Partial<Skill> = {
    name: '',
    category: 'Frontend',
    proficiency: 90,
    icon: 'Code',
    order: skills.length + 1,
    isEnabled: true,
    description: '',
  };

  const emptyTech: Partial<Technology> = {
    name: '',
    category: 'Frontend',
    icon: 'Layers',
    isFeatured: true,
    order: technologies.length + 1,
  };

  // Skill Handlers
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) return;
    try {
      setLoading(true);
      if (editingSkill.id) {
        await updateSkill(editingSkill.id, editingSkill);
      } else {
        await createSkill(editingSkill as Omit<Skill, 'id'>);
      }
      setEditingSkill(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save skill.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await deleteSkill(id);
    } catch (err) {
      console.error(err);
    }
  };

  // Tech Handlers
  const handleSaveTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech?.name) return;
    try {
      setLoading(true);
      if (editingTech.id) {
        await updateTechnology(editingTech.id, editingTech);
      } else {
        await createTechnology(editingTech as Omit<Technology, 'id'>);
      }
      setEditingTech(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save technology.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTech = async (id: string, name: string) => {
    if (!window.confirm(`Delete technology "${name}"?`)) return;
    try {
      await deleteTechnology(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar with Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Skills & Ecosystem Technologies
          </h2>
          <p className="text-xs text-zinc-500">
            Configure technical proficiencies, categories, icons, and featured tech badges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'skills'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500'
              }`}
            >
              Skills ({skills.length})
            </button>
            <button
              onClick={() => setActiveTab('technologies')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'technologies'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500'
              }`}
            >
              Technologies ({technologies.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (activeTab === 'skills') setEditingSkill(emptySkill);
              else setEditingTech(emptyTech);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'skills' ? 'Skill' : 'Technology'}</span>
          </button>
        </div>
      </div>

      {/* Skills Tab Content */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id || skill.name}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400">
                  <DynamicIcon name={skill.icon} className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {skill.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    {skill.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => skill.id && updateSkill(skill.id, { isEnabled: !skill.isEnabled })}
                  className={`p-1.5 rounded-lg border text-xs ${
                    skill.isEnabled
                      ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                      : 'border-zinc-300 dark:border-zinc-700 text-zinc-400'
                  }`}
                >
                  {skill.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setEditingSkill(skill)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-blue-500"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => skill.id && handleDeleteSkill(skill.id, skill.name)}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technologies Tab Content */}
      {activeTab === 'technologies' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.id || tech.name}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <DynamicIcon name={tech.icon} className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {tech.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingTech(tech)}
                  className="p-1 rounded text-zinc-400 hover:text-blue-500"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => tech.id && handleDeleteTech(tech.id, tech.name)}
                  className="p-1 rounded text-zinc-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Edit Skill */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="React 19 & Next.js"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
                  <select
                    value={editingSkill.category || 'Frontend'}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Proficiency %</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editingSkill.proficiency ?? 90}
                    onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Lucide Icon Name</label>
                <input
                  type="text"
                  value={editingSkill.icon || 'Code'}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                  placeholder="Code, Layers, Server, Database, Cloud"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Short Technical Note</label>
                <textarea
                  rows={2}
                  value={editingSkill.description || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  placeholder="SSR, Suspense streaming, server components"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Technology */}
      {editingTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {editingTech.id ? 'Edit Technology' : 'Add Technology Badge'}
            </h3>

            <form onSubmit={handleSaveTech} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Technology Name</label>
                <input
                  type="text"
                  required
                  value={editingTech.name || ''}
                  onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                  placeholder="PostgreSQL"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Lucide Icon Name</label>
                <input
                  type="text"
                  value={editingTech.icon || 'Code'}
                  onChange={(e) => setEditingTech({ ...editingTech, icon: e.target.value })}
                  placeholder="Database, Server, Layers"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="techFeatured"
                  checked={editingTech.isFeatured ?? true}
                  onChange={(e) => setEditingTech({ ...editingTech, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <label htmlFor="techFeatured" className="text-xs font-semibold">
                  Feature in Hero / Ecosystem Bar
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Save Technology
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
