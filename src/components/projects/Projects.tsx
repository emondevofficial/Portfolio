import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '../../types/portfolio.ts';
import { ProjectDetailModal } from './ProjectDetailModal.tsx';

interface ProjectsProps {
  projects: Project[];
  onSelectProjectSlug?: (slug: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProjectSlug }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Cloud & DevOps', 'AI & Data', 'Distributed Systems'];

  const publishedProjects = projects
    .filter(p => p.isPublished)
    .sort((a, b) => a.order - b.order);

  const filteredProjects = publishedProjects.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleOpenDetail = (project: Project) => {
    setModalProject(project);
    if (onSelectProjectSlug) {
      onSelectProjectSlug(project.slug);
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
              Selected Engineering Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
              Production systems & architectures.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              A curated selection of scalable web platforms, distributed event processors, and developer tooling architected for high resilience.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id || project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => handleOpenDetail(project)}
                className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 overflow-hidden shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Top Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                  {/* Featured Marker */}
                  {project.isFeatured && (
                    <div className="absolute top-3 left-3 bg-zinc-900/90 dark:bg-black/90 text-white backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Featured Work</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Unboxed metadata line with typographic separator */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400" />
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Bottom: Technologies tags */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/70 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1 py-0.5">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Detail View */}
        <ProjectDetailModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />

      </div>
    </section>
  );
};
