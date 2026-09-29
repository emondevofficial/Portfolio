import React, { useState } from 'react';
import { Project } from '../../types/portfolio.ts';
import { createProject, updateProject, deleteProject } from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, CheckCircle, ExternalLink, Github } from 'lucide-react';

interface AdminProjectsProps {
  projects: Project[];
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ projects }) => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyProject: Partial<Project> = {
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    thumbnail: '/src/assets/images/project_cloud_saas_1790704539221.jpg',
    images: ['/src/assets/images/project_cloud_saas_1790704539221.jpg'],
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    isFeatured: false,
    isPublished: true,
    order: projects.length + 1,
    year: new Date().getFullYear().toString(),
    metrics: '',
    role: 'Lead Architect',
  };

  const handleStartCreate = () => {
    setEditingProject(emptyProject);
    setIsCreating(true);
  };

  const handleStartEdit = (project: Project) => {
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      setLoading(true);
      await deleteProject(id);
    } catch (err) {
      console.error(err);
      alert('Failed to delete project.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    if (!project.id) return;
    try {
      await updateProject(project.id, { isPublished: !project.isPublished });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    if (!project.id) return;
    try {
      await updateProject(project.id, { isFeatured: !project.isFeatured });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) return;

    try {
      setLoading(true);
      if (isCreating) {
        await createProject(editingProject as Omit<Project, 'id'>);
      } else if (editingProject.id) {
        await updateProject(editingProject.id, editingProject);
      }
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Projects Showcase ({projects.length})
          </h2>
          <p className="text-xs text-zinc-500">
            Add, update, reorder, or publish case studies to your public portfolio.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table / Card List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {projects.map((project) => (
            <div
              key={project.id || project.slug}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h3>
                    {project.isFeatured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                        Featured
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        project.isPublished
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-zinc-500/10 text-zinc-400'
                      }`}
                    >
                      {project.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 line-clamp-1 max-w-xl">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <span>/{project.slug}</span>
                    <span>·</span>
                    <span>{project.category}</span>
                    <span>·</span>
                    <span>{project.technologies.slice(0, 3).join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleToggleFeatured(project)}
                  title="Toggle Featured"
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    project.isFeatured
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  <Star className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleTogglePublish(project)}
                  title="Toggle Visibility"
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    project.isPublished
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {project.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleStartEdit(project)}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => project.id && handleDelete(project.id, project.title)}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Create Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isCreating ? 'Create New Portfolio Project' : `Edit Project: ${editingProject.title}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingProject({ ...editingProject, title, slug: editingProject.slug || slug });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
                  <select
                    value={editingProject.category || 'Full-Stack'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Year / Release</label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Short Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Description / Case Study</label>
                <textarea
                  rows={4}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Thumbnail Image URL</label>
                <input
                  type="text"
                  required
                  value={editingProject.thumbnail || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="React 19, TypeScript, PostgreSQL, Docker"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Live Demo URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Featured Project</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isPublished ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
