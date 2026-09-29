import React, { useState } from 'react';
import { Image, Copy, Check, ExternalLink, Plus } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [customList, setCustomList] = useState<string[]>([]);

  const defaultAssets = [
    {
      title: 'Hero Developer Portrait (1:1 Studio)',
      path: '/src/assets/images/hero_dev_portrait_1790704527613.jpg',
      aspect: '1:1',
      category: 'Profile & Avatar',
    },
    {
      title: 'Synthex Cloud Observability SaaS (16:9)',
      path: '/src/assets/images/project_cloud_saas_1790704539221.jpg',
      aspect: '16:9',
      category: 'Project Showcase',
    },
    {
      title: 'NeuroPulse AI Platform (16:9)',
      path: '/src/assets/images/project_ai_platform_1790704550498.jpg',
      aspect: '16:9',
      category: 'Project Showcase',
    },
    {
      title: 'Aura Headless Commerce Architecture (16:9)',
      path: '/src/assets/images/project_commerce_sys_1790704563559.jpg',
      aspect: '16:9',
      category: 'Project Showcase',
    },
  ];

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setCustomList([...customList, customUrl.trim()]);
    setCustomUrl('');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Media Assets & Storage Library
        </h2>
        <p className="text-xs text-zinc-500">
          Optimized image assets generated for projects, profiles, and thumbnails. Copy paths to attach them to projects.
        </p>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {defaultAssets.map((asset, idx) => (
          <div
            key={asset.path}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3"
          >
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80">
              <img
                src={asset.path}
                alt={asset.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                {asset.aspect}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {asset.title}
              </h4>
              <div className="text-xs text-zinc-400 font-mono truncate">
                {asset.path}
              </div>
            </div>

            <button
              onClick={() => handleCopy(asset.path, idx)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {copiedIndex === idx ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Image URL / Path</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Add External / Cloudinary Image URL */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Add Custom Hosted / Cloudinary Image URL
        </h3>

        <form onSubmit={handleAddCustom} className="flex gap-3">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0"
          >
            Add to Library
          </button>
        </form>

        {customList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {customList.map((url, i) => (
              <div key={i} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 space-y-1">
                <img src={url} alt="Custom" className="aspect-video w-full object-cover rounded-lg" />
                <button
                  onClick={() => handleCopy(url, 100 + i)}
                  className="w-full text-[10px] py-1 text-center font-mono text-zinc-500 hover:text-zinc-900 truncate"
                >
                  {copiedIndex === 100 + i ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
