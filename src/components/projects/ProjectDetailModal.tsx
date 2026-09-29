import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Calendar, User, BarChart2 } from 'lucide-react';
import { Project } from '../../types/portfolio.ts';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 text-zinc-900 dark:text-zinc-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Thumbnail Preview Banner */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
          <img
            src={project.thumbnail}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Metadata Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            {project.role && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.role}</span>
              </>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {project.title}
          </h3>

          <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Live Metrics if present */}
        {project.metrics && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/50 text-blue-900 dark:text-blue-300 text-sm">
            <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span><strong>Impact & Production Scale:</strong> {project.metrics}</span>
          </div>
        )}

        {/* Full Architectural Case Study Description */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            System Architecture & Deep Dive
          </h4>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {project.fullDescription || project.shortDescription}
          </p>
        </div>

        {/* Technologies List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Stack & Infrastructure
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            Close Viewer [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
