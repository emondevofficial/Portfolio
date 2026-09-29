import React from 'react';
import { motion } from 'motion/react';
import { Education, Certification, Achievement } from '../../types/portfolio.ts';
import { GraduationCap, Award, Trophy, ExternalLink, Calendar, MapPin } from 'lucide-react';

interface CredentialsProps {
  educations: Education[];
  certifications: Certification[];
  achievements: Achievement[];
}

export const Credentials: React.FC<CredentialsProps> = ({ educations, certifications, achievements }) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            Foundations & Accreditations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
            Education, certifications & honors.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Education</span>
            </div>

            <div className="space-y-4">
              {educations.map((edu) => (
                <div
                  key={edu.id || edu.institution}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-xs"
                >
                  <h4 className="font-bold text-base text-zinc-950 dark:text-zinc-50">
                    {edu.degree}
                  </h4>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {edu.institution}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{edu.startDate} — {edu.endDate}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Certifications</span>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id || cert.title}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                      {cert.title}
                    </h4>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0"
                        aria-label="Verify credential"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {cert.issuer}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Issued: {cert.issueDate} {cert.credentialId && `· ID: ${cert.credentialId}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Achievements & Honors */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Achievements & Milestones</span>
            </div>

            <div className="space-y-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id || ach.title}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                      {ach.metric}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                      {ach.year}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-zinc-50">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
