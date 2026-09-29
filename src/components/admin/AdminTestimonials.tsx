import React, { useState } from 'react';
import { Testimonial } from '../../types/portfolio.ts';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, Star, Eye, EyeOff } from 'lucide-react';

interface AdminTestimonialsProps {
  testimonials: Testimonial[];
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({ testimonials }) => {
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.content) return;
    if (editingItem.id) {
      await updateTestimonial(editingItem.id, editingItem);
    } else {
      await createTestimonial(editingItem as Omit<Testimonial, 'id'>);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Endorsements & Testimonials ({testimonials.length})
          </h2>
          <p className="text-xs text-zinc-500">
            Quotes and recommendations from colleagues, founders, and engineering leaders.
          </p>
        </div>

        <button
          onClick={() => setEditingItem({ name: '', role: 'Founder & CEO', company: '', content: '', rating: 5, isEnabled: true, order: testimonials.length + 1 })}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Endorsement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id || test.name}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => test.id && updateTestimonial(test.id, { isEnabled: !test.isEnabled })}
                    className={`p-1.5 rounded-lg border text-xs ${
                      test.isEnabled ? 'text-emerald-500 border-emerald-500/20' : 'text-zinc-400'
                    }`}
                  >
                    {test.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setEditingItem(test)} className="p-1.5 text-zinc-400 hover:text-blue-500">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => test.id && deleteTestimonial(test.id)} className="p-1.5 text-zinc-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 italic line-clamp-4">
                "{test.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{test.name}</div>
              <div className="text-[11px] text-zinc-500">{test.role}, {test.company}</div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Testimonial Details</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Author Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold">Role</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Company</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold">Endorsement Quote</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
