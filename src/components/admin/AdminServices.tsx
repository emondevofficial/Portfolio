import React, { useState } from 'react';
import { Service } from '../../types/portfolio.ts';
import { createService, updateService, deleteService } from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, CheckCircle2, Eye, EyeOff, Layout } from 'lucide-react';
import { DynamicIcon } from '../shared/DynamicIcon.tsx';

interface AdminServicesProps {
  services: Service[];
}

export const AdminServices: React.FC<AdminServicesProps> = ({ services }) => {
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [loading, setLoading] = useState(false);

  const emptyService: Partial<Service> = {
    title: '',
    description: '',
    icon: 'Layout',
    features: [''],
    order: services.length + 1,
    isEnabled: true,
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;
    try {
      setLoading(true);
      if (editingService.id) {
        await updateService(editingService.id, editingService);
      } else {
        await createService(editingService as Omit<Service, 'id'>);
      }
      setEditingService(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save service.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    try {
      await deleteService(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Consulting Services ({services.length})
          </h2>
          <p className="text-xs text-zinc-500">
            Define architectural and development service offerings and deliverables.
          </p>
        </div>

        <button
          onClick={() => setEditingService(emptyService)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={service.id || service.title}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <DynamicIcon name={service.icon} className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => service.id && updateService(service.id, { isEnabled: !service.isEnabled })}
                    className={`p-1.5 rounded-lg border text-xs ${
                      service.isEnabled
                        ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                        : 'border-zinc-300 dark:border-zinc-700 text-zinc-400'
                    }`}
                  >
                    {service.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-blue-500"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => service.id && handleDelete(service.id, service.title)}
                    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                {service.title}
              </h3>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {service.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 space-y-1">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-zinc-400">
                Deliverables ({service.features.length})
              </span>
              <ul className="list-disc list-inside space-y-0.5">
                {service.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="truncate">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {editingService.id ? 'Edit Service' : 'Add New Service Offering'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="Full-Stack Web Application Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Icon Name</label>
                <input
                  type="text"
                  value={editingService.icon || 'Layout'}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  placeholder="Layout, Server, ShieldCheck, Cpu"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Key Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingService.features?.join('\n') || ''}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    features: e.target.value.split('\n').filter(Boolean)
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
