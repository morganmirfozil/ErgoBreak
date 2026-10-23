import React, { useState, useEffect } from 'react';
import { translations } from './i18n/translations';
import { exercises } from './data/exercises';
import { loadStoredData, saveStoredData, getDefaultStats } from './utils/storage';
import { Navbar } from './components/Navbar';
import { TimerCard } from './components/TimerCard';
import { BreakModal } from './components/BreakModal';
import { QuickWidgets } from './components/QuickWidgets';
import { DailySummary } from './components/DailySummary';
import { ExerciseCatalogModal } from './components/ExerciseCatalogModal';
import { Sparkles, Shield, HeartPulse, Activity, Clock, RefreshCw } from 'lucide-react';

export function App() {
  const initialData = loadStoredData();

  const [lang, setLang] = useState(initialData.lang);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ergobreak_theme') || 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState(initialData.sound);
  const [stats, setStats] = useState(initialData.stats);

  // Modals
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  // Sync state back to localStorage
  useEffect(() => {
    saveStoredData({
      lang,
      sound: soundEnabled,
      stats
    });
    localStorage.setItem('ergobreak_theme', theme);
    
    // Toggle HTML dark class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [lang, theme, soundEnabled, stats]);

  const t = translations[lang] || translations.en;

  // Stat Handlers
  const handleWorkCompleted = (durationMinutes) => {
    setStats(prev => ({
      ...prev,
      focusMinutes: (prev.focusMinutes || 0) + durationMinutes
    }));
  };

  const handleBreakFinished = () => {
    setStats(prev => ({
      ...prev,
      breaksCompleted: (prev.breaksCompleted || 0) + 1
    }));
  };

  const handlePostureCheck = () => {
    setStats(prev => ({
      ...prev,
      postureChecks: (prev.postureChecks || 0) + 1
    }));
  };

  const handleAddWater = (ml = 250) => {
    setStats(prev => ({
      ...prev,
      waterMl: (prev.waterMl || 0) + ml
    }));
  };

  const handleResetWater = () => {
    setStats(prev => ({
      ...prev,
      waterMl: 0
    }));
  };

  const handleResetDay = () => {
    setStats({
      ...getDefaultStats(),
      streak: stats.streak
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-[#121615] text-stone-900 dark:text-stone-200 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-200 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        stats={stats}
        onResetDay={handleResetDay}
        onOpenCatalog={() => setIsCatalogModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-200 font-display transition-colors duration-200">
              {t.tagline}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1 max-w-2xl transition-colors duration-200">
              {t.subtitle}
            </p>
          </div>

          <div className="flex-1 md:ml-12 flex flex-col items-end text-right space-y-3 mt-6 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-emerald-500/20 shadow-glow-emerald">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400">{t.systemActive}</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-[#1A201E]/60 border border-stone-200 dark:border-white/5 text-xs text-stone-600 dark:text-stone-300 shadow-sm backdrop-blur-md transition-colors duration-200">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.nextBreakIn}: <strong className="text-stone-900 dark:text-stone-200 font-mono tracking-tighter tabular-nums">~18 {t.minutes}</strong></span>
            </div>

            <div className="max-w-xs flex items-start gap-2 p-3 rounded-xl bg-white/90/60 dark:bg-[#1A201E]/40 border border-stone-200/80 dark:border-white/5 mt-1 hover:bg-white/90 dark:hover:bg-zinc-900/60 transition-colors duration-200 group cursor-default shadow-sm backdrop-blur-sm">
              <RefreshCw className="w-4 h-4 text-stone-500 mt-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors" />
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight transition-colors duration-200">
                {t.heroTip}
              </p>
            </div>
          </div>
        </div>

        {/* Primary Functional Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cadence Engine Timer */}
          <div className="lg:col-span-5 w-full">
            <TimerCard
              t={t}
              soundEnabled={soundEnabled}
              onWorkCompleted={handleWorkCompleted}
              onTriggerBreakModal={() => setIsBreakModalOpen(true)}
            />
          </div>

          {/* Micro-Habits & Quick Widgets */}
          <div className="lg:col-span-7 w-full space-y-8">
            <QuickWidgets
              t={t}
              soundEnabled={soundEnabled}
              waterMl={stats.waterMl || 0}
              onAddWater={handleAddWater}
              onResetWater={handleResetWater}
              onPostureCheck={handlePostureCheck}
              postureCount={stats.postureChecks || 0}
            />

            {/* Daily Summary & Ergo Score */}
            <DailySummary
              t={t}
              stats={stats}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white/90/50 dark:bg-[#121615]/60 py-6 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-700 dark:text-[#5E9C76]" />
            <span className="font-semibold text-stone-900 dark:text-stone-300 font-display transition-colors duration-200">ErgoBreak</span>
            <span className="transition-colors duration-200">{t.precision}</span>
          </div>
        </div>
      </footer>

      {/* Guided Break Modal */}
      <BreakModal
        isOpen={isBreakModalOpen}
        onClose={() => setIsBreakModalOpen(false)}
        exercises={exercises}
        lang={lang}
        t={t}
        soundEnabled={soundEnabled}
        onBreakFinished={handleBreakFinished}
      />

      {/* Full Exercise Library Modal */}
      <ExerciseCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        exercises={exercises}
        lang={lang}
        t={t}
        soundEnabled={soundEnabled}
        onLaunchSingleExercise={() => {
          setIsCatalogModalOpen(false);
          setIsBreakModalOpen(true);
        }}
      />
    </div>
  );
}

export default App;
