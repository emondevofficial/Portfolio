import React, { useState } from 'react';
import { Education, Certification, Achievement } from '../../types/portfolio.ts';
import {
  createEducation,
  updateEducation,
  deleteEducation,
  createCertification,
  updateCertification,
  deleteCertification,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../../lib/portfolioService.ts';
import { Plus, Edit2, Trash2, GraduationCap, Award, Trophy } from 'lucide-react';

interface AdminCredentialsProps {
  educations: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}

export const AdminCredentials: React.FC<AdminCredentialsProps> = ({
  educations,
  certifications,
  achievements,
}) => {
  const [tab, setTab] = useState<'education' | 'certifications' | 'achievements'>('education');
  
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [editingAch, setEditingAch] = useState<Partial<Achievement> | null>(null);

  // Education handlers
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu?.institution) return;
    if (editingEdu.id) {
      await updateEducation(editingEdu.id, editingEdu);
    } else {
      await createEducation(editingEdu as Omit<Education, 'id'>);
    }
    setEditingEdu(null);
  };

  // Certification handlers
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.title) return;
    if (editingCert.id) {
      await updateCertification(editingCert.id, editingCert);
    } else {
      await createCertification(editingCert as Omit<Certification, 'id'>);
    }
    setEditingCert(null);
  };

  // Achievement handlers
  const handleSaveAch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch?.title) return;
    if (editingAch.id) {
      await updateAchievement(editingAch.id, editingAch);
    } else {
      await createAchievement(editingAch as Omit<Achievement, 'id'>);
    }
    setEditingAch(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Education, Certifications & Honors
          </h2>
          <p className="text-xs text-zinc-500">
            Manage academic degrees, cloud certifications, and technical distinctions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setTab('education')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                tab === 'education' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
              }`}
            >
              Education ({educations.length})
            </button>
            <button
              onClick={() => setTab('certifications')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                tab === 'certifications' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
              }`}
            >
              Certifications ({certifications.length})
            </button>
            <button
              onClick={() => setTab('achievements')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                tab === 'achievements' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
              }`}
            >
              Achievements ({achievements.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (tab === 'education') {
                setEditingEdu({ institution: '', degree: 'B.S.', fieldOfStudy: '', startDate: '2016', endDate: '2020', location: '', description: '', order: educations.length + 1 });
              } else if (tab === 'certifications') {
                setEditingCert({ title: '', issuer: '', issueDate: '2024', order: certifications.length + 1 });
              } else {
                setEditingAch({ title: '', metric: '', description: '', year: '2024', order: achievements.length + 1 });
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Education Tab */}
      {tab === 'education' && (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div
              key={edu.id || edu.institution}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {edu.degree}, {edu.fieldOfStudy}
                </h4>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  {edu.institution} · {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingEdu(edu)} className="p-1.5 text-zinc-400 hover:text-blue-500">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => edu.id && deleteEducation(edu.id)} className="p-1.5 text-zinc-400 hover:text-rose-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications Tab */}
      {tab === 'certifications' && (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div
              key={cert.id || cert.title}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {cert.title}
                </h4>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                  {cert.issuer} · Issued {cert.issueDate}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingCert(cert)} className="p-1.5 text-zinc-400 hover:text-blue-500">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => cert.id && deleteCertification(cert.id)} className="p-1.5 text-zinc-400 hover:text-rose-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements Tab */}
      {tab === 'achievements' && (
        <div className="space-y-4">
          {achievements.map((ach) => (
            <div
              key={ach.id || ach.title}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{ach.title}</span>
                  <span className="text-xs font-mono font-bold text-amber-500">({ach.metric})</span>
                </div>
                <div className="text-xs text-zinc-400">{ach.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingAch(ach)} className="p-1.5 text-zinc-400 hover:text-blue-500">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => ach.id && deleteAchievement(ach.id)} className="p-1.5 text-zinc-400 hover:text-rose-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education Modal */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Education Details</h3>
            <form onSubmit={handleSaveEdu} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Institution</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ''}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Degree</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.degree || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Field of Study</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.fieldOfStudy || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, fieldOfStudy: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setEditingEdu(null)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Certification Details</h3>
            <form onSubmit={handleSaveCert} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Certification Title</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Issuer</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setEditingCert(null)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {editingAch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Achievement Details</h3>
            <form onSubmit={handleSaveAch} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Title</label>
                <input
                  type="text"
                  required
                  value={editingAch.title || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Key Metric (e.g. 1st Place / 180 Teams)</label>
                <input
                  type="text"
                  value={editingAch.metric || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, metric: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Description</label>
                <textarea
                  rows={2}
                  value={editingAch.description || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setEditingAch(null)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
