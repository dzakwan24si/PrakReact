import { useState } from 'react';
import frameworkData from "./framework.json";

// SVG Icons Components
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

// Custom hook untuk animasi stagger
const useStaggerAnimation = (itemCount) => {
  return Array.from({ length: itemCount }, (_, i) => ({
    animationDelay: `${i * 100}ms`,
  }));
};

export default function FrameworkList() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const staggerStyles = useStaggerAnimation(frameworkData.length);

  // Extract unique tags untuk filter
  const allTags = [...new Set(frameworkData.flatMap(item => item.tags))];

  const toggleTag = (tag) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const filteredData = frameworkData.filter(item => 
    selectedTags.size === 0 || item.tags.some(tag => selectedTags.has(tag))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 font-sans">
      {/* Header Section dengan Glassmorphism */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-purple-400">
                <SparklesIcon />
              </div>
              <span className="text-purple-300 text-sm font-medium tracking-wider uppercase">
                Technology Stack
              </span>
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-4">
              Framework Library
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
              Explore modern development frameworks with detailed insights, release history, and official resources.
            </p>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedTags.has(tag) 
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25 scale-105' 
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              {tag}
            </button>
          ))}
          {selectedTags.size > 0 && (
            <button
              onClick={() => setSelectedTags(new Set())}
              className="px-4 py-2 rounded-full text-sm font-medium text-red-300 hover:text-red-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout untuk Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={item.id}
            style={staggerStyles[index]}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`
              group relative rounded-2xl overflow-hidden
              transition-all duration-500 ease-out
              ${hoveredId === item.id ? 'scale-[1.02] -translate-y-2' : 'scale-100 translate-y-0'}
              animate-fade-in-up
            `}
          >
            {/* Card Background dengan Glassmorphism Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl" />
            
            {/* Glow Effect on Hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl
            `} />

            {/* Content Container */}
            <div className="relative p-6 h-full flex flex-col">
              {/* Header dengan Icon/Logo Placeholder */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30 text-white">
                  <CodeIcon />
                </div>
                <div className="flex gap-2">
                  {item.tags.slice(0, 2).map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-purple-200 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                {item.name}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>

              {/* Details Grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                    <UserIcon />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Developer</p>
                    <p className="text-slate-200 font-medium">{item.details.developer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-green-400">
                    <CalendarIcon />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">Released</p>
                    <p className="text-slate-200 font-medium">{item.details.releaseYear}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={item.details.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group/btn relative w-full py-3 px-4 rounded-xl
                  bg-gradient-to-r from-purple-600 to-blue-600
                  text-white font-semibold text-sm
                  flex items-center justify-center gap-2
                  transform transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
                  active:scale-95
                  overflow-hidden
                `}
              >
                <span className="relative z-10">Visit Official Website</span>
                <div className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">
                  <ExternalLinkIcon />
                </div>
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              </a>

              {/* Expandable Tags Section */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs text-slate-400 hover:text-purple-300 transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4 text-slate-400">
            <CodeIcon />
          </div>
          <p className="text-slate-400 text-lg">No frameworks match the selected filters.</p>
        </div>
      )}

      {/* CSS untuk Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}