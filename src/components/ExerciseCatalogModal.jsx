import React, { useState } from 'react';
import { X, Clock, ShieldCheck, Info, Filter, BookOpen } from 'lucide-react';
import { ExerciseVisual } from './ExerciseVisual';
import { playSound } from '../utils/sound';

export const ExerciseCatalogModal = ({ 
  isOpen, 
  onClose, 
  exercises, 
  lang, 
  t, 
  soundEnabled, 
  onLaunchSingleExercise 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: t.allExercises },
    { id: 'eyes', label: t.catEyes },
    { id: 'neck', label: t.catNeck },
    { id: 'spine', label: t.catSpine },
    { id: 'shoulders', label: t.catShoulders },
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(e => e.category === selectedCategory);

  const handleClose = () => {
    playSound('click', soundEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-stone-100 dark:bg-[#1A201E]/80 border border-stone-200 dark:border-white/5 shadow-xl dark:shadow-2xl flex flex-col overflow-hidden transition-colors duration-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-white/5 bg-zinc-100/50 dark:bg-[#121615]/60 flex items-center justify-between transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#4E8768]/10 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-200 font-display transition-colors duration-200">
                {t.viewCatalog}
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 transition-colors duration-200">
                {t.catalogDescription}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 border-b border-stone-200 dark:border-white/5 bg-zinc-100/30 dark:bg-[#121615]/30 flex items-center gap-2 overflow-x-auto transition-colors duration-200">
          <Filter className="w-4 h-4 text-stone-500 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                playSound('click', soundEnabled);
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white dark:bg-[#4E8768] dark:text-stone-900 font-bold shadow-sm shadow-emerald-700/30 dark:shadow-emerald-500/30'
                  : 'bg-white/90 dark:bg-[#1A201E]/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-zinc-200 border border-stone-200 dark:border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Exercises */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExercises.map(ex => {
            const data = ex[lang] || ex.en;
            return (
              <div 
                key={ex.id}
                className="glass-panel rounded-2xl p-4 border border-stone-200 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-[#1A201E] text-stone-900 dark:text-stone-300 transition-colors duration-200">
                      {ex.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-mono transition-colors duration-200">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200" />
                      {ex.duration}s
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-200 font-display transition-colors duration-200">
                    {data.title}
                  </h3>
                  <p className="text-xs text-stone-900 dark:text-stone-300 mt-1 leading-relaxed transition-colors duration-200">
                    {data.instructions}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-white/5 transition-colors duration-200">
                  <div className="flex items-start gap-1.5 text-[11px] text-stone-600 dark:text-stone-400 transition-colors duration-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-[#5E9C76] flex-shrink-0 mt-0.5 transition-colors duration-200" />
                    <span>{data.benefits}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px] text-amber-600 dark:text-amber-300/80 transition-colors duration-200">
                    <Info className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5 transition-colors duration-200" />
                    <span>{data.postureTip}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleClose();
                    onLaunchSingleExercise(ex);
                  }}
                  className="w-full mt-2 py-2 rounded-xl bg-zinc-100 dark:bg-[#1A201E] hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-[#0B0F0E] text-stone-900 dark:text-stone-300 font-bold text-xs transition-all duration-200 text-center shadow-sm dark:shadow-none"
                >
                  {t.startThisExercise}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
