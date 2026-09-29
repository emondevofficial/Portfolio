import React from 'react';
import { X, Download, ExternalLink, Printer, CheckCircle, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { Profile, Experience, Education, Skill } from '../../types/portfolio.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  educations,
  skills,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-10 space-y-8 text-zinc-900 dark:text-zinc-100 print:p-0 print:border-none print:shadow-none">
        
        {/* Modal Controls Bar (hidden during print) */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Curriculum Vitae / Resume
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              [Updated 2026]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Document Content */}
        <div className="space-y-8 print:space-y-6">
          
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                {profile.name}
              </h1>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {profile.title}
              </span>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {profile.website}
              </span>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Professional Work Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.company} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.position} <span className="font-normal text-zinc-500">at</span> {exp.company}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400 list-disc list-inside">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Education
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.institution} className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      {edu.degree}, {edu.fieldOfStudy}
                    </span>
                    <div className="text-xs text-zinc-500">{edu.institution} · {edu.location}</div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Core Technical Competencies */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Core Technical Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.name}
                  className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  {s.name} ({s.proficiency}%)
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
