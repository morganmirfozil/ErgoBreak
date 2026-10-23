import React, { useState } from 'react';
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Globe, 
  BookOpen,
  Activity,
  Check,
  AlertTriangle,
  Sun,
  Moon
} from 'lucide-react';
import { playSound } from '../utils/sound';

export const Navbar = ({ 
  lang, 
  setLang, 
  t, 
  theme,
  setTheme,
  soundEnabled, 
  setSoundEnabled, 
  stats, 
  onResetDay,
  onOpenCatalog 
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  ];

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playSound('click', true);
    }
  };

  const handleToggleTheme = () => {
    playSound('click', soundEnabled);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleConfirmReset = () => {
    playSound('click', soundEnabled);
    onResetDay();
    setShowConfirmReset(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-[#121615]/80 border-b border-stone-200 dark:border-white/5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 border border-emerald-500/30 shadow-glow-emerald">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 dark:text-stone-200 font-display transition-colors duration-200">
                Ergo<span className="text-emerald-700 dark:text-[#5E9C76] transition-colors duration-200">Break</span>
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-stone-600 dark:text-stone-400 tracking-tight transition-colors duration-200">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Streak Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#1A201E]/90 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs font-semibold shadow-sm dark:shadow-none transition-colors duration-200">
            <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-500/30 dark:fill-amber-400/30 animate-pulse" />
            <span>{stats.streak} {t.streak}</span>
          </div>

          {/* Exercise Library Button */}
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onOpenCatalog();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-[#1A201E]/60 hover:bg-stone-100 dark:hover:bg-zinc-800/90 border border-stone-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700 text-stone-900 dark:text-stone-300 hover:text-stone-900 dark:hover:text-zinc-100 text-xs font-medium transition-all duration-200 shadow-sm dark:shadow-none"
            title={t.viewCatalog}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-[#5E9C76]" />
            <span className="hidden md:inline">{t.viewCatalog}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={t.soundToggle}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              soundEnabled 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-[#5E9C76] hover:bg-emerald-50 dark:hover:bg-emerald-900/40' 
                : 'bg-white/90 dark:bg-[#1A201E]/60 border-stone-200 dark:border-white/5 text-stone-500 hover:text-stone-900 dark:hover:text-zinc-300 shadow-sm dark:shadow-none'
            }`}
            title={soundEnabled ? t.soundOn : t.soundOff}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-lg bg-white/90 dark:bg-[#1A201E]/60 hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-white/5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-zinc-200 transition-all duration-200 shadow-sm dark:shadow-none"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/90 dark:bg-[#1A201E]/60 hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-white/5 text-stone-900 dark:text-stone-200 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm dark:shadow-none"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span>{lang}</span>
            </button>

            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white/90 dark:bg-[#1A201E]/80 border border-stone-200 dark:border-white/5 shadow-xl py-1 z-40 animate-in fade-in zoom-in-95 duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangMenuOpen(false);
                        playSound('click', soundEnabled);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-stone-100 dark:hover:bg-zinc-800/80 transition-colors duration-200 ${
                        lang === l.code ? 'text-emerald-700 dark:text-[#5E9C76] font-semibold bg-emerald-50 dark:bg-emerald-950/20' : 'text-stone-900 dark:text-stone-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {lang === l.code && <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-[#5E9C76]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Reset Day Button */}
          <button
            onClick={() => setShowConfirmReset(true)}
            className="p-2 rounded-lg bg-white/90 dark:bg-[#1A201E]/60 hover:bg-red-50 dark:hover:bg-red-950/30 border border-stone-200 dark:border-white/5 hover:border-red-200 dark:hover:border-red-800/40 text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 shadow-sm dark:shadow-none"
            title={t.dayReset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Reset Day */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white/90 dark:bg-[#1A201E]/80 border border-stone-200 dark:border-white/5 p-6 shadow-xl dark:shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-200">
                {t.dayReset}
              </h3>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {t.resetConfirm}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-lg bg-white/90 dark:bg-[#1A201E] hover:bg-stone-100 dark:hover:bg-zinc-700 border border-stone-200 dark:border-transparent text-stone-900 dark:text-stone-300 text-xs font-medium transition-colors duration-200"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors duration-200 shadow-lg shadow-red-600/30"
              >
                {t.dayReset}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
